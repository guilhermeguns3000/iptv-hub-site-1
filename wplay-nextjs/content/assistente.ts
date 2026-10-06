import { APPS_PRINCIPAIS, INSTALADORES_PC, type CodigoInstalacao } from "@/content/apps";

/**
 * Assistente de instalação da área do cliente. Mesmo mecanismo real do
 * appwplay (wizard de 4 passos): aparelho → app compatível → instalar/ativar
 * → resumo. Plataforma de cada app é DECLARADA (o original inferia por flag
 * e mostrava app de Android na Samsung; defeito documentado, não copiado).
 */

export type Plataforma = "tv" | "android" | "windows" | "mac" | "ios" | "dns";
export type AparelhoId =
  | "samsung" | "lg" | "roku" | "android_tv" | "tv_box" | "fire_stick"
  | "celular_android" | "iphone" | "windows" | "mac" | "tv_antiga";

export interface Aparelho {
  id: AparelhoId;
  nome: string;
  plataforma: Plataforma;
  /** Loja onde o cliente busca o app pelo nome (só TV). */
  loja?: string;
}

export const APARELHOS: Aparelho[] = [
  { id: "samsung", nome: "Smart TV Samsung", plataforma: "tv", loja: "Samsung Apps" },
  { id: "lg", nome: "Smart TV LG", plataforma: "tv", loja: "LG Content Store" },
  { id: "roku", nome: "Roku", plataforma: "tv", loja: "Roku Channel Store" },
  { id: "android_tv", nome: "Android TV", plataforma: "android" },
  { id: "tv_box", nome: "TV Box", plataforma: "android" },
  { id: "fire_stick", nome: "Fire TV Stick", plataforma: "android" },
  { id: "celular_android", nome: "Celular Android", plataforma: "android" },
  { id: "iphone", nome: "iPhone / iPad", plataforma: "ios" },
  { id: "windows", nome: "Computador (Windows)", plataforma: "windows" },
  { id: "mac", nome: "Mac", plataforma: "mac" },
  { id: "tv_antiga", nome: "TV antiga (sem loja)", plataforma: "dns" },
];

/** Em quais aparelhos de TV (loja própria) cada app com importação por MAC existe. */
export type LojaTv = "samsung" | "lg" | "roku";

export interface AppAssistente {
  nome: string;
  /** Valor exato do endpoint de importação (APPS_ATIVACAO_MAC). Sem = login manual ou download. */
  nameApp?: string;
  xstream?: boolean;
  icone?: string;
  descricao: string;
  /** Plataformas em que este app aparece. */
  plataformas: Plataforma[];
  /** Para plataforma "tv": em quais lojas. */
  lojas?: LojaTv[];
  /** Download direto (Android/Windows/macOS) e códigos de instalação. */
  apk?: string;
  codigos?: CodigoInstalacao[];
  /** Link de loja oficial (App Store etc.). */
  loja?: string;
  /** Serviço: IPTV (canais/filmes) ou P2P (esportes ao vivo, só Android). */
  servico: "iptv" | "p2p";
  recomendado?: boolean;
}

const icone = (nome: string) => APPS_PRINCIPAIS.find((a) => a.nome === nome)?.icone;
const proprio = (nome: string) => APPS_PRINCIPAIS.find((a) => a.nome === nome);

/**
 * Lojas de TV por app: união do que a operação usa no dia a dia (assistente
 * real do appwplay) com o que o site oficial de cada app declara (conferido
 * em 19/09/2026). Nunca inferido.
 */
export const APPS_ASSISTENTE: AppAssistente[] = [
  // ── Importação por MAC (TV e Android) ─────────────────────────────
  { nome: "WTV Player / Wapp", icone: icone("WTV PRO"), descricao: "Recomendado na loja da TV: Samsung, LG e Roku.", plataformas: ["tv"], lojas: ["samsung", "lg", "roku"], servico: "iptv", recomendado: true },
  { nome: "XCloud", icone: icone("XCloud"), descricao: "Samsung e LG pela loja; Mac e iPhone pela App Store.", plataformas: ["tv", "mac", "ios"], lojas: ["samsung", "lg"], servico: "iptv", recomendado: true, loja: "https://apps.apple.com/us/app/xcloud-mobile/id6471106231" },
  { nome: "Kplay", descricao: "Android, TV Box e Fire Stick.", plataformas: ["android"], servico: "iptv" },
  { nome: "Brasil IPTV", nameApp: "BrasilIPTV", icone: "icone-brasil-iptv.webp", descricao: "Samsung, LG e Roku.", plataformas: ["tv"], lojas: ["samsung", "lg", "roku"], servico: "iptv" },
  { nome: "Easy Player", icone: icone("Easy Player"), descricao: "Android.", plataformas: ["android"], servico: "iptv", apk: proprio("Easy Player")?.apk, codigos: proprio("Easy Player")?.codigos },
  { nome: "IPTV+", nameApp: "IPTVPlus", icone: "icone-iptv-plus.webp", descricao: "Android.", plataformas: ["android"], servico: "iptv" },
  { nome: "Ott Player", nameApp: "OttPlayer", descricao: "Samsung, LG, Roku e Android.", plataformas: ["tv", "android"], lojas: ["samsung", "lg", "roku"], servico: "iptv" },
  { nome: "IPTV Next Player", descricao: "Android.", plataformas: ["android"], servico: "iptv" },
  { nome: "IPTV Player IO", nameApp: "IPTVPlayerio", icone: "icone-iptv-player-io.webp", descricao: "Samsung, LG, Roku, Android, iPhone, Windows e Mac.", plataformas: ["tv", "android", "ios", "windows", "mac"], lojas: ["samsung", "lg", "roku"], servico: "iptv" },
  { nome: "IPTV Pro Player", nameApp: "IPTVProPlayer", icone: "icone-iptv-pro-player.webp", descricao: "Samsung, LG, Roku e Android.", plataformas: ["tv", "android"], lojas: ["samsung", "lg", "roku"], servico: "iptv" },
  { nome: "IPTV Star Player", nameApp: "IPTVStarPlayer", icone: "icone-iptv-star-player.webp", descricao: "Samsung, LG, Roku e Android.", plataformas: ["tv", "android"], lojas: ["samsung", "lg", "roku"], servico: "iptv" },
  { nome: "I Player", nameApp: "IPlayer", descricao: "Samsung, LG, Roku e Android.", plataformas: ["tv", "android"], lojas: ["samsung", "lg", "roku"], servico: "iptv" },
  { nome: "TV Vision", descricao: "Android.", plataformas: ["android"], servico: "iptv" },
  { nome: "TiviPlayer", nameApp: "TiviPlayerIPTV", icone: "icone-tiviplayer.webp", descricao: "Samsung, LG, Roku e Android.", plataformas: ["tv", "android"], lojas: ["samsung", "lg", "roku"], servico: "iptv" },
  { nome: "IPTV 4K", nameApp: "IPTV4K", icone: "icone-iptv-4k.webp", descricao: "Samsung, LG, Roku e Android.", plataformas: ["tv", "android"], lojas: ["samsung", "lg", "roku"], servico: "iptv" },

  // ── Apps próprios de download (Android) ───────────────────────────
  { nome: "WTV PRO", icone: icone("WTV PRO"), descricao: "Player simples, só canais ao vivo.", plataformas: ["android"], servico: "iptv", recomendado: true, apk: proprio("WTV PRO")?.apk, codigos: proprio("WTV PRO")?.codigos },
  { nome: "XCloud", icone: icone("XCloud"), descricao: "Abre rápido em conexão lenta. Aceita importação por MAC.", plataformas: ["android"], servico: "iptv", apk: proprio("XCloud")?.apk, codigos: proprio("XCloud")?.codigos },
  { nome: "WappIBO", icone: icone("WappIBO"), descricao: "Celular, Android TV e TV Box.", plataformas: ["android"], servico: "iptv", apk: proprio("WappIBO")?.apk, codigos: proprio("WappIBO")?.codigos },
  { nome: "XCloud Mobile", icone: icone("XCloud Mobile"), descricao: "Celular.", plataformas: ["android"], servico: "iptv", apk: proprio("XCloud Mobile")?.apk, codigos: proprio("XCloud Mobile")?.codigos },
  { nome: "Wapp Android", icone: icone("Wapp Android"), descricao: "Celular.", plataformas: ["android"], servico: "iptv", apk: proprio("Wapp Android")?.apk, codigos: proprio("Wapp Android")?.codigos },

  // ── P2P (só Android) ──────────────────────────────────────────────
  { nome: "WPlay P2P", icone: icone("WPlay"), descricao: "Oficial, versão 11.9.0d.", plataformas: ["android"], servico: "p2p", recomendado: true, apk: proprio("WPlay")?.apk, codigos: proprio("WPlay")?.codigos },
  { nome: "WPlay PRO", icone: icone("WPlay PRO"), descricao: "Build para TV Box.", plataformas: ["android"], servico: "p2p", apk: proprio("WPlay PRO")?.apk, codigos: proprio("WPlay PRO")?.codigos },

  // ── PC ────────────────────────────────────────────────────────────
  ...INSTALADORES_PC.map<AppAssistente>((i) => ({
    nome: i.nome,
    descricao: i.texto,
    plataformas: [i.sistema === "macOS" ? "mac" : "windows"],
    servico: "iptv",
    apk: i.url,
    recomendado: i.nome.startsWith("WPlay"),
  })),
];

/** TV antiga sem loja: caminho por DNS (valores reais da operação). */
export const DNS_TV_ANTIGA = {
  principal: { rotulo: "STB", ip: "104.194.10.27" },
  alternativo: { rotulo: "SmartUP", ip: "15.204.233.167" },
  passos: [
    "Pressione Menu no controle.",
    "Vá em Rede, depois Status da rede, depois Configuração de IP.",
    "Entre em Configuração de DNS e escolha Digitar manualmente.",
    "Digite o DNS acima e confirme.",
    "Desligue e ligue a TV.",
    "Abra o aplicativo.",
  ],
};

export function appsParaAparelho(id: AparelhoId): AppAssistente[] {
  const ap = APARELHOS.find((a) => a.id === id);
  if (!ap || ap.plataforma === "dns") return [];
  return APPS_ASSISTENTE.filter((app) => {
    if (!app.plataformas.includes(ap.plataforma)) return false;
    if (ap.plataforma === "tv" && app.lojas && !app.lojas.includes(id as LojaTv)) return false;
    return true;
  }).sort((a, b) => Number(!!b.recomendado) - Number(!!a.recomendado));
}
