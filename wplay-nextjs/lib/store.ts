import { Redis } from "@upstash/redis";

/**
 * Armazenamento leve (Upstash Redis) para dedupe do teste grátis e rate
 * limit por IP. Degrada com segurança: se o Redis não estiver configurado
 * (UPSTASH_REDIS_REST_URL/TOKEN ausentes), as funções não quebram o
 * fluxo — apenas seguem como se não houvesse dedupe/limite (fail-open),
 * mesmo padrão usado nos sites-irmãos do portfólio.
 */

let _redis: Redis | null | undefined;

function redis(): Redis | null {
  if (_redis !== undefined) return _redis;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  _redis = url && token ? new Redis({ url, token }) : null;
  if (!_redis) {
    console.warn("[store] Redis não configurado, dedupe/rate limit desativados.");
  }
  return _redis;
}

const NS = "wplay:";
const normEmail = (e: string) => e.trim().toLowerCase();

// --- Controle de teste grátis (1 por pessoa) --------------------------------
//
// Lição #2 do wtv-painel.php: mesmo telefone -> é a mesma pessoa voltando,
// devolve o acesso já emitido em vez de gastar outro teste. Mesmo e-mail com
// telefone DIFERENTE -> nunca reexibir a credencial na resposta direta (risco
// de outra pessoa só saber o e-mail); aqui isso vira "já existe teste com
// este e-mail" sem devolver usuário/senha.

export interface TesteRegistro {
  /** Id da linha no KnewCMS — sem isso o checkout não tem o que ativar depois. */
  id: number;
  username: string;
  password: string;
  email: string;
  /** Com DDI, só dígitos. Registros antigos podem não ter. */
  telefone?: string;
  nome: string;
  adulto: boolean;
  criadoEm: number;
  /** Presente só depois de um pagamento confirmado — dispara o VIP na área do cliente. */
  pago?: { plano: string; em: number };
}

export async function buscarTestePorTelefone(telefone: string): Promise<TesteRegistro | null> {
  const r = redis();
  if (!r) return null;
  const raw = await r.get<string>(`${NS}trial:tel:${telefone}`);
  if (!raw) return null;
  try {
    return typeof raw === "string" ? JSON.parse(raw) : (raw as TesteRegistro);
  } catch {
    return null;
  }
}

/** Usado no checkout: acha o teste do lead pra ativar a MESMA linha (nunca cria outra). */
export async function buscarTestePorEmail(email: string): Promise<TesteRegistro | null> {
  const r = redis();
  if (!r) return null;
  const raw = await r.get<string>(`${NS}trial:email:${normEmail(email)}`);
  if (!raw) return null;
  try {
    return typeof raw === "string" ? JSON.parse(raw) : (raw as TesteRegistro);
  } catch {
    return null;
  }
}

export async function emailJaTemTeste(email: string): Promise<boolean> {
  const r = redis();
  if (!r) return false;
  return (await r.exists(`${NS}trial:email:${normEmail(email)}`)) === 1;
}

export async function registrarTeste(
  email: string,
  telefone: string,
  reg: TesteRegistro,
): Promise<void> {
  const r = redis();
  if (!r) return;
  const ttl = { ex: 60 * 60 * 24 * 400 }; // ~13 meses, para dedupe de longo prazo
  const v = JSON.stringify({ ...reg, telefone: reg.telefone ?? telefone });
  await r.set(`${NS}trial:email:${normEmail(email)}`, v, ttl);
  await r.set(`${NS}trial:tel:${telefone}`, v, ttl);
}

/**
 * Marca o lead como pagante (regra real do appwplay: todo cliente que
 * pagou é obrigatoriamente direcionado pro Suporte VIP na área da conta).
 * Atualiza as DUAS chaves (email e telefone) pra ficarem consistentes.
 */
export async function marcarComoPago(email: string, telefone: string | undefined, plano: string): Promise<void> {
  const r = redis();
  if (!r) return;
  const atual = await buscarTestePorEmail(email);
  if (!atual) return;
  const atualizado: TesteRegistro = { ...atual, pago: { plano, em: Date.now() } };
  const ttl = { ex: 60 * 60 * 24 * 400 };
  const v = JSON.stringify(atualizado);
  await r.set(`${NS}trial:email:${normEmail(email)}`, v, ttl);
  if (telefone) await r.set(`${NS}trial:tel:${telefone}`, v, ttl);
}

// --- Checkout Pix: ref (curta, opaca) -> externalId (JWT do pedido) --------
//
// O token do pedido (contém usuário/senha) nunca vai na URL pública nem em
// log — só o `ref` circula (query string, correlationID da Woovi). O webhook
// troca `ref` por `externalId` aqui antes de ler o pedido de verdade.

export async function salvarRefPedido(ref: string, externalId: string): Promise<void> {
  const r = redis();
  if (!r) return;
  await r.set(`${NS}ref:${ref}`, externalId, { ex: 60 * 60 * 24 * 4 });
}

export async function lerRefPedido(ref: string): Promise<string | null> {
  const r = redis();
  if (!r) return null;
  return (await r.get<string>(`${NS}ref:${ref}`)) || null;
}

// --- Link mágico da área do cliente (login por e-mail, sem senha no site) --
//
// Mesmo TTL do appwplay real (wtv_ep_login_email: 15 min, uso único).

export async function salvarLinkMagico(token: string, email: string): Promise<void> {
  const r = redis();
  if (!r) return;
  await r.set(`${NS}magic:${token}`, normEmail(email), { ex: 60 * 15 });
}

/** Lê e CONSOME o token (uso único — apaga depois de ler, como o real). */
export async function consumirLinkMagico(token: string): Promise<string | null> {
  const r = redis();
  if (!r) return null;
  // GETDEL: ler e apagar num passo só — dois cliques simultâneos no mesmo
  // link não conseguem os dois entrar.
  const email = await r.getdel<string>(`${NS}magic:${token}`);
  return email || null;
}

// --- Idempotência do webhook (nunca ativar a mesma venda duas vezes) -------

export async function webhookJaProcessado(externalId: string): Promise<boolean> {
  const r = redis();
  if (!r) return false;
  try {
    return (await r.exists(`${NS}whpago:${externalId}`)) === 1;
  } catch {
    return false;
  }
}

export async function marcarWebhookProcessado(externalId: string): Promise<void> {
  const r = redis();
  if (!r) return;
  try {
    await r.set(`${NS}whpago:${externalId}`, Date.now(), { ex: 60 * 60 * 24 * 30 });
  } catch {
    /* não-bloqueante */
  }
}

/**
 * Reserva atômica (SET NX) ANTES de gastar crédito: duas entregas simultâneas
 * do mesmo webhook não conseguem ambas passar em "já processado?" e ativar
 * duas vezes. Devolve false se outro pedido já reservou. Se a ativação falhar,
 * chamar `liberarWebhook` para permitir o reenvio.
 */
export async function reservarWebhook(externalId: string): Promise<boolean> {
  const r = redis();
  if (!r) return true;
  try {
    const res = await r.set(`${NS}whpago:${externalId}`, Date.now(), { nx: true, ex: 60 * 60 * 24 * 30 });
    return res === "OK";
  } catch {
    return true;
  }
}

export async function liberarWebhook(externalId: string): Promise<void> {
  const r = redis();
  if (!r) return;
  try {
    await r.del(`${NS}whpago:${externalId}`);
  } catch {
    /* não-bloqueante */
  }
}

// --- Rate limiting (janela fixa via Redis) ----------------------------------

/**
 * Limita ações por chave (ex.: IP). Retorna true se permitido.
 * Sem Redis, não limita (fail-open) para não quebrar o fluxo.
 */
export async function rateLimit(key: string, max: number, windowSec: number): Promise<boolean> {
  const r = redis();
  if (!r) return true;
  const k = `${NS}rl:${key}`;
  try {
    const count = await r.incr(k);
    // Se o expire da primeira batida falhou (processo morreu no meio), a
    // chave ficaria sem prazo e bloquearia para sempre. TTL -1 = sem prazo.
    if (count === 1 || (await r.ttl(k)) < 0) await r.expire(k, windowSec);
    return count <= max;
  } catch {
    return true; // erro no Redis não deve bloquear clientes legítimos
  }
}
