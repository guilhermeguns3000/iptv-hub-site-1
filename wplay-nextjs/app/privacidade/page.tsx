import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Quais dados o WPlay coleta no teste grátis, na assinatura e no login, para que servem, com quem compartilha e como pedir acesso ou exclusão (LGPD).",
  alternates: { canonical: "/privacidade" },
};

const ATUALIZADO = "21 de setembro de 2026";

const SECOES: { titulo: string; corpo: React.ReactNode }[] = [
  {
    titulo: "1. Quem trata os dados",
    corpo: (
      <p>
        O responsável pelo tratamento é o WPlay, operado neste site (iptu2022br.com.br). O canal de contato para
        qualquer assunto desta política é o WhatsApp de suporte, no rodapé do site.
      </p>
    ),
  },
  {
    titulo: "2. Quais dados coletamos, e onde",
    corpo: (
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong className="text-text-primary">Teste grátis:</strong> nome, e-mail, WhatsApp e a opção de conteúdo
          adulto. São necessários para gerar o acesso e para impedir que a mesma pessoa gere mais de um teste.
        </li>
        <li>
          <strong className="text-text-primary">Assinatura:</strong> nome, e-mail, WhatsApp e CPF. O CPF é exigido
          pelo sistema de pagamento para emitir a cobrança Pix, e não é usado para nenhuma outra finalidade.
        </li>
        <li>
          <strong className="text-text-primary">Área de conta:</strong> apenas o e-mail, para enviar o link de acesso.
          Não existe senha de site.
        </li>
        <li>
          <strong className="text-text-primary">Navegação:</strong> páginas visitadas, tempo na página e origem da
          visita, coletados por um medidor próprio, sem identificar você enquanto não preencher nenhum formulário.
        </li>
        <li>
          <strong className="text-text-primary">Ativação de aplicativo por MAC:</strong> o endereço MAC ou código que
          você informar, usado só para enviar a lista ao aparelho.
        </li>
      </ul>
    ),
  },
  {
    titulo: "3. Para que usamos",
    corpo: (
      <ul className="list-disc space-y-2 pl-5">
        <li>Gerar e entregar o acesso de teste e de assinatura (execução do serviço).</li>
        <li>Enviar por e-mail as credenciais, o link de acesso à conta e a confirmação de pagamento.</li>
        <li>Impedir abuso: um teste por pessoa e limite de tentativas por endereço de rede.</li>
        <li>Atender você pelo WhatsApp, quando for você quem iniciar a conversa.</li>
        <li>Medir o uso do site de forma agregada, para corrigir páginas que confundem ou não funcionam.</li>
      </ul>
    ),
  },
  {
    titulo: "4. Com quem compartilhamos",
    corpo: (
      <>
        <p>Somente com quem é necessário para o serviço funcionar, e só o dado que cada um precisa:</p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            <strong className="text-text-primary">Painel de gestão de acesso IPTV:</strong> recebe nome e WhatsApp
            como identificação da linha de acesso, e o MAC quando você ativa um aplicativo.
          </li>
          <li>
            <strong className="text-text-primary">Processador de pagamento (Pix):</strong> recebe nome, e-mail,
            WhatsApp e CPF para emitir e confirmar a cobrança.
          </li>
          <li>
            <strong className="text-text-primary">Serviço de envio de e-mail:</strong> recebe seu e-mail e o conteúdo
            da mensagem enviada.
          </li>
          <li>
            <strong className="text-text-primary">Hospedagem e banco de dados:</strong> guardam os registros descritos
            na seção 2.
          </li>
        </ul>
        <p className="mt-3">Não vendemos nem cedemos dados para publicidade de terceiros.</p>
      </>
    ),
  },
  {
    titulo: "5. Por quanto tempo guardamos",
    corpo: (
      <p>
        Os dados do teste e da assinatura ficam guardados enquanto a conta existir e pelo tempo necessário para
        cumprir obrigações fiscais e de defesa em eventuais disputas. O link de acesso à conta expira em 15 minutos
        e só pode ser usado uma vez. Você pode pedir a exclusão antes disso, conforme a seção 6.
      </p>
    ),
  },
  {
    titulo: "6. Seus direitos (LGPD)",
    corpo: (
      <>
        <p>
          Nos termos da Lei 13.709/2018, você pode pedir a qualquer momento: confirmação de que tratamos seus dados,
          acesso a eles, correção, anonimização ou exclusão, informação sobre com quem compartilhamos, e revogação
          de consentimento quando ele for a base do tratamento.
        </p>
        <p className="mt-3">
          Para exercer qualquer desses direitos, fale com o suporte pelo WhatsApp do rodapé, informando o e-mail
          usado no cadastro. A resposta é dada pelo mesmo canal, dentro do prazo legal.
        </p>
      </>
    ),
  },
  {
    titulo: "7. Cookies e armazenamento no navegador",
    corpo: (
      <p>
        Usamos um cookie de sessão para manter você logado na área de conta, e o armazenamento local do navegador
        para não repetir avisos já exibidos. Não usamos cookies de publicidade. Bloquear cookies impede apenas o
        login na área de conta; o resto do site continua funcionando.
      </p>
    ),
  },
  {
    titulo: "8. Segurança",
    corpo: (
      <>
      <p>
        O site é servido apenas por HTTPS. O link de acesso à conta é de uso único. A confirmação de pagamento é
        verificada por assinatura antes de ativar qualquer acesso, e o número de tentativas por endereço de rede é
        limitado.
      </p>
      <p className="mt-3">
        Nenhum sistema é infalível. Se identificarmos um incidente que afete seus dados, você será avisado pelo
        e-mail cadastrado.
      </p>
      </>
    ),
  },
  {
    titulo: "9. Alterações",
    corpo: (
      <p>
        Esta política pode mudar quando o serviço mudar. A data no topo indica a versão em vigor, e mudanças
        relevantes são avisadas na própria área de conta.
      </p>
    ),
  },
];

export default function PrivacidadePage() {
  return (
    <>
    <Breadcrumbs trilha={[{ nome: "Privacidade" }]} />
    <section className="container-x max-w-3xl py-12 sm:py-16">
      <h1 className="font-heading text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl">
        Política de privacidade
      </h1>
      <p className="mt-2 text-sm text-text-tertiary">Atualizada em {ATUALIZADO}.</p>
      <p className="mt-5 text-text-secondary">
        Esta página explica, sem juridiquês, o que fazemos com os dados que você informa no teste grátis, na
        assinatura e na área de conta. Se alguma coisa aqui não bater com o que você viu no site, avise pelo
        WhatsApp: o erro é nosso, não seu.
      </p>

      <div className="mt-10 space-y-10">
        {SECOES.map(({ titulo, corpo }) => (
          <section key={titulo}>
            <h2 className="font-heading text-xl font-bold text-text-primary">{titulo}</h2>
            <div className="mt-3 text-text-secondary">{corpo}</div>
          </section>
        ))}
      </div>

      <p className="mt-12 border-t border-border-subtle pt-6 text-sm text-text-tertiary">
        Veja também os{" "}
        <Link href="/termos" className="text-primary-bright underline underline-offset-2">
          termos de uso
        </Link>
        .
      </p>
    </section>

    </>
  );
}
