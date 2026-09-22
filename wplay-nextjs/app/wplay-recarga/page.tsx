import type { Metadata } from "next";
import Link from "next/link";
import { RefreshCw, LogIn, CreditCard, CheckCircle2 } from "lucide-react";
import Faq from "@/components/ui/Faq";
import JsonLd from "@/components/ui/JsonLd";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "WPlay Recarga: Como Renovar a Assinatura via Pix",
  description:
    "Recarga WPlay sem novo cadastro: renove com o mesmo usuário e senha, pague via Pix e a ativação é automática. A validade soma a partir do vencimento.",
  alternates: { canonical: "/wplay-recarga" },
};

const PASSOS = [
  {
    icon: LogIn,
    titulo: "Entre com seu e-mail",
    texto: "Acesse Minha conta com o e-mail que você já usa. Não precisa de senha, o acesso chega por link.",
  },
  {
    icon: CreditCard,
    titulo: "Pague via Pix",
    texto: "Escolha a duração (mensal, trimestral ou semestral) e pague. O sistema já sabe que você é cliente.",
  },
  {
    icon: CheckCircle2,
    titulo: "Acesso estendido automaticamente",
    texto: "Assim que o Pix confirma, a validade é renovada sozinha, sem precisar falar com ninguém.",
  },
];

const FAQ_ITEMS = [
  {
    pergunta: "Preciso fazer um cadastro novo pra renovar?",
    resposta: "Não. A renovação usa o e-mail que você já tem cadastrado, e o mesmo usuário e senha do aplicativo continuam os mesmos.",
  },
  {
    pergunta: "Posso trocar a duração na hora de renovar?",
    resposta: "Sim. Se antes você estava no mensal e quer trocar pro trimestral ou semestral, é só escolher a nova duração na página de preço.",
  },
  {
    pergunta: "Perco os dias que ainda tinha se renovar antes de vencer?",
    resposta: "Não. A renovação estende o acesso a partir de quando ele vence, você não perde tempo pagando adiantado.",
  },
  {
    pergunta: "Paguei a renovação e o acesso não atualizou. O que fazer?",
    resposta: "A ativação costuma ser automática em poucos minutos após a confirmação do Pix. Se demorar além disso, fale com o suporte pelo WhatsApp com o comprovante em mãos.",
  },
  {
    pergunta: "A recarga muda meu usuário e senha do app?",
    resposta: "Não. Usuário e senha continuam exatamente os mesmos, você não precisa fazer login de novo no aplicativo depois de renovar.",
  },
];

export default function WplayRecargaPage() {
  return (
    <>
      <Breadcrumbs trilha={[{ nome: "Recarga" }]} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "Como renovar o WPlay",
          step: PASSOS.map((p) => ({ "@type": "HowToStep", name: p.titulo, text: p.texto })),
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
        <p className="section-label">Assinatura</p>
        <h1 className="mt-3 font-heading text-4xl font-extrabold tracking-tight text-text-primary sm:text-5xl">
          WPlay recarga: como renovar a assinatura
        </h1>
        <p className="mt-5 max-w-2xl text-text-secondary">
          A recarga do WPlay é pelo mesmo caminho de quem está assinando pela primeira vez: entra com seu
          e-mail, paga via Pix, e o acesso estende sozinho. Sem novo cadastro, sem trocar usuário e senha do
          app.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/minha-conta" className="btn btn-primary">Entrar e renovar</Link>
          <Link href="/precos" className="btn btn-outline">Ver preço</Link>
        </div>
        <p className="mt-4 text-sm text-text-tertiary">
          Ainda não é cliente? Antes de recarregar, <Link href="/teste-gratis" className="text-primary-bright underline underline-offset-2">faça o teste grátis de 4 horas</Link>.
        </p>
      </section>

      <section className="border-y border-border-subtle bg-bg-surface py-14 sm:py-18">
        <div className="container-x">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">Como funciona</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {PASSOS.map(({ icon: Icon, titulo, texto }, i) => (
              <div key={titulo} className="card border border-border-strong p-5">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-sm bg-primary text-xs font-bold text-cta-text">
                    {i + 1}
                  </span>
                  <Icon size={20} className="text-primary-bright" aria-hidden />
                </div>
                <h3 className="mt-3 font-heading text-base font-semibold text-text-primary">{titulo}</h3>
                <p className="mt-1.5 text-sm text-text-secondary">{texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-14 sm:py-18">
        <div className="flex items-center gap-2">
          <RefreshCw size={22} className="text-primary-bright" aria-hidden />
          <h2 className="font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            Recarga e renovação são a mesma coisa aqui
          </h2>
        </div>
        <p className="mt-4 max-w-3xl text-text-secondary">
          O WPlay vende um pacote só, o Essencial, em três durações. Não existe uma &quot;recarga&quot;
          separada de crédito avulso: renovar é simplesmente pagar de novo o mesmo pacote, e a validade soma a
          partir de quando seu acesso atual vence.
        </p>
        <p className="mt-3 max-w-3xl text-text-secondary">
          Se seu acesso já venceu, o caminho é idêntico: entra com o e-mail, paga, e o acesso volta a funcionar
          automaticamente, sem esperar ninguém liberar na mão.
        </p>
        <p className="mt-3 max-w-3xl text-text-secondary">
          A data de vencimento que aparece em{" "}
          <Link href="/minha-conta" className="text-primary-bright underline underline-offset-2">
            Minha conta
          </Link>{" "}
          vem sempre lida direto do mesmo painel que controla o acesso do aplicativo, nunca calculada por fora.
          Não existe o risco de o site mostrar uma data e o app aplicar outra: é a mesma fonte, sempre.
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
