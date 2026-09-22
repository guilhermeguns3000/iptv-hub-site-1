import type { Metadata } from "next";
import Link from "next/link";
import LeadTrialForm from "@/components/forms/LeadTrialForm";
import Faq from "@/components/ui/Faq";
import JsonLd from "@/components/ui/JsonLd";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "Teste Grátis do WPlay: Como Funciona o Acesso de 4h",
  description:
    "Entenda como funciona o teste grátis do WPlay: 4 horas de acesso completo ao plano Essencial, sem cartão de crédito e sem compromisso de assinatura.",
  alternates: { canonical: "/teste-gratis" },
};

const FAQ_ITEMS = [
  {
    pergunta: "O teste grátis do WPlay pede cartão de crédito?",
    resposta: "Não, em nenhuma etapa. Você recebe usuário e senha, testa por 4 horas e o acesso expira sozinho, sem virar cobrança.",
  },
  { pergunta: "Quanto tempo dura o teste?", resposta: "4 horas de acesso completo ao plano Essencial: IPTV e a tela P2P incluída." },
  {
    pergunta: "Posso pedir mais de um teste?",
    resposta: "O teste é liberado uma vez por pessoa. Se as 4 horas não forem suficientes para decidir, vale falar com o suporte antes de assinar.",
  },
  {
    pergunta: "O que acontece quando o teste acaba?",
    resposta: "O acesso expira automaticamente. Nada é cobrado, e nenhuma assinatura é ativada sozinha. Só continua quem decidir assinar depois.",
  },
  {
    pergunta: "O teste inclui a tela P2P ou só o IPTV?",
    resposta: "Inclui os dois, exatamente como no plano Essencial pago. Não existe uma versão reduzida para quem está testando.",
  },
  {
    pergunta: "Recebo o acesso na hora ou preciso esperar alguém liberar?",
    resposta: "Na hora. O sistema gera usuário e senha automaticamente assim que o formulário é enviado, sem depender de um atendente liberar manualmente.",
  },
  {
    pergunta: "Se eu não gostar durante o teste, preciso avisar alguém?",
    resposta: "Não. Se você não entrar em contato para assinar, o acesso simplesmente expira ao fim das 4 horas e nada é cobrado.",
  },
  {
    pergunta: "Como escolho se quero conteúdo adulto no meu teste?",
    resposta: "No próprio formulário de pedido, antes de gerar o acesso. Essa escolha define o pacote entregue desde o início.",
  },
];

export default function TesteGratisPage() {
  return (
    <>
      <Breadcrumbs trilha={[{ nome: "Teste grátis" }]} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "Como pedir o teste grátis do WPlay",
          totalTime: "PT4H",
          step: [
            { "@type": "HowToStep", name: "Preencher o formulário", text: "Informe nome completo, WhatsApp e e-mail." },
            { "@type": "HowToStep", name: "Escolher o tipo de conteúdo", text: "Selecione se o teste deve incluir conteúdo adulto ou não." },
            { "@type": "HowToStep", name: "Receber o acesso", text: "Usuário, senha e link de instalação chegam automaticamente." },
            { "@type": "HowToStep", name: "Instalar o app", text: "Siga o guia de instalação de acordo com o seu aparelho." },
            { "@type": "HowToStep", name: "Testar por 4 horas", text: "Assista aos canais e confira a estabilidade antes de decidir assinar." },
          ],
        }}
      />

      <section className="container-x grid gap-10 py-14 sm:py-18 lg:grid-cols-2 lg:items-start">
        {/* H1 primeiro no DOM (leitor de tela e Google leem nessa ordem) —
            a ordem visual (formulário em cima no celular) fica só no CSS. */}
        <div className="order-2 lg:order-1">
          <h1 className="font-heading text-4xl font-extrabold tracking-tight text-text-primary sm:text-5xl">
            Como funciona o teste grátis do WPlay
          </h1>
          <p className="mt-5 text-text-secondary">
            Pedir um teste antes de pagar por qualquer serviço de IPTV é decisão de quem já foi mal atendido em
            algum lugar. Faz sentido desconfiar: o mercado de revenda de IPTV é cheio de site que promete tudo
            e some depois do pagamento. O teste grátis do WPlay existe justamente para tirar essa dúvida antes
            de qualquer dinheiro trocar de mão.
          </p>

          <h2 className="mt-10 font-heading text-2xl font-bold text-text-primary">O que você recebe no teste</h2>
          <p className="mt-3 text-text-secondary">
            Usuário, senha e o link de instalação do aplicativo, entregues assim que o pedido é processado.
            Durante 4 horas, o acesso é idêntico ao de quem já assina: canais ao vivo em HD ou 4K, filmes,
            séries e a tela P2P incluída no plano Essencial. Não existe uma versão &quot;capada&quot; para quem está
            testando.
          </p>

          <h2 className="mt-10 font-heading text-2xl font-bold text-text-primary">Passo a passo para pedir o teste</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-text-secondary">
            <li>Preencha o formulário: nome completo, WhatsApp e e-mail.</li>
            <li>Escolha se quer conteúdo adulto incluso ou não.</li>
            <li>Receba o acesso na hora, sem depender de alguém liberar manualmente.</li>
            <li>
              Instale o app: veja{" "}
              <Link href="/wplay-p2p" className="text-primary-bright underline underline-offset-2">
                WPlay P2P: o app oficial e como instalar
              </Link>
              .
            </li>
            <li>Teste à vontade por 4 horas os canais que você realmente vai usar.</li>
            <li>
              Decida com informação: se fizer sentido continuar, você assina direto no site, via Pix, e a
              ativação é automática. Detalhes em{" "}
              <Link href="/precos" className="text-primary-bright underline underline-offset-2">
                Preço do WPlay
              </Link>
              .
            </li>
          </ol>

          <h2 className="mt-10 font-heading text-2xl font-bold text-text-primary">Por que não pedimos cartão de crédito</h2>
          <p className="mt-3 text-text-secondary">
            Porque o teste precisa ser, de fato, sem risco para quem está decidindo. Pedir dado de cartão para
            &quot;só testar&quot; é o tipo de fricção que normalmente esconde uma cobrança automática escondida no fim do
            prazo. Aqui não existe isso: passadas as 4 horas, o acesso simplesmente expira.
          </p>
        </div>

        <div className="card order-1 border border-border-subtle p-6 sm:p-8 lg:order-2 lg:sticky lg:top-24">
          <h2 className="font-heading text-xl font-bold text-text-primary">Peça seu teste agora</h2>
          <p className="mt-1 text-sm text-text-secondary">Acesso na hora. 4 horas, plano Essencial completo.</p>
          <div className="mt-6">
            <LeadTrialForm />
          </div>
        </div>
      </section>

      <section className="border-y border-border-subtle bg-bg-surface py-14 sm:py-18">
        <div className="container-x">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            Se o teste não chegar ou não funcionar
          </h2>
          <p className="mt-4 max-w-3xl text-text-secondary">
            Em raras situações, o e-mail com os dados de acesso pode atrasar. Se isso acontecer, o suporte pelo
            WhatsApp resolve na hora, sem precisar refazer o cadastro do zero. Se o app abrir mas os canais
            travarem, o roteiro de correção completo está em{" "}
            <Link href="/wplay-nao-funciona" className="text-primary-bright underline underline-offset-2">
              WPlay não funciona: o que fazer
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
