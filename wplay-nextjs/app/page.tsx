import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Check, ShieldOff, Tv, Cable, Box, Smartphone, Monitor, Clapperboard, Film, Users, MessageCircle, ServerCog } from "lucide-react";
import { APPS_HOME_SHOWCASE } from "@/content/apps";
import Faq from "@/components/ui/Faq";
import TrustBar from "@/components/ui/TrustBar";
import JsonLd from "@/components/ui/JsonLd";
import { beneficios, planos, formatBRL } from "@/content/plans";

export const metadata: Metadata = {
  title: "WPlay: IPTV e P2P num App Só, com Teste Grátis de 4h",
  description:
    "Teste o WPlay grátis por 4 horas antes de assinar. IPTV completo + 1 tela P2P num plano só, sem cartão de crédito e sem compromisso. Veja como funciona.",
  alternates: { canonical: "/" },
};

const FAQ_ITEMS = [
  {
    pergunta: "O teste grátis do WPlay pede cartão de crédito?",
    resposta:
      "Não. Você recebe usuário e senha para testar por 4 horas, sem cadastro de cartão e sem virar cobrança automática ao final do prazo.",
  },
  {
    pergunta: "Quantos planos o WPlay tem?",
    resposta: "Só um: o Essencial, com IPTV completo mais 1 tela P2P. Não existe grade de opções para comparar.",
  },
  {
    pergunta: "O WPlay funciona em Smart TV que não tem o app nativo?",
    resposta:
      "Sim. Na Samsung, LG e Roku, um player compatível da própria loja da TV, ativado por MAC ou código na sua área de conta. Ou um TV Box ou Fire Stick por HDMI, ou o Web Player pelo navegador da TV. O passo a passo está nos guias de instalação.",
  },
  {
    pergunta: "Por que o WPlay não está na Google Play?",
    resposta:
      "Saiu da loja em 2024, como a maioria dos aplicativos de IPTV do mercado. A instalação hoje é feita por APK direto ou por sideload em TV Box e Fire Stick.",
  },
  {
    pergunta: "Para que serve a tela P2P do plano?",
    resposta:
      "Ela distribui parte da carga de transmissão entre os usuários conectados no mesmo horário, o que ajuda a manter a imagem estável quando muita gente assiste ao mesmo canal ao mesmo tempo, como em jogos importantes.",
  },
  {
    pergunta: "Quanto de internet eu preciso para o WPlay não travar?",
    resposta:
      "Para HD ou 4K sem travamento, o recomendado é 10 Mbps estáveis ou mais. Em conexões mais fracas, os canais em SD costumam funcionar bem mesmo assim.",
  },
  {
    pergunta: "Como faço para assinar depois do teste?",
    resposta:
      "Direto no site, na página de preço: você escolhe a duração, paga via Pix e a ativação é automática assim que o pagamento confirma, sem falar com ninguém. O acesso de teste já existe no sistema, então ele vira a assinatura sem reinstalar nada.",
  },
  {
    pergunta: "O WPlay trava com frequência?",
    resposta:
      "Nenhum serviço de streaming está livre de instabilidade ocasional, a internet do usuário e o horário de pico do canal pesam nisso. Por isso o teste de 4 horas existe: pra você conferir a estabilidade real no seu aparelho antes de assinar.",
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "WPlay",
          applicationCategory: "MultimediaApplication",
          operatingSystem: "Android, Windows, Fire OS",
          offers: { "@type": "Offer", price: "29.99", priceCurrency: "BRL" },
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

      {/* Hero — logo grande e centralizada, sem formulário embutido (o CTA
          leva pra /teste-gratis, que já tem o formulário). Mesma arquitetura
          do hero real do appwplay: coluna única, centralizada, logo como
          imagem de abertura, 3 CTAs, fileira de aparelhos — não o layout de
          "formulário ao lado do texto" que tínhamos antes. */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(900px circle at 50% -10%, rgba(139,181,46,0.16), transparent 60%)",
          }}
        />
        <div className="container-x relative flex flex-col items-center py-16 text-center sm:py-24 lg:py-28">
          <span className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-bg-raised px-4 py-1.5 text-xs font-semibold text-text-secondary">
            <span className="relative flex h-1.5 w-1.5" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
            </span>
            App oficial WPlay
          </span>

          <Image
            src="/brand/logo-full.png"
            alt="WPlay"
            width={640}
            height={216}
            className="mt-6 h-auto w-[220px] sm:w-[280px]"
            priority
          />

          <h1 className="mt-8 max-w-3xl font-heading text-4xl font-extrabold leading-[1.05] tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
            WPlay: teste grátis de IPTV e P2P antes de assinar
          </h1>
          <p className="mt-6 max-w-xl text-base text-text-secondary sm:text-lg">
            O WPlay combina IPTV tradicional e P2P num app só. Teste grátis por 4 horas, sem cartão de crédito e
            sem cadastro que vire cobrança sozinho.
          </p>

          <p className="mt-6 rounded-full border border-border-subtle bg-bg-raised/80 px-5 py-2.5 text-sm text-text-secondary backdrop-blur">
            Antes de testar, veja as{" "}
            <Link href="/guias" className="text-primary-bright underline underline-offset-2">
              instruções de instalação por aparelho
            </Link>
            .
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href="/teste-gratis" className="btn btn-primary">
              Testar grátis por 4 horas
            </Link>
            <Link href="/precos" className="btn btn-outline">
              Ver preço
            </Link>
            <Link href="/guias" className="btn btn-outline">
              Como instalar
            </Link>
          </div>
          <p className="mt-4 flex items-center gap-2 text-sm text-text-tertiary">
            <ShieldOff size={16} className="text-primary-bright" aria-hidden />
            Sem cartão, sem cadastro, sai na hora
          </p>

          <div className="mt-12">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-text-tertiary">Funciona em</p>
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              {[
                { icon: Tv, label: "TV Android" },
                { icon: Tv, label: "TV Smart" },
                { icon: Cable, label: "TV Stick" },
                { icon: Box, label: "TV Box" },
                { icon: Smartphone, label: "Celular" },
                { icon: Monitor, label: "Computador" },
              ].map(({ icon: Icon, label }) => (
                <span key={label} className="flex items-center gap-1.5 rounded-full border border-border-subtle bg-bg-surface/70 px-3 py-1.5 text-sm text-text-secondary">
                  <Icon size={15} className="text-primary-bright" aria-hidden /> {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <TrustBar />

      {/* Recursos do plano Essencial */}
      <section className="relative border-y border-border-subtle bg-bg-surface/50 py-16 sm:py-20">
        <div className="container-x">
          <p className="section-label">Plano Essencial</p>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">O que vem incluído</h2>
          <p className="mt-3 max-w-2xl text-text-secondary">Um plano só. Tudo que está aqui entra no teste grátis, sem versão reduzida.</p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Clapperboard, titulo: "Canais ao vivo em 4K", texto: "Canais nacionais e internacionais, com esportes ao vivo, sem precisar de complemento pago." },
              { icon: Film, titulo: "Filmes e séries", texto: "Catálogo atualizado, incluído na mesma assinatura, sem tela separada pra isso." },
              { icon: Users, titulo: "Tela P2P dedicada", texto: "Reduz travamento em horário de pico dividindo a carga entre usuários conectados." },
              { icon: Tv, titulo: "App próprio", texto: "WPlay e WPlay PRO, sem anúncio de terceiro misturado no player." },
              { icon: MessageCircle, titulo: "Suporte via WhatsApp", texto: "Atendimento direto pra instalação, dúvida de pagamento e problema técnico." },
              { icon: ServerCog, titulo: "Servidor estável", texto: "Infraestrutura dedicada, testada em pico de audiência de eventos grandes." },
            ].map(({ icon: Icon, titulo, texto }) => (
              <div key={titulo} className="card card-hover border border-border-subtle p-6">
                <span className="icon-tile"><Icon size={20} aria-hidden /></span>
                <h3 className="mt-4 font-heading text-lg font-semibold text-text-primary">{titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">{texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preços — versão resumida (a página /precos tem o detalhe completo,
          comparação e FAQ; aqui é só o card com preço + CTA, pra não
          duplicar o mesmo conteúdo e canibalizar a página dedicada). */}
      <section className="relative overflow-hidden py-16 sm:py-20">
        <div aria-hidden className="pointer-events-none absolute inset-0 glow-primary" />
        <div className="container-x relative">
          <p className="section-label">Preços</p>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            Um pacote só, três durações
          </h2>
          <p className="mt-3 max-w-2xl text-text-secondary">
            Sempre o plano Essencial (IPTV completo + 1 tela P2P). O que muda é só o período.
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-3 sm:items-end">
            {planos.map((p) => (
              <div
                key={p.id}
                className={`card relative flex flex-col p-6 ${
                  p.maisEscolhido ? "card-destaque sm:-translate-y-2 sm:p-7" : "border border-border-subtle"
                }`}
              >
                {p.maisEscolhido && (
                  <span className="badge absolute -top-3 left-6 bg-primary-bright text-bg-base">Mais escolhido</span>
                )}
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-text-tertiary">{p.nome}</p>
                <p className="mt-3 flex items-baseline gap-1 font-heading text-text-primary">
                  <span className="text-base font-semibold text-text-tertiary">R$</span>
                  <span className={`font-extrabold tracking-tight ${p.maisEscolhido ? "text-5xl" : "text-4xl"}`}>{formatBRL(p.preco)}</span>
                </p>
                <p className="mt-1.5 text-sm text-text-secondary">
                  {p.economiaPercentual > 0 ? `R$ ${formatBRL(p.precoMensalEquivalente)} por mês, ${p.economiaPercentual}% mais barato` : "preço-base, sem desconto"}
                </p>
                <p className="mt-1 text-xs text-text-tertiary">{p.duracao} dias de acesso</p>
                <Link href={`/checkout?plano=${p.id}`} className={`mt-6 w-full text-sm ${p.maisEscolhido ? "btn btn-primary" : "btn btn-outline"}`}>
                  Assinar {p.nome.toLowerCase()}
                </Link>
              </div>
            ))}
          </div>
          <Link href="/precos" className="mt-6 inline-block text-sm text-primary-bright underline underline-offset-2">
            Ver detalhes, comparação e perguntas frequentes
          </Link>
        </div>
      </section>

      {/* Por que IPTV e P2P juntos */}
      <section className="border-y border-border-subtle bg-bg-surface/50 py-16 sm:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="section-label">Tecnologia</p>
            <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
              Por que IPTV e P2P juntos
            </h2>
            <p className="mt-4 max-w-xl text-text-secondary">
              Um IPTV comum depende inteiramente do servidor central. Quando muita gente assiste ao mesmo canal
              ao mesmo tempo, como numa final de campeonato, a carga toda cai sobre esse servidor e a qualidade
              pode oscilar.
            </p>
            <p className="mt-3 max-w-xl text-text-secondary">
              A tecnologia P2P distribui parte dessa carga entre os próprios usuários conectados naquele
              momento. É por isso que o plano Essencial já inclui uma tela P2P separada, e não é um complemento
              cobrado à parte.
            </p>
          </div>

          <svg
            viewBox="0 0 400 260"
            role="img"
            aria-label="Diagrama comparando um servidor de IPTV central sobrecarregado com a distribuição P2P entre usuários"
            className="card w-full max-w-lg justify-self-center border border-border-subtle p-4"
          >
            <text x="70" y="24" textAnchor="middle" className="fill-text-tertiary text-[11px]">
              IPTV comum
            </text>
            <circle cx="70" cy="55" r="14" className="fill-bg-raised stroke-border-strong" strokeWidth="1.5" />
            <text x="70" y="59" textAnchor="middle" className="fill-text-secondary text-[9px]">
              Servidor
            </text>
            {[[20, 120], [70, 130], [120, 120]].map(([x, y], i) => (
              <g key={i}>
                <line x1="70" y1="69" x2={x} y2={y - 14} className="stroke-border-strong" strokeWidth="1.5" />
                <circle cx={x} cy={y} r="11" className="fill-bg-raised stroke-border-strong" strokeWidth="1.5" />
              </g>
            ))}
            <text x="70" y="160" textAnchor="middle" className="fill-text-secondary text-[9px] font-semibold">
              tudo pelo mesmo caminho
            </text>

            <text x="320" y="24" textAnchor="middle" className="fill-text-tertiary text-[11px]">
              WPlay (IPTV + P2P)
            </text>
            <circle cx="320" cy="55" r="14" className="fill-bg-raised stroke-primary-bright" strokeWidth="1.5" />
            <text x="320" y="59" textAnchor="middle" className="fill-text-secondary text-[9px]">
              Servidor
            </text>
            {[[270, 120], [320, 130], [370, 120]].map(([x, y], i) => (
              <g key={i}>
                <line x1="320" y1="69" x2={x} y2={y - 14} className="stroke-primary-bright" strokeWidth="1.5" />
                <circle
                  cx={x}
                  cy={y}
                  r="11"
                  className="fill-bg-raised stroke-primary-bright"
                  strokeWidth="1.5"
                />
              </g>
            ))}
            <line x1="270" y1="120" x2="320" y2="130" className="stroke-primary-bright" strokeWidth="1.5" />
            <line x1="320" y1="130" x2="370" y2="120" className="stroke-primary-bright" strokeWidth="1.5" />
            <text x="320" y="160" textAnchor="middle" className="fill-success text-[9px] font-semibold">
              carga dividida entre telas
            </text>
          </svg>
        </div>
      </section>

      {/* Como funciona o teste */}
      <section className="py-16 sm:py-20">
        <div className="container-x">
          <p className="section-label">Teste grátis</p>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            Como funciona o teste grátis
          </h2>
          <p className="mt-4 max-w-3xl text-text-secondary">
            Você solicita o acesso, recebe usuário, senha e o link de instalação na hora. Durante 4 horas, o
            acesso é o mesmo de quem já assina: canais ao vivo, filmes, séries, a tela P2P incluída.
          </p>
          <p className="mt-3 max-w-3xl text-text-secondary">
            Sem pedir cartão, sem gerar cobrança automática ao fim do prazo. O passo a passo completo, incluindo
            o que fazer se o teste demorar a chegar, está em{" "}
            <Link href="/teste-gratis" className="text-primary-bright underline underline-offset-2">
              Teste grátis do WPlay: como funciona
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Instalação */}
      <section className="container-x border-t border-border-subtle py-16 sm:py-20">
        <p className="section-label">Instalação</p>
        <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
          Instalação em qualquer aparelho
        </h2>
        <p className="mt-4 max-w-3xl text-text-secondary">
          O WPlay não está mais na loja oficial do Android. Saiu de lá em 2024, como a maioria dos aplicativos
          de IPTV do mercado.
        </p>
        <p className="mt-3 max-w-3xl text-text-secondary">
          Isso muda a forma de instalar, mas não torna o app mais arriscado: por trás dele existe uma base
          técnica real, escrita em Kotlin, com integração de Firebase e suporte nativo a Chromecast. O guia
          completo por aparelho está em{" "}
          <Link href="/wplay-p2p" className="text-primary-bright underline underline-offset-2">
            WPlay P2P: o app oficial e como instalar
          </Link>
          .
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          {APPS_HOME_SHOWCASE.map((app) => (
            <span key={app.nome} className="card card-hover flex items-center gap-3 border border-border-subtle py-2 pl-2 pr-4">
              <Image
                src={`/brand/apps/${app.icone}`}
                alt={`Ícone do app ${app.nome} para WPlay`}
                width={40}
                height={40}
                className="rounded-lg"
              />
              <span className="text-sm font-semibold text-text-primary">{app.nome}</span>
            </span>
          ))}
          <Link href="/apps" className="text-sm text-primary-bright underline underline-offset-2">
            Ver todos os apps compatíveis
          </Link>
        </div>
      </section>

      {/* Plano Essencial */}
      <section className="border-y border-border-subtle bg-bg-surface/50 py-16 sm:py-20">
        <div className="container-x">
          <p className="section-label">Sem letra miúda</p>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            O plano Essencial, sem letra miúda
          </h2>
          <p className="mt-4 max-w-3xl text-text-secondary">
            Um plano só: IPTV completo mais 1 tela P2P, pagamento mensal via PIX, sem fidelidade. O valor e os
            detalhes de cobrança estão descritos com transparência em{" "}
            <Link href="/precos" className="text-primary-bright underline underline-offset-2">
              Preço do WPlay
            </Link>
            .
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {beneficios.map((b) => (
              <li key={b} className="flex items-center gap-3 rounded-md border border-border-subtle bg-bg-surface px-4 py-3 text-sm text-text-secondary">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary-bright"><Check size={14} aria-hidden /></span>
                {b}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-x py-14 sm:py-18">
        <p className="section-label">Dúvidas</p>
        <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">Perguntas frequentes</h2>
        <div className="mt-8 max-w-3xl">
          <Faq items={FAQ_ITEMS} />
        </div>
      </section>
    </>
  );
}
