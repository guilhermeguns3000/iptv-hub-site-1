"use client";

/**
 * Guarda a credencial do teste no navegador do próprio visitante (nunca sai
 * daqui, nunca vai pro servidor de novo) só pra o botão de WhatsApp poder
 * anexar usuário/senha na mensagem quando ele pedir ajuda logo depois de
 * testar — mesmo padrão que o appwplay já faz de verdade. Expira em 24h
 * (o teste em si dura 4h, mas o suporte ainda pode precisar do usuário
 * pouco depois disso).
 */

const KEY = "wplay_teste_local";
const TTL_MS = 24 * 60 * 60 * 1000;

export interface TesteLocal {
  username: string;
  password: string;
  criadoEm: number;
}

export function salvarTesteLocal(t: Omit<TesteLocal, "criadoEm">): void {
  try {
    localStorage.setItem(KEY, JSON.stringify({ ...t, criadoEm: Date.now() }));
  } catch {
    /* localStorage indisponível — não é crítico */
  }
}

export function lerTesteLocal(): TesteLocal | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const t = JSON.parse(raw) as TesteLocal;
    if (Date.now() - t.criadoEm > TTL_MS) return null;
    return t;
  } catch {
    return null;
  }
}
