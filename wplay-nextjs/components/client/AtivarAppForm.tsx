"use client";

import { useState } from "react";
import { Loader2, Smartphone, CheckCircle2 } from "lucide-react";
import { APPS_ATIVACAO_MAC } from "@/content/apps";

const RECOMENDADOS = APPS_ATIVACAO_MAC.filter((a) => a.xstream);
const OUTROS = APPS_ATIVACAO_MAC.filter((a) => !a.xstream);

/**
 * Importa a lista direto num app por MAC/código, sem digitar usuário e
 * senha. Mesmo mecanismo real do appwplay: o app mostra um código na tela
 * (Samsung, LG, Roku ou qualquer TV com a função de "importar lista"), o
 * cliente cola aqui e o sistema ativa sozinho.
 */
export default function AtivarAppForm() {
  const [nameApp, setNameApp] = useState(APPS_ATIVACAO_MAC[0].nameApp);
  const [mac, setMac] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [sucesso, setSucesso] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    setSucesso(null);
    if (mac.trim().length < 6) return setErro("Código inválido. Verifique e tente novamente.");

    setLoading(true);
    try {
      const res = await fetch("/api/minha-conta/ativar-app", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nameApp, mac: mac.trim() }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setErro(data.erro || "Não foi possível importar a lista agora.");
      } else {
        setSucesso(data.mensagem);
        setMac("");
      }
    } catch {
      setErro("Erro de conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="ativar-app-nome" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-text-tertiary">
          Escolha o aplicativo
        </label>
        <select
          id="ativar-app-nome"
          value={nameApp}
          onChange={(e) => setNameApp(e.target.value)}
          disabled={loading}
          className="w-full rounded-md border border-border-strong bg-bg-raised px-3 py-2.5 text-sm text-text-primary outline-none ease-std transition-colors duration-200 focus:border-primary-bright disabled:opacity-60"
        >
          <optgroup label="Recomendados">
            {RECOMENDADOS.map((a) => (
              <option key={a.nameApp} value={a.nameApp}>
                {a.label}
              </option>
            ))}
          </optgroup>
          <optgroup label="Outros players">
            {OUTROS.map((a) => (
              <option key={a.nameApp} value={a.nameApp}>
                {a.label}
              </option>
            ))}
          </optgroup>
        </select>
      </div>

      <div>
        <label htmlFor="ativar-app-mac" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-text-tertiary">
          Código / MAC do aparelho
        </label>
        <input
          id="ativar-app-mac"
          type="text"
          value={mac}
          onChange={(e) => setMac(e.target.value)}
          disabled={loading}
          placeholder="Ex: AA:BB:CC:DD:EE:FF ou código do app"
          className="w-full rounded-md border border-border-strong bg-bg-raised px-3 py-2.5 font-mono text-sm text-text-primary outline-none ease-std transition-colors duration-200 focus:border-primary-bright disabled:opacity-60"
        />
        <p className="mt-1.5 text-xs text-text-tertiary">
          Abra o app escolhido na sua TV e procure &quot;Código de ativação&quot;, &quot;MAC&quot; ou &quot;Código do
          dispositivo&quot;.
        </p>
      </div>

      {erro && (
        <p role="alert" className="text-sm text-danger">
          {erro}
        </p>
      )}
      {sucesso && (
        <p role="status" className="flex items-center gap-2 text-sm font-semibold text-success">
          <CheckCircle2 size={16} aria-hidden /> {sucesso}
        </p>
      )}

      <button type="submit" className="btn btn-primary w-full" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="animate-spin" size={18} aria-hidden /> Importando...
          </>
        ) : (
          <>
            <Smartphone size={18} aria-hidden /> Importar lista agora
          </>
        )}
      </button>
    </form>
  );
}
