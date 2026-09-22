import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

/**
 * Assinatura do pedido (checkout) e sessão da área do cliente. Mecanismo de
 * cookie assinado é o mesmo padrão genérico do SmartOne (`lib/auth.ts` de
 * lá) — isso não depende de backend nenhum. O que muda, e vem do appwplay
 * de verdade (`wtv_cliente_autenticado`, `wtv_ep_login_email`), é o MODELO
 * de login: link mágico por e-mail, nunca usuário/senha num formulário do
 * site — o usuário/senha ali é só pro app de IPTV, não pro site.
 */

function getSecret(): Uint8Array {
  const secret = process.env.NEXTAUTH_SECRET;
  if (!secret) throw new Error("NEXTAUTH_SECRET não configurado.");
  return new TextEncoder().encode(secret);
}

export interface PedidoPayload {
  p: string; // planId (id do plano: mensal/trimestral/semestral)
  /** Id da linha no KnewCMS (a do teste grátis que virou pedido pago). */
  linhaId: number;
  u: string; // username (o mesmo do teste)
  pw: string; // password (o mesmo do teste)
  e?: string; // email do comprador
  n?: string; // nome do comprador
  t?: string; // telefone, com DDI (o que o formulário já envia)
  pais: string; // country pro KnewCMS (ex. "Brasil")
  adulto: boolean;
  packageIptv: number;
  packageP2p: string;
  [key: string]: unknown;
}

/** Assina um token de pedido (vai no externalId da cobrança Woovi). */
export async function assinarPedido(payload: PedidoPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("3d")
    .sign(getSecret());
}

export async function lerPedido(token: string): Promise<PedidoPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload as unknown as PedidoPayload;
  } catch {
    return null;
  }
}

// --- Sessão da área do cliente ----------------------------------------

export const SESSION_COOKIE = "wplay_sessao";

export const sessionCookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 24 * 60, // 60 dias
};

export interface SessionPayload {
  email: string;
  username: string;
  [key: string]: unknown;
}

export async function criarSessao(payload: SessionPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("60d")
    .sign(getSecret());
}

export async function verificarSessao(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

/** Lê a sessão atual a partir do cookie (uso em Server Components). */
export async function getSession(): Promise<SessionPayload | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verificarSessao(token);
}
