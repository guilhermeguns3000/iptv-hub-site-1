/** Escapa texto vindo de formulário antes de entrar no HTML do e-mail. */
export function esc(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);
}

/**
 * Wrapper de e-mail, mesma estrutura real do appwplay (`wtv_email_wrap`):
 * cabeçalho escuro com logo + título, borda verde, corpo em card escuro,
 * rodapé com copyright e link do site. Só troca a marca (WPlay em vez de
 * Warez TV) e a cor (verde militar do WPlay em vez do verde do Warez).
 */
export function wrapEmail(titulo: string, corpo: string): string {
  const site = process.env.NEXT_PUBLIC_SITE_URL || "https://iptu2022br.com.br";
  const logo = `${site}/brand/logo-full.png`;
  const ano = new Date().getFullYear();

  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0b08;font-family:Inter,Arial,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0b08;padding:32px 16px">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%">
  <tr><td style="background:#14160f;border-radius:16px 16px 0 0;padding:28px 32px;text-align:center;border-bottom:3px solid #6b8e23">
    <img src="${logo}" alt="WPlay" height="32" style="height:32px">
    <h1 style="color:#fff;font-size:1.3rem;margin:12px 0 0;font-weight:800">${titulo}</h1>
  </td></tr>
  <tr><td style="background:#0d0f0a;padding:28px 32px;border-radius:0 0 16px 16px">${corpo}</td></tr>
  <tr><td style="padding:20px 0;text-align:center">
    <p style="color:#5c6350;font-size:.75rem;margin:0">&copy; ${ano} WPlay &middot; <a href="${site}" style="color:#8bb52e;text-decoration:none">${site.replace(/^https?:\/\//, "")}</a></p>
  </td></tr>
</table>
</td></tr></table>
</body></html>`;
}

/** Bloco de credenciais (usuário/senha) no mesmo estilo do real (`wtv_email_cred`). */
export function blocoCredenciais(usuario: string, senha: string): string {
  return `<div style="background:#0a0b08;border:1px solid #5c6350;border-radius:10px;padding:20px;margin:20px 0">
    <p style="color:#8f9484;font-size:.72rem;margin:0 0 6px;text-transform:uppercase;letter-spacing:.05em">USUÁRIO</p>
    <p style="color:#8bb52e;font-size:1.1rem;font-weight:800;margin:0 0 16px;font-family:monospace">${usuario}</p>
    <p style="color:#8f9484;font-size:.72rem;margin:0 0 6px;letter-spacing:.05em">SENHA</p>
    <p style="color:#8bb52e;font-size:1.1rem;font-weight:800;margin:0;font-family:monospace">${senha}</p>
  </div>`;
}

/** Botão de ação (mesmo estilo do real, `wtv_email_btn`). */
export function botaoEmail(url: string, texto: string): string {
  return `<div style="text-align:center;margin:24px 0">
    <a href="${url}" style="background:#6b8e23;color:#fff;font-weight:700;font-size:.95rem;padding:14px 32px;border-radius:10px;text-decoration:none;display:inline-block">${texto}</a>
  </div>`;
}
