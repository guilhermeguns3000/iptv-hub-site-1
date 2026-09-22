import { Shield, Check, CreditCard, MessageCircle } from "lucide-react";
import type { ComponentType } from "react";

/**
 * Faixa honesta, sem estatística fabricada (design-system.md seção 5.5).
 * Cada item aqui é verificável — nada de contador de clientes ou nota de
 * avaliação inventada.
 */
const ITENS: { icon: ComponentType<{ size?: number; className?: string }>; texto: string }[] = [
  { icon: Shield, texto: "Teste grátis antes de pagar" },
  { icon: Check, texto: "Sem cartão, sem cadastro" },
  { icon: CreditCard, texto: "Pagamento só via PIX" },
  { icon: MessageCircle, texto: "Suporte via WhatsApp" },
];

export default function TrustBar() {
  return (
    <div className="border-y border-border-subtle bg-bg-surface/60">
      <div className="container-x flex gap-0 overflow-x-auto py-3.5 text-sm text-text-secondary">
        {ITENS.map(({ icon: Icon, texto }, i) => (
          <div key={texto} className={`flex shrink-0 items-center gap-2.5 px-6 first:pl-0 last:pr-0 ${i > 0 ? "border-l border-border-subtle" : ""}`}>
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/15 text-primary-bright"><Icon size={15} aria-hidden /></span>
            <span className="font-medium">{texto}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
