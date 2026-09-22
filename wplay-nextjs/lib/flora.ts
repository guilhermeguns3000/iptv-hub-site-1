/**
 * Espelha eventos do funil pro Flora Dashboard (hub de analytics/vendas do
 * portfólio). Ver wplay-research/arquitetura.md seção 9 e
 * flora-rastreamento-sites.md (memória do projeto): nomes de evento fora do
 * enum real (`modules/analytics/events.ts` no Flora) são descartados em
 * silêncio, então só usar os nomes já validados (`test_started`, etc.).
 *
 * Lição #11 do wtv-painel.php: telemetria é non-blocking (não pode atrasar
 * nem derrubar a resposta ao usuário), mas isso é só para o espelhamento —
 * a ação de negócio de verdade (chamar o KnewCMS, devolver a credencial)
 * continua síncrona e aguardada. Não confundir os dois padrões.
 */
export async function espelharEventoFlora(evento: string, dados: Record<string, unknown>): Promise<void> {
  const floraUrl = process.env.FLORA_WEBHOOK_URL;
  if (!floraUrl) return;
  // Aguardado com prazo curto: sem await, a Vercel congela a função ao
  // responder e o evento some. 4 s de teto pra nunca segurar o cliente.
  await fetch(floraUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ flora_event: evento, ...dados }),
    signal: AbortSignal.timeout(4000),
  }).catch(() => {
    // Non-blocking de propósito: falha de telemetria nunca pode virar erro
    // pro usuário que está tentando testar o WPlay.
  });
}
