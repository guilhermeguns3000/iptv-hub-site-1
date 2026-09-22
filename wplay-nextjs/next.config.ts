import type { NextConfig } from "next";

// Content-Security-Policy. 'unsafe-inline' é necessário para os scripts/estilos
// inline do Next (hidratação RSC) e do Tailwind. Sem fontes externas
// (next/font auto-hospeda o Bricolage Grotesque + Geist).
// Web Player: segmentos HLS (connect-src/media-src) vêm da base de streaming,
// e logos de canal (img-src) vêm de hosts variados do próprio painel.
const STREAM = (process.env.STREAM_BASE || "").replace(/\/$/, "");
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' blob:",
  "worker-src 'self' blob:",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https:",
  "font-src 'self'",
  `connect-src 'self'${STREAM ? " " + STREAM : ""}`,
  `media-src 'self' blob:${STREAM ? " " + STREAM : ""}`,
  "frame-src 'none'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

// Só no Web Player: os segmentos HLS vêm de servidores de borda com IP e
// token dinâmicos (ex.: https://89.x.x.x:8089/play/hls/...), impossível listar.
// Abre connect/media para https: nesse caminho, e só nele.
const cspPlayer = csp
  .replace(/connect-src [^;]+/, "connect-src 'self' https:")
  .replace(/media-src [^;]+/, "media-src 'self' blob: https:");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

// Painel Flora (analytics do portfólio). Tracker e coletor servidos como
// FIRST-PARTY via rewrite (mesmo domínio do WPlay) — assim o CSP 'self' já
// libera e bloqueador de anúncio/privacidade não derruba o rastreamento.
// Mesmo padrão do SmartOne (next.config.ts de lá). Sem isso, o WPlay não
// tinha NENHUM dado de visita/pageview/tempo em página, nem ligação entre
// visitante e venda — lacuna real, achada em 16/09/2026.
const FLORA = "https://flora-dashboard-dun.vercel.app";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      { source: "/minha-conta/player", headers: securityHeaders.map((h) => (h.key === "Content-Security-Policy" ? { key: h.key, value: cspPlayer } : h)) },
    ];
  },
  async rewrites() {
    return [
      { source: "/sm.js", destination: `${FLORA}/tracker.js` },
      { source: "/sm-e", destination: `${FLORA}/api/ingest` },
    ];
  },
  async redirects() {
    return [
      // /guias/samsung-lg virou duas páginas: Tizen e webOS são sistemas
      // diferentes, com regras de instalação diferentes (a LG tem Modo
      // Desenvolvedor, a Samsung não). 301 para a de maior busca, e a página
      // da LG fica linkada de lá.
      { source: "/guias/samsung-lg", destination: "/guias/samsung", permanent: true },
      // "wplay apk" é termo em que appwplay.com.br já é #1 (mesmo dono):
      // a página deixa de disputar download e vira a página de identidade
      // do app, no termo "wplay p2p", onde o domínio irmão não aparece.
      { source: "/wplay-apk", destination: "/wplay-p2p", permanent: true },
      // Tutorial do Downloader pertence ao cluster de instalação: a URL passa
      // a contar a mesma história que o breadcrumb e os links.
      { source: "/como-usar-o-downloader", destination: "/guias/downloader", permanent: true },

      // Site antigo (hub estático "IPTV HUB", 19 URLs do sitemap/canonical
      // de 2026). Cada uma vai para o conteúdo novo mais próximo; o que não
      // tem equivalente vai para a home. Caminhos do WordPress ainda mais
      // antigo (IPTU/INSS) ficam em 404 de propósito: assunto sem relação.
      { source: "/wplay-apk.html", destination: "/wplay-p2p", permanent: true },
      { source: "/apps/iptv-smarters-pro.html", destination: "/apps", permanent: true },
      { source: "/guias/como-instalar-iptv.html", destination: "/guias", permanent: true },
      { source: "/blog/configurar-iptv-samsung.html", destination: "/guias/samsung", permanent: true },
      { source: "/blog/melhores-tv-box-2026.html", destination: "/guias/tv-box-android-tv", permanent: true },
      { source: "/blog/velocidade-internet-iptv.html", destination: "/wplay-nao-funciona", permanent: true },
      { source: "/blog/melhores-listas-2026.html", destination: "/precos", permanent: true },
      { source: "/blog.html", destination: "/guias", permanent: true },
      { source: "/comparativo.html", destination: "/apps", permanent: true },
      { source: "/contato.html", destination: "/wplay-nao-funciona", permanent: true },
      { source: "/legal/contato.html", destination: "/wplay-nao-funciona", permanent: true },
      { source: "/quem-somos.html", destination: "/", permanent: true },
      { source: "/privacidade.html", destination: "/privacidade", permanent: true },
      { source: "/legal/politica-de-privacidade.html", destination: "/privacidade", permanent: true },
      { source: "/cookies.html", destination: "/privacidade", permanent: true },
      { source: "/aviso-legal.html", destination: "/termos", permanent: true },
      { source: "/termos.html", destination: "/termos", permanent: true },
      { source: "/legal/termos-de-uso.html", destination: "/termos", permanent: true },
      { source: "/index.html", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
