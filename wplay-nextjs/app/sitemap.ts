import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://iptu2022br.com.br";

export default function sitemap(): MetadataRoute.Sitemap {
  const rotas = [
    "",
    "/wplay-p2p",
    "/apps",
    "/guias",
    "/guias/samsung",
    "/guias/lg",
    "/guias/fire-stick",
    "/guias/tv-box-android-tv",
    "/guias/pc-windows",
    "/guias/celular-android",
    "/guias/downloader",
    "/minha-conta",
    "/wplay-recarga",
    "/teste-gratis",
    "/precos",
    "/wplay-nao-funciona",
    "/erro-ao-instalar",
    "/termos",
    "/privacidade",
  ];
  return rotas.map((rota) => ({
    url: `${SITE_URL}${rota}`,
    lastModified: new Date(),
  }));
}
