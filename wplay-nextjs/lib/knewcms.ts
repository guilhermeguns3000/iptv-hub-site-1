/**
 * Cliente do backend próprio do WPlay: fala DIRETO com o painel Warez de
 * verdade, mcapi.knewcms.com (KnewCMS) — nunca com api.painelcliente.com
 * (produto sem relação nenhuma) e nunca com nenhum endpoint hospedado em
 * appwplay.com.br. O WPlay tem que funcionar sozinho.
 *
 * Roda só server-side (Route Handlers `runtime = "nodejs"`). O token nunca
 * é exposto ao client e nunca é escrito neste arquivo — só o nome da env var.
 *
 * Ver wplay-research/arquitetura.md seção 7 (contrato) e
 * wplay-research/wtv-painel-licoes.md (11 lições reais portadas como
 * comportamento, não como PHP copiado).
 */

const BASE = process.env.WTV_IPTV_BASE ?? "https://mcapi.knewcms.com:2087";

function tokenOuFalha(): string {
  const t = process.env.WTV_IPTV_TOKEN;
  if (!t) throw new Error("WTV_IPTV_TOKEN ausente no ambiente");
  return t;
}

async function chamar<T>(path: string, init: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${tokenOuFalha()}`,
      ...(init.headers ?? {}),
    },
    signal: AbortSignal.timeout(20_000),
    cache: "no-store",
  });
  const json = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(`KnewCMS ${path} -> HTTP ${res.status}: ${JSON.stringify(json)}`);
  }
  return json as T;
}

// --- Teste grátis (POST /lines/test) ----------------------------------------
//
// Espelha exatamente a chamada que já roda em produção no appkplay
// (server-api/teste.php) — mesmo pacote Completo (package_iptv 69/95, mesmo
// catálogo confirmado), mesmo testDuration em HORAS. `package_iptv` é
// ignorado pelo painel nessa rota (ele sempre entrega o que estiver
// selecionado globalmente ali), mas mandamos mesmo assim por paridade com o
// padrão comprovado — não inventar um formato de chamada novo sem motivo.
// `krator_package` foi removida: a doc oficial tipa como STRING, e o
// appkplay (que não vende Krator, igual o WPlay) nunca envia esse campo — só
// mandar quando o produto realmente for Krator.

export interface CriarTesteInput {
  packageIptv: number;
  packageP2p: string;
  /** Horas. 4 = 4h de teste (medido de verdade, não suposição). */
  testDuration: number;
  notes: string;
}

export interface CriarTesteResposta {
  id?: number;
  username?: string;
  password?: string;
  exp_date?: string;
  package_iptv?: number;
  package_p2p?: string;
}

export async function criarTeste(input: CriarTesteInput): Promise<CriarTesteResposta> {
  return chamar<CriarTesteResposta>("/lines/test", {
    method: "POST",
    body: JSON.stringify({
      testDuration: input.testDuration,
      package_iptv: input.packageIptv,
      package_p2p: input.packageP2p,
      notes: input.notes,
    }),
  });
}

/**
 * A validade real do teste, lida DO PAINEL — nunca calculada localmente.
 *
 * Lição medida no appkplay (confere-teste-4h.php, 18/08/2026): o `exp_date`
 * que às vezes vem na resposta de `/lines/test` não é confiável, e a doc
 * oficial não documenta rota de leitura da linha. O único jeito medido que
 * funciona é `GET /lines/extend-preview/{id}?exp_date=<qualquer data futura>`,
 * que devolve `currentExpDate` — a data real que o painel tem gravada. Essa
 * chamada é leitura pura, não consome crédito.
 */
export async function buscarValidadeReal(id: number): Promise<string | null> {
  const amanha = new Date(Date.now() + 86_400_000).toISOString().slice(0, 10);
  try {
    const resp = await chamar<{ currentExpDate?: string }>(
      `/lines/extend-preview/${id}?exp_date=${amanha}`,
      { method: "GET" },
    );
    return resp.currentExpDate ?? null;
  } catch (e) {
    console.error("[knewcms] falha ao ler validade real da linha", id, e);
    return null;
  }
}

// --- Ativação paga (PATCH /lines/active/{id}) -------------------------------
//
// Fase futura (checkout/webhook Woovi ainda não implementados neste
// projeto). Deixado pronto porque o contrato já foi CONFERIDO em 14/09/2026
// direto na função real que ativa clientes Essencial em produção no
// appwplay (`wtv_api_ativar_linha`, mesma rota `/lines/active/{id}`, sem v2).
//
// ⚠️ Corrigido nessa data: a versão anterior daqui tinha sido escrita com
// campos da rota ERRADA (`/lines/v2/active/{id}` — planId/addons/access/
// access_nexus/custom_package/telegram, que só existe pra Krator/Nexus) e
// estava faltando username+password, que a rota real EXIGE. Nunca tinha sido
// usado (Fase 2 não existe ainda), mas teria reproduzido o incidente real de
// 15/08 ("cliente pagou, painel recusou por pacote não informado") na
// primeira venda de verdade. Corpo agora é o exato da função real.
//
// NUNCA chamar contra a API de produção "pra testar o código". Cada
// ativação gasta crédito real da conta (regra explícita do orquestrador).
// Validar só com mock/stub da resposta.

export interface AtivarInput {
  /** Id da linha (a do teste, quando o cliente paga). */
  id: number;
  /** Usuário e senha que o teste dessa linha já tinha — a ativação reafirma, não troca. */
  username: string;
  password: string;
  credits: number;
  packageIptv: number;
  packageP2p: string;
  country: string;
}

export interface AtivarResposta {
  id?: number;
  username?: string;
  password?: string;
  package_iptv?: number;
  package_p2p?: string;
}

export async function ativarLinha(input: AtivarInput): Promise<AtivarResposta> {
  return chamar<AtivarResposta>(`/lines/active/${input.id}`, {
    method: "PATCH",
    body: JSON.stringify({
      username: input.username,
      password: input.password,
      credits: input.credits,
      country: input.country,
      package_iptv: input.packageIptv,
      package_p2p: input.packageP2p,
    }),
  });
}

/**
 * Lição #4 do wtv-painel.php: se a linha já não é mais teste, o painel
 * recusa ativar com 403 e a mensagem contém "teste" — a saída certa é
 * ESTENDER (renovar), não tratar como falha. `chamar()` já embute status e
 * corpo na mensagem do erro lançado, então o chamador detecta assim:
 *
 *   catch (e) {
 *     const msg = e instanceof Error ? e.message : String(e);
 *     if (/HTTP 403/.test(msg) && /teste/i.test(msg)) { await renovarLinha(...) }
 *   }
 *
 * Usado pelo webhook de pagamento (app/api/webhook/woovi/route.ts).
 */

/**
 * Renovação (PATCH /lines/extend/{id}) — conferido em 16/09/2026 direto na
 * função real `wtv_api_renovar_linha` do appwplay. Rota ANTIGA (sem v2),
 * igual `/lines/active`: corpo simples, só `credits`. Diferente de
 * `/lines/test`, a resposta desta rota é confiável o bastante pra função
 * real confiar direto no `exp_date` dela (sem preview separado) — mesmo
 * padrão replicado aqui.
 */
export interface RenovarResposta {
  exp_date?: string;
}

export async function renovarLinha(id: number, credits: number): Promise<RenovarResposta> {
  return chamar<RenovarResposta>(`/lines/extend/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ credits }),
  });
}

/**
 * Lição #3 do wtv-painel.php: nunca confiar em HTTP 2xx sem checar de novo
 * depois. Toda escrita (ativar/renovar) precisa ser lida de volta — o painel
 * pode demorar a provisionar campos dependentes. Se não bateu, GRITAR (nunca
 * falhar em silêncio: é o mesmo padrão do incidente de 15/08, cliente pagou
 * e ficou sem acesso sem ninguém saber).
 *
 * Ainda não usado por nenhuma rota nesta fase (não há checkout/webhook
 * implementados ainda) — deixado pronto para quando a Fase 2 (Woovi)
 * existir, para não redescobrir esse bug com dinheiro de cliente real.
 */
export async function conferirOuAlertar(
  linhaId: number,
  esperado: { planId: number; packageIptv: number; packageP2p: string },
): Promise<{ bateu: boolean; linha?: Record<string, unknown> }> {
  const resp = await buscarLinhas(1);
  const linha = (resp.items as Array<Record<string, unknown>>).find(
    (l) => l.id === linhaId,
  );
  const bateu =
    !!linha &&
    linha.planId === esperado.planId &&
    linha.package_iptv === esperado.packageIptv &&
    linha.package_p2p === esperado.packageP2p;
  if (!bateu) {
    console.error(
      `[knewcms] ALERTA: ativação da linha ${linhaId} não bateu com o esperado. ` +
        `O cliente pode ter pago sem receber o serviço. Esperado=${JSON.stringify(esperado)} recebido=${JSON.stringify(linha)}`,
    );
  }
  return { bateu, linha };
}

// Lê a linha de volta (usado por conferirOuAlertar acima).
export async function buscarLinhas(pagina = 1): Promise<{ items: unknown[]; pagesQuantity?: number }> {
  return chamar<{ items: unknown[]; pagesQuantity?: number }>(`/lines?page=${pagina}`, {
    method: "GET",
  });
}

// --- Importar lista por MAC/código (POST /lines/active/app[/xstream]) ------
//
// Espelha `wtv_ep_ativar_app`, conferida por leitura direta do código real
// em 17/09/2026 (appwplay.com.br/wp-content/plugins/wtv-painel/wtv-painel.php,
// linha ~3140). Ação do próprio cliente sobre uma linha que ele já tem
// (teste ou paga) — não cria nem estende assinatura, só associa um
// dispositivo/app à lista existente. Mesma família de ação que instalar o
// app e logar com usuário/senha: não é ativação/renovação de plano, então
// não gasta o crédito real da conta (essa é a leitura, não confirmada
// chamando em produção "pra testar" — nunca fazer isso).

export interface AtivarAppInput {
  /** id_user: o id da linha do cliente (mesmo id do teste/assinatura). */
  id: number;
  /** Precisa bater exatamente com um item de APPS_ATIVACAO_MAC (content/apps.ts). */
  nameApp: string;
  mac: string;
  xstream: boolean;
  namePlaylist: string;
}

export interface AtivarAppResposta {
  success?: boolean;
  message?: string;
  error?: string;
}

export async function ativarAppPorMac(input: AtivarAppInput): Promise<AtivarAppResposta> {
  const endpoint = input.xstream ? "/lines/active/app/xstream" : "/lines/active/app";
  return chamar<AtivarAppResposta>(endpoint, {
    method: "POST",
    body: JSON.stringify({
      nameApp: input.nameApp,
      mac: input.mac,
      namePlaylist: input.namePlaylist,
      id_user: input.id,
    }),
  });
}

// Não incluído de propósito: endpoint de catálogo de pacotes/bouquets
// (/iptv/{id} ou equivalente) — PENDENTE de confirmação, não existe na spec
// viva de hoje (arquitetura.md seção 1 e seção 10, item 2).
