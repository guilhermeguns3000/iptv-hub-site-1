import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Download } from "lucide-react";
import JsonLd from "@/components/ui/JsonLd";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import AtivacaoInclusa from "@/components/ui/AtivacaoInclusa";
import { APPS_PRINCIPAIS, PLAYERS_COMPATIVEIS, type App } from "@/content/apps";

export const metadata: Metadata = {
  title: "Apps do WPlay: Todos os Players Compatíveis",
  description:
    "WPlay, WPlay PRO e outros apps compatíveis com a assinatura Essencial. Baixe o APK ou use o código Downloader. Mesmo usuário e senha, sem cadastro novo.",
  alternates: { canonical: "/apps" },
};

function AppCard({ app }: { app: App }) {
  return (
    <div className="card flex flex-col gap-3 border border-border-subtle p-5">
      <Image
        src={`/brand/apps/${app.icone}`}
        alt={`Ícone do app ${app.nome}`}
        width={112}
        height={112}
        className="h-24 w-24 rounded-2xl object-cover"
      />
      <h3 className="font-heading text-base font-semibold text-text-primary">{app.nome}</h3>
      <p className="text-sm leading-relaxed text-text-secondary">{app.texto}</p>

      <div className="mt-auto space-y-3 pt-2">
        {app.apk && (
          <a
            href={app.apk}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="btn btn-primary flex w-full items-center justify-center gap-2 py-2.5 text-sm"
          >
            <Download size={16} aria-hidden />
            Baixar APK
          </a>
        )}
        <div className="space-y-2">
          {app.codigos.map((c) => (
            <div key={c.metodo} className="flex items-center justify-between gap-2 rounded-md bg-bg-base px-2.5 py-1.5">
              <span className="text-xs text-text-tertiary">{c.metodo}</span>
              <span className="font-mono text-xs font-semibold text-primary-bright">{c.codigo}</span>
            </div>
          ))}
        </div>
        {app.plataformas && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-text-tertiary">
              Onde roda
              {app.fonte && (
                <>
                  {" "}
                  <a href={app.fonte} target="_blank" rel="noopener noreferrer nofollow" className="font-normal normal-case tracking-normal underline underline-offset-2">
                    (site oficial)
                  </a>
                </>
              )}
            </p>
            <ul className="mt-1.5 flex flex-wrap gap-1.5">
              {app.plataformas.map((p) => (
                <li key={p} className="rounded-sm border border-border-subtle bg-bg-base px-2 py-0.5 text-xs text-text-secondary">
                  {p}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AppsPage() {
  return (
    <>
      <Breadcrumbs trilha={[{ nome: "Apps" }]} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Apps do WPlay",
          description: "Lista de apps compatíveis com a assinatura Essencial do WPlay, com APK e código Downloader de cada um.",
          url: "https://iptu2022br.com.br/apps",
        }}
      />

      <section className="container-x py-14 sm:py-18">
        <h1 className="font-heading text-4xl font-extrabold tracking-tight text-text-primary sm:text-5xl">
          Os apps do WPlay
        </h1>
        <p className="mt-5 max-w-2xl text-text-secondary">
          Um usuário e senha, vários apps possíveis. Se um não rodar bem no seu aparelho, qualquer outro desta
          página aceita o mesmo login, sem gerar teste novo.
        </p>

        <div className="card mt-8 border border-border-strong p-5">
          <p className="font-semibold text-text-primary">Três formas de instalar, conforme o aparelho</p>
          <div className="mt-3 grid gap-4 sm:grid-cols-3">
            <p className="text-sm text-text-secondary">
              <strong className="text-text-primary">Celular, PC ou TV com navegador:</strong> toque em{" "}
              <strong>Baixar APK</strong> no card do app, ou use o Web Player direto no navegador.
            </p>
            <p className="text-sm text-text-secondary">
              <strong className="text-text-primary">Fire TV, Android TV ou TV Box:</strong> instale um app de
              código (Downloader, ntDown ou M7/Loja SSH) e digite o código do app escolhido. Cada código é de
              um app diferente, não misture.
            </p>
            <p className="text-sm text-text-secondary">
              <strong className="text-text-primary">Samsung, LG ou Roku:</strong> essas TVs usam loja própria
              (Tizen, webOS, Roku Channel Store), sem Downloader. Busque o nome do app na loja da sua TV,
              instale e abra: ele mostra um código ou MAC na tela. Cole esse código em{" "}
              <Link href="/minha-conta" className="text-primary-bright underline underline-offset-2">
                Minha conta
              </Link>{" "}
              e a lista entra sozinha, sem digitar usuário e senha. Roteiro completo em{" "}
              <Link href="/guias/samsung" className="text-primary-bright underline underline-offset-2">
                Samsung
              </Link>{" "}
              ou{" "}
              <Link href="/guias/lg" className="text-primary-bright underline underline-offset-2">
                LG
              </Link>
              .
            </p>
          </div>
          <Link href="/teste-gratis" className="btn btn-primary mt-5 inline-flex shrink-0">
            Pedir teste grátis
          </Link>
        </div>
      </section>

      <section className="border-y border-border-subtle bg-bg-surface py-14 sm:py-18">
        <div className="container-x">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">Apps da família WPlay</h2>
          <p className="mt-3 max-w-2xl text-sm text-text-tertiary">
            Desenvolvidos e distribuídos pelo mesmo time. Todos aceitam o mesmo usuário, senha e URL de servidor
            da sua assinatura Essencial.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {APPS_PRINCIPAIS.map((app) => (
              <AppCard key={app.nome} app={app} />
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-14 sm:py-18">
        <h2 className="font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">Players compatíveis</h2>
        <p className="mt-3 max-w-2xl text-sm text-text-tertiary">
          Apps de terceiros que aceitam o login da sua assinatura, sem cadastro separado. Todos instalam por
          código Downloader no Android e Fire OS.
        </p>
        <p className="mt-2 max-w-2xl text-sm text-text-tertiary">
          A maioria também está na loja própria da Samsung, LG e Roku, com ativação por MAC ou código em{" "}
          <Link href="/minha-conta" className="text-primary-bright underline underline-offset-2">
            Minha conta
          </Link>
          . Cada card mostra a lista de aparelhos declarada no site oficial do app; os dois sem lista são os que
          só confirmamos via Downloader.
        </p>
        <AtivacaoInclusa className="mt-8" />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PLAYERS_COMPATIVEIS.map((app) => (
            <AppCard key={app.nome} app={app} />
          ))}
        </div>
      </section>

      <section className="border-t border-border-subtle bg-bg-surface py-14 sm:py-18">
        <div className="container-x text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            Ainda não tem usuário e senha?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-text-secondary">
            Peça o teste grátis de 4 horas antes de escolher o app. As credenciais chegam na hora e funcionam em
            qualquer um destes.
          </p>
          <Link href="/teste-gratis" className="btn btn-primary mt-6 inline-block">
            Pedir teste grátis
          </Link>
        </div>
      </section>
    </>
  );
}
