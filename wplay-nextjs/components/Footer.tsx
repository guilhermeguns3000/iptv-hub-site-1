import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";

const NUMERO = (process.env.NEXT_PUBLIC_WHATSAPP || "5562993901860").replace(/\D/g, "");
const NUMERO_FORMATADO = "+55 62 99390-1860";

// Mesmo horário de atendimento da operação real (mesmo WhatsApp em toda a
// família de sites) — não inventado, é o funcionamento real do suporte.
const DIAS = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];

export default function Footer() {
  return (
    <footer className="relative border-t border-border-subtle bg-bg-surface/60">
      <div aria-hidden className="pointer-events-none absolute inset-0 glow-primary opacity-60" />
      <div className="container-x relative grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Image src="/brand/logo-full.png" alt="WPlay TV" width={200} height={67} className="h-auto w-[200px]" />
          <p className="mt-3 max-w-xs text-sm text-text-secondary">
            App oficial de IPTV + P2P. Teste grátis por 4 horas antes de assinar, sem cartão de crédito.
          </p>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-text-tertiary">Produto</p>
          <ul className="mt-3 space-y-2 text-sm text-text-secondary">
            <li><Link href="/wplay-p2p" className="hover:text-text-primary">WPlay P2P</Link></li>
            <li><Link href="/apps" className="hover:text-text-primary">Apps</Link></li>
            <li><Link href="/teste-gratis" className="hover:text-text-primary">Teste grátis</Link></li>
            <li><Link href="/precos" className="hover:text-text-primary">Preço</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-text-tertiary">Suporte</p>
          <ul className="mt-3 space-y-2 text-sm text-text-secondary">
            <li><Link href="/wplay-nao-funciona" className="hover:text-text-primary">WPlay não funciona</Link></li>
            <li><Link href="/wplay-recarga" className="hover:text-text-primary">Renovar assinatura</Link></li>
            <li><Link href="/minha-conta" className="hover:text-text-primary">Minha conta</Link></li>
          </ul>
          <div className="mt-4 space-y-2 text-sm text-text-secondary">
            <a href={`https://wa.me/${NUMERO}`} className="flex items-center gap-2 hover:text-text-primary">
              <Phone size={14} className="shrink-0" aria-hidden /> {NUMERO_FORMATADO}
            </a>
          </div>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-text-tertiary">Funcionamento</p>
          <ul className="mt-3 space-y-1.5 text-xs text-text-tertiary">
            {DIAS.map((dia) => (
              <li key={dia}>{dia}: 09:30 às 22:00</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border-subtle">
        <div className="container-x flex flex-col gap-2 py-6 text-xs text-text-tertiary sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} WPlay. Todos os direitos reservados.</p>
          <p className="flex flex-wrap gap-x-4 gap-y-1">
            <Link href="/termos" className="hover:text-text-primary">Termos de uso</Link>
            <Link href="/privacidade" className="hover:text-text-primary">Privacidade</Link>
            <span>Pagamento via PIX. Sem fidelidade.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
