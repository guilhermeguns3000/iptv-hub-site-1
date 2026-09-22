import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Download, ShieldCheck, Cast } from "lucide-react";
import Faq from "@/components/ui/Faq";
import JsonLd from "@/components/ui/JsonLd";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "IPTV em TV Box e Android TV: Instalar o WPlay (2026)",
  description:
    "IPTV em TV Box e Android TV com o WPlay: ficha técnica real (Android 5.0+, 32 e 64 bits), passo a passo com e sem Google Play, e o que fazer se der erro.",
  alternates: { canonical: "/guias/tv-box-android-tv" },
};

/**
 * Medido no pacote real (WPlay P2P BinStream.apk, 17/09/2026): tamanho e
 * contagem de arquivos pelo índice do próprio pacote, minSdkVersion e
 * arquiteturas lidos do manifesto. Nunca estimar esses números.
 */
const RESUMO: [string, string][] = [
  ["Android mínimo", "5.0"],
  ["Processador", "32 e 64 bits"],
  ["Download", "26 MB"],
  ["Instalado", "52 MB"],
];

const FICHA: [string, string][] = [
  ["Versão do aplicativo", "11.9.0d"],
  ["Android mínimo", "5.0 (Lollipop) ou mais recente"],
  ["Processadores suportados", "32 bits (armeabi-v7a) e 64 bits (arm64-v8a)"],
  ["Tamanho do download", "26 MB"],
  ["Espaço ocupado após instalar", "cerca de 52 MB"],
  ["Interface de TV", "suporte nativo a navegação por controle remoto (leanback)"],
  ["Atualização", "automática, pelo próprio aplicativo"],
];

const FAQ_ITEMS = [
  {
    pergunta: "Qual a versão mínima de Android pra rodar o WPlay?",
    resposta:
      "Android 5.0. Conferimos isso direto no pacote do aplicativo (minSdkVersion 21), então TV Box antigo com Android 5, 6, 7 ou 8 instala normalmente, ao contrário do que muita gente supõe. Abaixo do Android 5.0 o próprio sistema recusa a instalação.",
  },
  {
    pergunta: "Meu TV Box é de 32 bits. Funciona?",
    resposta:
      "Funciona. O pacote do WPlay traz as duas arquiteturas de processador (armeabi-v7a de 32 bits e arm64-v8a de 64 bits), então tanto TV Box de entrada quanto modelos recentes rodam o mesmo arquivo, sem versão separada.",
  },
  {
    pergunta: "Por que o WPlay funciona melhor em TV Box do que em Smart TV comum?",
    resposta:
      "Porque TV Box e Android TV rodam Android de verdade, o mesmo sistema em que o WPlay foi desenvolvido. Além disso, o app declara suporte nativo à interface de TV do Android (leanback), ou seja, foi feito pra ser navegado por controle remoto, não é app de celular esticado na tela grande.",
  },
  {
    pergunta: "Preciso do app Downloader no TV Box?",
    resposta:
      "Depende do modelo. Alguns TV Box já vêm com a Google Play instalada, então o Downloader nem é necessário nesses casos. Em modelos sem Play Store, o processo é o mesmo do Fire Stick: Downloader mais código de instalação.",
  },
  {
    pergunta: "O app abre sozinho quando eu ligo o TV Box?",
    resposta:
      "Ele pede essa permissão (iniciar junto com o sistema), mas alguns fabricantes de TV Box bloqueiam isso por padrão numa função de economia de energia ou gerenciamento de apps em segundo plano. Se não abrir sozinho, procure essa permissão nas configurações do sistema, não nas do WPlay.",
  },
  {
    pergunta: "Preciso baixar o APK de novo a cada atualização?",
    resposta:
      "Não. O aplicativo tem atualização própria embutida: ele avisa e instala a versão nova por conta, sem precisar repetir o processo do Downloader. A versão atual do pacote é a 11.9.0d.",
  },
  {
    pergunta: "O WPlay funciona com Chromecast no Android TV?",
    resposta:
      "Sim. O app tem suporte nativo ao Google Cast, então dá pra espelhar direto de um celular pra qualquer Android TV com Chromecast embutido, sem precisar nem abrir o WPlay na TV.",
  },
];

export default function GuiaTvBoxPage() {
  return (
    <>
      <Breadcrumbs trilha={[{ nome: "Guias", href: "/guias" }, { nome: "TV Box e Android TV" }]} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "Como instalar o WPlay em TV Box e Android TV",
          step: [
            { "@type": "HowToStep", name: "Verificar a loja disponível", text: "Se o aparelho tem Google Play, busque e instale o WPlay ou baixe o APK direto. Sem Play Store, use o Downloader com o código de instalação." },
            { "@type": "HowToStep", name: "Instalar", text: "Siga a instalação guiada até o fim, autorizando a permissão de fontes desconhecidas se pedido." },
            { "@type": "HowToStep", name: "Fazer login", text: "Abra o WPlay, informe usuário, senha e URL do servidor recebidos no teste." },
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

      <section className="container-x py-12 sm:py-16">
        <h1 className="font-heading text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl">
          IPTV em TV Box e Android TV: como instalar o WPlay
        </h1>
        <p className="mt-4 max-w-2xl text-text-secondary">
          TV Box é o aparelho onde IPTV roda melhor, e onde o WPlay se sente em casa. Como TV Box e Android TV
          rodam Android de verdade, a instalação é direta, sem os contornos que outras Smart TVs exigem. E o
          requisito é mais baixo do que a maioria imagina.
        </p>
        <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border-strong bg-border-strong sm:grid-cols-4">
          {RESUMO.map(([rotulo, valor]) => (
            <div key={rotulo} className="bg-bg-surface px-4 py-4">
              <dt className="text-xs uppercase tracking-wide text-text-tertiary">{rotulo}</dt>
              <dd className="mt-1 font-heading text-lg font-bold text-primary-bright">{valor}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/teste-gratis" className="btn btn-primary">Pedir teste grátis de 4 horas</Link>
          <Link href="/apps" className="btn btn-outline">Baixar o APK</Link>
        </div>
      </section>

      <section className="border-y border-border-subtle bg-bg-surface py-14 sm:py-18">
        <div className="container-x">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">Como instalar</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="card border border-border-strong p-5">
              <Download size={20} className="text-primary-bright" aria-hidden />
              <p className="mt-2 font-semibold text-text-primary">Com Google Play</p>
              <p className="mt-2 text-sm text-text-secondary">Baixe o APK direto do link recebido, ou instale pela loja se o WPlay estiver listado no seu modelo.</p>
            </div>
            <div className="card border border-border-strong p-5">
              <ShieldCheck size={20} className="text-primary-bright" aria-hidden />
              <p className="mt-2 font-semibold text-text-primary">Sem Google Play</p>
              <p className="mt-2 text-sm text-text-secondary">
                Instale o Downloader (ou o app de código que a loja do seu TV Box tiver), digite o código do
                WPlay e siga a instalação guiada. Passo a passo com imagens em{" "}
                <Link href="/guias/downloader" className="text-primary-bright underline underline-offset-2">
                  Como usar o Downloader
                </Link>
                .
              </p>
            </div>
            <div className="card border border-border-strong p-5">
              <Cast size={20} className="text-primary-bright" aria-hidden />
              <p className="mt-2 font-semibold text-text-primary">Suporte a Chromecast</p>
              <p className="mt-2 text-sm text-text-secondary">Em Android TV com Google Cast, dá pra espelhar direto do celular sem nem abrir o app na TV.</p>
            </div>
          </div>
          <p className="mt-8 max-w-2xl text-sm text-text-secondary">
            Depois de instalado, faça login com usuário, senha e URL do servidor exatamente como recebidos, sem
            espaço extra no começo ou no fim.
          </p>
        </div>
      </section>

      <section className="container-x py-14 sm:py-18">
        <h2 className="font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
          Ficha técnica real do aplicativo
        </h2>
        <p className="mt-3 max-w-3xl text-text-secondary">
          Estes números saíram do próprio pacote de instalação do WPlay, conferidos arquivo por arquivo, não de
          estimativa. Use como referência pra saber se o seu aparelho dá conta antes de tentar instalar.
        </p>
        <div className="mt-8 overflow-hidden rounded-xl border border-border-strong">
          <table className="w-full text-left text-sm">
            <tbody className="divide-y divide-border-subtle">
              {FICHA.map(([item, valor]) => (
                <tr key={item} className="odd:bg-bg-surface">
                  <th scope="row" className="w-1/2 px-4 py-3 font-semibold text-text-primary sm:w-2/5">
                    {item}
                  </th>
                  <td className="px-4 py-3 text-text-secondary">{valor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-3xl text-sm text-text-tertiary">
          Sobre memória: o app roda em TV Box de 1 GB de RAM, mas canal ao vivo em 4K com muita gente assistindo
          ao mesmo tempo fica mais confortável a partir de 2 GB. Abaixo disso, o canal abre, só demora mais a
          trocar.
        </p>
      </section>

      <section className="border-y border-border-subtle bg-bg-surface py-14 sm:py-18">
        <div className="container-x">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            Android TV certificado ou TV Box genérico: a diferença que muda o passo a passo
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <div className="card border border-border-strong p-6">
              <Image
                src="/brand/guias/aparelho-android-tv.webp"
                alt="Smart TV com Android TV de fábrica, exemplo de aparelho certificado pelo Google"
                width={498}
                height={320}
                className="mb-4 h-40 w-full rounded-lg bg-bg-base object-contain"
              />
              <p className="font-heading text-lg font-bold text-text-primary">Android TV ou Google TV (certificado)</p>
              <p className="mt-3 text-sm text-text-secondary">
                Tem a Google Play instalada de fábrica e a interface de linhas do Google na tela inicial. Aqui o
                caminho mais rápido é instalar o Downloader pela própria Play Store e usar o código, ou baixar o
                APK direto pelo navegador do aparelho. A permissão de fontes desconhecidas é pedida uma vez, pro
                app que estiver baixando.
              </p>
            </div>
            <div className="card border border-border-strong p-6">
              <Image
                src="/brand/guias/aparelho-tvbox.webp"
                alt="TV Box genérico com controle remoto, aparelho que se liga na entrada HDMI da TV"
                width={330}
                height={320}
                className="mb-4 h-40 w-full rounded-lg bg-bg-base object-contain"
              />
              <p className="font-heading text-lg font-bold text-text-primary">TV Box genérico (sem certificação)</p>
              <p className="mt-3 text-sm text-text-secondary">
                Caixinhas de entrada costumam vir sem Google Play de verdade, com uma loja própria do fabricante
                ou nenhuma. Nesses aparelhos, procure na loja do fabricante um app de código (Downloader, ntDown
                ou equivalente). Se não houver loja nenhuma, o caminho é um gerenciador de arquivos com
                navegador embutido pra baixar o APK.
              </p>
            </div>
          </div>
          <p className="mt-6 max-w-3xl text-text-secondary">
            Essa distinção importa porque quase todo tutorial genérico de internet assume Google Play presente, e
            é justamente o TV Box mais barato, sem Play Store, que representa boa parte dos aparelhos usados pra
            IPTV no Brasil.
          </p>
        </div>
      </section>

      <section className="container-x py-14 sm:py-18">
        <h2 className="font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
          O que o aplicativo pede de permissão, e o que ele não pede
        </h2>
        <p className="mt-3 max-w-3xl text-text-secondary">
          Instalar um app fora da loja oficial gera desconfiança justa. Por isso vale dizer exatamente o que o
          pacote do WPlay declara.
        </p>
        <p className="mt-3 max-w-3xl text-text-secondary">
          São seis permissões: internet e estado da rede; manter a tela ligada durante a reprodução; serviço em
          segundo plano, pra não cortar o streaming; iniciar junto com o aparelho; e instalar as atualizações do
          próprio app.
        </p>
        <p className="mt-3 max-w-3xl text-text-secondary">
          Não estão declaradas permissões de localização, contatos, câmera, microfone nem SMS. Isso é
          verificável por qualquer pessoa: o Android lista as permissões de um app em Configurações, e elas
          precisam estar declaradas no pacote pra existir.
        </p>
        <p className="mt-6 text-sm text-text-tertiary">
          Se a instalação não terminar, o roteiro de causas está em{" "}
          <Link href="/erro-ao-instalar" className="text-primary-bright underline underline-offset-2">
            Deu erro ao instalar
          </Link>
          .
        </p>
      </section>

      <section className="border-t border-border-subtle bg-bg-surface py-14 sm:py-18">
        <div className="container-x">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">Perguntas frequentes</h2>
          <div className="mt-8 max-w-3xl">
            <Faq items={FAQ_ITEMS} />
          </div>
        </div>
      </section>
    </>
  );
}
