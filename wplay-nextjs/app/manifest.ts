import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "WPlay",
    short_name: "WPlay",
    description: "Teste grátis de IPTV e P2P por 4 horas, sem cartão de crédito.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0b08",
    theme_color: "#0a0b08",
    lang: "pt-BR",
    icons: [
      { src: "/brand/icon-128.png", sizes: "128x128", type: "image/png" },
      { src: "/brand/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
