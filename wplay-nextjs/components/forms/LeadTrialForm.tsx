"use client";

import { useState } from "react";
import { Loader2, ShieldOff, ShieldAlert, CheckCircle2, MessageCircle, Copy, Check } from "lucide-react";
import { salvarTesteLocal } from "@/lib/local-trial";
import EmailInput from "@/components/forms/EmailInput";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputCls =
  "w-full rounded-md border border-border-strong bg-bg-raised px-4 py-3 text-text-primary placeholder:text-text-tertiary outline-none ease-std transition-colors duration-200 focus:border-primary-bright disabled:opacity-60";

/**
 * Mesmo conjunto de países que o appwplay.com.br já mostra no seletor de
 * WhatsApp do teste grátis (ver wplay-research/intel-appwplay.md seção "prova
 * social/abrangência") — o público do Warez não é só brasileiro, e o campo
 * anterior (máscara fixa de DDD brasileiro) impedia um lead internacional de
 * digitar o próprio número.
 */
const PAISES = [
  { code: "BR", nome: "Brasil", ddi: "55" },
  { code: "PT", nome: "Portugal", ddi: "351" },
  { code: "US", nome: "EUA", ddi: "1" },
  { code: "AR", nome: "Argentina", ddi: "54" },
  { code: "PY", nome: "Paraguai", ddi: "595" },
  { code: "UY", nome: "Uruguai", ddi: "598" },
  { code: "CL", nome: "Chile", ddi: "56" },
  { code: "ES", nome: "Espanha", ddi: "34" },
  { code: "AO", nome: "Angola", ddi: "244" },
] as const;

type PaisCode = (typeof PAISES)[number]["code"];

function formatTelefone(v: string, brasileiro: boolean): string {
  const d = v.replace(/\D/g, "").slice(0, brasileiro ? 11 : 14);
  if (!brasileiro) return d;
  if (d.length <= 2) return d;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

interface Acesso {
  username: string;
  password: string;
}

function CampoCopiavel({ label, valor }: { label: string; valor: string }) {
  const [copiado, setCopiado] = useState(false);
  async function copiar() {
    try {
      await navigator.clipboard.writeText(valor);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      // Clipboard indisponível (ex. contexto não seguro) — o valor já está
      // visível na tela, o usuário copia manualmente.
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

export default function LeadTrialForm() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [paisCode, setPaisCode] = useState<PaisCode>("BR");
  const [telefone, setTelefone] = useState("");
  const [adulto, setAdulto] = useState(false);
  const pais = PAISES.find((p) => p.code === paisCode)!;
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [acesso, setAcesso] = useState<Acesso | null>(null);
  // Plano B: quando o gerador automático não entrega (cota do painel, falha),
  // o lead vai para o WhatsApp com os dados prontos em vez de virar erro seco.
  const [socorro, setSocorro] = useState<{ erro: string; whatsapp: string } | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    const digitos = telefone.replace(/\D/g, "");
    if (nome.trim().split(/\s+/).length < 2) return setErro("Digite nome e sobrenome.");
    if (!EMAIL_REGEX.test(email.trim())) return setErro("Digite um e-mail válido.");
    if (digitos.length < (paisCode === "BR" ? 10 : 6)) return setErro("Digite um WhatsApp válido.");

    setLoading(true);
    try {
      const res = await fetch("/api/trial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: nome.trim(),
          email: email.trim(),
          telefone: pais.ddi + digitos,
          adulto,
          visitor: (window as unknown as { flora?: { id?: string } }).flora?.id,
        }),
      });
      const data = await res.json();

      // Mesmo desfecho do real: a sessão já foi aberta pelo servidor e o
      // cliente cai dentro da área dele (credenciais, assistente de
      // instalação, importação por MAC). Não fica parado numa tela de senha.
      if (data.ok && data.redirect) {
        if (data.username && data.password) salvarTesteLocal({ username: data.username, password: data.password });
        window.location.href = data.redirect;
        return;
      }
      if (data.ok && data.username && data.password) {
        setAcesso({ username: data.username, password: data.password });
        salvarTesteLocal({ username: data.username, password: data.password });
        return;
      }
      if (data.whatsapp) {
        setSocorro({ erro: data.erro, whatsapp: data.whatsapp });
        return;
      }
      setErro(data.erro || "Não foi possível gerar o teste. Tente novamente.");
    } catch {
      setErro("Erro de conexão. Verifique sua internet e tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  if (acesso) {
    return (
      <div className="text-center" role="status" aria-live="polite">
        <CheckCircle2 className="mx-auto text-success" size={40} aria-hidden />
        <p className="mt-3 font-heading text-lg font-bold text-text-primary">Seu acesso está pronto</p>
        <p className="mt-1 text-sm text-text-secondary">
          4 horas de teste completo. Guarde estes dados para fazer login no app.
        </p>
        <div className="mt-5 space-y-3 text-left">
          <CampoCopiavel label="Usuário" valor={acesso.username} />
          <CampoCopiavel label="Senha" valor={acesso.password} />
        </div>
        <a href="/wplay-p2p" className="btn btn-primary mt-5 w-full">
          Ver como instalar o app
        </a>
      </div>
    );
  }

  if (socorro) {
    return (
      <div className="text-center" role="status" aria-live="polite">
        <MessageCircle className="mx-auto text-primary-bright" size={40} aria-hidden />
        <p className="mt-3 font-heading text-lg font-bold text-text-primary">Seu teste sai pelo WhatsApp</p>
        <p className="mt-1 text-sm text-text-secondary">{socorro.erro}</p>
        <a href={socorro.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-5 w-full">
          Falar no WhatsApp e liberar meu teste
        </a>
        <p className="mt-3 text-xs text-text-tertiary">Seus dados já vão na mensagem. É só enviar.</p>
        <button
          type="button"
          onClick={() => setSocorro(null)}
          className="mt-3 block w-full cursor-pointer text-sm text-text-secondary hover:text-text-primary"
        >
          Tentar pelo site de novo
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left" noValidate>
      <div>
        <label htmlFor="nome" className="mb-1.5 block text-sm text-text-secondary">
          Nome completo
        </label>
        <input
          id="nome"
          className={inputCls}
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Seu nome"
          autoComplete="name"
          disabled={loading}
        />
      </div>
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm text-text-secondary">
          E-mail
        </label>
        <EmailInput id="email" value={email} onChange={setEmail} disabled={loading} />
      </div>
      <div>
        <label htmlFor="telefone" className="mb-1.5 block text-sm text-text-secondary">
          WhatsApp
        </label>
        <div className="flex gap-2">
          <select
            id="pais"
            aria-label="País"
            className="w-20 shrink-0 cursor-pointer rounded-md border border-border-strong bg-bg-raised px-1.5 py-3 text-sm text-text-primary outline-none ease-std transition-colors duration-200 focus:border-primary-bright disabled:opacity-60"
            style={{ width: "5.25rem" }}
            value={paisCode}
            onChange={(e) => {
              setPaisCode(e.target.value as PaisCode);
              setTelefone("");
            }}
            disabled={loading}
          >
            {PAISES.map((p) => (
              <option key={p.code} value={p.code}>
                +{p.ddi} {p.nome}
              </option>
            ))}
          </select>
          <input
            id="telefone"
            className={`${inputCls} min-w-0 flex-1`}
            type="tel"
            value={telefone}
            onChange={(e) => setTelefone(formatTelefone(e.target.value, paisCode === "BR"))}
            placeholder={paisCode === "BR" ? "(00) 00000-0000" : "Número, sem o +"}
            autoComplete="tel-national"
            disabled={loading}
          />
        </div>
      </div>
      <div>
        <p className="mb-1.5 text-sm text-text-secondary">Conteúdo adulto (+18)</p>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setAdulto(false)}
            aria-pressed={!adulto}
            className={`flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-md border px-3 py-2.5 text-sm ease-std transition-colors duration-200 ${
              !adulto ? "border-primary-bright bg-bg-raised text-text-primary" : "border-border-strong text-text-secondary"
            }`}
          >
            <ShieldOff size={16} aria-hidden /> Sem adulto
          </button>
          <button
            type="button"
            onClick={() => setAdulto(true)}
            aria-pressed={adulto}
            className={`flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-md border px-3 py-2.5 text-sm ease-std transition-colors duration-200 ${
              adulto ? "border-primary-bright bg-bg-raised text-text-primary" : "border-border-strong text-text-secondary"
            }`}
          >
            <ShieldAlert size={16} aria-hidden /> Com adulto
          </button>
        </div>
      </div>
      {erro && (
        <p role="alert" className="text-sm text-danger">
          {erro}
        </p>
      )}
      <button type="submit" className="btn btn-primary w-full" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="animate-spin" size={18} aria-hidden /> Gerando seu teste...
          </>
        ) : (
          "Gerar meu teste grátis"
        )}
      </button>
      <p className="text-center text-xs text-text-tertiary">
        Teste de 4 horas. Sem cartão de crédito. Seus dados ficam protegidos.
      </p>
    </form>
  );
}
