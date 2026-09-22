export interface CodigoInstalacao {
  /** Método de instalação (o app que lê o código) — nunca "Código Downloader"
   * genérico pra qualquer um: cada código pertence a um método específico
   * (achado real: no appwplay cada app pode ter até 3 códigos, um por
   * método, e misturar os rótulos confunde o cliente sobre qual app abrir). */
  metodo: "Downloader" | "ntDown" | "M7 / Loja SSH";
  codigo: string;
}

export interface App {
  nome: string;
  icone: string;
  texto: string;
  codigos: CodigoInstalacao[];
  /** Link direto do instalador, quando existe. Sem link = só código mesmo. */
  apk?: string;
  /** Plataformas declaradas NO SITE OFICIAL do app (lidas em 19/09/2026,
   * ver `fonte`). Sem esse campo = só sabemos do Downloader/Android; nunca
   * inferir Samsung/LG/Roku sem o site do app dizer. */
  plataformas?: string[];
  fonte?: string;
}

/**
 * Base comum da família Multi-Player (multi-player.app): mesmo fabricante
 * white-label, mesmo modelo de negócio (revendedor compra crédito e converte
 * em ativação por MAC, usuário final não paga). Cada site da família declara
 * esta lista; alguns declaram mais (ver IPTV Player IO).
 */
const FAMILIA_MULTIPLAYER = ["Samsung (Tizen e modelos antigos)", "LG (webOS)", "Roku", "Android TV", "Fire Stick", "Whale OS"];

/**
 * Apps da família WPlay (mesmo backend, mesma assinatura Essencial). Ícones,
 * links de APK e códigos reais, conferidos direto na página /downloads/ do
 * appwplay.com.br em 16/09/2026 (a página dedicada a isso, "tudo atualizado
 * e testado em setembro de 2026") — nunca inventados. Krator+ e Nexus TV
 * ficam de fora de propósito: são OUTROS serviços, com plano e ativação
 * próprios, não o que o WPlay vende (ver apps-warez-nao-intercambiaveis.md).
 */
export const APPS_PRINCIPAIS: App[] = [
  {
    nome: "WPlay",
    icone: "icone-wplay-p2p.webp",
    texto: "A versão padrão, com IPTV completo e a tela P2P dedicada.",
    codigos: [
      { metodo: "Downloader", codigo: "2943496" },
      { metodo: "ntDown", codigo: "44892" },
      { metodo: "M7 / Loja SSH", codigo: "5146" },
    ],
    apk: "https://cloudap.online/WPlay%20P2P%20BinStream.apk",
  },
  {
    nome: "WPlay PRO",
    icone: "icone-wplay-p2p-pro.webp",
    texto: "Build otimizada para TV Box, com inicialização mais rápida.",
    codigos: [
      { metodo: "Downloader", codigo: "1362324" },
      { metodo: "ntDown", codigo: "21241" },
      { metodo: "M7 / Loja SSH", codigo: "9645" },
    ],
    apk: "https://cloudap.online/P2P%20PRO.apk",
  },
  {
    nome: "WTV PRO",
    icone: "icone-wtv-pro-player.webp",
    texto: "Player mais simples, sem a camada P2P, só canais ao vivo.",
    codigos: [
      { metodo: "Downloader", codigo: "1063182" },
      { metodo: "ntDown", codigo: "18899" },
    ],
    apk: "https://cloudap.online/WTV%20PRO.apk",
  },
  {
    nome: "WappIBO",
    icone: "icone-wapp-ibo.webp",
    texto: "Interface direta, boa opção em aparelhos mais antigos.",
    codigos: [
      { metodo: "Downloader", codigo: "9831919" },
      { metodo: "ntDown", codigo: "88745" },
      { metodo: "M7 / Loja SSH", codigo: "1104" },
    ],
    apk: "https://cloudap.online/Wapp%20IBO.apk",
  },
  {
    nome: "XCloud",
    icone: "icone-xcloud-tv-player.webp",
    texto: "Foco em abrir rápido em conexões mais lentas.",
    codigos: [
      { metodo: "Downloader", codigo: "4344392" },
      { metodo: "ntDown", codigo: "17695" },
      { metodo: "M7 / Loja SSH", codigo: "1594" },
    ],
    apk: "https://cloudap.online/Xcloud.apk",
  },
  {
    nome: "XCloud Mobile",
    icone: "icone-xcloud-tv.webp",
    texto: "Versão do XCloud feita para celular.",
    codigos: [{ metodo: "Downloader", codigo: "4129564" }],
    apk: "https://cloudap.online/Xcloud%20Mobile.apk",
  },
  {
    nome: "Easy Player",
    icone: "icone-easy-player.webp",
    texto: "Configuração simplificada, direto ao ponto.",
    codigos: [
      { metodo: "Downloader", codigo: "8667401" },
      { metodo: "ntDown", codigo: "41451" },
      { metodo: "M7 / Loja SSH", codigo: "0091" },
    ],
    apk: "https://cloudap.online/Easy%20Player.apk",
  },
  {
    nome: "Wapp Android",
    icone: "icone-wapp-celular.webp",
    texto: "O Wapp em versão para celular Android.",
    codigos: [{ metodo: "Downloader", codigo: "7286363" }],
    apk: "https://cloudap.online/Wapp%20Android.apk",
  },
];

/**
 * Players de terceiros, compatíveis via usuário/senha padrão (Xtream Codes).
 * Mesma lista pública do appwplay.com.br. Sem link de APK próprio confirmado
 * (não inventar) — só o código Downloader mesmo (nenhum destes tem ntDown
 * ou M7/Loja SSH na fonte real). `plataformas` só quando o site oficial do
 * app declara; sem o campo, o card mostra só o Downloader.
 */
export const PLAYERS_COMPATIVEIS: App[] = [
  {
    nome: "IPTV Player IO",
    icone: "icone-iptv-player-io.webp",
    texto: "O de maior alcance da família: roda até em Apple TV, iPhone, Windows, Mac e Hisense.",
    codigos: [{ metodo: "Downloader", codigo: "1226913" }],
    plataformas: [...FAMILIA_MULTIPLAYER, "Apple TV (tvOS)", "iPhone e iPad (iOS)", "Android (celular)", "Windows", "macOS", "Hisense VIDAA", "Titan OS"],
    fonte: "https://iptvplayer.io/",
  },
  {
    nome: "IPTV 4K",
    icone: "icone-iptv-4k.webp",
    texto: "Mesma base da família, com foco em reprodução 4K.",
    codigos: [{ metodo: "Downloader", codigo: "2855805" }],
    plataformas: FAMILIA_MULTIPLAYER,
    fonte: "https://iptv-4k.live/",
  },
  {
    nome: "IPTV Star Player",
    icone: "icone-iptv-star-player.webp",
    texto: "Leve e direto, bom em TV com pouca memória.",
    codigos: [{ metodo: "Downloader", codigo: "4689090" }],
    plataformas: FAMILIA_MULTIPLAYER,
    fonte: "https://iptv-star.live/",
  },
  {
    nome: "IPTV Pro Player",
    icone: "icone-iptv-pro-player.webp",
    texto: "Interface mais completa, com guia de programação.",
    codigos: [{ metodo: "Downloader", codigo: "1876073" }],
    plataformas: FAMILIA_MULTIPLAYER,
    fonte: "https://iptvproplayer.live/",
  },
  {
    nome: "TiviPlayer",
    icone: "icone-tiviplayer.webp",
    texto: "Player leve para Smart TV e Android.",
    codigos: [{ metodo: "Downloader", codigo: "6573469" }],
    plataformas: FAMILIA_MULTIPLAYER,
    fonte: "https://tiviplayer.io/",
  },
  // Abaixo: plataformas além do Android NÃO confirmadas no site próprio do
  // app (IPTV Plus consta na lista da multi-player.app, mas não conferi o site
  // dele). Sem `plataformas`, o card mostra só o que sabemos: Downloader.
  { nome: "Brasil IPTV", icone: "icone-brasil-iptv.webp", texto: "Player com foco em conteúdo brasileiro.", codigos: [{ metodo: "Downloader", codigo: "7105754" }] },
  { nome: "IPTV Plus", icone: "icone-iptv-plus.webp", texto: "Player para Android TV e TV Box.", codigos: [{ metodo: "Downloader", codigo: "1926372" }] },
];

/** Recorte pra mostrar na home — só os apps da própria família (não os players de terceiro). */
export const APPS_HOME_SHOWCASE: App[] = APPS_PRINCIPAIS.slice(0, 6);

/**
 * Instaladores nativos de PC (sem Downloader, sem emulador) — conferidos na
 * mesma página /downloads/ do appwplay em 16/09/2026. Estrutura separada
 * porque não tem ícone próprio baixado ainda (usa ícone de sistema genérico
 * na página, não imagem real do app).
 */
export interface InstaladorPc {
  nome: string;
  sistema: "Windows" | "macOS";
  texto: string;
  url: string;
}

/**
 * Ativação por MAC/código na TV (Samsung, LG, Roku e qualquer app com a
 * função de "importar lista"): whitelist EXATA aceita pelo endpoint real do
 * painel (`/lines/active/app` ou `/lines/active/app/xstream`), conferida por
 * leitura direta do código-fonte real (`wtv_ep_ativar_app`, appwplay.com.br,
 * 17/09/2026) — nomes byte-a-byte, incluindo capitalização ("IPTV Player io"
 * minúsculo, "IPTV+" e não "IPTV Plus"), porque a validação do painel é
 * comparação exata de string. `xstream: true` = grupo "Recomendados" no
 * original (endpoint `/xstream`); os demais usam o endpoint padrão.
 */
export interface AppAtivacaoMac {
  /** Valor exato exigido pela API — nunca aproximar. */
  nameApp: string;
  /** Nome mostrado pro cliente (pode ser mais amigável que nameApp). */
  label: string;
  xstream: boolean;
}

export const APPS_ATIVACAO_MAC: AppAtivacaoMac[] = [
  { nameApp: "WTV Player", label: "WTV Player / Wapp", xstream: true },
  { nameApp: "XCloud", label: "XCloud TV", xstream: true },
  { nameApp: "Kplay", label: "Kplay", xstream: true },
  { nameApp: "Wapp", label: "Wapp (separado)", xstream: true },
  { nameApp: "Brasil IPTV", label: "Brasil IPTV", xstream: false },
  { nameApp: "Easy Player", label: "Easy Player", xstream: false },
  { nameApp: "IPTV+", label: "IPTV+", xstream: false },
  { nameApp: "IPTV Next Player", label: "IPTV Next Player", xstream: false },
  { nameApp: "IPTV Player io", label: "IPTV Player IO", xstream: false },
  { nameApp: "IPTV Pro Player", label: "IPTV Pro Player", xstream: false },
  { nameApp: "IPTV Star Player", label: "IPTV Star Player", xstream: false },
  { nameApp: "I Player", label: "I Player", xstream: false },
  { nameApp: "Ott Player", label: "Ott Player", xstream: false },
  { nameApp: "TV Vision", label: "TV Vision", xstream: false },
  { nameApp: "TiviPlayer IPTV", label: "TiviPlayer IPTV", xstream: false },
  { nameApp: "IPTV 4K", label: "IPTV 4K", xstream: false },
];

export const INSTALADORES_PC: InstaladorPc[] = [
  {
    nome: "WPlay para Windows",
    sistema: "Windows",
    texto: "Instalador principal para computador, sem emulador.",
    url: "https://cloudap.online/Wplay%20Windows%201.exe",
  },
  {
    nome: "Wapp para Windows",
    sistema: "Windows",
    texto: "Alternativa caso o instalador do WPlay não abra na sua máquina.",
    url: "https://cloudap.online/Wapp%20Windows%202.exe",
  },
  {
    nome: "WPlay para macOS",
    sistema: "macOS",
    texto: "Baixe, arraste para Aplicativos e faça login.",
    url: "https://cloudap.online/IPT%20MacOS.dmg",
  },
];
