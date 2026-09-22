import Image from "next/image";
import Link from "next/link";
import { User } from "lucide-react";
import MobileMenu from "@/components/MobileMenu";

const NAV = [
  { href: "/apps", label: "Apps" },
  { href: "/wplay-p2p", label: "WPlay P2P" },
  { href: "/guias", label: "Guias" },
  { href: "/teste-gratis", label: "Teste grátis" },
  { href: "/precos", label: "Preço" },
  { href: "/wplay-nao-funciona", label: "Não funciona?" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 relative border-b border-border-subtle bg-bg-base/70 backdrop-blur-xl supports-[backdrop-filter]:bg-bg-base/60">
      <div className="container-x flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 py-2.5">
          <Image src="/brand/icon-128.png" alt="" width={32} height={32} className="rounded-lg" priority />
          <span className="font-heading text-xl font-extrabold tracking-tight text-text-primary">
            W<span className="text-primary-bright">Play</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Navegação principal">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-2.5 py-1.5 text-sm text-text-secondary ease-std transition-colors duration-200 hover:bg-bg-raised hover:text-text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/minha-conta"
            aria-label="Minha conta"
            className="hidden h-11 w-11 items-center justify-center rounded-md border border-border-strong text-text-secondary ease-std transition-colors duration-200 hover:text-primary-bright md:flex"
          >
            <User size={18} aria-hidden />
          </Link>
          <Link href="/teste-gratis" className="btn btn-primary text-xs sm:text-sm">
            Testar grátis
          </Link>
          <MobileMenu itens={NAV} />
        </div>
      </div>
    </header>
  );
}
