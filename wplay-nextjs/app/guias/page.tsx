import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Tv, Cable, MonitorSmartphone, Monitor, Smartphone, KeyRound } from "lucide-react";
import JsonLd from "@/components/ui/JsonLd";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "Guias de Instalação do WPlay por Aparelho",
  description:
    "Guias de instalação do WPlay por aparelho: Smart TV Samsung e LG, Fire Stick, TV Box, PC e celular Android. Cada guia com o que dá errado e como resolver.",
  alternates: { canonical: "/guias" },
};

const GUIAS = [
  {
    href: "/guias/samsung",
    icon: Tv,
    nome: "Smart TV Samsung",
    texto: "Tizen não aceita app de fora da loja. Veja os três caminhos reais, e por que o modo desenvolvedor não serve.",
  },
  {
    href: "/guias/lg",
    icon: Tv,
    nome: "Smart TV LG",
    texto: "webOS deixa instalar pelo Modo Desenvolvedor, mas apaga o app depois. Veja o que funciona sem manutenção.",
  },
  {
    href: "/guias/fire-stick",
    icon: Cable,
    nome: "IPTV no Fire Stick",
    texto: "Sideload pelo Downloader, com a lista de modelos Vega OS que ainda não instalam e a saída pro bug do Fire OS.",
  },
  {
    href: "/guias/tv-box-android-tv",
    icon: MonitorSmartphone,
    nome: "IPTV em TV Box e Android TV",
    texto: "Ficha técnica real do app (Android 5.0+, 32 e 64 bits) e a diferença entre Android TV certificado e TV Box genérico.",
  },
  {
    href: "/guias/pc-windows",
    icon: Monitor,
    nome: "IPTV no PC",
    texto: "Instalador nativo para Windows e macOS ou Web Player, sem emulador, com o passo a passo do aviso do Windows.",
  },
  {
    href: "/guias/celular-android",
    icon: Smartphone,
    nome: "IPTV no celular Android",
    texto: "Três passos pelo APK, com o que dá errado em cada um e onde a Xiaomi e a Samsung escondem a permissão.",
  },
  {
    href: "/guias/downloader",
    icon: KeyRound,
    nome: "Como usar o Downloader",
    texto: "Passo a passo com imagens do app que instala o WPlay em TV Box, Fire Stick e Android TV.",
  },
];

export default function GuiasPage() {
  return (
    <>
      <Breadcrumbs trilha={[{ nome: "Guias" }]} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Guias de instalação do WPlay",
          description: "Tutoriais de instalação do WPlay por aparelho.",
          url: "https://iptu2022br.com.br/guias",
        }}
      />

      <section className="container-x py-14 sm:py-18">
        <div className="flex items-center gap-5">
          <Image src="/brand/icon-128.png" alt="Ícone do app WPlay" width={64} height={64} className="rounded-2xl" priority />
          <div>
            <h1 className="font-heading text-4xl font-extrabold tracking-tight text-text-primary sm:text-5xl">
              Guias de instalação por aparelho
            </h1>
          </div>
        </div>
        <p className="mt-5 max-w-2xl text-text-secondary">
          Cada aparelho instala o WPlay de um jeito diferente. Escolha o seu abaixo para o passo a passo
          completo, incluindo o que fazer quando algo não funciona de primeira.
        </p>
        <p className="mt-3 max-w-2xl text-text-secondary">
          Smart TV, TV Box e celular seguem caminhos distintos porque cada sistema trata instalação fora de
          loja de um jeito próprio. Misturar o passo a passo de um aparelho no outro é a causa mais comum de
          instalação que não termina, por isso cada guia aqui é específico, não um texto genérico repetido.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/teste-gratis" className="btn btn-primary">Pedir teste grátis de 4 horas</Link>
          <Link href="/apps" className="btn btn-outline">Ver todos os apps</Link>
        </div>
      </section>

      <section className="border-y border-border-subtle bg-bg-surface py-14 sm:py-18">
        <div className="container-x">
          <h2 className="font-heading text-xl font-bold text-text-primary">Não sabe qual é o seu?</h2>
          <p className="mt-2 max-w-2xl text-sm text-text-secondary">
            Se a tela tem controle remoto e menu próprio da marca (Samsung, LG), é Smart TV. Se você ligou uma
            caixinha separada na entrada HDMI, é TV Box ou Fire Stick (Fire Stick é a versão da Amazon). Se tem
            teclado e mouse, é PC. Nos outros casos, é celular.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {GUIAS.map(({ href, icon: Icon, nome, texto }) => (
              <Link key={href} href={href} className="card group block border border-border-strong p-6 transition-colors hover:border-primary-bright">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-bright/10 text-primary-bright">
                  <Icon size={22} aria-hidden />
                </span>
                <h2 className="mt-4 font-heading text-lg font-bold text-text-primary group-hover:text-primary-bright">
                  {nome}
                </h2>
                <p className="mt-2 text-sm text-text-secondary">{texto}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-14 sm:py-18 text-center">
        <h2 className="font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
          Prefere ver todos os apps disponíveis primeiro?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-text-secondary">
          Além do WPlay, outros 14 apps aceitam o mesmo login da sua assinatura Essencial.
        </p>
        <Link href="/apps" className="btn btn-outline mt-6 inline-block">
          Ver todos os apps
        </Link>
      </section>
    </>
  );
}
