"use client";

import { useState, useEffect, useCallback } from "react";
import { Loader2, ShieldCheck, Copy, Check, QrCode, CheckCircle2, MessageCircle } from "lucide-react";
import EmailInput from "@/components/forms/EmailInput";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputCls =
  "w-full rounded-md border border-border-strong bg-bg-raised px-4 py-3 text-text-primary placeholder:text-text-tertiary outline-none ease-std transition-colors duration-200 focus:border-primary-bright disabled:opacity-60";

function formatTelefone(v: string): string {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

function formatCPF(v: string): string {
  const d = v.replace(/\D/g, "").slice(0, 11);
  return d
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

interface PixData {
  ref: string;
  brCode: string;
  qrCodeImage?: string;
  paymentLinkUrl?: string;
}

interface Acesso {
  username: string;
  password: string;
}

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

/** Separa DDI + número de um telefone gravado só com dígitos. */
function separarDdi(tel: string): { code: PaisCode; ddi: string; numero: string } {
  const d = (tel || "").replace(/D/g, "");
  const p = [...PAISES].sort((a, b) => b.ddi.length - a.ddi.length).find((x) => d.startsWith(x.ddi));
  return p ? { code: p.code, ddi: p.ddi, numero: d.slice(p.ddi.length) } : { code: "BR", ddi: "55", numero: d };
}

export interface CheckoutInicial { nome?: string; email?: string; telefone?: string }

export default function CheckoutForm({ planId, precoLabel, inicial }: { planId: string; precoLabel: string; inicial?: CheckoutInicial }) {
  // Cliente logado chega com nome, e-mail e WhatsApp já preenchidos (vindos
  // do próprio registro do teste); só falta o CPF que o banco exige.
  const logado = !!(inicial?.nome && inicial?.email);
  const ini = separarDdi(inicial?.telefone ?? "");
  const [nome, setNome] = useState(inicial?.nome ?? "");
  const [email, setEmail] = useState(inicial?.email ?? "");
  const [paisCode, setPaisCode] = useState<PaisCode>(ini.code);
  const [telefone, setTelefone] = useState(ini.numero ? (ini.code === "BR" ? formatTelefone(ini.numero) : ini.numero) : "");
  const pais = PAISES.find((p) => p.code === paisCode)!;
  const brasileiro = paisCode === "BR";
  const [documento, setDocumento] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [pix, setPix] = useState<PixData | null>(null);
  const [copiado, setCopiado] = useState(false);
  const [acesso, setAcesso] = useState<Acesso | null>(null);
  const [socorro, setSocorro] = useState<{ erro: string; whatsapp: string } | null>(null);

  // Polling: enquanto o Pix estiver na tela, confere se o pagamento caiu.
  useEffect(() => {
    if (!pix || acesso) return;
    let vivo = true;
    const timer = setInterval(async () => {
      try {
        const r = await fetch(`/api/pix-status?ref=${encodeURIComponent(pix.ref)}`, { cache: "no-store" });
        const d = await r.json();
        if (vivo && d.paid) {
          clearInterval(timer);
          setAcesso({ username: d.username, password: d.password });
        }
      } catch {
        /* rede instável: tenta de novo no próximo tick */
      }
    }, 4000);
    return () => {
      vivo = false;
      clearInterval(timer);
    };
  }, [pix, acesso]);

  const copiar = useCallback(async () => {
    if (!pix) return;
    try {
      await navigator.clipboard.writeText(pix.brCode);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2500);
    } catch {
      /* clipboard bloqueado */
    }
  }, [pix]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    if (nome.trim().split(/\s+/).length < 2) return setErro("Digite nome e sobrenome.");
    if (!EMAIL_REGEX.test(email.trim())) return setErro("Digite um e-mail válido.");
    if (telefone.replace(/\D/g, "").length < (brasileiro ? 10 : 6)) return setErro("Digite um WhatsApp válido.");
    if (documento.replace(/\D/g, "").length !== 11) return setErro("Digite um CPF válido (exigido para o Pix).");

    setLoading(true);
    // Funil do Flora: o tracker só mede visita; checkout_open é chamado aqui,
    // e o id do visitante vai no pedido pra ligar a venda à sessão.
    const flora = (window as unknown as { flora?: { (t: string): void; id?: string } }).flora;
    try {
      flora?.("checkout_open");
    } catch {
      /* telemetria nunca bloqueia */
    }
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId,
          visitor: flora?.id,
          nome: nome.trim(),
          email: email.trim(),
          telefone: pais.ddi + telefone.replace(/\D/g, ""),
          documento: documento.replace(/\D/g, ""),
          pais: pais.nome,
        }),
      });
      const data = await res.json();
      if (data.whatsapp) {
        setSocorro({ erro: data.erro, whatsapp: data.whatsapp });
        return;
      }
      if (!res.ok || !data.ok || !data.brCode) {
        setErro(data.erro || "Não foi possível gerar o pagamento. Tente novamente.");
        return;
      }
      setPix({ ref: data.ref, brCode: data.brCode, qrCodeImage: data.qrCodeImage, paymentLinkUrl: data.paymentLinkUrl });
    } catch {
      setErro("Erro de conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  if (acesso) {
    return (
      <div className="text-center" role="status" aria-live="polite">
        <CheckCircle2 className="mx-auto text-success" size={40} aria-hidden />
        <p className="mt-3 font-heading text-lg font-bold text-text-primary">Pagamento confirmado</p>
        <p className="mt-1 text-sm text-text-secondary">Sua assinatura está ativa. Use estes dados para entrar no app.</p>
        <div className="mt-5 space-y-3 text-left">
          <div className="flex items-center justify-between gap-3 rounded-md border border-border-strong bg-bg-raised px-4 py-3">
            <div>
              <p className="text-xs text-text-tertiary">Usuário</p>
              <p className="font-mono text-sm text-text-primary">{acesso.username}</p>
            </div>
          </div>
          <div className="flex items-center justify-between gap-3 rounded-md border border-border-strong bg-bg-raised px-4 py-3">
            <div>
              <p className="text-xs text-text-tertiary">Senha</p>
              <p className="font-mono text-sm text-text-primary">{acesso.password}</p>
            </div>
          </div>
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
        <p className="mt-3 font-heading text-lg font-bold text-text-primary">Vamos finalizar pelo WhatsApp</p>
        <p className="mt-1 text-sm text-text-secondary">{socorro.erro}</p>
        <a href={socorro.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-5 w-full">
          Falar no WhatsApp
        </a>
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

  if (pix) {
    return (
      <div className="space-y-4 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-bg-raised px-3 py-1 text-xs text-text-secondary">
          <Loader2 className="animate-spin" size={14} aria-hidden /> Aguardando o pagamento...
        </div>
        <p className="text-sm text-text-secondary">
          Escaneie o QR Code ou copie o código Pix. A ativação é <strong className="text-text-primary">automática</strong> assim que o pagamento cair.
        </p>
        {pix.qrCodeImage && (
          <div className="flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={pix.qrCodeImage} alt="QR Code Pix" width={220} height={220} className="rounded-xl bg-white p-2" />
          </div>
        )}
        <div className="rounded-md border border-border-strong bg-bg-raised p-3 text-left">
          <p className="mb-1 text-xs text-text-tertiary">Pix copia e cola</p>
          <p className="break-all font-mono text-[11px] leading-relaxed text-text-secondary">{pix.brCode}</p>
        </div>
        <button type="button" onClick={copiar} className="btn btn-primary w-full">
          {copiado ? (
            <>
              <Check size={18} aria-hidden /> Código copiado!
            </>
          ) : (
            <>
              <Copy size={18} aria-hidden /> Copiar código Pix
            </>
          )}
        </button>
        {pix.paymentLinkUrl && (
          <a
            href={pix.paymentLinkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 text-xs text-primary-bright underline underline-offset-2"
          >
            <QrCode size={14} aria-hidden /> Abrir no app do banco
          </a>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left" noValidate>
      <p className="text-sm text-text-secondary">
        Plano <strong className="text-text-primary">{precoLabel}</strong>.{" "}
        {logado ? "Só falta o CPF, que o banco exige para emitir o Pix." : "Confirme seus dados para gerar o Pix."}
      </p>

      {logado ? (
        <div className="rounded-md border border-border-subtle bg-bg-base p-4 text-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-text-tertiary">Assinando como</p>
          <p className="mt-1 font-semibold text-text-primary">{nome}</p>
          <p className="text-text-secondary">{email}</p>
          {ini.numero && <p className="text-text-secondary">+{ini.ddi} {telefone}</p>}
        </div>
      ) : (
        <>
          <div>
            <label htmlFor="co-nome" className="mb-1.5 block text-sm text-text-secondary">
              Nome completo
            </label>
            <input id="co-nome" className={inputCls} value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Seu nome" autoComplete="name" disabled={loading} />
          </div>
          <div>
            <label htmlFor="co-email" className="mb-1.5 block text-sm text-text-secondary">
              E-mail
            </label>
            <EmailInput id="co-email" value={email} onChange={setEmail} disabled={loading} placeholder="o mesmo do seu teste grátis" />
          </div>
        </>
      )}

      {(!logado || !ini.numero) && (
        <div>
          <label htmlFor="co-tel" className="mb-1.5 block text-sm text-text-secondary">
            WhatsApp{logado ? " (não estava no seu cadastro)" : ""}
          </label>
          <div className="flex gap-2">
            <select
              id="co-pais"
              aria-label="País"
              className="shrink-0 cursor-pointer rounded-md border border-border-strong bg-bg-raised px-1.5 py-3 text-sm text-text-primary outline-none ease-std transition-colors duration-200 focus:border-primary-bright disabled:opacity-60"
              style={{ width: "5.25rem" }}
              value={paisCode}
              onChange={(e) => { setPaisCode(e.target.value as PaisCode); setTelefone(""); }}
              disabled={loading}
            >
              {PAISES.map((p) => (
                <option key={p.code} value={p.code}>+{p.ddi} {p.nome}</option>
              ))}
            </select>
            <input
              id="co-tel"
              className={`${inputCls} min-w-0 flex-1`}
              type="tel"
              value={telefone}
              onChange={(e) => setTelefone(brasileiro ? formatTelefone(e.target.value) : e.target.value.replace(/\D/g, ""))}
              placeholder={brasileiro ? "(00) 00000-0000" : "Número, sem o +"}
              autoComplete="tel-national"
              disabled={loading}
            />
          </div>
        </div>
      )}
      <div>
        <label htmlFor="co-cpf" className="mb-1.5 block text-sm text-text-secondary">
          CPF
        </label>
        <input
          id="co-cpf"
          className={inputCls}
          inputMode="numeric"
          value={documento}
          onChange={(e) => setDocumento(formatCPF(e.target.value))}
          placeholder="000.000.000-00"
          disabled={loading}
        />
        <p className="mt-1.5 text-xs text-text-tertiary">Exigido pelo banco para gerar o Pix.</p>
      </div>
      {erro && (
        <p role="alert" className="text-sm text-danger">
          {erro}
        </p>
      )}
      <button type="submit" className="btn btn-primary w-full" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="animate-spin" size={18} aria-hidden /> Gerando pagamento...
          </>
        ) : (
          "Ir para o pagamento (Pix)"
        )}
      </button>
      <p className="flex items-center justify-center gap-1.5 text-center text-xs text-text-tertiary">
        <ShieldCheck size={14} aria-hidden /> Pagamento seguro via Pix. Acesso liberado após a confirmação.
      </p>
    </form>
  );
}
