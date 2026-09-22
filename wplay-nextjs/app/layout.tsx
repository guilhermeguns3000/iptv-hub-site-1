import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Bricolage_Grotesque, Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://iptu2022br.com.br";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0a0b08",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  manifest: "/manifest.webmanifest",
  title: {
    default: "WPlay: IPTV e P2P num App Só, com Teste Grátis de 4h",
    template: "%s | WPlay",
  },
  description:
    "Teste o WPlay grátis por 4 horas antes de assinar. IPTV completo + 1 tela P2P num plano só, sem cartão de crédito e sem compromisso. Veja como funciona.",
  keywords: ["wplay", "wplay p2p", "wplay teste grátis", "wplay iptv", "wplay login"],
  alternates: { canonical: "/" },
  openGraph: {
    title: "WPlay: Teste Grátis de IPTV + P2P Sem Cartão",
    description: "IPTV completo + 1 tela P2P num plano só. Teste grátis de 4 horas, sem cartão de crédito.",
    type: "website",
    locale: "pt_BR",
    siteName: "WPlay",
    url: SITE_URL,
    images: [{ url: `${SITE_URL}/brand/og.png`, width: 1200, height: 630, alt: "WPlay: teste grátis de IPTV e P2P por 4 horas" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "WPlay: Teste Grátis de IPTV + P2P",
    description: "Teste o WPlay grátis por 4 horas antes de assinar. Sem cartão de crédito.",
    images: [`${SITE_URL}/brand/og.png`],
  },
};

const siteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "WPlay",
  url: SITE_URL,
  description: "Teste grátis e assinatura do WPlay, IPTV e P2P num plano só.",
  inLanguage: "pt-BR",
};

// Fica só aqui (nunca duplicado em página nenhuma) — página que precisar de
// Organization própria referencia esta, não cria outra.
const orgLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "WPlay",
  url: SITE_URL,
  logo: `${SITE_URL}/brand/logo-full.png`,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${bricolage.variable} ${geist.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteLd).replace(/</g, "\u003c") }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd).replace(/</g, "\u003c") }} />
        <a href="#conteudo" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-cta-text">
          Pular para o conteúdo
        </a>
        <Header />
        <main id="conteudo">{children}</main>
        <WhatsAppFloat />
        <Footer />
        {/* Flora: visita, pageview e tempo de página. Site WPlay no Flora. */}
        <Script src="/sm.js" data-site="7866967c-e92e-4ad0-b594-1ef73224e401" data-endpoint="/sm-e" strategy="afterInteractive" />
      </body>
    </html>
  );
}
