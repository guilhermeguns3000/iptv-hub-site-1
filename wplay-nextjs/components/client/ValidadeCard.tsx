"use client";

import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";

function fmt(ms: number): string {
  if (ms <= 0) return "Expirado";
  const s = Math.floor(ms / 1000);
  const d = Math.floor(s / 86400), h = Math.floor((s % 86400) / 3600), m = Math.floor((s % 3600) / 60), seg = s % 60;
  if (d > 0) return `${d}d ${h}h ${m}min`;
  if (h > 0) return `${h}h ${m}min ${seg}s`;
  return `${m}min ${seg}s`;
}

/** Barra de progresso + contagem regressiva, como o cartão de validade real. */
export default function ValidadeCard({ criadoEm, expiraEm, cta }: { criadoEm: number; expiraEm: number; cta?: { href: string; rotulo: string } }) {
  const [agora, setAgora] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setAgora(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const total = Math.max(1, expiraEm - criadoEm);
  const restante = expiraEm - agora;
  // Barra representa o que RESTA: começa cheia e esvazia até zero.
  const pct = Math.min(100, Math.max(0, ((expiraEm - agora) / total) * 100));
  const expirado = restante <= 0;
  // Acabando: menos de 25% do prazo ou menos de 30 min. Cor sobe de tom antes de expirar.
  const acabando = !expirado && (restante / total < 0.25 || restante < 30 * 60 * 1000);
  // Cor contínua: verde da marca (matiz 80) vai para âmbar (45) e chega ao
  // vermelho (5) conforme a fração restante cai. Sem saltos.
  const fracao = Math.max(0, Math.min(1, restante / total));
  const matiz = expirado ? 5 : Math.round(5 + fracao * 75);
  const corBarra = `hsl(${matiz} 62% 46%)`;
  const corTexto = expirado ? "text-danger" : acabando ? "text-warning" : "text-text-primary";
  const fmtData = (t: number) => new Date(t).toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });

  return (
    <div className="card border border-border-subtle p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-text-tertiary">Validade do acesso</p>
      <div className="mt-3 h-3 overflow-hidden rounded-full bg-bg-base ring-1 ring-inset ring-border-subtle" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(pct)}>
        <div className="h-full rounded-full transition-[width,background-color] duration-700" style={{ width: `${pct}%`, backgroundColor: corBarra, boxShadow: `0 0 12px ${corBarra}` }} />
      </div>
      <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-sm">
        <span className={`font-heading text-2xl font-extrabold tracking-tight ${corTexto}`} aria-live="off">{fmt(restante)}</span>
        <span className="text-text-tertiary">{acabando ? "Acabando. " : ""}Expira: {fmtData(expiraEm)}</span>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-3 border-t border-border-subtle pt-3 text-sm">
        <div><p className="text-xs uppercase tracking-wide text-text-tertiary">Criado em</p><p className="font-semibold text-text-primary">{fmtData(criadoEm)}</p></div>
        <div><p className="text-xs uppercase tracking-wide text-text-tertiary">Restante</p><p className="font-semibold text-text-primary">{fmt(restante)}</p></div>
      </div>
      {cta && (
        <a href={cta.href} className="btn btn-primary mt-4 w-full">
          <RefreshCw size={16} aria-hidden /> {cta.rotulo}
        </a>
      )}
    </div>
  );
}
