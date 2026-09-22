import Link from "next/link";
import { ChevronRight } from "lucide-react";
import JsonLd from "@/components/ui/JsonLd";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://iptu2022br.com.br";

export interface Crumb {
  nome: string;
  href?: string;
}

/** Trilha visível + BreadcrumbList (aparece no resultado do Google). A home entra sozinha. */
export default function Breadcrumbs({ trilha }: { trilha: Crumb[] }) {
  const itens: Crumb[] = [{ nome: "Início", href: "/" }, ...trilha];
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: itens.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.nome,
            ...(c.href ? { item: `${SITE_URL}${c.href}` } : {}),
          })),
        }}
      />
      <nav aria-label="Você está em" className="container-x pt-6 text-xs text-text-tertiary">
        <ol className="flex flex-wrap items-center gap-1">
          {itens.map((c, i) => (
            <li key={c.nome} className="flex items-center gap-1">
              {i > 0 && <ChevronRight size={12} aria-hidden />}
              {c.href && i < itens.length - 1 ? (
                <Link href={c.href} className="hover:text-text-primary">
                  {c.nome}
                </Link>
              ) : (
                <span aria-current="page" className="text-text-secondary">
                  {c.nome}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
