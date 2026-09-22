import { NextRequest, NextResponse } from "next/server";
import { buscarTestePorEmail, rateLimit } from "@/lib/store";
import { enviarLinkMagico } from "@/lib/magic-link";

export const runtime = "nodejs";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Pede o link mágico de acesso à área do cliente. Espelha
 * `wtv_ep_login_email` do appwplay real: mesmos limites (3 por e-mail, 8 por
 * IP, janela de 15 min) e a MESMA resposta genérica sempre — nunca revela se
 * o e-mail tem conta ou não (evita que alguém descubra quem é cliente só
 * tentando e-mails).
 */
export async function POST(req: NextRequest) {
  let body: { email?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, erro: "Requisição inválida." }, { status: 400 });
  }

  const email = (body.email || "").trim().toLowerCase();
  const RESPOSTA_GENERICA = {
    ok: true,
    mensagem: "Se este e-mail tiver conta, enviamos um link de acesso. Confira sua caixa de entrada e o spam.",
  };

  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json({ ok: false, erro: "Informe um e-mail válido." }, { status: 400 });
  }

  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "unknown";
  const okEmail = await rateLimit(`magic:email:${email}`, 3, 15 * 60);
  const okIp = await rateLimit(`magic:ip:${ip}`, 8, 15 * 60);
  if (!okEmail || !okIp) {
    // Mesma resposta de sempre — não revela limite atingido.
    return NextResponse.json(RESPOSTA_GENERICA);
  }

  const cliente = await buscarTestePorEmail(email);
  if (cliente) await enviarLinkMagico(email, cliente.nome);

  return NextResponse.json(RESPOSTA_GENERICA);
}
