import { NextRequest, NextResponse } from "next/server";
import { criarTeste, buscarValidadeReal } from "@/lib/knewcms";
import { planoPadrao, TESTE_DURACAO_HORAS } from "@/content/plans";
import { buscarTestePorTelefone, buscarTestePorEmail, registrarTeste, rateLimit } from "@/lib/store";
import { criarSessao, SESSION_COOKIE, sessionCookieOptions } from "@/lib/auth";
import { enviarLinkMagico } from "@/lib/magic-link";
import { espelharEventoFlora } from "@/lib/flora";
import { enviarEmail } from "@/lib/email";
import { wrapEmail, blocoCredenciais, botaoEmail, esc } from "@/lib/email-template";
import { emailDominioValido } from "@/lib/email-verify";

export const runtime = "nodejs";
export const maxDuration = 20;

interface TrialBody {
  nome?: string;
  email?: string;
  telefone?: string;
  adulto?: boolean;
}

const ipDe = (req: NextRequest) =>
  (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "unknown";

/**
 * Lição #9: nunca mandar credencial que não funciona. Se o painel falhar,
 * bater a cota mensal, ou devolver uma resposta incompleta (sem
 * usuário/senha), o site nunca inventa um acesso quebrado — vai direto pro
 * humano no WhatsApp, com os dados do lead já prontos na mensagem.
 */
function socorroWhatsapp(
  d: { nome: string; email: string; telefone: string; adulto: boolean },
  limite: boolean,
) {
  const numero = (process.env.NEXT_PUBLIC_WHATSAPP || "5562993901860").replace(/\D/g, "");
  const site = (process.env.NEXT_PUBLIC_SITE_URL || "https://iptu2022br.com.br")
    .replace(/^https?:\/\//, "")
    .replace(/\/$/, "");
  const texto = [
    `Olá! Vim do WPlay (${site}).`,
    "Tentei gerar o teste grátis no site e o sistema automático não conseguiu.",
    "",
    `Nome: ${d.nome}`,
    `E-mail: ${d.email}`,
    `WhatsApp: ${d.telefone}`,
    `Conteúdo adulto: ${d.adulto ? "sim" : "não"}`,
    "",
    "Pode liberar meu teste, por favor?",
  ].join("\n");
  return {
    ok: false as const,
    motivo: limite ? "limite" : "falha",
    erro: limite
      ? "Nosso gerador automático atingiu o limite de testes do mês. Sem problema: a gente libera o seu na mão agora, pelo WhatsApp."
      : "Não conseguimos gerar seu teste automaticamente agora. A gente libera o seu na mão pelo WhatsApp, leva menos de um minuto.",
    whatsapp: `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`,
  };
}

export async function POST(req: NextRequest) {
  let body: TrialBody;
  try {
    body = (await req.json()) as TrialBody;
  } catch {
    return NextResponse.json({ ok: false, erro: "Requisição inválida." }, { status: 400 });
  }

  const nome = (body.nome || "").trim();
  const email = (body.email || "").trim().toLowerCase();
  const telefone = (body.telefone || "").replace(/\D/g, "");
  const adulto = body.adulto === true;

  // 1. Validação de verdade, antes de qualquer outra coisa (lição #2, passo 1).
  if (nome.trim().split(/\s+/).length < 2) {
    return NextResponse.json({ ok: false, erro: "Informe nome e sobrenome." }, { status: 400 });
  }
  // Regra do dono: teste exige e-mail e WhatsApp de verdade, não só
  // formato — confere se o domínio do e-mail existe de verdade (DNS, sem
  // custo, ver lib/email-verify.ts).
  if (!(await emailDominioValido(email))) {
    return NextResponse.json({ ok: false, erro: "Informe um e-mail válido (o domínio não existe)." }, { status: 400 });
  }
  // Telefone chega com DDI incluso (ex. "55" + DDD + número, ou o
  // equivalente de outro país do seletor). Faixa E.164: 8 a 15 dígitos.
  if (telefone.length < 8 || telefone.length > 15) {
    return NextResponse.json({ ok: false, erro: "Informe um WhatsApp válido." }, { status: 400 });
  }

  // 2. Dedupe por telefone OU e-mail (lição #2, passo 2) — ANTES do rate
  // limit, de propósito: cliente voltando pra própria conta nunca esbarra
  // no limite (lição #2, passo 3).
  const jaTem = await buscarTestePorTelefone(telefone);
  if (jaTem) {
    // Mesmo telefone = é ele mesmo. Entra direto na conta que já tem (de lá
    // vê a credencial e assina), sem gastar outro teste na API. Mesmo
    // desfecho do real (wtv_ep_gerar_teste): cookie + redirect.
    // Registro antigo sem telefone: completa agora (o checkout usa esse
    // campo pra não pedir o número de novo).
    if (!jaTem.telefone && jaTem.email) {
      try {
        await registrarTeste(jaTem.email, telefone, { ...jaTem, telefone });
      } catch (e) {
        console.error("[trial] falha ao completar telefone (não bloqueante):", e);
      }
    }
    return responderComSessao(jaTem.email || email, jaTem.username);
  }
  const jaTemEmail = await buscarTestePorEmail(email);
  if (jaTemEmail) {
    // E-mail já cadastrado, com outro número. Logar por e-mail seria entregar
    // a conta a quem só descobriu o endereço, então vai o link de acesso: um
    // clique para o dono de verdade, nada para o resto.
    await enviarLinkMagico(email, jaTemEmail.nome);
    return NextResponse.json(
      {
        ok: false,
        jaTestou: true,
        erro: `Esse e-mail já tem conta no WPlay. Enviamos agora um link de acesso para ${email}: abra o e-mail para ver seu usuário e senha e escolher seu plano. Se precisar de ajuda, chame no WhatsApp.`,
      },
      { status: 409 },
    );
  }

  // 3. Rate limit por IP (anti-spam), só depois da checagem acima.
  if (!(await rateLimit(`trial:${ipDe(req)}`, 8, 3600))) {
    return NextResponse.json({ ok: false, erro: "Muitas tentativas. Tente novamente mais tarde." }, { status: 429 });
  }

  // 4. Só agora chama a API do painel.
  const packageP2p = adulto ? planoPadrao.packageP2p.comAdulto : planoPadrao.packageP2p.semAdulto;
  const packageIptv = adulto ? planoPadrao.packageIptv.comAdulto : planoPadrao.packageIptv.semAdulto;
  let resposta: Awaited<ReturnType<typeof criarTeste>>;
  try {
    resposta = await criarTeste({
      packageIptv,
      packageP2p,
      testDuration: TESTE_DURACAO_HORAS,
      notes: `WPlay [teste] - ${nome} - ${telefone}`,
    });
  } catch (e) {
    const motivo = e instanceof Error ? e.message : String(e);
    console.error("[trial] falha ao criar teste no KnewCMS:", motivo);
    return NextResponse.json(socorroWhatsapp({ nome, email, telefone, adulto }, /limite|cota|quota/i.test(motivo)), {
      status: 502,
    });
  }

  // Lição #9 portada aqui: resposta 2xx sem usuário/senha é uma credencial
  // quebrada. Nunca devolver isso pro cliente — cai no mesmo fallback humano.
  // `id` entra na mesma guarda: sem ele o checkout nunca vai achar o que
  // ativar depois (o pagamento cairia num beco sem saída, sem alarme).
  if (!resposta.username || !resposta.password || !resposta.id) {
    console.error("[trial] resposta do KnewCMS incompleta:", JSON.stringify(resposta));
    return NextResponse.json(socorroWhatsapp({ nome, email, telefone, adulto }, false), { status: 502 });
  }

  // Log sem PII: só o username gerado (não-sensível) e a flag de adulto.
  console.log(`[trial] teste criado: user=${resposta.username} adulto=${adulto}`);

  try {
    await registrarTeste(email, telefone, {
      id: resposta.id,
      username: resposta.username,
      password: resposta.password,
      email,
      nome,
      adulto,
      criadoEm: Date.now(),
    });
  } catch (e) {
    console.error("[trial] falha ao registrar dedupe (não bloqueante):", e);
  }

  // Espelha o teste iniciado no Flora Dashboard (aguardado com teto de 4 s;
  // falha não vira erro pro cliente).
  await espelharEventoFlora("test_started", { email, product: "trial" });

  // A validade que o `/lines/test` devolve não é confiável (medido no
  // appkplay): lê de volta do painel antes de prometer qualquer prazo pro
  // cliente. Se a leitura falhar, não inventa data — só omite o campo.
  const expDate = resposta.id ? await buscarValidadeReal(resposta.id) : null;

  // E-mail de confirmação, mesmo template real do appwplay (wrapEmail +
  // blocoCredenciais + botaoEmail). AGUARDADO de propósito: na Vercel a função
  // congela ao responder, e envio sem await morre no meio (foi assim que os
  // clientes de 18/09 ficaram sem e-mail; mesmo incidente do Krator/Vizzion
  // com blocking=>false). Falha de e-mail continua não virando erro pro
  // cliente: o retorno é ignorado, só o envio é esperado.
  const site = (process.env.NEXT_PUBLIC_SITE_URL || "https://iptu2022br.com.br").replace(/\/$/, "");
  const primeiroNome = esc(nome.split(" ")[0]);
  const corpo =
    `<p style="color:#c7c7bd;font-size:.95rem;line-height:1.6;margin:0 0 4px">Olá, ${primeiroNome}!</p>` +
    `<p style="color:#c7c7bd;font-size:.9rem;line-height:1.6;margin:0 0 18px">Seu teste grátis de 4 horas já está ativo. Veja seus dados de acesso:</p>` +
    blocoCredenciais(resposta.username, resposta.password) +
    botaoEmail(`${site}/minha-conta`, "Acessar minha conta") +
    `<p style="color:#8f9484;font-size:.78rem;line-height:1.5;margin:0;text-align:center">Seu teste dura 4 horas. Como instalar no seu aparelho: ${site}/guias</p>`;
  const emailOk = await enviarEmail(email, "Seu teste grátis WPlay está pronto", wrapEmail("Teste Grátis Ativado", corpo));
  if (!emailOk) console.error("[trial] e-mail de credenciais NÃO enviado (Resend) para", email.replace(/(.{3}).*(@.*)/, "$1***$2"));

  // Mesmo desfecho do real: sessão aberta na hora e o cliente cai dentro da
  // área dele, com credenciais, assistente de instalação e importação por MAC.
  // Credencial e validade seguem no corpo pro formulário mostrar enquanto
  // redireciona (e como fallback se o redirect falhar).
  return responderComSessao(email, resposta.username, { username: resposta.username, password: resposta.password, expDate });
}

async function responderComSessao(email: string, username: string, extra: Record<string, unknown> = {}) {
  const sessao = await criarSessao({ email, username });
  const res = NextResponse.json({ ok: true, redirect: "/minha-conta", ...extra });
  res.cookies.set(SESSION_COOKIE, sessao, sessionCookieOptions);
  return res;
}
