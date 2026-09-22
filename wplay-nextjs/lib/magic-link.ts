import { randomBytes } from "crypto";
import { salvarLinkMagico } from "@/lib/store";
import { enviarEmail } from "@/lib/email";
import { wrapEmail, botaoEmail, esc } from "@/lib/email-template";

/**
 * Gera e envia o link mágico de acesso à conta (uso único, 15 min). Mesmo
 * mecanismo real do appwplay (`wtv_enviar_magic_login`): usado tanto pelo
 * pedido explícito de login quanto quando alguém tenta gerar teste com um
 * e-mail que já tem conta em outro número.
 */
export async function enviarLinkMagico(email: string, nome?: string): Promise<void> {
  const token = randomBytes(24).toString("hex");
  await salvarLinkMagico(token, email);
  const site = (process.env.NEXT_PUBLIC_SITE_URL || "https://iptu2022br.com.br").replace(/\/$/, "");
  const link = `${site}/api/minha-conta/entrar?token=${token}`;
  const primeiroNome = esc((nome || "").split(" ")[0] || "");
  const corpo =
    `<p style="color:#c7c7bd;font-size:.95rem;line-height:1.6;margin:0 0 4px">Olá${primeiroNome ? ", " + primeiroNome : ""}!</p>` +
    `<p style="color:#c7c7bd;font-size:.9rem;line-height:1.6;margin:0 0 4px">Clique no botão abaixo para acessar sua conta WPlay. O link vale por 15 minutos e só pode ser usado uma vez.</p>` +
    botaoEmail(link, "Acessar minha conta") +
    `<p style="color:#8f9484;font-size:.78rem;line-height:1.5;margin:0">Se você não pediu esse acesso, ignore este e-mail.</p>`;
  await enviarEmail(email, "Acessar minha conta WPlay", wrapEmail("Acesso à Conta", corpo));
}
