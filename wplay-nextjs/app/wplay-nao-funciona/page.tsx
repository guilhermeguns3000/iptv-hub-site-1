import type { Metadata } from "next";
import Link from "next/link";
import { Wifi, RefreshCw, KeyRound, CalendarClock, Server, Router } from "lucide-react";
import Faq from "@/components/ui/Faq";
import JsonLd from "@/components/ui/JsonLd";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "WPlay Não Funciona? Causas Reais e Solução",
  description:
    "WPlay não funciona ou travou? Veja as causas mais comuns, o passo a passo de correção e como diferenciar suporte oficial de revenda sem garantia.",
  alternates: { canonical: "/wplay-nao-funciona" },
};

const FAQ_ITEMS = [
  {
    pergunta: "Por que o WPlay não abre depois de instalado?",
    resposta: "Geralmente é versão desatualizada do app ou instalação incompleta. Reinstalar pela versão mais recente costuma resolver.",
  },
  {
    pergunta: "Por que o WPlay trava só em alguns canais?",
    resposta:
      "Canais com muita audiência simultânea (jogos, eventos ao vivo) podem oscilar em horário de pico em qualquer serviço de streaming, não só no WPlay. A tela P2P do plano Essencial existe justamente para reduzir esse efeito.",
  },
  {
    pergunta: "Paguei e o acesso não chegou, o que fazer?",
    resposta: "Confirme primeiro se o pagamento foi feito através do canal oficial do WPlay. Se foi, o suporte via WhatsApp confirma o status da ativação na hora.",
  },
  {
    pergunta: "Minha senha do WPlay parou de funcionar do nada, por quê?",
    resposta: "As causas mais comuns são acesso vencido ou espaço em branco digitado sem querer no campo de senha. Confirme a validade e redigite manualmente, sem copiar e colar.",
  },
  {
    pergunta: "O WPlay trava mais em Wi-Fi do que em internet a cabo?",
    resposta: "Pode acontecer, porque Wi-Fi está mais sujeito a interferência e oscilação do que uma conexão cabeada. Testar com cabo de rede ajuda a isolar se o problema é da internet ou do app.",
  },
  {
    pergunta: "Existe diferença entre o suporte do WPlay e de sites de revenda que usam o mesmo nome?",
    resposta:
      "Sim. Vários sites usam \"wplay\" no nome sem relação com quem mantém o aplicativo oficial, e concentram boa parte das reclamações públicas por sumirem depois do pagamento. O canal oficial começa pelo teste grátis, antes de qualquer cobrança.",
  },
  {
    pergunta: "Trocar o DNS realmente ajuda quando o WPlay trava?",
    resposta: "Em casos de carregamento lento, trocar para 8.8.8.8 costuma acelerar. Em travamento durante a reprodução, o mais comum ainda é internet instável.",
  },
  {
    pergunta: "Depois de resolver o problema, preciso reinstalar tudo de novo?",
    resposta: "Não, na maioria dos casos. Atualizar o app e corrigir usuário, senha ou DNS resolve sem precisar apagar e reinstalar o aplicativo inteiro.",
  },
];

const CAUSAS = [
  {
    icon: Wifi,
    titulo: "Internet instável ou lenta demais",
    texto:
      "Para canais em HD ou 4K sem travamento, o recomendado é 10 Mbps estáveis ou mais. Rodar um teste de velocidade no mesmo aparelho e horário em que o WPlay trava costuma revelar o problema de cara.",
  },
  {
    icon: RefreshCw,
    titulo: "App desatualizado",
    texto:
      "Como o WPlay é instalado fora da Google Play, ele não atualiza sozinho no mesmo ritmo automático de apps da loja. Vale checar se existe uma versão mais recente pelo mesmo link de instalação.",
  },
  {
    icon: KeyRound,
    titulo: "Credenciais digitadas com erro",
    texto:
      "O erro mais comum de \"usuário ou senha inválidos\" é espaço em branco copiado por engano, ou letra maiúscula onde deveria ser minúscula. Redigitar manualmente resolve boa parte dos casos.",
  },
  {
    icon: CalendarClock,
    titulo: "Acesso vencido",
    texto: "Se a assinatura venceu e ninguém renovou, o app simplesmente para de autenticar. Vale confirmar a data de vencimento antes de assumir que é um problema técnico.",
  },
  {
    icon: Server,
    titulo: "Servidor instável em horário de pico",
    texto:
      "Em eventos com audiência muito concentrada, qualquer serviço de streaming ao vivo pode oscilar minutos antes de estabilizar. É por isso que o plano Essencial inclui uma tela P2P.",
  },
  {
    icon: Router,
    titulo: "DNS do roteador ou do aparelho",
    texto: "Se os canais demoram muito para carregar mas eventualmente abrem, trocar o DNS para 8.8.8.8 nas configurações de rede costuma acelerar a resolução.",
  },
];

export default function WplayNaoFuncionaPage() {
  return (
    <>
      <Breadcrumbs trilha={[{ nome: "WPlay não funciona" }]} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "WPlay não funciona? Veja as causas reais e como resolver",
          description:
            "Causas comuns de instabilidade no WPlay, passo a passo de correção e como diferenciar o suporte oficial de sites de revenda sem garantia.",
          url: "https://iptu2022br.com.br/wplay-nao-funciona",
          inLanguage: "pt-BR",
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "Como resolver o WPlay quando ele não funciona",
          step: [
            { "@type": "HowToStep", name: "Testar a internet", text: "Confirme a velocidade e a estabilidade da conexão no mesmo aparelho e horário do problema." },
            { "@type": "HowToStep", name: "Atualizar o app", text: "Instale a versão mais recente disponível pelo link de acesso." },
            { "@type": "HowToStep", name: "Redigitar as credenciais", text: "Confirme usuário e senha manualmente, sem copiar e colar." },
            { "@type": "HowToStep", name: "Confirmar a validade do acesso", text: "Verifique se a assinatura ou o teste ainda está dentro do prazo." },
            { "@type": "HowToStep", name: "Trocar o DNS", text: "Ajuste o DNS para 8.8.8.8 se o carregamento estiver lento." },
            { "@type": "HowToStep", name: "Falar com o suporte", text: "Se o problema persistir, contate o suporte oficial via WhatsApp com detalhes do aparelho e do horário." },
          ],
        }}
      />

      <section className="container-x py-14 sm:py-18">
        <h1 className="font-heading text-4xl font-extrabold tracking-tight text-text-primary sm:text-5xl">
          WPlay não funciona? Veja as causas reais e como resolver
        </h1>
        <p className="mt-5 max-w-2xl text-text-secondary">
          Se você chegou aqui porque o WPlay parou de abrir, travou no meio de um canal ou não aceita seu
          usuário e senha, a boa notícia é que a grande maioria desses casos tem causa identificável e correção
          rápida.
        </p>
        <p className="mt-3 max-w-2xl text-text-secondary">
          Se o problema é antes disso (o app nem termina de instalar), o roteiro certo é{" "}
          <Link href="/erro-ao-instalar" className="text-primary-bright underline underline-offset-2">
            Deu erro ao instalar o WPlay
          </Link>
          .
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/teste-gratis" className="btn btn-primary">Pedir novo teste grátis</Link>
          <a
            href={`https://wa.me/${(process.env.NEXT_PUBLIC_WHATSAPP || "5562993901860").replace(/\D/g, "")}?text=${encodeURIComponent("Olá! Meu WPlay não está funcionando, pode me ajudar?")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            Falar com o suporte
          </a>
        </div>
      </section>

      <section className="border-y border-border-subtle bg-bg-surface py-14 sm:py-18">
        <div className="container-x">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            WPlay não funciona: as causas mais comuns, na ordem que vale checar
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CAUSAS.map(({ icon: Icon, titulo, texto }, i) => (
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
        <h2 className="font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
          Por que tanta reclamação sobre &quot;wplay&quot; não é sobre o WPlay oficial
        </h2>
        <p className="mt-4 max-w-3xl text-text-secondary">
          O nome WPlay é usado, sem autorização, por um número grande de sites de revenda que vendem acesso por
          conta própria, sem ligação com quem mantém o aplicativo.
        </p>
        <p className="mt-3 max-w-3xl text-text-secondary">
          Boa parte das reclamações públicas sobre &quot;wplay&quot; descreve um padrão parecido: pagamento
          feito, acesso que nunca chega ou some depois de pouco tempo, e suporte pelo WhatsApp que para de
          responder.
        </p>
        <p className="mt-3 max-w-3xl text-text-secondary">
          O problema descrito nesses casos não é instabilidade técnica de um aplicativo. É ausência de suporte
          depois da venda.
        </p>
        <p className="mt-4 max-w-3xl text-text-secondary">
          É por isso que o funil oficial do WPlay começa pelo teste grátis de 4 horas, antes de qualquer
          pagamento. Veja como pedir o seu em{" "}
          <Link href="/teste-gratis" className="text-primary-bright underline underline-offset-2">
            Teste grátis do WPlay: como funciona
          </Link>
          .
        </p>

        <h2 className="mt-10 font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
          Como diferenciar suporte oficial de revenda sem garantia
        </h2>
        <ul className="mt-4 max-w-3xl list-disc space-y-2 pl-5 text-text-secondary">
          <li>O teste vem antes do pagamento, não depois.</li>
          <li>O suporte responde durante o horário em que diz que responde.</li>
          <li>
            O preço é único e claro, sem letra miúda. Veja o{" "}
            <Link href="/precos" className="text-primary-bright underline underline-offset-2">
              preço do plano Essencial
            </Link>
            .
          </li>
          <li>
            A instalação segue um processo documentado. Veja{" "}
            <Link href="/wplay-p2p" className="text-primary-bright underline underline-offset-2">
              WPlay P2P: o app oficial e como instalar
            </Link>
            .
          </li>
        </ul>
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
