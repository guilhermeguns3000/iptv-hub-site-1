import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Download, KeyRound, PlayCircle, AlertTriangle } from "lucide-react";
import Faq from "@/components/ui/Faq";
import JsonLd from "@/components/ui/JsonLd";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "Downloader no Fire Stick e TV Box: Instalar por Código",
  description:
    "Passo a passo com imagens do app Downloader no Fire Stick, TV Box e Android TV: o que ele é, como o código funciona, onde não existe e o que usar no lugar.",
  alternates: { canonical: "/guias/downloader" },
};

const FAQ_ITEMS = [
  {
    pergunta: "O Downloader é gratuito?",
    resposta: "Sim, é um app gratuito, disponível na loja de apps de qualquer Android TV, Fire Stick ou TV Box.",
  },
  {
    pergunta: "O código de instalação é o mesmo pra qualquer app?",
    resposta:
      "Não. Cada app da família WPlay tem o próprio código, e alguns têm até três métodos diferentes (Downloader, ntDown, M7/Loja SSH). Os códigos certos de cada um estão em Apps do WPlay.",
  },
  {
    pergunta: "Baixei pelo Downloader, mas não acho o arquivo pra instalar. E agora?",
    resposta:
      "O Downloader mostra a tela de instalação automaticamente assim que o download termina. Se ela fechar sem querer, abra o app de arquivos do seu aparelho e procure na pasta Download.",
  },
  {
    pergunta: "O Downloader sumiu da lista de apps que podem instalar arquivos.",
    resposta:
      "É um bug conhecido do Fire OS 7 e 8 em alguns Fire Stick, não é defeito do aparelho. O passo a passo pra contornar isso (com o X-plore File Manager) está em Como instalar no Fire Stick.",
  },
];

export default function ComoUsarDownloaderPage() {
  return (
    <>
      <Breadcrumbs trilha={[{ nome: "Guias", href: "/guias" }, { nome: "Downloader" }]} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "Como usar o Downloader para instalar o WPlay",
          step: [
            { "@type": "HowToStep", name: "Instalar o Downloader", text: "Na loja de apps do seu aparelho, busque e instale o Downloader." },
            { "@type": "HowToStep", name: "Digitar o código", text: "Abra o Downloader e digite o código do app WPlay que você quer instalar." },
            { "@type": "HowToStep", name: "Instalar o app baixado", text: "Confirme a instalação quando o Downloader terminar de baixar o arquivo." },
          ],
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ_ITEMS.map((f) => ({ "@type": "Question", name: f.pergunta, acceptedAnswer: { "@type": "Answer", text: f.resposta } })),
        }}
      />

      <section className="container-x py-14 sm:py-18">
        <p className="section-label">Tutorial</p>
        <h1 className="mt-3 font-heading text-4xl font-extrabold tracking-tight text-text-primary sm:text-5xl">
          Como usar o Downloader pra instalar o WPlay
        </h1>
        <p className="mt-5 max-w-2xl text-text-secondary">
          TV Box, Fire Stick e Android TV não têm o WPlay na loja padrão, porque o app não passa pela Google
          Play. O Downloader resolve isso: você digita um código numérico e ele baixa e instala o APK certo,
          sem precisar de computador nem cabo.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/teste-gratis" className="btn btn-primary">Pedir teste grátis de 4 horas</Link>
          <Link href="/apps" className="btn btn-outline">Ver código de cada app</Link>
        </div>
      </section>

      <section className="border-y border-border-subtle bg-bg-surface py-14 sm:py-18">
        <div className="container-x">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">Passo a passo</h2>

          <div className="mt-8 grid gap-10 sm:grid-cols-3">
            <div>
              <div className="flex items-center gap-2">
                <Download size={20} className="text-primary-bright" aria-hidden />
                <p className="font-semibold text-text-primary">1. Instale o Downloader</p>
              </div>
              <p className="mt-2 text-sm text-text-secondary">
                Na tela inicial do seu aparelho, busque por &quot;Downloader&quot; na loja de apps e instale. É
                gratuito.
              </p>
              <Image
                src="/brand/guias/downloader-instalar.webp"
                alt="Instalar o app Downloader na Android TV, TV Box ou Fire TV Stick"
                width={800}
                height={450}
                className="mt-4 w-full rounded-lg border border-border-subtle"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <KeyRound size={20} className="text-primary-bright" aria-hidden />
                <p className="font-semibold text-text-primary">2. Digite o código</p>
              </div>
              <p className="mt-2 text-sm text-text-secondary">
                Abra o Downloader e digite o código numérico do app WPlay escolhido no campo de URL. Toque em
                Ir.
              </p>
              <Image
                src="/brand/guias/downloader-codigo.webp"
                alt="Onde digitar o código do Downloader para baixar o WPlay"
                width={739}
                height={415}
                className="mt-4 w-full rounded-lg border border-border-subtle"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <PlayCircle size={20} className="text-primary-bright" aria-hidden />
                <p className="font-semibold text-text-primary">3. Instale e abra</p>
              </div>
              <p className="mt-2 text-sm text-text-secondary">
                O Downloader baixa o arquivo sozinho e mostra a tela de instalação. Confirme, abra o app e faça
                login com usuário, senha e URL do servidor.
              </p>
              <Image
                src="/brand/guias/downloader-instalando.webp"
                alt="Instalar o app baixado pelo Downloader no aparelho Android"
                width={533}
                height={300}
                className="mt-4 w-full rounded-lg border border-border-subtle"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="container-x py-14 sm:py-18">
        <h2 className="font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
          O que esse app é, e por que o código funciona
        </h2>
        <div className="mt-6 grid gap-8 lg:grid-cols-2">
          <div className="space-y-4 text-text-secondary">
            <p>
              É um utilitário gratuito feito pela AFTVnews, um site especializado em Fire TV, e está publicado
              na Amazon Appstore e na Google Play. A função dele é uma só: baixar um arquivo a partir de um
              endereço digitado com o controle remoto e abrir a instalação em seguida.
            </p>
            <p>
              O código numérico é um atalho. Em vez de digitar um endereço longo letra por letra na TV, você
              digita sete dígitos e o próprio app converte esse número no endereço completo do arquivo.
            </p>
            <p>
              Por isso cada aplicativo tem o seu número: o código do WPlay leva ao pacote do WPlay, o do WPlay
              PRO leva a outro pacote, e trocar um pelo outro instala o app errado.
            </p>
            <p>
              Ele só existe para Android e Fire OS. Samsung, LG e Roku não rodam Android, então não têm esse
              app nem aceitam código nenhum. Nessas TVs o caminho é outro, explicado em{" "}
              <Link href="/guias/samsung" className="text-primary-bright underline underline-offset-2">
                Samsung
              </Link>
              ,{" "}
              <Link href="/guias/lg" className="text-primary-bright underline underline-offset-2">
                LG
              </Link>{" "}
              e no bloco de Roku dentro do guia da LG.
            </p>
          </div>
          <div className="card border border-border-strong p-6">
            <p className="font-heading text-lg font-bold text-text-primary">Quando usar ntDown ou M7 em vez dele</p>
            <ul className="mt-4 space-y-3 text-sm text-text-secondary">
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-bright" aria-hidden />
                <span>
                  <strong className="text-text-primary">TV Box sem Amazon Appstore nem Google Play.</strong> Caixinha
                  genérica costuma vir com loja própria do fabricante, e nela o app de código disponível pode ser
                  o ntDown ou o M7 (Loja SSH). O WPlay tem código nos três, veja em{" "}
                  <Link href="/apps" className="text-primary-bright underline underline-offset-2">
                    apps
                  </Link>
                  .
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-bright" aria-hidden />
                <span>
                  <strong className="text-text-primary">Fire Stick com Vega OS.</strong> Os modelos lançados a
                  partir de outubro de 2025 usam outro sistema e ainda não instalam o WPlay, com ou sem código.
                  A lista de modelos está no{" "}
                  <Link href="/guias/fire-stick" className="text-primary-bright underline underline-offset-2">
                    guia do Fire Stick
                  </Link>
                  .
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-bright" aria-hidden />
                <span>
                  <strong className="text-text-primary">Aparelho com navegador.</strong> Android TV certificado e
                  celular conseguem baixar o arquivo direto pelo navegador, sem app de código nenhum.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="container-x pb-14 sm:pb-18">
        <div className="card flex flex-col items-start justify-between gap-4 border border-border-strong p-6 sm:flex-row sm:items-center">
          <div>
            <p className="font-semibold text-text-primary">Qual código eu uso?</p>
            <p className="mt-1 text-sm text-text-secondary">
              Cada app da família WPlay tem o código certo, às vezes com mais de um método (Downloader, ntDown,
              M7/Loja SSH). A lista completa está na página de apps.
            </p>
          </div>
          <Link href="/apps" className="btn btn-primary shrink-0">
            Ver todos os códigos
          </Link>
        </div>
      </section>

      <section className="border-y border-border-subtle bg-bg-surface py-14 sm:py-18">
        <div className="container-x">
          <div className="flex items-center gap-2">
            <AlertTriangle size={20} className="text-primary-bright" aria-hidden />
            <h2 className="font-heading text-xl font-bold text-text-primary sm:text-2xl">
              Downloader sumiu da lista de apps autorizados?
            </h2>
          </div>
          <p className="mt-3 max-w-2xl text-text-secondary">
            Acontece em alguns Fire Stick com Fire OS 7 e 8 mais recentes. É um bug do sistema, não do
            aparelho, e tem solução. O passo a passo completo está em{" "}
            <Link href="/guias/fire-stick" className="text-primary-bright underline underline-offset-2">
              Como instalar o WPlay no Fire Stick
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="container-x py-14 sm:py-18">
        <h2 className="font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">Perguntas frequentes</h2>
        <div className="mt-8 max-w-3xl">
          <Faq items={FAQ_ITEMS} />
        </div>
      </section>
    </>
  );
}
