import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import Faq from "@/components/ui/Faq";
import JsonLd from "@/components/ui/JsonLd";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { planos, beneficios, formatBRL } from "@/content/plans";

export const metadata: Metadata = {
  title: "Preço do WPlay: Mensal, Trimestral e Semestral",
  description:
    "Preço do plano Essencial do WPlay: IPTV completo + 1 tela P2P, mesmo pacote nas durações mensal, trimestral e semestral. Teste grátis antes de assinar.",
  alternates: { canonical: "/precos" },
};

const FAQ_ITEMS = [
  { pergunta: "Quanto custa o WPlay?", resposta: "R$ 29,99 no mensal, R$ 84,99 no trimestral (equivale a R$ 28,33/mês) e R$ 149,99 no semestral (equivale a R$ 25,00/mês). Sempre o mesmo pacote Essencial, pago via PIX." },
  {
    pergunta: "Existe um pacote mais barato ou mais caro no WPlay?",
    resposta: "Não. O WPlay vende um pacote só, o Essencial, com IPTV completo mais 1 tela P2P. O que muda entre mensal, trimestral e semestral é só a duração e o desconto por período mais longo, nunca o conteúdo.",
  },
  { pergunta: "O pagamento é só por PIX?", resposta: "Sim, hoje o pagamento é feito por PIX, com ativação automática assim que o pagamento é confirmado." },
  { pergunta: "Tem fidelidade em algum dos planos?", resposta: "Não. Mesmo o semestral não é um contrato de permanência, é só o período de cobrança escolhido." },
  {
    pergunta: "Quantas telas o pacote Essencial permite usar ao mesmo tempo?",
    resposta: "O pacote inclui IPTV completo mais 1 tela P2P dedicada, pensada especialmente para eventos ao vivo com muita audiência simultânea.",
  },
  {
    pergunta: "Preciso testar antes de assinar, ou posso ir direto para o pagamento?",
    resposta: "Você pode assinar direto, mas o recomendado é testar por 4 horas antes, sem custo, para confirmar que o app funciona bem no seu aparelho e na sua internet.",
  },
  { pergunta: "Como faço para renovar minha assinatura?", resposta: "Pelo mesmo botão de assinar nesta página, com o e-mail que você já usa. O sistema reconhece sua conta e renova automaticamente assim que o Pix confirma, sem precisar de um novo cadastro." },
  {
    pergunta: "O que acontece se eu pagar e o acesso não ativar na hora?",
    resposta: "A ativação costuma ser automática após a confirmação do PIX. Se demorar além de alguns minutos, o suporte confirma o status da sua conta diretamente.",
  },
];

export default function PrecosPage() {
  return (
    <>
      <Breadcrumbs trilha={[{ nome: "Preço" }]} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Assinatura de IPTV e P2P",
          name: "WPlay Essencial",
          description: "Pacote único de IPTV completo mais 1 tela P2P, com app próprio e suporte via WhatsApp, em três durações.",
          provider: { "@type": "Organization", name: "WPlay" },
          offers: planos.map((p) => ({
            "@type": "Offer",
            name: p.nome,
            price: (p.preco / 100).toFixed(2),
            priceCurrency: "BRL",
            priceValidUntil: `${new Date().getFullYear()}-12-31`,
            availability: "https://schema.org/InStock",
            url: "https://iptu2022br.com.br/precos",
          })),
        }}
      />

      <section className="container-x py-14 sm:py-18">
        <h1 className="font-heading text-4xl font-extrabold tracking-tight text-text-primary sm:text-5xl">
          Preço do WPlay: um pacote só, três durações
        </h1>
        <p className="mt-5 max-w-2xl text-text-secondary">
          O WPlay vende um pacote só, chamado <strong className="text-text-primary">Essencial</strong> (IPTV
          completo + 1 tela P2P), pago via PIX, sem fidelidade. Não existe uma versão mais barata com menos
          canais, nem uma mais cara com mais telas. O que você escolhe é só o período: mensal, trimestral ou
          semestral, quanto mais longo, menor o valor por mês.
        </p>

        {/* Grade de 3 durações do MESMO pacote */}
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {planos.map((p) => (
            <div
              key={p.id}
              className={`card relative flex flex-col p-6 ${
                p.maisEscolhido ? "border-2 border-primary-bright" : "border border-border-strong"
              }`}
            >
              {p.maisEscolhido && (
                <span className="badge absolute -top-3 left-6 bg-primary-bright text-bg-base">Mais escolhido</span>
              )}
              <h2 className="font-heading text-xl font-bold text-text-primary">{p.nome}</h2>
              <p className="mt-1 text-sm text-text-tertiary">{p.duracao} dias</p>
              <p className="mt-4">
                <span className="font-heading text-3xl font-extrabold text-text-primary">
                  R$ {formatBRL(p.preco)}
                </span>
              </p>
              <p className="mt-1 text-sm text-text-secondary">
                {p.economiaPercentual > 0
                  ? `sai por R$ ${formatBRL(p.precoMensalEquivalente)}/mês, ${p.economiaPercentual}% mais barato`
                  : "preço-base, sem desconto"}
              </p>
              <ul className="mt-5 space-y-2.5">
                {beneficios.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-sm text-text-secondary">
                    <Check size={16} className="shrink-0 text-success" aria-hidden />
                    {b}
                  </li>
                ))}
              </ul>
              <div className="mt-6 space-y-3">
                <Link href={`/checkout?plano=${p.id}`} className="btn btn-primary w-full">
                  Assinar {p.nome.toLowerCase()}
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <Link href="/teste-gratis" className="btn btn-outline">
            Testar antes de assinar
          </Link>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="font-heading text-2xl font-bold text-text-primary">Por que o preço do WPlay é um pacote só, e não uma grade</h2>
            <p className="mt-3 text-text-secondary">
              A maioria dos sites que disputa &quot;wplay planos&quot; hoje mostra várias versões de conteúdo lado
              a lado, forçando quem está decidindo a comparar canais, qualidade e telas ao mesmo tempo, sem nunca
              ter usado o serviço. Aqui a lógica é inversa: existe um pacote completo, e a única decisão real é
              o período de pagamento.
            </p>

            <h2 className="mt-8 font-heading text-2xl font-bold text-text-primary">Como funciona o pagamento</h2>
            <p className="mt-3 text-text-secondary">
              Via PIX, sem cartão de crédito armazenado em lugar nenhum. Depois de gerado o código PIX, a
              confirmação do pagamento ativa o acesso automaticamente. Se por qualquer motivo a ativação demorar
              mais que alguns minutos, o suporte via WhatsApp confirma o status na hora.
            </p>
          </div>
          <div>
            <h2 className="font-heading text-2xl font-bold text-text-primary">Teste antes de pagar, sempre</h2>
            <p className="mt-3 text-text-secondary">
              Mesmo aqui, na página de preço, o convite principal não é &quot;assine agora&quot;, é{" "}
              <Link href="/teste-gratis" className="text-primary-bright underline underline-offset-2">
                testar grátis por 4 horas antes de decidir
              </Link>
              . O teste resolve as duas dúvidas (o app instala direito e a sua internet segura os canais) antes
              de qualquer PIX ser gerado, em qualquer dos três períodos.
            </p>

            <h2 className="mt-8 font-heading text-2xl font-bold text-text-primary">Renovação</h2>
            <p className="mt-3 text-text-secondary">
              Pra renovar, use o mesmo botão de assinar com o e-mail da sua conta. O sistema reconhece que você
              já é cliente e estende o acesso automaticamente, sem gerar um cadastro novo. Detalhes em{" "}
              <Link href="/wplay-recarga" className="text-primary-bright underline underline-offset-2">
                WPlay recarga
              </Link>
              .
            </p>
            <p className="mt-3 text-text-secondary">
              Acesso que parou de funcionar antes do vencimento não é caso de renovação: o roteiro de
              diagnóstico está em{" "}
              <Link href="/wplay-nao-funciona" className="text-primary-bright underline underline-offset-2">
                WPlay não funciona
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-border-subtle bg-bg-surface py-14 sm:py-18">
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
