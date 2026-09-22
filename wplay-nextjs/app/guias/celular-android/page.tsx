import type { Metadata } from "next";
import Link from "next/link";
import { Download, ShieldCheck, Smartphone, TriangleAlert } from "lucide-react";
import Faq from "@/components/ui/Faq";
import JsonLd from "@/components/ui/JsonLd";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

const PASSOS = [
  {
    icon: Download,
    titulo: "Baixe o arquivo do aplicativo",
    texto:
      "Use o link que chegou junto do seu teste ou da assinatura, aberto no navegador do próprio celular. São 26 MB.",
    detalhe:
      "Baixar no computador e passar por cabo também funciona, mas exige um gerenciador de arquivos no celular pra abrir o arquivo depois. Pelo navegador do aparelho é mais direto.",
  },
  {
    icon: ShieldCheck,
    titulo: "Autorize a instalação quando o Android pedir",
    texto:
      "O sistema vai avisar que o arquivo veio de fora da loja e pedir sua confirmação. Esse aviso é padrão, aparece pra qualquer aplicativo instalado assim.",
    detalhe:
      "A permissão é concedida ao app que está abrindo o arquivo (o navegador ou o gerenciador), não ao WPlay. Por isso ela pode ser pedida de novo se você trocar de navegador no futuro.",
  },
  {
    icon: Smartphone,
    titulo: "Abra e faça login",
    texto:
      "Informe usuário, senha e a URL do servidor exatamente como você recebeu, sem espaço no começo nem no fim.",
    detalhe:
      "Copiar e colar evita o erro mais comum aqui, que é confundir o número 0 com a letra O, ou o 1 com a letra l, num teclado de celular.",
  },
];

export const metadata: Metadata = {
  title: "IPTV no Celular Android: Instalar o WPlay (3 Passos)",
  description:
    "IPTV no celular Android com o WPlay: baixe o APK, autorize a instalação e faça login. Versão mínima real (Android 5.0), tamanho e o que fazer se travar.",
  alternates: { canonical: "/guias/celular-android" },
};

const FAQ_ITEMS = [
  {
    pergunta: "Por que o WPlay não está na Google Play do meu celular?",
    resposta: "O WPlay saiu da Google Play em 2024, como a maioria dos aplicativos de IPTV do mercado. A instalação hoje é direto pelo arquivo APK.",
  },
  {
    pergunta: "É seguro instalar um APK fora da Google Play?",
    resposta:
      "O aviso de fontes desconhecidas que o Android mostra é padrão para qualquer app instalado fora da loja, não é um alerta de vírus. O importante é baixar o APK sempre do link oficial recebido no seu teste ou assinatura.",
  },
  {
    pergunta: "O WPlay funciona em qualquer celular Android?",
    resposta:
      "A partir do Android 5.0, conferido direto no pacote do aplicativo (minSdkVersion 21). Ele traz as versões de 32 e 64 bits no mesmo arquivo, então celular antigo instala igual. Aparelhos com pouca memória podem ter mais lentidão em canais 4K, mas instalam normalmente.",
  },
  {
    pergunta: "Quanto de espaço o WPlay ocupa no celular?",
    resposta:
      "O download tem 26 MB e o app ocupa cerca de 52 MB depois de instalado. Some a isso o espaço temporário que o Android usa durante a instalação: com menos de 200 MB livres, a instalação pode travar sem mensagem clara.",
  },
  {
    pergunta: "O aplicativo pede acesso aos meus contatos, fotos ou localização?",
    resposta:
      "Não. O pacote declara acesso à internet e ao estado da rede, manter a tela ligada durante a reprodução, serviço em segundo plano e instalar as próprias atualizações. Não há permissão de localização, contatos, câmera, microfone ou SMS, e você pode conferir isso na tela de permissões do próprio Android.",
  },
  {
    pergunta: "Meu celular bloqueou a instalação, o que fazer?",
    resposta:
      "Vá em Configurações > Segurança (ou Apps > Acesso especial, dependendo do modelo) e ative a permissão de instalar apps desconhecidos para o navegador ou gerenciador de arquivos que você usou para baixar o APK.",
  },
];

export default function GuiaCelularPage() {
  return (
    <>
      <Breadcrumbs trilha={[{ nome: "Guias", href: "/guias" }, { nome: "Celular Android" }]} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "Como instalar o WPlay no celular Android",
          step: [
            { "@type": "HowToStep", name: "Baixar o APK", text: "Baixe o arquivo APK do WPlay pelo link recebido no teste ou na assinatura." },
            { "@type": "HowToStep", name: "Autorizar fontes desconhecidas", text: "Ative a permissão de instalar apps de fontes desconhecidas nas configurações de segurança do aparelho." },
            { "@type": "HowToStep", name: "Instalar e fazer login", text: "Abra o arquivo baixado, instale, e faça login com usuário, senha e URL do servidor." },
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

      <section className="container-x max-w-3xl py-12 sm:py-16">
        <span className="badge bg-primary-bright text-bg-base">Leva cerca de 2 minutos</span>
        <h1 className="mt-4 font-heading text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl">
          IPTV no celular Android: como instalar o WPlay
        </h1>
        <p className="mt-4 text-text-secondary">
          Assistir IPTV no celular são três passos, direto pelo arquivo do aplicativo, sem passar pela Google
          Play. Abaixo, cada um deles com o que costuma dar errado e como sair do impasse.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link href="/teste-gratis" className="btn btn-primary">Pedir teste grátis de 4 horas</Link>
          <Link href="/apps" className="btn btn-outline">Baixar o APK</Link>
        </div>
      </section>

      <section className="container-x max-w-3xl pb-12 sm:pb-16">
        <ol className="relative space-y-10 border-l-2 border-border-strong pl-8 sm:pl-10">
          {PASSOS.map(({ icon: Icon, titulo, texto, detalhe }, i) => (
            <li key={titulo} className="relative">
              <span className="absolute -left-[2.45rem] flex h-9 w-9 items-center justify-center rounded-full border-2 border-primary-bright bg-bg-base font-heading text-sm font-extrabold text-primary-bright sm:-left-[3.2rem] sm:h-11 sm:w-11 sm:text-base">
                {i + 1}
              </span>
              <div className="flex items-center gap-2">
                <Icon size={18} className="text-primary-bright" aria-hidden />
                <h2 className="font-heading text-xl font-bold text-text-primary">{titulo}</h2>
              </div>
              <p className="mt-2 text-text-secondary">{texto}</p>
              <p className="mt-2 border-l-2 border-border-subtle pl-3 text-sm text-text-tertiary">{detalhe}</p>
            </li>
          ))}
        </ol>

      </section>

      <section className="border-y border-border-subtle bg-bg-surface py-14 sm:py-18">
        <div className="container-x">
          <div className="rounded-xl border-l-4 border-warning bg-bg-raised p-6">
            <div className="flex items-center gap-2">
              <TriangleAlert size={20} className="shrink-0 text-warning" aria-hidden />
              <h2 className="font-heading text-xl font-bold text-text-primary">
                Xiaomi e Samsung escondem a permissão em outro lugar
              </h2>
            </div>
            <p className="mt-3 max-w-3xl text-text-secondary">
              Esses fabricantes usam camadas próprias de segurança por cima do Android, e a permissão de
              fontes desconhecidas não fica onde o Android padrão coloca.
            </p>
            <p className="mt-3 max-w-3xl text-text-secondary">
              Procure em Configurações, depois Apps, depois Acesso especial (ou Permissões especiais), e ative
              a opção para o navegador ou o gerenciador de arquivos que você usou pra abrir o arquivo baixado.
            </p>
            <p className="mt-3 max-w-3xl text-sm text-text-tertiary">
              Se mesmo assim o instalador não abrir, confira se o download não foi interrompido. Arquivo
              incompleto é a causa mais comum de instalação que trava sem mostrar erro nenhum.
            </p>
          </div>

          <h2 className="mt-14 font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            Existe versão feita pra celular, e faz diferença
          </h2>
          <p className="mt-4 max-w-3xl text-text-secondary">
            Além do aplicativo principal, existem duas versões pensadas pra tela de toque:{" "}
            <strong className="text-text-primary">Wapp Android</strong> e{" "}
            <strong className="text-text-primary">XCloud Mobile</strong>. A diferença não é de conteúdo, é de
            navegação.
          </p>
          <p className="mt-3 max-w-3xl text-text-secondary">
            O app principal declara suporte à interface de TV do Android, feita pra controle remoto, com foco que
            salta de item em item. No celular isso vira uma navegação estranha, com alvos grandes demais e rolagem
            travada. As versões mobile resolvem isso.
          </p>
          <p className="mt-3 max-w-3xl text-text-secondary">
            Seu usuário e senha são os mesmos nas três, não existe cadastro separado. Os links estão em{" "}
            <Link href="/apps" className="text-primary-bright underline underline-offset-2">
              apps do WPlay
            </Link>
            .
          </p>

          <h2 className="mt-14 font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            Quer assistir na TV a partir do celular?
          </h2>
          <p className="mt-4 max-w-3xl text-text-secondary">
            O WPlay tem suporte nativo ao Google Cast. Com uma TV ou Chromecast na mesma rede Wi-Fi, dá pra
            espelhar o conteúdo direto do celular pra tela grande, sem precisar instalar nada na TV.
          </p>
          <p className="mt-3 max-w-3xl text-text-secondary">
            Vale saber a diferença: espelhar pelo Cast depende do celular ficar ligado e na mesma rede, e o
            consumo de bateria é alto numa partida inteira. Se a ideia é assistir na TV todo dia, instalar
            direto no aparelho da TV sai melhor. O caminho está em{" "}
            <Link href="/guias/tv-box-android-tv" className="text-primary-bright underline underline-offset-2">
              TV Box e Android TV
            </Link>
            .
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
