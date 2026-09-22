import type { Metadata } from "next";
import Link from "next/link";
import { Tv, MonitorSmartphone, Globe, TriangleAlert } from "lucide-react";
import Faq from "@/components/ui/Faq";
import JsonLd from "@/components/ui/JsonLd";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import AtivacaoInclusa from "@/components/ui/AtivacaoInclusa";

export const metadata: Metadata = {
  title: "Como Instalar IPTV na Smart TV Samsung (Tizen)",
  description:
    "IPTV na Smart TV Samsung: o Tizen não aceita app de fora da loja. Veja os três caminhos reais para assistir WPlay na Samsung, com prós e contras.",
  alternates: { canonical: "/guias/samsung" },
};

const CAMINHOS: [string, string, string, string][] = [
  ["App da loja Samsung + código", "Não", "Baixa", "Quem não quer comprar nada nem ligar aparelho novo"],
  ["TV Box ou Fire Stick por HDMI", "Sim, o aparelho", "Baixa depois de ligado", "Quem assiste todo dia e quer estabilidade em 4K"],
  ["Web Player no navegador da TV", "Não", "Muito baixa", "Teste rápido, ou Samsung recente com navegador atualizado"],
];

const FAQ_ITEMS = [
  {
    pergunta: "Por que o WPlay não aparece na loja da minha Samsung?",
    resposta:
      "Porque a Samsung usa o Tizen, um sistema fechado onde só entra aplicativo aprovado e publicado pela própria Samsung. Nenhum player de IPTV desse tipo passa por essa aprovação, então não existe app WPlay na loja da Samsung, e não existe como instalar um arquivo de fora nela.",
  },
  {
    pergunta: "Dá pra instalar APK na Samsung como se faz no Android?",
    resposta:
      "Não. Tizen não é Android e não instala APK. Existe um modo desenvolvedor, mas ele foi feito para quem programa aplicativos: precisa de computador na mesma rede, expira em poucos dias e quebra a cada atualização de firmware da TV. Não é caminho para uso normal.",
  },
  {
    pergunta: "Minha Samsung é de antes de 2016. Muda alguma coisa?",
    resposta:
      "Muda. As Samsung de 2016 em diante usam Tizen. Modelos anteriores usam um sistema mais antigo, com loja praticamente abandonada e navegador desatualizado. Nesses aparelhos, o caminho realista é ligar um TV Box ou Fire Stick na entrada HDMI.",
  },
  {
    pergunta: "Como funciona a ativação por código na Samsung?",
    resposta:
      "Você instala um app de IPTV compatível pela loja da própria Samsung, abre e ele mostra um código ou endereço MAC na tela. Esse código é colado na sua área de cliente aqui no site, e a lista entra sozinha no aplicativo, sem digitar usuário e senha pelo controle remoto.",
  },
  {
    pergunta: "Vou ter que pagar a taxa de ativação do aplicativo?",
    resposta:
      "Com a gente, não. Esses players costumam cobrar uma taxa de ativação do desenvolvedor do app, separada da assinatura, e quem contrata outro fornecedor paga isso do próprio bolso. No nosso servidor a ativação já está inclusa: instala, importa a lista pelo código e pronto.",
  },
];

export default function GuiaSamsungPage() {
  return (
    <>
      <Breadcrumbs trilha={[{ nome: "Guias", href: "/guias" }, { nome: "Smart TV Samsung" }]} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "Como assistir WPlay na Smart TV Samsung",
          step: [
            { "@type": "HowToStep", name: "Instalar um app compatível pela loja da Samsung", text: "Na loja da própria TV, busque um app de IPTV compatível, instale e abra." },
            { "@type": "HowToStep", name: "Anotar o código ou MAC", text: "O aplicativo mostra na tela um código de ativação ou endereço MAC do aparelho." },
            { "@type": "HowToStep", name: "Importar a lista", text: "Cole esse código em Minha conta no site para importar a lista sem digitar usuário e senha." },
            { "@type": "HowToStep", name: "Alternativa por HDMI", text: "Se preferir, ligue um TV Box ou Fire Stick na entrada HDMI e instale o WPlay nele." },
          ],
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ_ITEMS.map((f) => ({
            "@type": "Question",
            name: f.pergunta,
            acceptedAnswer: { "@type": "Answer", text: f.resposta },
          })),
        }}
      />

      <section className="container-x py-12 sm:py-16">
        <div className="rounded-xl border-l-4 border-warning bg-bg-surface p-6 sm:p-8">
          <h1 className="font-heading text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl">
            Como instalar IPTV na Smart TV Samsung
          </h1>
          <p className="mt-4 max-w-2xl text-text-secondary">
            Antes de você procurar na loja da TV: não existe aplicativo WPlay para Samsung. O Tizen, sistema que
            a Samsung usa desde 2016, só aceita aplicativo aprovado e publicado pela própria Samsung, e nenhum
            player de IPTV desse tipo passa por essa aprovação.
          </p>
          <p className="mt-3 max-w-2xl text-text-secondary">
            Você continua conseguindo assistir IPTV na sua Samsung. São três caminhos, e eles não são
            equivalentes: mudam em custo, em dificuldade e em quanto dependem da sua TV.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href="/teste-gratis" className="btn btn-primary">Pedir teste grátis de 4 horas</Link>
            <Link href="/minha-conta" className="btn btn-outline">Importar lista por código</Link>
          </div>
        </div>
      </section>

      <section className="container-x pb-4">
        <div className="overflow-x-auto rounded-xl border border-border-strong">
          <table className="w-full min-w-[34rem] text-left text-sm">
            <thead className="bg-bg-raised">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold text-text-tertiary">Caminho</th>
                <th scope="col" className="px-4 py-3 font-semibold text-text-tertiary">Precisa comprar algo?</th>
                <th scope="col" className="px-4 py-3 font-semibold text-text-tertiary">Dificuldade</th>
                <th scope="col" className="px-4 py-3 font-semibold text-text-tertiary">Melhor para</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {CAMINHOS.map(([caminho, custo, dificuldade, melhor]) => (
                <tr key={caminho} className="odd:bg-bg-surface">
                  <th scope="row" className="px-4 py-3 font-semibold text-text-primary">{caminho}</th>
                  <td className="px-4 py-3 text-text-secondary">{custo}</td>
                  <td className="px-4 py-3 text-text-secondary">{dificuldade}</td>
                  <td className="px-4 py-3 text-text-secondary">{melhor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="border-y border-border-subtle bg-bg-surface py-14 sm:py-18">
        <div className="container-x">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">As três formas reais de assistir</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            <div className="card border border-primary-bright p-6">
              <div className="flex items-center gap-2">
                <Tv size={22} className="text-primary-bright" aria-hidden />
                <p className="font-heading text-lg font-bold text-text-primary">App da loja + código</p>
              </div>
              <p className="mt-3 text-sm text-text-secondary">
                Na loja da própria Samsung, busque um app de IPTV compatível, instale e abra. Ele mostra um
                código ou MAC na tela: cole esse código em{" "}
                <Link href="/minha-conta" className="text-primary-bright underline underline-offset-2">
                  Minha conta
                </Link>{" "}
                e a lista entra sozinha, sem digitar nada pelo controle remoto.
              </p>
            </div>
            <div className="card border border-border-strong p-6">
              <div className="flex items-center gap-2">
                <MonitorSmartphone size={22} className="text-primary-bright" aria-hidden />
                <p className="font-heading text-lg font-bold text-text-primary">TV Box ou Fire Stick</p>
              </div>
              <p className="mt-3 text-sm text-text-secondary">
                Conecte o aparelho numa entrada HDMI livre. Ele roda Android de verdade, então o WPlay instala
                normal, sem restrição de loja. É o caminho mais estável para canal ao vivo em 4K.
              </p>
            </div>
            <div className="card border border-border-strong p-6">
              <div className="flex items-center gap-2">
                <Globe size={22} className="text-primary-bright" aria-hidden />
                <p className="font-heading text-lg font-bold text-text-primary">Web Player pelo navegador</p>
              </div>
              <p className="mt-3 text-sm text-text-secondary">
                Samsung mais recente tem navegador embutido. Abra, entre na sua conta aqui no site e toque em Web
                Player: os canais abrem no próprio navegador da TV, sem instalar nada.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-x py-14 sm:py-18">
        <AtivacaoInclusa className="mb-8" />

        <div className="rounded-xl border-l-4 border-warning bg-bg-raised p-6">
          <div className="flex items-center gap-2">
            <TriangleAlert size={20} className="shrink-0 text-warning" aria-hidden />
            <h2 className="font-heading text-xl font-bold text-text-primary">
              Não perca tempo com modo desenvolvedor na Samsung
            </h2>
          </div>
          <p className="mt-3 max-w-3xl text-text-secondary">
            Você vai achar tutorial ensinando a ligar o modo desenvolvedor do Tizen para instalar aplicativo de
            fora. Ele existe, mas foi feito para quem programa: exige um computador na mesma rede, o acesso
            expira em poucos dias e some a cada atualização de firmware da TV. Para assistir no dia a dia, é
            trabalho recorrente sem retorno.
          </p>
          <p className="mt-3 max-w-3xl text-sm text-text-tertiary">
            Se a ideia é justamente não comprar aparelho novo, o caminho que funciona sem manutenção é o app da
            própria loja com ativação por código.
          </p>
        </div>

        <p className="mt-8 text-sm text-text-tertiary">
          Tem uma LG em vez de Samsung? O sistema é outro e as regras mudam: veja{" "}
          <Link href="/guias/lg" className="text-primary-bright underline underline-offset-2">
            como instalar IPTV na Smart TV LG
          </Link>
          . Já tem um TV Box ou Fire Stick em casa? O passo a passo está em{" "}
          <Link href="/guias/fire-stick" className="text-primary-bright underline underline-offset-2">
            Fire Stick e Fire TV
          </Link>{" "}
          e{" "}
          <Link href="/guias/tv-box-android-tv" className="text-primary-bright underline underline-offset-2">
            TV Box e Android TV
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
