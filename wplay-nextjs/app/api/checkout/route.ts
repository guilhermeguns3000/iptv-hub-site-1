import { NextRequest, NextResponse } from "next/server";
import { getPlano } from "@/content/plans";
import { criarCobrancaWoovi } from "@/lib/woovi";
import { assinarPedido } from "@/lib/auth";
import { randomBytes } from "crypto";
import { buscarTestePorEmail, salvarRefPedido, rateLimit } from "@/lib/store";
import { emailDominioValido } from "@/lib/email-verify";

export const runtime = "nodejs";

interface CheckoutBody {
  planId?: string;
  nome?: string;
  email?: string;
  telefone?: string;
  documento?: string;
  pais?: string;
}

/** CPF: formato + dígitos verificadores (mesmo algoritmo do SmartOne). */
function cpfValido(cpf: string): boolean {
  cpf = cpf.replace(/\D/g, "");
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
  let s = 0;
  for (let i = 0; i < 9; i++) s += +cpf[i] * (10 - i);
  let d1 = (s * 10) % 11;
  if (d1 === 10) d1 = 0;
  if (d1 !== +cpf[9]) return false;
  s = 0;
  for (let i = 0; i < 10; i++) s += +cpf[i] * (11 - i);
  let d2 = (s * 10) % 11;
  if (d2 === 10) d2 = 0;
  return d2 === +cpf[10];
}

function socorroWhatsapp(motivo: string) {
  const numero = (process.env.NEXT_PUBLIC_WHATSAPP || "5562993901860").replace(/\D/g, "");
  const site = (process.env.NEXT_PUBLIC_SITE_URL || "https://iptu2022br.com.br")
    .replace(/^https?:\/\//, "")
    .replace(/\/$/, "");
  const texto = `Olá! Vim do WPlay (${site}) e quero assinar, mas o pagamento pelo site não abriu.`;
  return {
    ok: false as const,
    erro: motivo,
    whatsapp: `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`,
  };
}

export async function POST(req: NextRequest) {
  let body: CheckoutBody;
  try {
    body = (await req.json()) as CheckoutBody;
  } catch {
    return NextResponse.json({ ok: false, erro: "Requisição inválida." }, { status: 400 });
  }

  const plano = getPlano((body.planId || "").trim());
  const nome = (body.nome || "").trim();
  const email = (body.email || "").trim().toLowerCase();
  const telefone = (body.telefone || "").replace(/\D/g, "");
  const documento = (body.documento || "").replace(/\D/g, "");
  const pais = (body.pais || "Brasil").trim();

  if (!plano) {
    return NextResponse.json({ ok: false, erro: "Plano inválido." }, { status: 400 });
  }
  if (nome.split(/\s+/).length < 2) {
    return NextResponse.json({ ok: false, erro: "Informe nome e sobrenome." }, { status: 400 });
  }
  if (!(await emailDominioValido(email))) {
    return NextResponse.json({ ok: false, erro: "Informe um e-mail válido (o domínio não existe)." }, { status: 400 });
  }
  if (telefone.length < 8) {
    return NextResponse.json({ ok: false, erro: "Informe um WhatsApp válido." }, { status: 400 });
  }
  if (!cpfValido(documento)) {
    return NextResponse.json({ ok: false, erro: "Informe um CPF válido (exigido para o Pix)." }, { status: 400 });
  }

  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "unknown";
  if (!(await rateLimit(`checkout:${ip}`, 8, 3600))) {
    return NextResponse.json({ ok: false, erro: "Muitas tentativas. Tente novamente mais tarde." }, { status: 429 });
  }

  /**
   * NUNCA cria linha nova no checkout — só ativa a linha do teste que o lead
   * já tem. É exatamente o que a função real do appwplay faz
   * (`wtv_api_ativar_linha`, sempre recebe o `$iptv_id` de uma linha
   * existente); o funil do WPlay também promete isso desde a home ("o teste
   * vem antes do pagamento"). Sem teste encontrado, cai no WhatsApp — não
   * inventa uma linha paga do zero, caminho nunca confirmado contra o painel
   * real.
   */
  const teste = await buscarTestePorEmail(email);
  if (!teste) {
    return NextResponse.json(
      socorroWhatsapp("Não encontramos um teste grátis com este e-mail. Peça o teste primeiro, ou fale com o suporte."),
      { status: 409 },
    );
  }

  const packageIptv = teste.adulto ? plano.packageIptv.comAdulto : plano.packageIptv.semAdulto;
  const packageP2p = teste.adulto ? plano.packageP2p.comAdulto : plano.packageP2p.semAdulto;

  const externalId = await assinarPedido({
    p: plano.id,
    linhaId: teste.id,
    u: teste.username,
    pw: teste.password,
    e: email,
    n: nome,
    t: telefone,
    pais,
    adulto: teste.adulto,
    packageIptv,
    packageP2p,
  });

  // Ref opaca: o JWT (que carrega a senha) nunca vai na URL nem em log.
  const ref = randomBytes(16).toString("hex");
  await salvarRefPedido(ref, externalId);

  try {
    const cobranca = await criarCobrancaWoovi({
      ref,
      value: plano.preco,
      name: nome,
      email,
      phone: telefone,
      taxID: documento,
      // Descrição do comprovante sempre genérica, sem marca/plano (mesma
      // regra do SmartOne) — e sem travessão (a Woovi rejeita no comment).
      comment: "Suporte Tecnico Remoto",
    });

    if (!cobranca.brCode) {
      throw new Error("Cobrança Woovi sem código Pix.");
    }

    return NextResponse.json({
      ok: true,
      ref,
      brCode: cobranca.brCode,
      qrCodeImage: cobranca.qrCodeImage,
      paymentLinkUrl: cobranca.paymentLinkUrl,
    });
  } catch (e) {
    console.error("[checkout] falha ao criar cobrança Woovi:", e);
    return NextResponse.json(socorroWhatsapp("Não conseguimos gerar o pagamento agora."), { status: 502 });
  }
}
