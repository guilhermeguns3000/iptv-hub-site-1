/**
 * Cria a cobrança Pix pedindo pro Flora (que tem a chave da Woovi — nenhum
 * segredo da Woovi mora aqui). O Flora gera o Pix e devolve o link/QR. A
 * `ref` (curta, opaca) liga o pagamento a este pedido; o Flora recebe o
 * webhook real da Woovi e repassa pro `/api/webhook/woovi` deste site quando
 * o pagamento é aprovado. Mesmo cliente que já roda em produção no SmartOne
 * (`lib/woovi.ts` de lá) — só o slug do site muda.
 */
export async function criarCobrancaWoovi(opts: {
  ref: string;
  value: number; // centavos
  name?: string;
  email?: string;
  phone?: string;
  taxID?: string;
  comment?: string;
}): Promise<{ brCode?: string; qrCodeImage?: string; paymentLinkUrl?: string }> {
  const base = process.env.FLORA_BASE_URL || "https://flora-dashboard-dun.vercel.app";
  const token = process.env.WOOVI_TOKEN;
  if (!token) throw new Error("WOOVI_TOKEN não configurado");

  const res = await fetch(`${base}/api/woovi/charge?site=wplay&token=${token}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(opts),
    cache: "no-store",
  });
  const json = (await res.json()) as {
    ok?: boolean;
    error?: string;
    brCode?: string;
    qrCodeImage?: string;
    paymentLinkUrl?: string;
  };
  if (!res.ok || !json.ok) {
    throw new Error(json?.error || "falha ao criar cobrança Woovi");
  }
  return json;
}
