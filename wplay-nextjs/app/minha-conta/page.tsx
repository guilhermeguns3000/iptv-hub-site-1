import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { LogOut, MessageCircle, RefreshCw, Headset, Smartphone, Info } from "lucide-react";
import { getSession } from "@/lib/auth";
import { buscarTestePorEmail } from "@/lib/store";
import { buscarValidadeReal } from "@/lib/knewcms";
import LoginEmailForm from "@/components/forms/LoginEmailForm";
import CredentialField from "@/components/ui/CredentialField";
import Faq from "@/components/ui/Faq";
import JsonLd from "@/components/ui/JsonLd";
import VipBanner from "@/components/client/VipBanner";
import AtivarAppForm from "@/components/client/AtivarAppForm";
import AssistenteInstalacao from "@/components/client/AssistenteInstalacao";
import ValidadeCard from "@/components/client/ValidadeCard";
import { getPlano, planos, formatBRL, beneficios } from "@/content/plans";
import { Check } from "lucide-react";

const FAQ_LOGIN = [
  {
    pergunta: "Esqueci minha senha do WPlay, e agora?",
    resposta:
      "Não precisa lembrar nada. Digite seu e-mail nesta página e mandamos um link de acesso direto pra caixa de entrada, sem senha de site pra decorar.",
  },
  {
    pergunta: "O login daqui é o mesmo do app?",
    resposta:
      "Não. Esta página é a área de conta do site, acessada por e-mail. O login do aplicativo continua sendo usuário, senha e URL do servidor, mostrados aqui depois que você entra.",
  },
  {
    pergunta: "Não recebi o e-mail com o link de acesso.",
    resposta:
      "Confira a caixa de spam primeiro. O link vale por 15 minutos, então se demorar demais, peça um novo nesta mesma página.",
  },
  {
    pergunta: "Posso usar um e-mail diferente do que cadastrei?",
    resposta: "Não. O acesso é vinculado ao e-mail usado no teste grátis ou na assinatura, não a qualquer e-mail.",
  },
];

const METADATA_LOGIN: Metadata = {
  title: "WPlay Login: Entrar na Sua Conta",
  description:
    "WPlay login pelo e-mail do teste ou da assinatura. Sem senha pra decorar: mandamos um link de acesso direto. Veja usuário, senha e vencimento.",
  alternates: { canonical: "/minha-conta" },
};

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSession();
  return s?.email ? { title: "Minha conta", robots: { index: false, follow: false } } : METADATA_LOGIN;
}

export default async function MinhaContaPage() {
  const session = await getSession();

  if (!session?.email) {
    return (
      <>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQ_LOGIN.map((f) => ({ "@type": "Question", name: f.pergunta, acceptedAnswer: { "@type": "Answer", text: f.resposta } })),
          }}
        />

        <section className="container-x grid gap-10 py-14 sm:py-20 lg:grid-cols-2 lg:items-start">
          {/* H1 primeiro no DOM (leitor de tela e Google leem nessa ordem) —
              a ordem visual (formulário em cima no celular) fica só no CSS. */}
          <div className="order-2 lg:order-1">
            <h1 className="font-heading text-4xl font-extrabold tracking-tight text-text-primary sm:text-5xl">
              WPlay login: entrar na sua conta
            </h1>
            <p className="mt-5 max-w-xl text-text-secondary">
              A área de conta do WPlay não usa senha de site. Você entra com o e-mail que usou no teste grátis
              ou na assinatura, e a gente manda um link de acesso único direto pra sua caixa de entrada.
            </p>
            <p className="mt-3 max-w-xl text-text-secondary">
              Depois de entrar, você vê seu usuário e senha do aplicativo (esses continuam sendo os mesmos de
              sempre), o status da sua assinatura e o link pra renovar quando precisar.
            </p>

            <h2 className="mt-10 font-heading text-xl font-bold text-text-primary">O que você encontra depois do login</h2>
            <ul className="mt-4 max-w-xl space-y-3 text-text-secondary">
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-bright" aria-hidden />
                <span>
                  <strong className="text-text-primary">Usuário e senha do app</strong>, com botão de copiar, pra
                  não errar na digitação pelo controle remoto.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-bright" aria-hidden />
                <span>
                  <strong className="text-text-primary">Vencimento real</strong>, lido direto do painel que
                  controla o acesso, nunca calculado por fora.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-bright" aria-hidden />
                <span>
                  <strong className="text-text-primary">Importar lista por MAC ou código</strong> em app de Samsung,
                  LG, Roku ou qualquer player compatível, sem digitar usuário e senha na TV.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-bright" aria-hidden />
                <span>
                  <strong className="text-text-primary">Renovação pelo mesmo caminho</strong>, com o Pix que ativa
                  sozinho assim que confirma.
                </span>
              </li>
            </ul>
          </div>

          <div className="card order-1 border border-border-subtle p-6 sm:p-8 lg:order-2 lg:sticky lg:top-24">
            <h2 className="font-heading text-xl font-bold text-text-primary">Entrar na minha conta</h2>
            <p className="mt-1 text-sm text-text-secondary">
              Digite seu e-mail e mandamos um link de acesso. Sem senha de site pra decorar.
            </p>
            <div className="mt-6">
              <LoginEmailForm />
            </div>
          </div>
        </section>

        <section className="border-t border-border-subtle bg-bg-surface py-14 sm:py-18">
          <div className="container-x">
            <h2 className="font-heading text-2xl font-bold text-text-primary sm:text-3xl">Perguntas frequentes</h2>
            <div className="mt-8 max-w-3xl">
              <Faq items={FAQ_LOGIN} />
            </div>
          </div>
        </section>
      </>
    );
  }

  const cliente = await buscarTestePorEmail(session.email);
  if (!cliente) {
    return (
      <section className="container-x py-14 text-center sm:py-20">
        <p className="text-text-secondary">Não encontramos sua conta. Fale com o suporte.</p>
        <Link href="/wplay-nao-funciona" className="btn btn-primary mt-4 inline-block">
          Falar com o suporte
        </Link>
      </section>
    );
  }

  const expDateIso = await buscarValidadeReal(cliente.id).catch(() => null);
  const expira = expDateIso ? new Date(expDateIso) : null;
  const venceu = expira ? expira.getTime() < Date.now() : null;

  // Regra real do appwplay: todo cliente que pagou é direcionado pro
  // Suporte VIP, com os dados já preenchidos na mensagem. Número fica
  // restrito a quem já pagou e está logado — por isso a env var NÃO leva o
  // prefixo NEXT_PUBLIC_ (esse prefixo manda o valor pro bundle do
  // navegador, visível a qualquer visitante; aqui só pode ser lido no
  // servidor, dentro deste Server Component, depois da checagem de sessão
  // e de `cliente.pago` acima).
  // Sem reserva fixa no código: o número VIP só existe na env da Vercel. Se
  // faltar, o bloco VIP some e o log avisa, em vez de expor um número aqui.
  const vipNumero = (process.env.WHATSAPP_VIP || "").replace(/\D/g, "");
  const planoNome = cliente.pago ? getPlano(cliente.pago.plano)?.nome ?? cliente.pago.plano : null;
  if (cliente.pago && !vipNumero) console.error("[minha-conta] WHATSAPP_VIP ausente: bloco VIP oculto para um pagante");
  const vipUrl = cliente.pago && vipNumero
    ? `https://wa.me/${vipNumero}?text=${encodeURIComponent(
        `Olá! Sou ${cliente.nome}, acabei de assinar e quero ativar meu Suporte VIP.\n\n` +
          `Meus dados:\n` +
          `Nome: ${cliente.nome}\n` +
          `E-mail: ${cliente.email}\n` +
          `Site: WPlay\n` +
          `Plano: ${planoNome}\n` +
          `Usuário: ${cliente.username}\n` +
          `Senha: ${cliente.password}\n\n` +
          `Pode confirmar a ativação e me dar o Suporte VIP?`,
      )}`
    : null;

  const whatsapp = (process.env.NEXT_PUBLIC_WHATSAPP || "5562993901860").replace(/\D/g, "");
  const ehTeste = !cliente.pago;
  const rotuloPlano = ehTeste ? "Teste" : (planoNome ?? "Assinatura");
  const pagante = !ehTeste && venceu === false;
  const suporteUrl = `https://wa.me/${whatsapp}?text=${encodeURIComponent(
    `Olá! Preciso de ajuda.\nNome: ${cliente.nome}\nPlano: ${rotuloPlano}\nUsuário: ${cliente.username}`,
  )}`;

  return (
    <section className="container-x py-10 sm:py-14">
      <div className="mx-auto max-w-2xl space-y-5">
        {vipUrl && <VipBanner url={vipUrl} chave={cliente.username} />}

        {/* Cabeçalho: mesma estrutura do painel real (avatar, boas-vindas, selos) */}
        <div className="card relative overflow-hidden border border-border-subtle p-5 sm:p-6">
          <div aria-hidden className="pointer-events-none absolute inset-0 glow-primary opacity-70" />
          <div className="relative flex flex-wrap items-center gap-4">
          <span className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-bg-base ring-2 ring-primary-bright/60 shadow-[0_0_0_6px_rgba(139,181,46,0.12)]">
            <Image src="/brand/icon-128.png" alt="" width={56} height={56} className="h-12 w-12 rounded-full" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="section-label whitespace-nowrap">Bem-vindo(a)</p>
            <h1 className="mt-1 font-heading text-2xl font-extrabold tracking-tight text-text-primary sm:text-3xl">{cliente.nome}</h1>
          </div>
          <div className="flex basis-full flex-row items-center gap-2 sm:basis-auto sm:flex-col sm:items-end">
            <span className={`rounded-sm px-2 py-0.5 text-xs font-bold ${venceu ? "bg-danger/15 text-danger" : "bg-primary/15 text-primary-bright"}`}>
              {expira === null ? "Status indisponível" : venceu ? "Expirado" : "Ativo"}
            </span>
            <span className="rounded-sm border border-border-strong px-2 py-0.5 text-xs font-semibold text-text-secondary">{rotuloPlano}</span>
          </div>
          </div>
        </div>

        {expira && (
          <ValidadeCard
            criadoEm={cliente.criadoEm}
            expiraEm={expira.getTime()}
            cta={{ href: "#planos", rotulo: pagante ? "Renovar plano" : ehTeste ? "Assinar agora" : "Reativar acesso" }}
          />
        )}

        {/* Assistente de 4 passos: aparelho, app, instalar/ativar, pronto */}
        <AssistenteInstalacao
          nome={cliente.nome}
          username={cliente.username}
          password={cliente.password}
          whatsapp={whatsapp}
          plano={rotuloPlano}
          expira={expira ? expira.toLocaleString("pt-BR") : null}
          ehTeste={ehTeste}
        />


        <div className="card border border-border-subtle p-5">
          <p className="font-heading text-lg font-bold text-text-primary">WPlay: IPTV e P2P</p>
          <p className="text-xs text-text-tertiary">Canais ao vivo, filmes, séries e P2P. Mesmo usuário e senha em todos os apps.</p>
          <div className="mt-4 space-y-3">
            <CredentialField label="Usuário" valor={cliente.username} />
            <CredentialField label="Senha" valor={cliente.password} />
          </div>
        </div>

        <div className="card border border-border-subtle p-5">
          <p className="font-heading text-lg font-bold text-text-primary">Importar lista no app, por MAC ou código</p>
          <p className="mt-1 text-sm text-text-secondary">
            Pra Samsung, LG, Roku ou qualquer app com essa função: abra o app na TV, ele mostra um código ou MAC
            na tela, cole aqui e a lista entra sozinha, sem digitar usuário e senha.
          </p>
          <div className="mt-4">
            <AtivarAppForm />
          </div>
        </div>


        {/* Planos dentro da conta, como o painel real: assinante renova, quem
            nunca pagou ativa. Mesmo checkout; o webhook decide ativar ou estender. */}
        <div id="planos" className="card relative scroll-mt-24 overflow-hidden border border-border-subtle p-5 sm:p-6">
          <div aria-hidden className="pointer-events-none absolute inset-0 glow-primary opacity-60" />
          <div className="relative">
            <p className="section-label">{pagante ? "Renovar" : ehTeste ? "Assinar" : "Reativar"}</p>
            <p className="mt-2 font-heading text-xl font-bold text-text-primary">
              {pagante
                ? "Renove antes de vencer e não perde nenhum dia"
                : ehTeste
                  ? "Gostou do teste? A mesma conta vira assinatura"
                  : "Seu acesso venceu: reative na hora, via Pix"}
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              {pagante
                ? "A validade soma a partir do vencimento atual. Mesmo usuário e senha, sem reinstalar."
                : "Plano Essencial: IPTV completo mais 1 tela P2P. Pagamento via Pix, ativação automática, sem fidelidade."}
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {planos.map((pl) => (
                <div key={pl.id} className={`card flex flex-col p-4 ${pl.maisEscolhido ? "card-destaque" : "border border-border-subtle"}`}>
                  {pl.maisEscolhido && <span className="badge mb-2 self-start bg-primary-bright text-bg-base">Mais escolhido</span>}
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-text-tertiary">{pl.nome}</p>
                  <p className="mt-1 font-heading text-2xl font-extrabold text-text-primary">R$ {formatBRL(pl.preco)}</p>
                  <p className="text-xs text-text-tertiary">{pl.duracao} dias{pl.economiaPercentual > 0 ? `, ${pl.economiaPercentual}% mais barato` : ""}</p>
                  <Link href={`/checkout?plano=${pl.id}`} className={`mt-3 w-full py-2 text-sm ${pl.maisEscolhido ? "btn btn-primary" : "btn btn-outline"}`}>
                    {pagante ? "Renovar" : "Assinar"}
                  </Link>
                </div>
              ))}
            </div>
            <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-text-secondary">
              {beneficios.map((b) => (
                <li key={b} className="flex items-center gap-1.5"><Check size={12} className="text-primary-bright" aria-hidden /> {b}</li>
              ))}
            </ul>
          </div>
        </div>

        {pagante && vipUrl && (
          <div className="card card-destaque p-5">
            <p className="section-label">Suporte VIP do assinante</p>
            <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-start">
              <div className="icon-tile shrink-0"><MessageCircle size={22} aria-hidden /></div>
              <div className="min-w-0 flex-1">
                <p className="font-heading text-lg font-bold text-text-primary">Salve nosso número VIP nos seus contatos</p>
                <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">
                  Esse é o canal exclusivo de quem assina. É por ele que avisamos quando a renovação está perto, quando sai
                  atualização do app e resolvemos qualquer problema com prioridade. Se o número não estiver salvo, a mensagem
                  pode chegar como contato desconhecido e você perde o aviso.
                </p>
                <a href={vipUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-4 w-full sm:w-auto">
                  <MessageCircle size={16} aria-hidden /> Abrir Suporte VIP no WhatsApp
                </a>
                <p className="mt-2 text-xs text-text-tertiary">Ao abrir a conversa, toque no nome e escolha "Adicionar aos contatos". A mensagem já vai com seus dados.</p>
              </div>
            </div>
          </div>
        )}

        {/* Ações, como o painel real: renovar/assinar, suporte com dados, apps, guias */}
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
          <a href="#planos" className="btn btn-primary col-span-3 py-3 text-sm sm:col-span-1">
            <RefreshCw size={16} aria-hidden /> {pagante ? "Renovar plano" : "Assinar"}
          </a>
          <a href={pagante && vipUrl ? vipUrl : suporteUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline py-2.5 text-sm"><Headset size={16} aria-hidden /> {pagante && vipUrl ? "Suporte VIP" : "Suporte"}</a>
          <Link href="/apps" className="btn btn-outline py-2.5 text-sm"><Smartphone size={16} aria-hidden /> Apps</Link>
          <Link href="/guias" className="btn btn-outline py-2.5 text-sm"><Info size={16} aria-hidden /> Guias</Link>
        </div>

        <p className="text-center text-sm text-text-tertiary">
          Problema no acesso?{" "}
          <Link href="/wplay-nao-funciona" className="text-primary-bright underline underline-offset-2">Veja o que fazer</Link>
          {" "}ou{" "}
          <a href="/api/minha-conta/sair" className="inline-flex items-center gap-1 text-text-tertiary underline underline-offset-2 hover:text-text-primary"><LogOut size={14} aria-hidden /> sair</a>.
        </p>
      </div>
    </section>
  );
}
