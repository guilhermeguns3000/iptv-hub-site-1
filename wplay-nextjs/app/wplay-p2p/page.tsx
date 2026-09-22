import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Smartphone, Tv, Monitor, Cast, RefreshCw, ShieldCheck, Download } from "lucide-react";
import Faq from "@/components/ui/Faq";
import JsonLd from "@/components/ui/JsonLd";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { APPS_PRINCIPAIS } from "@/content/apps";

const WPLAY_APK = APPS_PRINCIPAIS[0];

export const metadata: Metadata = {
  title: "WPlay P2P: App Oficial e Como Reconhecer o Original",
  description:
    "WPlay P2P é o nome real do app (arquivo WPlay P2P BinStream). Versão atual medida no pacote, permissões que ele pede e como diferenciar das cópias antigas.",
  alternates: { canonical: "/wplay-p2p" },
};

/** Medido no pacote real (WPlay P2P BinStream.apk, 17/09/2026). Nunca estimar. */
const IDENTIDADE: [string, string][] = [
  ["Nome do arquivo", "WPlay P2P BinStream.apk"],
  ["Versão atual", "11.9.0d"],
  ["Tamanho", "26 MB (52 MB instalado)"],
  ["Android mínimo", "5.0"],
  ["Processador", "32 e 64 bits"],
  ["Atualização", "pelo próprio app"],
];

const FAQ_ITEMS = [
  {
    pergunta: "O WPlay é gratuito?",
    resposta:
      "O aplicativo é gratuito para baixar e instalar. O que é pago é o acesso à lista de canais, filmes e séries, e dá para testar 4 horas grátis antes de decidir assinar.",
  },
  {
    pergunta: "Por que o WPlay não está na Google Play?",
    resposta:
      "Saiu da loja em 2024, como a maioria dos aplicativos de IPTV do mercado. A instalação hoje é feita por APK direto ou por sideload em TV Box, Fire Stick e Android TV.",
  },
  {
    pergunta: "O aviso de \"fontes desconhecidas\" no Android significa que o WPlay é perigoso?",
    resposta:
      "Não. Esse aviso aparece em qualquer aplicativo instalado fora da Google Play, porque o app se atualiza sozinho fora da loja. É o Android confirmando que a instalação foi autorizada por você, não é um alerta de vírus.",
  },
  {
    pergunta: "O WPlay funciona com Chromecast?",
    resposta:
      "Sim. O aplicativo tem suporte nativo ao Google Cast, então dá para espelhar o conteúdo direto de um celular ou tablet para uma TV com Chromecast.",
  },
  {
    pergunta: "Como faço login no WPlay depois de instalar?",
    resposta:
      "Abra o app, toque em adicionar usuário e informe usuário, senha e URL do servidor exatamente como recebidos no teste ou na assinatura.",
  },
  {
    pergunta: "WPlay não abre ou trava logo depois de instalar, o que fazer?",
    resposta:
      "Confira se o app está atualizado, teste a velocidade da internet (10 Mbps ou mais para HD/4K) e revise usuário e senha sem espaços extras. Se persistir, o suporte confirma o status da conta na hora.",
  },
  {
    pergunta: "Dá para instalar o WPlay em Smart TV Samsung ou LG?",
    resposta:
      "O app WPlay em si não, porque essas TVs usam lojas fechadas (Tizen e webOS). O que funciona é um player compatível da própria loja da TV, ativado por MAC ou código na sua área de conta, um TV Box ou Fire Stick por HDMI, ou o Web Player pelo navegador da TV.",
  },
  {
    pergunta: "Achei um WPlay TV versão 1.0 num site de APK. É o mesmo app?",
    resposta:
      "Não. Agregadores de APK listam pacotes antigos ou de outro desenvolvedor com nome parecido. O aplicativo atual se chama WPlay P2P BinStream e está na versão 11.9.0d. Versão 1.x com outro nome não é o app que funciona com a sua assinatura.",
  },
  {
    pergunta: "O WPlay PRO é diferente do WPlay comum?",
    resposta:
      "Sim, é a versão otimizada especificamente para TV Box, com melhorias de inicialização e descoberta de dispositivo pensadas para esse tipo de aparelho, que fica ligado por mais tempo.",
  },
];

const DISPOSITIVOS = [
  {
    icon: Smartphone,
    nome: "Celular Android",
    texto:
      "Baixe o APK pelo link recebido junto com seu usuário e senha e instale manualmente. Antes de abrir o instalador, ative a permissão de instalar apps de fontes desconhecidas nas configurações de segurança do aparelho.",
    guia: "/guias/celular-android",
  },
  {
    icon: Tv,
    nome: "TV Box ou Android TV",
    texto:
      "Instale o aplicativo Downloader (disponível na própria loja da TV), digite o código de instalação do WPlay (está logo acima nesta página e em Apps) e siga a instalação guiada até o fim.",
    guia: "/guias/tv-box-android-tv",
  },
  {
    icon: Tv,
    nome: "Fire Stick ou Fire TV",
    texto:
      "O processo é igual ao do TV Box: Downloader mais código de instalação. Depois de instalado, o ícone do WPlay aparece na tela inicial normalmente, e o início automático com o aparelho já funciona sem configuração extra.",
    guia: "/guias/fire-stick",
  },
  {
    icon: Monitor,
    nome: "Smart TV Samsung (Tizen)",
    texto:
      "A Samsung só instala aplicativo publicado na loja dela, e não existe WPlay lá. O caminho é um app compatível da própria loja ativado por código, um TV Box ou Fire Stick por HDMI, ou o Web Player pelo navegador da TV.",
    guia: "/guias/samsung",
  },
  {
    icon: Monitor,
    nome: "Smart TV LG (webOS)",
    texto:
      "Mesma lógica da Samsung, com uma diferença: a LG tem Modo Desenvolvedor, que instala o aplicativo mas o remove quando a sessão expira. Os caminhos estáveis são os mesmos três.",
    guia: "/guias/lg",
  },
  {
    icon: Monitor,
    nome: "PC ou notebook (Windows)",
    texto: "Use a versão para computador ou o Web Player pelo navegador. Não exige instalação: basta abrir e fazer login com usuário e senha.",
    guia: "/guias/pc-windows",
  },
  {
    icon: Smartphone,
    nome: "iPhone ou iPad",
    texto:
      "O app WPlay não existe para iOS. O caminho é um player compatível da App Store (o IPTV Player IO declara versão para iPhone e iPad no site oficial), ativado por MAC ou código na sua área de conta, com o mesmo usuário e senha.",
    guia: "/apps",
  },
];

// Lista completa (com ícone e código Downloader reais) vive em app/apps/page.tsx.

export default function WplayApkPage() {
  return (
    <>
      <Breadcrumbs trilha={[{ nome: "Apps", href: "/apps" }, { nome: "WPlay P2P" }]} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "WPlay P2P",
          alternateName: "WPlay P2P BinStream",
          softwareVersion: "11.9.0d",
          fileSize: "26MB",
          applicationCategory: "MultimediaApplication",
          operatingSystem: "Android 5.0+, Fire OS, Windows, macOS",
          url: "https://iptu2022br.com.br/wplay-p2p",
          description:
            "WPlay P2P é o app oficial para acessar listas de IPTV e P2P, com suporte a Android, TV Box, Fire Stick, Windows e macOS.",
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "Como instalar o WPlay",
          step: [
            { "@type": "HowToStep", name: "Receber acesso", text: "Solicite o teste grátis ou a assinatura para receber usuário, senha e o link de instalação." },
            { "@type": "HowToStep", name: "Baixar o APK", text: "Baixe o arquivo pelo link recebido, direto no aparelho onde vai usar o WPlay." },
            { "@type": "HowToStep", name: "Autorizar a instalação", text: "Ative a permissão de instalar apps de fontes desconhecidas quando o Android pedir." },
            { "@type": "HowToStep", name: "Fazer login", text: "Abra o app, toque em adicionar usuário e informe usuário, senha e URL do servidor." },
          ],
        }}
      />

      <section className="container-x py-14 sm:py-18">
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          <Image
            src="/brand/icon-128.png"
            alt="Ícone do app WPlay"
            width={88}
            height={88}
            className="shrink-0 rounded-2xl"
            priority
          />
          <div>
            <h1 className="font-heading text-4xl font-extrabold tracking-tight text-text-primary sm:text-5xl">
              WPlay P2P: o aplicativo oficial e como reconhecer o original
            </h1>
            <p className="mt-5 max-w-2xl text-text-secondary">
              O aplicativo se chama WPlay P2P, e o arquivo de instalação se chama WPlay P2P BinStream. Quem
              procura por ele hoje esbarra em agregadores de APK que listam pacotes antigos, com outro nome e
              outra versão, sem relação com quem mantém o app.
            </p>
            <p className="mt-3 max-w-2xl text-text-secondary">
              Esta página é a referência do app de verdade: versão atual, tamanho, requisitos e permissões,
              medidos no próprio pacote. Quem quer baixar o WPlay baixa daqui, do fluxo oficial, liberado com o
              teste grátis ou a assinatura, e não de agregador.
            </p>
          </div>
        </div>

        <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border-strong bg-border-strong sm:grid-cols-3 lg:grid-cols-6">
          {IDENTIDADE.map(([rotulo, valor]) => (
            <div key={rotulo} className="bg-bg-surface px-4 py-4">
              <dt className="text-xs uppercase tracking-wide text-text-tertiary">{rotulo}</dt>
              <dd className="mt-1 font-heading text-base font-bold text-primary-bright">{valor}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/teste-gratis" className="btn btn-primary">
            Pedir teste grátis de 4 horas
          </Link>
          <Link href="/precos" className="btn btn-outline">
            Ver preço do plano Essencial
          </Link>
        </div>

        <h2 className="mt-10 font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">Baixar o WPlay com segurança</h2>
        <p className="mt-2 max-w-xl text-sm text-text-secondary">
          Um arquivo só, o mesmo para Android TV, TV Box, Fire Stick e celular. Se o seu aparelho não tem
          navegador, use o código do app de instalação que ele já tiver.
        </p>
        <div className="card mt-5 max-w-xl border border-primary-bright p-6">
          <div className="flex items-center gap-4">
            <Image
              src={`/brand/apps/${WPLAY_APK.icone}`}
              alt="Ícone do app WPlay"
              width={56}
              height={56}
              className="shrink-0 rounded-xl"
            />
            <div>
              <p className="font-heading text-lg font-bold text-text-primary">WPlay P2P BinStream 11.9.0d</p>
              <p className="text-sm text-text-secondary">Android TV, TV Box, Fire TV Stick, celular Android</p>
            </div>
          </div>
          <a
            href={WPLAY_APK.apk}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="btn btn-primary mt-5 flex w-full items-center justify-center gap-2"
          >
            <Download size={16} aria-hidden />
            Baixar WPlay P2P (APK)
          </a>
          <div className="mt-4">
            <p className="text-xs text-text-tertiary">Sem navegador na TV? Use o código do app que já tiver instalado:</p>
            <div className="mt-2 space-y-1.5">
              {WPLAY_APK.codigos.map((c) => (
                <div key={c.metodo} className="flex items-center justify-between gap-2 rounded-md bg-bg-raised px-2.5 py-1.5">
                  <span className="text-xs text-text-tertiary">{c.metodo}</span>
                  <span className="font-mono text-xs font-semibold text-primary-bright">{c.codigo}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border-subtle bg-bg-surface py-14 sm:py-18">
        <div className="container-x">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            Como saber se o WPlay P2P que você achou é o original
          </h2>
          <p className="mt-4 max-w-3xl text-text-secondary">
            Buscando o nome do app, aparecem sites agregadores de APK oferecendo um &quot;WPlay TV&quot; na versão
            1.0.14, e um &quot;Wplay Nuvem Vip&quot; em emulador de PC. Nenhum deles é o aplicativo atual. Três
            checagens resolvem a dúvida em um minuto:
          </p>
          <ol className="mt-5 max-w-3xl space-y-3">
            {[
              ["O nome do arquivo é WPlay P2P BinStream", "Não é WPlay TV, WPlay Mobile nem Nuvem Vip. O P2P no nome não é enfeite: é o motor de transmissão que o app usa."],
              ["A versão é 11.9.0d ou superior", "Pacote de versão 1.x, 2.x ou 3.x é outra coisa. O app atual passou de dez versões principais e se atualiza sozinho depois de instalado."],
              ["Ele não pede localização, contatos, câmera nem microfone", "Conferido no pacote: as permissões são internet, rede, manter a tela ligada, serviço em segundo plano, iniciar com o aparelho e instalar as próprias atualizações. Se o app que você baixou pede outra coisa, não é este."],
            ].map(([titulo, detalhe], i) => (
              <li key={titulo} className="flex gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-bright text-xs font-extrabold text-bg-base">
                  {i + 1}
                </span>
                <span>
                  <strong className="text-text-primary">{titulo}</strong>
                  <span className="block text-sm text-text-secondary">{detalhe}</span>
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-5 max-w-3xl text-sm text-text-tertiary">
            O WPlay saiu da Google Play em 2024, como a maioria dos aplicativos de IPTV. Por isso a instalação é
            por arquivo direto, e por isso os agregadores aparecem na busca: eles guardam versões que o
            desenvolvedor já abandonou.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="card flex items-start gap-3 border border-border-subtle p-4">
              <Cast size={20} className="mt-0.5 shrink-0 text-primary-bright" aria-hidden />
              <p className="text-sm text-text-secondary">Suporte nativo a Google Cast e Chromecast.</p>
            </div>
            <div className="card flex items-start gap-3 border border-border-subtle p-4">
              <RefreshCw size={20} className="mt-0.5 shrink-0 text-primary-bright" aria-hidden />
              <div>
                <p className="font-semibold text-text-primary">Início automático com o aparelho ligado</p>
                <p className="mt-1 text-sm text-text-secondary">
                  Pensado para TV Box e Fire Stick, aparelhos que ficam ligados por horas.
                </p>
              </div>
            </div>
            <div className="card flex items-start gap-3 border border-border-subtle p-4 sm:col-span-2">
              <ShieldCheck size={20} className="mt-0.5 shrink-0 text-primary-bright" aria-hidden />
              <div>
                <p className="font-semibold text-text-primary">Aviso de &quot;fontes desconhecidas&quot; ao instalar</p>
                <p className="mt-1 text-sm text-text-secondary">
                  Aparece porque o WPlay se atualiza fora da Google Play. É o mesmo aviso que qualquer app
                  instalado fora da loja oficial dispara. Não é sinal de vírus, é o Android confirmando que você
                  autorizou a instalação.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-x py-14 sm:py-18">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">Como instalar por aparelho</h2>
          <Link href="/guias" className="text-sm text-primary-bright underline underline-offset-2">
            Ver todos os guias completos
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {DISPOSITIVOS.map(({ icon: Icon, nome, texto, guia }) => (
            <div key={nome} className="card border border-border-strong p-5">
              <div className="flex items-center gap-2">
                <Icon size={22} className="text-primary-bright" aria-hidden />
                <h3 className="font-heading text-lg font-semibold text-text-primary">{nome}</h3>
              </div>
              <p className="mt-2 text-sm text-text-secondary">{texto}</p>
              {guia && (
                <Link href={guia} className="mt-3 inline-block text-sm text-primary-bright underline underline-offset-2">
                  Guia completo
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="container-x py-14 sm:py-18">
        <div className="card flex flex-col items-start justify-between gap-5 border border-border-strong p-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-heading text-xl font-bold text-text-primary">
              Baixou o WPlay e ele não roda bem no seu aparelho?
            </h2>
            <p className="mt-2 text-sm text-text-secondary">
              O mesmo usuário e senha funciona em outros apps da família WPlay e em players compatíveis. Veja
              qual combina com o seu aparelho.
            </p>
          </div>
          <Link href="/apps" className="btn btn-outline shrink-0">
            Ver todos os apps
          </Link>
        </div>
      </section>

      <section className="border-y border-border-subtle bg-bg-surface py-14 sm:py-18">
        <div className="container-x">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            Como fazer login depois de instalar
          </h2>
          <p className="mt-4 max-w-3xl text-text-secondary">
            Abra o app e toque em adicionar usuário. Informe exatamente os três dados recebidos: usuário, senha
            e URL do servidor.
          </p>
          <p className="mt-3 max-w-3xl text-text-secondary">
            O erro mais comum de &quot;credenciais inválidas&quot; não é senha errada. É espaço em branco extra
            copiado sem querer, ou letra maiúscula digitada onde deveria ser minúscula.
          </p>
          <p className="mt-3 max-w-3xl text-text-secondary">
            Se o app não abrir ou travar depois de instalado, confira a versão, teste a internet (10 Mbps ou
            mais para HD/4K) e revise as credenciais. O guia completo está em{" "}
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
