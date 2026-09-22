"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";

const NUMERO = (process.env.NEXT_PUBLIC_WHATSAPP || "5562993901860").replace(/\D/g, "");

// Mesmo padrão real do appwplay/SmartOne: mensagem já vem com a página de
// origem, pra quem responde no WhatsApp não perguntar "de onde você é" e já
// saber o contexto (apps, preço, problema técnico etc.).
function nomeDaPagina(path: string): string {
  const mapa: Record<string, string> = {
    "/": "Início",
    "/apps": "Apps",
    "/wplay-p2p": "WPlay P2P",
    "/guias": "Guias",
    "/guias/samsung": "Guia Samsung",
    "/guias/lg": "Guia LG",
    "/guias/fire-stick": "Guia Fire Stick",
    "/guias/tv-box-android-tv": "Guia TV Box",
    "/guias/pc-windows": "Guia PC",
    "/guias/celular-android": "Guia Celular",
    "/guias/downloader": "Tutorial Downloader",
    "/teste-gratis": "Teste Grátis",
    "/precos": "Preço",
    "/wplay-nao-funciona": "WPlay não funciona",
    "/minha-conta": "Minha Conta",
    "/checkout": "Checkout",
  };
  if (mapa[path]) return mapa[path];
  const seg = path.replace(/^\//, "").split("/")[0];
  return seg ? seg.charAt(0).toUpperCase() + seg.slice(1) : "Site";
}

export default function WhatsAppFloat() {
  const [href, setHref] = useState(
    `https://wa.me/${NUMERO}?text=${encodeURIComponent("Olá! Vim do site do WPlay e preciso de ajuda.")}`,
  );

  useEffect(() => {
    const pagina = nomeDaPagina(window.location.pathname);
    const origem = document.referrer || "Acesso direto";
    const msg =
      `Olá! Vim do site do WPlay e preciso de ajuda.\n` +
      `Página: ${pagina} (${window.location.href})\n` +
      `Origem: ${origem}`;
    setHref(`https://wa.me/${NUMERO}?text=${encodeURIComponent(msg)}`);
  }, []);

  function rastrear() {
    try {
      const flora = (window as unknown as { flora?: (t: string, d?: Record<string, unknown>) => void }).flora;
      flora?.("button_click", { botao: "whatsapp_flutuante", pagina: window.location.pathname });
    } catch {
      /* telemetria não pode quebrar o clique real do cliente */
    }
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      onClick={rastrear}
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-cta-bg text-cta-text shadow-cta ease-std transition-colors duration-200 hover:bg-primary-bright"
    >
      <MessageCircle size={26} aria-hidden />
    </a>
  );
}
