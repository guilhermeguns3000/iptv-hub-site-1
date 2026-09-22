"use client";

import { useEffect, useState } from "react";

/**
 * Badge Ativo/Expirado que acompanha o relógio do navegador, no mesmo
 * segundo em que a barra de validade zera. Sem isso o badge (gerado no
 * servidor) ficava "Ativo" até a pessoa recarregar a página.
 */
export default function StatusBadge({ expiraEm }: { expiraEm: number | null }) {
  const [agora, setAgora] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setAgora(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  if (expiraEm === null) {
    return <span className="rounded-sm bg-bg-base px-2 py-0.5 text-xs font-bold text-text-tertiary">Status indisponível</span>;
  }
  const venceu = expiraEm < agora;
  return (
    <span className={`rounded-sm px-2 py-0.5 text-xs font-bold ${venceu ? "bg-danger/15 text-danger" : "bg-primary/15 text-primary-bright"}`}>
      {venceu ? "Expirado" : "Ativo"}
    </span>
  );
}
