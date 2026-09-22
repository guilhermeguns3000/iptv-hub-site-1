import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <Image src="/brand/icon-128.png" alt="Ícone do app WPlay" width={64} height={64} className="rounded-2xl" />
      <h1 className="mt-6 font-heading text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl">
        Essa página não existe
      </h1>
      <p className="mt-4 max-w-md text-text-secondary">
        O endereço pode ter mudado ou nunca existiu. Veja os atalhos mais usados abaixo.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn btn-primary">Ir para a home</Link>
        <Link href="/apps" className="btn btn-outline">Ver apps</Link>
        <Link href="/guias" className="btn btn-outline">Guias de instalação</Link>
        <Link href="/teste-gratis" className="btn btn-outline">Testar grátis</Link>
      </div>
    </section>
  );
}
