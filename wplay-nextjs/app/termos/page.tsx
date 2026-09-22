import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { planos, formatBRL, TESTE_DURACAO_HORAS } from "@/content/plans";

export const metadata: Metadata = {
  title: "Termos de Uso do WPlay: Teste, Assinatura e Suporte",
  description:
    "Regras do teste grátis, da assinatura Essencial, do pagamento via Pix, da renovação e do suporte do WPlay. Curto e sem letra miúda.",
  alternates: { canonical: "/termos" },
};

const ATUALIZADO = "21 de setembro de 2026";

export default function TermosPage() {
  return (
    <>
    <Breadcrumbs trilha={[{ nome: "Termos de uso" }]} />
    <section className="container-x max-w-3xl py-12 sm:py-16">
      <h1 className="font-heading text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl">
        Termos de uso
      </h1>
      <p className="mt-2 text-sm text-text-tertiary">Atualizados em {ATUALIZADO}.</p>
      <p className="mt-5 text-text-secondary">
        Ao pedir o teste grátis ou assinar, você concorda com o que está aqui. São as mesmas regras que o site
        já explica em cada página, reunidas num lugar só.
      </p>

      <div className="mt-10 space-y-10 text-text-secondary">
        <section>
          <h2 className="font-heading text-xl font-bold text-text-primary">1. O que é o serviço</h2>
          <p className="mt-3">
            O WPlay fornece acesso a uma lista de canais, filmes e séries por meio do aplicativo WPlay P2P e de
            aplicativos compatíveis, mediante usuário e senha. O aplicativo é gratuito; o que é cobrado é o acesso
            ao conteúdo, no plano Essencial.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-text-primary">2. Teste grátis</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>Dura {TESTE_DURACAO_HORAS} horas a partir da geração e expira sozinho, sem cobrança.</li>
            <li>É liberado uma vez por pessoa, identificada pelo WhatsApp e pelo e-mail informados.</li>
            <li>Exige nome, e-mail e WhatsApp válidos. Dados falsos ou repetidos podem ter o teste recusado.</li>
            <li>O acesso de teste é idêntico ao da assinatura; não existe versão reduzida.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-text-primary">3. Assinatura e pagamento</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>
              Existe um plano, o Essencial, em três durações:{" "}
              {planos.map((p, i) => (
                <span key={p.id}>
                  {p.nome.toLowerCase()} por R$ {formatBRL(p.preco)}
                  {i < planos.length - 1 ? ", " : "."}
                </span>
              ))}
            </li>
            <li>O pagamento é via Pix. A ativação é automática após a confirmação do pagamento.</li>
            <li>Não há fidelidade: o período contratado é só o período de cobrança.</li>
            <li>
              A validade é controlada pelo painel de acesso. A data exibida na área de conta é a que vale para o
              aplicativo.
            </li>
            <li>Renovação segue o mesmo caminho e soma dias a partir do vencimento atual, sem perda de dias pagos.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-text-primary">4. Uso permitido</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>O acesso é pessoal. Compartilhar usuário e senha com terceiros pode levar ao bloqueio da linha.</li>
            <li>O número de telas simultâneas é o do plano contratado.</li>
            <li>É proibido usar o acesso para redistribuição, revenda ou qualquer uso comercial.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-text-primary">5. Compatibilidade e instalação</h2>
          <p className="mt-3">
            O aplicativo WPlay roda em Android 5.0 ou superior, Fire OS, Windows e macOS. Smart TV Samsung, LG e
            Roku usam aplicativos compatíveis da própria loja, ativados por MAC ou código.
          </p>
          <p className="mt-3">
            Alguns aparelhos, como os Fire Stick com Vega OS, ainda não são compatíveis. As limitações por
            aparelho estão descritas nos{" "}
            <Link href="/guias" className="text-primary-bright underline underline-offset-2">
              guias de instalação
            </Link>
            , e recomendamos usar o teste grátis para confirmar o funcionamento no seu aparelho antes de assinar.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-text-primary">6. Suporte e reembolso</h2>
          <p className="mt-3">
            O suporte é pelo WhatsApp do rodapé, no horário publicado no site. Problemas de acesso são tratados
            primeiro pelos roteiros de{" "}
            <Link href="/wplay-nao-funciona" className="text-primary-bright underline underline-offset-2">
              WPlay não funciona
            </Link>{" "}
            e{" "}
            <Link href="/erro-ao-instalar" className="text-primary-bright underline underline-offset-2">
              erro ao instalar
            </Link>
            . Pedidos de reembolso são analisados pelo suporte, caso a caso, considerando o uso do acesso no
            período. O teste grátis existe justamente para evitar essa situação.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-text-primary">7. Disponibilidade</h2>
          <p className="mt-3">
            Nenhum serviço de transmissão é livre de instabilidade ocasional. Fatores fora do nosso controle, como a
            conexão do usuário e o horário de pico de um canal, afetam a experiência. Não prometemos funcionamento
            ininterrupto.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-text-primary">8. Dados pessoais</h2>
          <p className="mt-3">
            O tratamento dos seus dados está descrito na{" "}
            <Link href="/privacidade" className="text-primary-bright underline underline-offset-2">
              política de privacidade
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-text-primary">9. Alterações</h2>
          <p className="mt-3">
            Estes termos podem mudar quando o serviço mudar. A data no topo indica a versão em vigor.
          </p>
        </section>
      </div>
    </section>

    </>
  );
}
