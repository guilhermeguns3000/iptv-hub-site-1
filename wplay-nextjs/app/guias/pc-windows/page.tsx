import type { Metadata } from "next";
import Link from "next/link";
import { Download, Globe, Apple, Monitor, TriangleAlert } from "lucide-react";
import Faq from "@/components/ui/Faq";
import JsonLd from "@/components/ui/JsonLd";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { INSTALADORES_PC } from "@/content/apps";

const COMPARATIVO: [string, string, string][] = [
  ["Assisto quase todo dia", "Melhor: abre direto, guarda a sessão", "Dá conta, mas exige abrir e logar sempre"],
  ["Computador que não é meu", "Evite: deixa instalação na máquina", "Melhor: não instala nada, é só sair"],
  ["Quero deixar em tela cheia por horas", "Melhor: janela própria, sem barra de navegador", "Funciona, mas a aba pode ser fechada sem querer"],
  ["Meu PC é antigo ou tem pouco espaço", "Ocupa espaço em disco", "Melhor: não ocupa espaço nenhum"],
  ["Windows bloqueou o arquivo", "Precisa liberar o aviso do SmartScreen uma vez", "Não passa por esse aviso"],
];

export const metadata: Metadata = {
  title: "IPTV no PC: WPlay para Windows e macOS, Sem Emulador",
  description:
    "IPTV no PC com o WPlay: instalador nativo para Windows e macOS, ou Web Player direto no navegador. Sem emulador, com o passo a passo do aviso do Windows.",
  alternates: { canonical: "/guias/pc-windows" },
};

const FAQ_ITEMS = [
  {
    pergunta: "Preciso de emulador Android pra usar o WPlay no PC?",
    resposta: "Não. O WPlay tem instalador próprio para Windows e macOS, então não precisa de emulador nem gambiarra.",
  },
  {
    pergunta: "O Web Player funciona em qualquer navegador?",
    resposta: "Funciona melhor em navegadores atualizados como Chrome, Edge ou Firefox. Ele fica dentro da sua conta no site: entre com seu e-mail e toque em Web Player. Navegadores muito antigos podem não suportar os canais em HD/4K.",
  },
  {
    pergunta: "Dá pra usar o WPlay no PC e no celular ao mesmo tempo?",
    resposta: "Depende do plano contratado. O plano Essencial inclui IPTV completo mais 1 tela P2P, o que permite mais de uma tela simultânea.",
  },
  {
    pergunta: "O instalador do Windows pede alguma permissão especial?",
    resposta: "O Windows Defender pode avisar sobre um app de fora da Microsoft Store, mesmo aviso padrão de qualquer instalador que não vem da loja oficial. Não é sinal de vírus.",
  },
];

export default function GuiaPcPage() {
  return (
    <>
      <Breadcrumbs trilha={[{ nome: "Guias", href: "/guias" }, { nome: "PC" }]} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "Como usar o WPlay no PC",
          step: [
            { "@type": "HowToStep", name: "Escolher o caminho", text: "Baixe o instalador para Windows/macOS, ou use o Web Player direto no navegador." },
            { "@type": "HowToStep", name: "Passar pelo aviso do SmartScreen (Windows)", text: "Clique em Mais informações e depois em Executar assim mesmo. Não é detecção de vírus, é o aviso padrão de instalador fora da loja." },
            { "@type": "HowToStep", name: "Abrir e fazer login", text: "Informe usuário, senha e URL do servidor recebidos no teste ou assinatura." },
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

      <section className="border-b border-border-subtle bg-bg-surface py-12 sm:py-16">
        <div className="container-x grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <h1 className="font-heading text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl">
              IPTV no PC: WPlay para Windows e macOS
            </h1>
            <p className="mt-4 max-w-xl text-text-secondary">
              Sem emulador, sem rodeio. Assistir IPTV no PC funciona com instalador nativo, tanto no Windows
              quanto no Mac. Se preferir não instalar nada, o Web Player fica dentro da sua conta e roda no navegador do
              computador.
            </p>
            <Link href="/teste-gratis" className="btn btn-primary mt-6 inline-flex">
              Pedir teste grátis de 4 horas
            </Link>
          </div>

          <div id="instaladores" className="card scroll-mt-24 border border-primary-bright p-6">
            <p className="font-heading text-lg font-bold text-text-primary">Baixar agora</p>
            <p className="mt-1 text-sm text-text-tertiary">Instalador nativo, sem emulador.</p>
            <div className="mt-4 space-y-2">
              {INSTALADORES_PC.map((inst) => (
                <a
                  key={inst.nome}
                  href={inst.url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="flex items-center justify-between gap-3 rounded-md border border-border-strong bg-bg-raised px-4 py-3 text-sm font-semibold text-text-secondary ease-std transition-colors duration-200 hover:border-primary-bright hover:text-text-primary"
                >
                  <span className="flex items-center gap-2">
                    {inst.sistema === "macOS" ? <Apple size={16} aria-hidden /> : <Monitor size={16} aria-hidden />}
                    {inst.nome}
                  </span>
                  <Download size={16} className="shrink-0 text-primary-bright" aria-hidden />
                </a>
              ))}
            </div>
            <p className="mt-4 text-xs text-text-tertiary">
              Depois de instalar, entre com usuário, senha e URL do servidor recebidos no teste.
            </p>
          </div>
        </div>
      </section>

      <section className="container-x py-14 sm:py-18">
        <h2 className="font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
          Instalador ou navegador: qual serve melhor pro seu caso
        </h2>
        <p className="mt-3 max-w-3xl text-text-secondary">
          A qualidade de imagem é a mesma nos dois. O que muda é conveniência e onde você está usando.
        </p>
        <div className="mt-8 overflow-hidden rounded-xl border border-border-strong">
          <table className="w-full text-left text-sm">
            <thead className="bg-bg-raised">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold text-text-tertiary">Situação</th>
                <th scope="col" className="px-4 py-3 font-semibold text-text-primary">
                  <span className="flex items-center gap-1.5">
                    <Monitor size={15} className="text-primary-bright" aria-hidden /> Instalador
                  </span>
                </th>
                <th scope="col" className="px-4 py-3 font-semibold text-text-primary">
                  <span className="flex items-center gap-1.5">
                    <Globe size={15} className="text-primary-bright" aria-hidden /> Web Player
                  </span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {COMPARATIVO.map(([situacao, instalador, web]) => (
                <tr key={situacao} className="odd:bg-bg-surface">
                  <th scope="row" className="px-4 py-3 font-medium text-text-secondary">{situacao}</th>
                  <td className="px-4 py-3 text-text-secondary">{instalador}</td>
                  <td className="px-4 py-3 text-text-secondary">{web}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-3xl text-sm text-text-tertiary">
          Nos dois caminhos o requisito de internet é o mesmo do celular e da TV: conexão estável, de
          preferência acima de 10 Mbps para canais em HD ou 4K sem travamento.
        </p>
      </section>

      <section className="border-y border-border-subtle bg-bg-surface py-14 sm:py-18">
        <div className="container-x">

          <div className="rounded-xl border-l-4 border-warning bg-bg-raised p-6">
            <div className="flex items-center gap-2">
              <TriangleAlert size={20} className="shrink-0 text-warning" aria-hidden />
              <h2 className="font-heading text-xl font-bold text-text-primary">
                O aviso azul do Windows não é vírus
              </h2>
            </div>
            <p className="mt-3 max-w-3xl text-text-secondary">
              Como o instalador não vem da Microsoft Store, o SmartScreen trava a primeira execução com uma
              tela azul. É o comportamento padrão pra qualquer instalador baixado fora da loja, não é uma
              detecção de ameaça. Para seguir:
            </p>
            <ol className="mt-4 max-w-2xl space-y-3">
              {[
                ["Clique em Mais informações", 'Na tela "O Windows protegeu o computador", o botão fica logo abaixo do texto.'],
                ["Confira o nome do arquivo", "Deve ser o mesmo instalador que você baixou aqui nesta página."],
                ["Clique em Executar assim mesmo", "A instalação segue normal a partir daí, sem novos avisos."],
              ].map(([titulo, detalhe], i) => (
                <li key={titulo} className="flex gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-warning text-xs font-extrabold text-bg-base">
                    {i + 1}
                  </span>
                  <span>
                    <strong className="text-text-primary">{titulo}</strong>
                    <span className="block text-sm text-text-tertiary">{detalhe}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
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
