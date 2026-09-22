import { Resend } from "resend";

/**
 * Envio de e-mail via Resend. Degrada com segurança: sem RESEND_API_KEY,
 * apenas loga e segue — o fluxo de login por link mágico não pode travar o
 * resto do site por falta de e-mail configurado. Mesmo padrão do SmartOne
 * (lib/email/send.ts de lá), sem a parte de opt-out (não se aplica aqui:
 * é só o link de acesso, não é lembrete/marketing).
 */

let _resend: Resend | null | undefined;

function resend(): Resend | null {
  if (_resend !== undefined) return _resend;
  const key = process.env.RESEND_API_KEY;
  _resend = key ? new Resend(key) : null;
  if (!_resend) console.warn("[email] RESEND_API_KEY ausente — e-mails desativados.");
  return _resend;
}

const FROM = () => process.env.EMAIL_FROM || "WPlay <contato@iptu2022br.com.br>";

export async function enviarEmail(to: string, subject: string, html: string): Promise<boolean> {
  const cliente = resend();
  if (!cliente) return false;
  try {
    const { error } = await cliente.emails.send({ from: FROM(), to, subject, html });
    if (error) {
      console.error("[email] erro Resend:", error);
      return false;
    }
    return true;
  } catch (e) {
    console.error("[email] exceção ao enviar:", e);
    return false;
  }
}
