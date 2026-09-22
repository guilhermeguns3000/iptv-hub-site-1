import { promises as dns } from "dns";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Regra do dono: teste grátis exige e-mail e WhatsApp de verdade, não só
 * formato válido. O regex sozinho aceita "a@a.a" — aqui confere se o
 * domínio realmente existe (tem registro MX, ou pelo menos A/AAAA como
 * alguns domínios pequenos fazem sem MX dedicado). Sem custo: é DNS, não
 * API paga.
 *
 * Fail-open em erro de rede/timeout do DNS (nunca bloquear cliente real por
 * instabilidade da nossa consulta) — só bloqueia quando o domínio
 * comprovadamente NÃO existe.
 */
export async function emailDominioValido(email: string): Promise<boolean> {
  if (!EMAIL_REGEX.test(email)) return false;

  const dominio = email.split("@")[1]?.toLowerCase() ?? "";
  if (!dominio) return false;

  // Erro de digitação comum: domínio duplicado colado ("gmail.comgmail.com").
  const metade = dominio.length / 2;
  if (Number.isInteger(metade) && metade > 0) {
    const a = dominio.slice(0, metade);
    const b = dominio.slice(metade);
    if (a === b) return false;
  }

  try {
    const mx = await dns.resolveMx(dominio);
    if (mx && mx.length > 0) return true;
  } catch {
    /* sem MX — tenta A/AAAA abaixo antes de decidir */
  }

  try {
    const a = await dns.resolve4(dominio).catch(() => []);
    const aaaa = await dns.resolve6(dominio).catch(() => []);
    return a.length > 0 || aaaa.length > 0;
  } catch {
    return false;
  }
}
