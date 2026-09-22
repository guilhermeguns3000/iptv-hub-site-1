import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Download, ShieldCheck, RefreshCw, AlertTriangle, CheckCircle2, XCircle, Search } from "lucide-react";
import Faq from "@/components/ui/Faq";
import JsonLd from "@/components/ui/JsonLd";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "IPTV no Fire Stick: Como Instalar o WPlay (2026)",
  description:
    "IPTV no Fire Stick com o WPlay, pelo Downloader. Veja quais modelos com Vega OS não são compatíveis e a solução para quando o Downloader some da lista.",
  alternates: { canonical: "/guias/fire-stick" },
};

const NAO_COMPATIVEIS = ["Fire TV Stick 4K Select", "Fire TV Stick HD (2026)"];
const COMPATIVEIS = ["Fire TV Stick 4K Max", "Fire TV Stick 4K Plus", "Fire TV Stick HD (2024)"];

const FAQ_ITEMS = [
  {
    pergunta: "Preciso pagar alguma coisa pra instalar pelo Downloader?",
    resposta: "Não. O Downloader é gratuito, disponível na própria Amazon Appstore do seu Fire Stick.",
  },
  {
    pergunta: "O aviso de instalar de fontes desconhecidas é perigoso?",
    resposta:
      "Não. Todo app instalado fora da Amazon Appstore dispara esse aviso, porque é assim que o Fire OS confirma que foi você mesmo quem autorizou. Não é um alerta de vírus.",
  },
  {
    pergunta: "O Downloader sumiu da lista de apps autorizados a instalar. O que fazer?",
    resposta:
      "É um bug conhecido das versões mais recentes do Fire OS 7 e 8, não é defeito do aparelho. A solução é usar o X-plore File Manager pra liberar a permissão. O passo a passo completo está nesta página.",
  },
  {
    pergunta: "Meu Fire Stick é um modelo com Vega OS, dá pra usar o WPlay?",
    resposta:
      "Ainda não. Os modelos lançados a partir de outubro de 2025 com o novo sistema Vega OS (baseado em Linux) não são compatíveis no momento. Veja a lista de modelos afetados nesta página.",
  },
  {
    pergunta: "Como sei se meu Fire Stick já é um modelo Vega OS?",
    resposta:
      "Vá em Configurações › Meu Fire TV › Sobre e veja o nome exato do modelo. Existe Fire Stick HD dos dois lados (2024 e 2026), e pela caixa não dá pra diferenciar.",
  },
  {
    pergunta: "Preciso ativar a Depuração ADB pra instalar pelo X-plore?",
    resposta: "Não é necessário. E enquanto usa esse método, não desinstale o Downloader nem instale APK de fonte que você não conhece.",
  },
];

export default function GuiaFireStickPage() {
  return (
    <>
      <Breadcrumbs trilha={[{ nome: "Guias", href: "/guias" }, { nome: "Fire Stick" }]} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "Como instalar o WPlay no Fire Stick",
          step: [
            { "@type": "HowToStep", name: "Instalar o Downloader", text: "Na tela inicial do Fire Stick, busque e instale o app Downloader na Amazon Appstore." },
            { "@type": "HowToStep", name: "Digitar o código", text: "Abra o Downloader, digite o código de instalação do WPlay e confirme." },
            { "@type": "HowToStep", name: "Autorizar a instalação", text: "Aceite a permissão de instalar apps de fontes desconhecidas quando o Fire OS pedir." },
            { "@type": "HowToStep", name: "Fazer login", text: "Abra o WPlay na tela inicial e informe usuário, senha e URL do servidor recebidos." },
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

      <section className="container-x grid gap-8 py-12 sm:py-16 lg:grid-cols-[1fr_20rem] lg:items-start">
        <div>
          <h1 className="font-heading text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl">
            IPTV no Fire Stick: como instalar o WPlay
          </h1>
          <p className="mt-4 max-w-xl text-text-secondary">
            O Fire Stick é um dos aparelhos mais usados para IPTV no Brasil, mas não tem o WPlay na loja padrão
            da Amazon, então a instalação é feita por sideload. O processo leva menos de cinco minutos e só
            precisa de um app auxiliar, o Downloader.
          </p>
          <p className="mt-3 max-w-xl text-text-secondary">
            Antes de começar, confira o modelo ao lado. Os Fire Stick lançados a partir de outubro de 2025 vêm
            com outro sistema e ainda não instalam o aplicativo, então vale checar isso primeiro em vez de
            descobrir no meio do caminho.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href="/teste-gratis" className="btn btn-primary">Pedir teste grátis de 4 horas</Link>
            <Link href="/apps" className="btn btn-outline">Ver código de instalação</Link>
          </div>
        </div>

        <div className="card border border-border-strong p-5">
          <p className="font-heading text-sm font-bold uppercase tracking-wide text-text-tertiary">
            Confira seu modelo
          </p>
          <p className="mt-3 flex items-center gap-1.5 text-sm font-bold text-danger">
            <XCircle size={16} aria-hidden /> Não instala
          </p>
          <ul className="mt-1.5 space-y-1 text-sm text-text-secondary">
            {NAO_COMPATIVEIS.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
          <p className="mt-4 flex items-center gap-1.5 text-sm font-bold text-success">
            <CheckCircle2 size={16} aria-hidden /> Instala normalmente
          </p>
          <ul className="mt-1.5 space-y-1 text-sm text-text-secondary">
            {COMPATIVEIS.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
          <p className="mt-4 border-t border-border-subtle pt-3 text-xs text-text-tertiary">
            Atenção ao &quot;HD&quot;: existe nos dois lados. O de 2024 funciona, o de 2026 não.
          </p>
        </div>
      </section>

      <section className="border-y border-border-subtle bg-bg-surface py-14 sm:py-18">
        <div className="container-x">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">Passo a passo</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="card border border-border-strong p-5">
              <div className="flex items-center gap-2">
                <Download size={20} className="text-primary-bright" aria-hidden />
                <p className="font-semibold text-text-primary">1. Instale o Downloader</p>
              </div>
              <p className="mt-2 text-sm text-text-secondary">
                Na tela inicial do Fire Stick, vá em Buscar e digite &quot;Downloader&quot;. É um app gratuito
                da própria Amazon Appstore.
              </p>
            </div>
            <div className="card border border-border-strong p-5">
              <div className="flex items-center gap-2">
                <Download size={20} className="text-primary-bright" aria-hidden />
                <p className="font-semibold text-text-primary">2. Digite o código</p>
              </div>
              <p className="mt-2 text-sm text-text-secondary">
                Abra o Downloader e digite o código de instalação do WPlay. A instalação começa automaticamente.
              </p>
            </div>
            <div className="card border border-border-strong p-5">
              <div className="flex items-center gap-2">
                <ShieldCheck size={20} className="text-primary-bright" aria-hidden />
                <p className="font-semibold text-text-primary">3. Autorize a instalação</p>
              </div>
              <p className="mt-2 text-sm text-text-secondary">
                O Fire OS vai avisar sobre &quot;fontes desconhecidas&quot;. É esperado. Confirme e a
                instalação segue normal.
              </p>
            </div>
            <div className="card border border-border-strong p-5">
              <div className="flex items-center gap-2">
                <RefreshCw size={20} className="text-primary-bright" aria-hidden />
                <p className="font-semibold text-text-primary">4. Login e pronto</p>
              </div>
              <p className="mt-2 text-sm text-text-secondary">
                Abra o WPlay na tela inicial, informe usuário, senha e URL do servidor. Da próxima vez, ele abre
                sozinho com o aparelho.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bug do Fire OS 7/8: Downloader some da lista */}
      <section className="container-x py-14 sm:py-18">
        <div className="flex items-center gap-2">
          <AlertTriangle size={22} className="text-primary-bright" aria-hidden />
          <h2 className="font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            Downloader sumiu da lista de apps autorizados?
          </h2>
        </div>
        <p className="mt-4 max-w-3xl text-text-secondary">
          Nas versões mais recentes do Fire OS 7 e 8 (modelos de 2025), o Downloader pode não aparecer na lista
          de apps autorizados a instalar arquivos. É um bug do sistema, não significa que o aparelho está com
          defeito.
        </p>
        <p className="mt-3 max-w-3xl text-text-secondary">
          Nesse caso, o caminho que resolve é liberar a permissão por outro app de arquivos, o X-plore File
          Manager. Não funciona pra quem já está no Vega OS, que é uma situação diferente, tratada mais abaixo.
        </p>

        <ol className="mt-6 max-w-3xl list-decimal space-y-2 pl-5 text-text-secondary">
          <li>
            Instale o <strong className="text-text-primary">X-plore File Manager</strong>, da Lonely Cat Games,
            pela Amazon Appstore.
          </li>
          <li>Abra o X-plore pelo menos uma vez.</li>
          <li>
            Acesse Configurações › Meu Fire TV › Opções para desenvolvedores › Instalar aplicativos
            desconhecidos.
          </li>
          <li>Quando o X-plore aparecer na lista, ative a permissão.</li>
          <li>Baixe normalmente o arquivo APK pelo Downloader.</li>
          <li>Abra o X-plore e acesse Armazenamento interno › pasta Downloader ou Download.</li>
          <li>Selecione o arquivo APK baixado e toque em Instalar.</li>
        </ol>
        <p className="mt-4 max-w-3xl text-sm text-text-tertiary">
          Se o X-plore não aparecer na lista de permissões, vá em Configurações › Meu Fire TV › Reiniciar, abra o
          X-plore de novo e repita o procedimento. Não é necessário ativar a Depuração ADB. Enquanto usa esse
          método, não desinstale o Downloader e instale só APK de fonte confiável.
        </p>
      </section>

      {/* Vega OS: incompatibilidade real */}
      <section className="border-y border-border-subtle bg-bg-surface py-14 sm:py-18">
        <div className="container-x">
          <div className="flex items-center gap-2">
            <XCircle size={22} className="text-danger" aria-hidden />
            <h2 className="font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
              Fire Stick novo (Vega OS): ainda não é compatível
            </h2>
          </div>
          <p className="mt-4 max-w-3xl text-text-secondary">
            A Amazon trocou o sistema dos Fire Stick lançados a partir de outubro de 2025 para o Vega OS, baseado
            em Linux. É um sistema novo, com poucos apps ainda, e o WPlay está apresentando falha nessa versão.
            Por enquanto, não oferecemos teste nem assinatura pra quem tem um desses aparelhos.
          </p>
          <p className="mt-3 max-w-3xl text-text-secondary">
            Se o seu já é um modelo Vega OS, uma alternativa que está funcionando é o{" "}
            <strong className="text-text-primary">STZ Player</strong>, um app de terceiros com teste próprio de 7
            dias grátis, separado da nossa assinatura.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div>
              <div className="flex items-center gap-2">
                <XCircle size={18} className="text-danger" aria-hidden />
                <p className="font-semibold text-text-primary">Não compatível no momento</p>
              </div>
              <ul className="mt-3 space-y-1.5 text-sm text-text-secondary">
                {NAO_COMPATIVEIS.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
              <div className="mt-4 flex gap-3">
                <Image
                  src="/brand/guias/firestick-vega-incompativel-1.webp"
                  alt="Fire TV Stick com Vega OS, modelo atualmente incompatível com o WPlay"
                  width={400}
                  height={400}
                  className="w-1/2 max-w-[160px] rounded-lg border border-border-subtle"
                />
                <Image
                  src="/brand/guias/firestick-vega-incompativel-2.webp"
                  alt="Outro modelo de Fire TV Stick com Vega OS, incompatível com o WPlay"
                  width={640}
                  height={640}
                  className="w-1/2 max-w-[160px] rounded-lg border border-border-subtle"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={18} className="text-success" aria-hidden />
                <p className="font-semibold text-text-primary">Compatível, funciona normalmente</p>
              </div>
              <ul className="mt-3 space-y-1.5 text-sm text-text-secondary">
                {COMPATIVEIS.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="card mt-8 max-w-3xl border border-border-strong p-5">
            <div className="flex items-center gap-2">
              <Search size={18} className="text-primary-bright" aria-hidden />
              <p className="font-semibold text-text-primary">Não sabe qual é o seu?</p>
            </div>
            <p className="mt-2 text-sm text-text-secondary">
              Existe Fire Stick HD nos dois lados (2024 e 2026), e pela caixa não dá pra diferenciar. No
              aparelho, vá em Configurações › Meu Fire TV › Sobre e veja o nome do modelo, que é o que diz de
              qual geração o aparelho é.
            </p>
          </div>

          <p className="mt-6 max-w-3xl text-sm text-text-tertiary">
            O mesmo acesso funciona em TV Box Android, Android TV, Smart TV Samsung e LG e no celular, tudo ao
            mesmo tempo. Se o Fire Stick novo travar, você assiste por outro aparelho sem pagar nada a mais.
          </p>
        </div>
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
