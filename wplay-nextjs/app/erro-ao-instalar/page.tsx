import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PackageX, ShieldAlert, HardDrive, RefreshCw, ScanEye, Cpu } from "lucide-react";
import Faq from "@/components/ui/Faq";
import JsonLd from "@/components/ui/JsonLd";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "WPlay Deu Erro ao Instalar? Veja as Causas",
  description:
    "WPlay deu erro ao instalar? As seis causas reais, do arquivo incompleto ao Android antigo demais, e o que fazer em cada uma antes de abrir o app.",
  alternates: { canonical: "/erro-ao-instalar" },
};

const CAUSAS = [
  {
    icon: PackageX,
    titulo: '"Erro ao analisar o pacote"',
    texto:
      "Quase sempre é um arquivo APK incompleto ou corrompido. Apague o que foi baixado e baixe de novo, de preferência com Wi-Fi estável em vez de dados móveis.",
  },
  {
    icon: ShieldAlert,
    titulo: '"App não instalado" mesmo depois de autorizar',
    texto:
      "Pode haver uma versão antiga do WPlay instalada com uma assinatura diferente. Desinstale a versão antiga primeiro e só depois instale a nova.",
  },
  {
    icon: HardDrive,
    titulo: "Instalação trava e não termina",
    texto:
      "Espaço insuficiente é a causa mais comum, mesmo quando parece ter sobra. O arquivo do WPlay tem 26 MB baixados, mas se expande para cerca de 52 MB ao ser descompactado, e o sistema ainda precisa de área livre além disso durante a instalação. Deixe pelo menos 200 MB livres e tente de novo.",
  },
  {
    icon: RefreshCw,
    titulo: "Baixou certo, mas a tela de instalar nunca abre",
    texto:
      "Em TV Box e Fire Stick, isso normalmente é a permissão de fontes desconhecidas que não foi ativada pro app usado pra baixar (Downloader, navegador ou gerenciador de arquivos).",
  },
  {
    icon: ScanEye,
    titulo: '"Não foi possível verificar se há malware" (Play Protect)',
    texto:
      "Alguns Android mostram esse aviso pra qualquer APK de fora da Play Store, mesmo sem achar nada de errado (é uma checagem automática, não um resultado). Toque em instalar mesmo assim para prosseguir.",
  },
  {
    icon: Cpu,
    titulo: "Aparelho antigo demais para a versão mínima",
    texto:
      "O WPlay exige Android 5.0 ou mais recente e roda tanto em 32 quanto em 64 bits (o pacote traz as duas versões, armeabi-v7a e arm64-v8a). Abaixo do Android 5.0 a instalação é recusada pelo próprio sistema, e aí o caminho é o Web Player pelo navegador.",
  },
];

const FAQ_ITEMS = [
  {
    pergunta: "Isso é diferente de \"WPlay não funciona\"?",
    resposta:
      "Sim. Erro de instalação acontece ANTES de conseguir abrir o app pela primeira vez. Se o app já abre mas trava ou não carrega canal, o roteiro certo é WPlay não funciona.",
  },
  {
    pergunta: "Preciso desinstalar tudo e recomeçar do zero?",
    resposta: "Na maioria dos casos não. Desinstalar só a versão antiga do WPlay (se existir) e baixar o arquivo de novo resolve sem mexer em mais nada do aparelho.",
  },
  {
    pergunta: "O erro de instalação é sinal de vírus?",
    resposta: "Não. Todos esses erros têm causa técnica simples (arquivo incompleto, espaço, permissão). Nenhum deles indica vírus ou problema de segurança.",
  },
  {
    pergunta: "Baixei no celular certo, mas não acho onde instalar na TV.",
    resposta: "O download precisa ser feito no MESMO aparelho onde você vai instalar. Baixar no celular e tentar abrir na TV não funciona, use o Downloader direto na TV.",
  },
];

export default function ErroAoInstalarPage() {
  return (
    <>
      <Breadcrumbs trilha={[{ nome: "Erro ao instalar" }]} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ_ITEMS.map((f) => ({ "@type": "Question", name: f.pergunta, acceptedAnswer: { "@type": "Answer", text: f.resposta } })),
        }}
      />

      <section className="container-x py-14 sm:py-18">
        <p className="section-label">Suporte</p>
        <h1 className="mt-3 font-heading text-4xl font-extrabold tracking-tight text-text-primary sm:text-5xl">
          Deu erro ao instalar o WPlay?
        </h1>
        <p className="mt-5 max-w-2xl text-text-secondary">
          Diferente de um app que já abre e trava, isso aqui é sobre o momento antes disso: o arquivo baixou,
          mas a instalação não termina, ou o sistema recusa direto. As causas são poucas e específicas.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/guias/downloader" className="btn btn-primary">Ver como instalar direito</Link>
          <Link href="/wplay-nao-funciona" className="btn btn-outline">App já abre, mas trava?</Link>
        </div>
        <figure className="mt-10 max-w-xl">
          <Image
            src="/brand/guias/downloader-instalando.webp"
            alt="Tela de instalação do aplicativo aberta pelo Downloader, momento em que os erros desta página aparecem"
            width={533}
            height={300}
            className="w-full rounded-lg border border-border-subtle"
          />
          <figcaption className="mt-2 text-xs text-text-tertiary">
            É nesta tela, logo depois do download, que cada um dos erros abaixo costuma aparecer.
          </figcaption>
        </figure>
      </section>

      <section className="border-y border-border-subtle bg-bg-surface py-14 sm:py-18">
        <div className="container-x">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            As seis causas de erro ao instalar o WPlay
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {CAUSAS.map(({ icon: Icon, titulo, texto }) => (
              <div key={titulo} className="card border border-border-strong p-5">
                <Icon size={20} className="text-primary-bright" aria-hidden />
                <h3 className="mt-3 font-heading text-base font-semibold text-text-primary">{titulo}</h3>
                <p className="mt-2 text-sm text-text-secondary">{texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x grid gap-5 py-14 sm:grid-cols-2 sm:py-18">
        <div className="card flex flex-col justify-between gap-4 border border-border-strong p-6">
          <div>
            <p className="font-semibold text-text-primary">Ainda não instalou nada?</p>
            <p className="mt-1 text-sm text-text-secondary">
              O tutorial completo do Downloader, com imagens, evita a maioria desses erros desde o início.
            </p>
          </div>
          <Link href="/guias/downloader" className="btn btn-outline self-start">
            Ver tutorial completo
          </Link>
        </div>
        <div className="card flex flex-col justify-between gap-4 border border-primary-bright p-6">
          <div>
            <p className="font-semibold text-text-primary">Ainda não tem usuário e senha?</p>
            <p className="mt-1 text-sm text-text-secondary">
              Instalar antes de ter acesso não adianta. Peça o teste grátis de 4 horas: as credenciais chegam
              na hora e o instalador só faz sentido com elas em mãos.
            </p>
          </div>
          <Link href="/teste-gratis" className="btn btn-primary self-start">
            Pedir teste grátis
          </Link>
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
