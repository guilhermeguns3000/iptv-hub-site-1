import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CheckoutForm from "@/components/forms/CheckoutForm";
import { getPlano, formatBRL } from "@/content/plans";
import { getSession } from "@/lib/auth";
import { buscarTestePorEmail } from "@/lib/store";

export const metadata: Metadata = {
  title: "Pagamento | WPlay",
  robots: { index: false, follow: false },
};

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ plano?: string }>;
}) {
  const { plano: planoId } = await searchParams;
  const plano = getPlano((planoId || "").trim());
  if (!plano) notFound();

  // Logado: preenche com os dados do registro; renovação e primeira
  // assinatura seguem o mesmo checkout (o webhook decide ativar ou estender).
  const session = await getSession();
  const cliente = session?.email ? await buscarTestePorEmail(session.email) : null;
  const inicial = cliente ? { nome: cliente.nome, email: cliente.email, telefone: cliente.telefone ?? "" } : undefined;

  return (
    <section className="container-x grid gap-10 py-14 sm:py-18 lg:grid-cols-2 lg:items-start">
      <div className="card border border-border-subtle p-6 sm:p-8 lg:order-2 lg:sticky lg:top-24">
        <h1 className="font-heading text-xl font-bold text-text-primary">Finalizar assinatura</h1>
        <p className="mt-1 text-sm text-text-secondary">
          Plano {plano.nome}, R$ {formatBRL(plano.preco)}
        </p>
        <div className="mt-6">
          <CheckoutForm planId={plano.id} precoLabel={`${plano.nome} (R$ ${formatBRL(plano.preco)})`} inicial={inicial} />
        </div>
      </div>

      <div className="lg:order-1">
        <h2 className="font-heading text-2xl font-bold text-text-primary sm:text-3xl">Quase lá</h2>
        <p className="mt-4 text-text-secondary">
          {cliente
            ? "Seus dados já estão preenchidos. Confirme o CPF, pague o Pix e o acesso é ativado ou renovado na hora, sem reinstalar nada."
            : "Use o mesmo e-mail do seu teste grátis. Assim que o Pix confirmar, a mesma conta do teste vira sua assinatura, sem precisar reinstalar nada."}
        </p>
        <p className="mt-3 text-text-secondary">
          Ainda não testou?{" "}
          <Link href="/teste-gratis" className="text-primary-bright underline underline-offset-2">
            Peça o teste grátis de 4 horas
          </Link>{" "}
          antes de assinar.
        </p>
      </div>
    </section>
  );
}
