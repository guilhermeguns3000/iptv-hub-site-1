import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getSession } from "@/lib/auth";
import WebPlayer from "@/components/client/WebPlayer";

export const metadata: Metadata = {
  title: "Web Player",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function PlayerPage() {
  const session = await getSession();
  if (!session?.email) redirect("/minha-conta");

  return (
    <section className="container-x py-8 sm:py-10">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl font-bold text-text-primary">Web Player</h1>
          <p className="text-sm text-text-secondary">Assista direto no navegador, sem instalar nada. Canais ao vivo do seu acesso.</p>
        </div>
        <Link href="/minha-conta" className="btn btn-outline py-2 text-sm"><ArrowLeft size={16} aria-hidden /> Minha conta</Link>
      </div>
      <WebPlayer />
      <p className="mt-4 text-xs text-text-tertiary">
        Em TV com navegador, abra esta mesma página depois de entrar na sua conta. Se o vídeo não abrir, o
        navegador da TV pode ser antigo demais: nesse caso, use um app da loja ou um TV Box.
      </p>
    </section>
  );
}
