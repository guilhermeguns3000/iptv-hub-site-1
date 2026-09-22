"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function MobileMenu({ itens }: { itens: { href: string; label: string }[] }) {
  const [aberto, setAberto] = useState(false);
  const pathname = usePathname();

  useEffect(() => { setAberto(false); }, [pathname]);
  useEffect(() => {
    if (!aberto) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setAberto(false); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [aberto]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setAberto((v) => !v)}
        aria-expanded={aberto}
        aria-controls="menu-celular"
        aria-label={aberto ? "Fechar menu" : "Abrir menu"}
        className="flex h-11 w-11 items-center justify-center rounded-md border border-border-strong text-text-secondary hover:text-primary-bright"
      >
        {aberto ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
      </button>
      {aberto && (
        <div id="menu-celular" className="absolute inset-x-0 top-16 z-40 border-b border-border-subtle bg-bg-base shadow-[0_24px_48px_-12px_rgba(0,0,0,0.8)]">
          <nav aria-label="Navegação principal" className="container-x py-3">
            <ul className="divide-y divide-border-subtle">
              {itens.map((i) => (
                <li key={i.href}>
                  <Link
                    href={i.href}
                    className={`block py-3.5 text-base font-medium ${pathname === i.href ? "text-primary-bright" : "text-text-primary"}`}
                  >
                    {i.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/minha-conta" className="block py-3.5 text-base font-medium text-text-secondary">Minha conta</Link>
              </li>
            </ul>
            <Link href="/teste-gratis" className="btn btn-primary mt-3 w-full">Testar grátis por 4 horas</Link>
          </nav>
        </div>
      )}
    </div>
  );
}
