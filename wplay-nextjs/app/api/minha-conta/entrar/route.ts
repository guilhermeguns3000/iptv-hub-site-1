import { NextRequest, NextResponse } from "next/server";
import { consumirLinkMagico, buscarTestePorEmail } from "@/lib/store";
import { criarSessao, SESSION_COOKIE, sessionCookieOptions } from "@/lib/auth";

export const runtime = "nodejs";

/** Consome o link mágico (?token=) e abre a sessão. Uso único, 15 min. */
export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token") || "";
  const site = req.nextUrl.origin;

  const email = token ? await consumirLinkMagico(token) : null;
  if (!email) {
    return NextResponse.redirect(`${site}/minha-conta?erro=link-invalido`);
  }

  const cliente = await buscarTestePorEmail(email);
  if (!cliente) {
    return NextResponse.redirect(`${site}/minha-conta?erro=link-invalido`);
  }

  const sessao = await criarSessao({ email, username: cliente.username });
  const res = NextResponse.redirect(`${site}/minha-conta`);
  res.cookies.set(SESSION_COOKIE, sessao, sessionCookieOptions);
  return res;
}
