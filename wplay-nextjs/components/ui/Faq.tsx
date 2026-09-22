"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";

export interface FaqItem {
  pergunta: string;
  resposta: string;
}

/**
 * Accordion acessível (design-system.md seção 5.3): <button aria-expanded>
 * por item, painel associado por aria-controls/id, ícone que gira sem
 * re-layout brusco dos itens abaixo.
 */
export default function Faq({ items }: { items: FaqItem[] }) {
  const [aberto, setAberto] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const expandido = aberto === i;
        const panelId = `${baseId}-panel-${i}`;
        const buttonId = `${baseId}-button-${i}`;
        return (
          <div key={item.pergunta} className={`card overflow-hidden ${expandido ? "card-destaque" : ""}`}>
            <button
              id={buttonId}
              type="button"
              aria-expanded={expandido}
              aria-controls={panelId}
              onClick={() => setAberto(expandido ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer"
            >
              <span className="text-sm font-semibold text-text-primary sm:text-base">{item.pergunta}</span>
              <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md ease-std transition-all duration-200 ${expandido ? "bg-primary text-cta-text" : "bg-bg-raised text-primary-bright"}`}>
                <ChevronDown size={16} aria-hidden className={`ease-std transition-transform duration-200 ${expandido ? "rotate-180" : ""}`} />
              </span>
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className="grid ease-std transition-[grid-template-rows] duration-200"
              style={{ gridTemplateRows: expandido ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-sm leading-relaxed text-text-secondary">{item.resposta}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
