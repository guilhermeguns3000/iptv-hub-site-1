import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Tv, MonitorSmartphone, Globe, Clock } from "lucide-react";
import Faq from "@/components/ui/Faq";
import JsonLd from "@/components/ui/JsonLd";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import AtivacaoInclusa from "@/components/ui/AtivacaoInclusa";

export const metadata: Metadata = {
  title: "Como Instalar IPTV na Smart TV LG (webOS)",
  description:
    "IPTV na Smart TV LG: o webOS não tem o app WPlay na loja. Veja os caminhos que funcionam e por que o Modo Desenvolvedor apaga o app depois de um tempo.",
  alternates: { canonical: "/guias/lg" },
};

const FAQ_ITEMS = [
  {
    pergunta: "Por que o WPlay não está na LG Content Store?",
    resposta:
      "Porque a LG usa o webOS, com loja fechada e curadoria própria. Player de IPTV desse tipo não passa por essa aprovação, então não existe aplicativo WPlay publicado para LG.",
  },
  {
    pergunta: "Ouvi dizer que dá pra instalar app na LG pelo Modo Desenvolvedor. É verdade?",
    resposta:
      "É verdade que instala, e é aí que está a pegadinha: a sessão do Modo Desenvolvedor tem prazo. Quando ela expira, a própria LG remove os aplicativos instalados por esse caminho, e você precisa refazer tudo. É uma ferramenta feita para quem desenvolve aplicativo, não para assistir TV no dia a dia.",
  },
  {
    pergunta: "Minha LG é antiga, de antes de 2014. Funciona?",
    resposta:
      "As LG de 2014 em diante usam webOS. Modelos anteriores usam um sistema mais antigo, com loja abandonada e navegador desatualizado. Nesses aparelhos, o caminho realista é ligar um TV Box ou Fire Stick na entrada HDMI.",
  },
  {
    pergunta: "Como funciona a ativação por código na LG?",
    resposta:
      "Na LG Content Store, instale um player compatível (IPTV Player IO, IPTV 4K ou TiviPlayer, por exemplo) e abra. A primeira tela do app mostra um código de ativação, às vezes chamado de MAC ou Device Key. Entre na sua conta aqui no site, cole esse código no campo de importar e volte pra TV: a lista já aparece dentro do player.",
  },
  {
    pergunta: "Vou ter que pagar a taxa de ativação do aplicativo?",
    resposta:
      "Não. Os players da LG Content Store cobram do usuário uma licença por aparelho, paga ao desenvolvedor do app. Quem assina IPTV em fornecedor sem integração acaba arcando com essa licença por fora. Aqui ela já vem coberta pela nossa ativação, então o único custo é a assinatura.",
  },
];

export default function GuiaLgPage() {
  return (
    <>
      <Breadcrumbs trilha={[{ nome: "Guias", href: "/guias" }, { nome: "Smart TV LG" }]} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "Como assistir WPlay na Smart TV LG",
          step: [
            { "@type": "HowToStep", name: "Abrir a LG Content Store", text: "No controle da LG, entre na LG Content Store e pesquise o nome de um player compatível (IPTV Player IO, IPTV 4K, TiviPlayer)." },
            { "@type": "HowToStep", name: "Instalar e abrir o player", text: "Instale e abra: a primeira tela exibe o código de ativação do aparelho (MAC ou Device Key)." },
            { "@type": "HowToStep", name: "Importar a lista pela conta", text: "Entre na sua conta no site, cole o código no campo de importar e confirme. A lista carrega no player da TV." },
            { "@type": "HowToStep", name: "Sem loja ou LG antiga", text: "Ligue um TV Box ou Fire Stick numa HDMI livre e instale o WPlay nele; a LG vira só a tela." },
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

      <section className="container-x grid gap-8 py-12 sm:py-16 lg:grid-cols-[1fr_18rem] lg:items-start">
        <div>
          <h1 className="font-heading text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl">
            Como instalar IPTV na Smart TV LG
          </h1>
          <p className="mt-4 max-w-xl text-text-secondary">
            A LG usa o webOS, e a LG Content Store é fechada: não existe aplicativo WPlay publicado lá. A boa
            notícia é que o caminho que funciona na LG não exige comprar nada, e nem digitar usuário e senha
            pelo controle remoto.
          </p>
          <p className="mt-3 max-w-xl text-text-secondary">
            A parte que engana muita gente é o Modo Desenvolvedor, que a LG tem e a Samsung não oferece do mesmo
            jeito. Ele instala o aplicativo de verdade, mas com prazo de validade. Está explicado abaixo.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href="/teste-gratis" className="btn btn-primary">Pedir teste grátis de 4 horas</Link>
            <Link href="/minha-conta" className="btn btn-outline">Importar lista por código</Link>
          </div>
        </div>

        <div className="card border border-border-strong p-5">
          <p className="font-heading text-sm font-bold uppercase tracking-wide text-text-tertiary">
            Qual sistema a sua LG tem
          </p>
          <dl className="mt-3 space-y-3 text-sm">
            <div>
              <dt className="font-semibold text-text-primary">2014 em diante</dt>
              <dd className="text-text-secondary">webOS, com LG Content Store. É o caso da maioria.</dd>
            </div>
            <div>
              <dt className="font-semibold text-text-primary">Antes de 2014</dt>
              <dd className="text-text-secondary">
                Sistema anterior, loja praticamente abandonada. Aqui o caminho realista é TV Box ou Fire Stick
                por HDMI.
              </dd>
            </div>
          </dl>
          <p className="mt-4 border-t border-border-subtle pt-3 text-xs text-text-tertiary">
            Em dúvida, veja o ano de fabricação na etiqueta atrás da TV ou em Configurações, Suporte,
            Informações da TV.
          </p>
        </div>
      </section>

      <section className="border-y border-border-subtle bg-bg-surface py-14 sm:py-18">
        <div className="container-x">
          <div className="rounded-xl border-l-4 border-warning bg-bg-raised p-6">
            <div className="flex items-center gap-2">
              <Clock size={20} className="shrink-0 text-warning" aria-hidden />
              <h2 className="font-heading text-xl font-bold text-text-primary">
                O Modo Desenvolvedor da LG apaga o aplicativo depois de um tempo
              </h2>
            </div>
            <p className="mt-3 max-w-3xl text-text-secondary">
              Diferente da Samsung, a LG deixa instalar aplicativo de fora da loja pelo Modo Desenvolvedor, e
              muito tutorial na internet para por aí, como se fosse a solução. Só que a sessão do Modo
              Desenvolvedor tem prazo: quando ela expira, a própria LG remove os aplicativos instalados assim.
            </p>
            <p className="mt-3 max-w-3xl text-text-secondary">
              Na prática, isso significa entrar de novo na conta de desenvolvedor e renovar a sessão de tempos
              em tempos, para sempre, ou reinstalar tudo do zero quando o aplicativo sumir no meio de um jogo.
              É uma ferramenta feita para quem programa aplicativo, não para quem só quer assistir.
            </p>
            <p className="mt-3 max-w-3xl text-sm text-text-tertiary">
              Por isso este guia não recomenda esse caminho. Os três abaixo funcionam sem manutenção.
            </p>
          </div>
        </div>
      </section>

      <section className="container-x py-14 sm:py-18">
        <h2 className="font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
          Os caminhos que funcionam sem manutenção
        </h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          <div className="card border border-primary-bright p-6">
            <div className="flex items-center gap-2">
              <Tv size={22} className="text-primary-bright" aria-hidden />
              <p className="font-heading text-lg font-bold text-text-primary">App da LG Content Store + código</p>
            </div>
            <p className="mt-3 text-sm text-text-secondary">
              Com o controle da LG, abra a LG Content Store, pesquise o nome do player e instale. Ao abrir, ele
              exibe um código de ativação. Esse código vai em{" "}
              <Link href="/minha-conta" className="text-primary-bright underline underline-offset-2">
                Minha conta
              </Link>
              , no campo de importar, e a lista carrega no player sem você digitar nada com o controle.
            </p>
          </div>
          <div className="card border border-border-strong p-6">
            <div className="flex items-center gap-2">
              <MonitorSmartphone size={22} className="text-primary-bright" aria-hidden />
              <p className="font-heading text-lg font-bold text-text-primary">TV Box ou Fire Stick</p>
            </div>
            <p className="mt-3 text-sm text-text-secondary">
              Uma caixinha ligada numa HDMI livre da LG transforma qualquer modelo, inclusive os anteriores a
              2014, num aparelho Android: o WPlay instala nele e a TV vira só a tela. Para jogo ao vivo em 4K, é
              o caminho que menos sofre.
            </p>
          </div>
          <div className="card border border-border-strong p-6">
            <div className="flex items-center gap-2">
              <Globe size={22} className="text-primary-bright" aria-hidden />
              <p className="font-heading text-lg font-bold text-text-primary">Web Player pelo navegador</p>
            </div>
            <p className="mt-3 text-sm text-text-secondary">
              O navegador do webOS, presente nas LG mais novas, abre a área de conta deste site. De lá, o Web
              Player toca os canais na própria TV, sem instalar app nenhum.
            </p>
          </div>
        </div>

        <AtivacaoInclusa className="mt-10" />

        <div className="mt-10 flex items-start gap-4 rounded-xl border border-border-strong bg-bg-surface p-6">
          <Image
            src="/brand/guias/aparelho-roku.webp"
            alt="Aparelho de streaming ligado por HDMI, alternativa para TV com loja fechada"
            width={288}
            height={320}
            className="hidden h-28 w-28 shrink-0 rounded-lg bg-bg-base object-contain sm:block"
          />
          <div>
            <p className="font-semibold text-text-primary">Vale para Roku também</p>
            <p className="mt-1 text-sm text-text-secondary">
              Se além da LG você tem um Roku em casa, a regra é a mesma e ainda mais restrita: o sistema é
              fechado e não aceita instalação de fora da Roku Channel Store. O caminho continua sendo app da
              loja com ativação por código, ou um aparelho Android ligado na HDMI.
            </p>
          </div>
        </div>

        <p className="mt-8 text-sm text-text-tertiary">
          Tem uma Samsung em vez de LG? O sistema é outro e as regras mudam: veja{" "}
          <Link href="/guias/samsung" className="text-primary-bright underline underline-offset-2">
            como instalar IPTV na Smart TV Samsung
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
