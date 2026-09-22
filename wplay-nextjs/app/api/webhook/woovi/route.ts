import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import { getPlano } from "@/content/plans";
import { lerRefPedido, reservarWebhook, liberarWebhook, marcarComoPago } from "@/lib/store";
import { lerPedido } from "@/lib/auth";
import { ativarLinha, conferirOuAlertar, renovarLinha } from "@/lib/knewcms";
import { espelharEventoFlora } from "@/lib/flora";

export const runtime = "nodejs";

/**
 * Provisiona a conta paga quando o Flora avisa que a cobrança Woovi foi paga.
 * O Flora é o hub: recebe o webhook real da Woovi, identifica o site pelo
 * correlationID e encaminha pra cá. Mesmo contrato do SmartOne
 * (`app/api/webhook/woovi/route.ts` de lá), adaptado pro KnewCMS.
 *
 * Lição #6 do wtv-painel.php: comparação de token em tempo constante — o
 * SmartOne usa `!==` simples aqui, mas a lição explícita das 11 (item 6) diz
 * pra nunca fazer isso num webhook, então aplicando a versão certa.
 */
function tokenValido(recebido: unknown, esperado: string | undefined): boolean {
  if (typeof recebido !== "string" || !esperado) return false;
  const a = Buffer.from(recebido);
  const b = Buffer.from(esperado);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function POST(req: NextRequest) {
  let body: {
    token?: string;
    ref?: string;
    amount?: number;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (!tokenValido(body.token, process.env.WOOVI_TOKEN)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const externalId = body.ref ? await lerRefPedido(body.ref) : null;
  const pedido = externalId ? await lerPedido(externalId) : null;
  if (!pedido || !externalId) {
    console.error("[webhook/woovi] ref/pedido inválido");
    return NextResponse.json({ ok: false, erro: "pedido inválido" }, { status: 400 });
  }

  // Idempotência (lição #7): nunca ativar a mesma venda duas vezes, nem em
  // reenvio do botão "Reenviar webhooks" da Woovi. Reserva ATÔMICA antes de
  // gastar crédito: checar-e-depois-marcar deixava janela pra duas entregas
  // simultâneas ativarem duas vezes.
  if (!(await reservarWebhook(externalId))) {
    return NextResponse.json({ ok: true, jaProcessado: true });
  }

  const plano = getPlano(pedido.p);
  if (!plano) {
    console.error("[webhook/woovi] plano inexistente:", pedido.p);
    await liberarWebhook(externalId);
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // Valor: `amount` vem em reais (Flora); plano.preco em centavos.
  const pagoCentavos = typeof body.amount === "number" ? Math.round(body.amount * 100) : undefined;
  if (typeof pagoCentavos === "number" && pagoCentavos + 1 < plano.preco) {
    console.error(
      `[webhook/woovi] valor divergente: pago=${pagoCentavos} esperado=${plano.preco} plano=${plano.id}`,
    );
    await liberarWebhook(externalId);
    return NextResponse.json({ ok: false, erro: "valor divergente" }, { status: 400 });
  }

  // Ativa a linha do teste (nunca cria uma nova — o checkout já garantiu que
  // `pedido.linhaId` existe e é do próprio lead).
  try {
    await ativarLinha({
      id: pedido.linhaId,
      username: pedido.u,
      password: pedido.pw,
      credits: plano.creditos,
      packageIptv: pedido.packageIptv,
      packageP2p: pedido.packageP2p,
      country: pedido.pais,
    });
    console.log(`[webhook/woovi] linha ${pedido.linhaId} ativada, plano=${plano.id}`);
  } catch (e) {
    const motivo = e instanceof Error ? e.message : String(e);
    /**
     * Lição #4: 403 com "teste" no corpo = a linha já não é mais teste — é
     * cliente pagante renovando. A saída certa é ESTENDER (créditos somam em
     * cima da validade atual, nunca substituem), nunca tentar "ativar" de
     * novo. `ativarLinha` já falhou (rejeitada, HTTP 403 = nada foi cobrado),
     * então essa segunda chamada é a única que de fato gasta crédito aqui.
     */
    if (/HTTP 403/.test(motivo) && /teste/i.test(motivo)) {
      try {
        await renovarLinha(pedido.linhaId, plano.creditos);
        console.log(`[webhook/woovi] linha ${pedido.linhaId} RENOVADA (não era mais teste), plano=${plano.id}`);
      } catch (e2) {
        const motivo2 = e2 instanceof Error ? e2.message : String(e2);
        console.error(`[webhook/woovi] falha ao RENOVAR linha ${pedido.linhaId}:`, motivo2);
        await liberarWebhook(externalId);
        return NextResponse.json({ ok: false, erro: "falha ao renovar" }, { status: 502 });
      }
    } else {
      console.error(`[webhook/woovi] falha ao ativar linha ${pedido.linhaId}:`, motivo);
      // Não marca como processado: o Flora já registrou o pagamento (hub
      // central, independente daqui) — só a ativação real falhou, e precisa
      // de intervenção manual. `notifyProvisionFail` do lado do Flora já
      // cobre o alerta por e-mail pro dono nesse caso.
      await liberarWebhook(externalId);
      return NextResponse.json({ ok: false, erro: "falha ao ativar" }, { status: 502 });
    }
  }

  // Regra do appwplay real: todo cliente que pagou é OBRIGATORIAMENTE
  // marcado pra receber o direcionamento de Suporte VIP na área da conta
  // (não-bloqueante: se falhar, a ativação real já aconteceu, só o VIP não
  // aparece até o lead recarregar a página de novo).
  try {
    if (pedido.e) await marcarComoPago(pedido.e, pedido.t, plano.id);
  } catch (e) {
    console.error("[webhook/woovi] falha ao marcar como pago (não bloqueante):", e);
  }

  // Lição #3: nunca confiar em 2xx sem reler. Não-bloqueante — o cliente já
  // foi ativado; isso só confirma e alerta se algo não bateu.
  try {
    const conf = await conferirOuAlertar(pedido.linhaId, {
      planId: plano.planId,
      packageIptv: pedido.packageIptv,
      packageP2p: pedido.packageP2p,
    });
    if (!conf.bateu) {
      console.error(`[webhook/woovi] ALERTA: linha ${pedido.linhaId} não bateu com o esperado após ativar.`);
    }
  } catch (e) {
    console.error("[webhook/woovi] falha ao conferir pós-ativação (não bloqueante):", e);
  }

  // Lição #8: sob Woovi, o Flora JÁ registra a venda pelo webhook da própria
  // Woovi — nunca espelhar `flora_event` de venda aqui de novo (duplicaria).
  // Só o "ativado de verdade" fica de telemetria própria, e é non-blocking.
  await espelharEventoFlora("cliente_login", { email: pedido.e, usuario: pedido.u, plano: plano.id });

  return NextResponse.json({ ok: true });
}
