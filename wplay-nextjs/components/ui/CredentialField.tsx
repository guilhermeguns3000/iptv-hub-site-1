"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function CredentialField({ label, valor }: { label: string; valor: string }) {
  const [copiado, setCopiado] = useState(false);
  async function copiar() {
    try {
      await navigator.clipboard.writeText(valor);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      /* Clipboard indisponível — o valor já está visível na tela. */
    }
  }
  return (
    <div className="flex items-center justify-between gap-3 rounded-md border border-border-strong bg-bg-raised px-4 py-3">
      <div>
        <p className="text-xs text-text-tertiary">{label}</p>
        <p className="font-mono text-sm text-text-primary">{valor}</p>
      </div>
      <button
        type="button"
        onClick={copiar}
        aria-label={`Copiar ${label}`}
        className="shrink-0 rounded-sm p-2 text-text-secondary ease-std transition-colors duration-200 hover:text-primary-bright cursor-pointer"
      >
        {copiado ? <Check size={18} className="text-success" /> : <Copy size={18} />}
      </button>
    </div>
  );
}
