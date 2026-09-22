"use client";

import { useState } from "react";
import { Loader2, Mail, CheckCircle2 } from "lucide-react";
import EmailInput from "@/components/forms/EmailInput";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginEmailForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [enviado, setEnviado] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    if (!EMAIL_REGEX.test(email.trim())) return setErro("Digite um e-mail válido.");

    setLoading(true);
    try {
      await fetch("/api/login-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      // A resposta é sempre genérica de propósito (não revela se o e-mail
      // tem conta) — o front só mostra "enviado", nunca um erro de "não achei".
      setEnviado(true);
    } catch {
      setErro("Erro de conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  if (enviado) {
    return (
      <div className="text-center" role="status" aria-live="polite">
        <CheckCircle2 className="mx-auto text-success" size={40} aria-hidden />
        <p className="mt-3 font-heading text-lg font-bold text-text-primary">Verifique seu e-mail</p>
        <p className="mt-1 text-sm text-text-secondary">
          Se esse e-mail tiver conta no WPlay, mandamos um link de acesso. Confira a caixa de entrada e o spam.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left" noValidate>
      <div>
        <label htmlFor="login-email" className="mb-1.5 block text-sm text-text-secondary">
          E-mail da sua conta
        </label>
        <EmailInput id="login-email" value={email} onChange={setEmail} disabled={loading} />
        <p className="mt-1.5 text-xs text-text-tertiary">O mesmo e-mail usado no teste grátis ou na assinatura.</p>
      </div>
      {erro && (
        <p role="alert" className="text-sm text-danger">
          {erro}
        </p>
      )}
      <button type="submit" className="btn btn-primary w-full" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="animate-spin" size={18} aria-hidden /> Enviando...
          </>
        ) : (
          <>
            <Mail size={18} aria-hidden /> Receber link de acesso
          </>
        )}
      </button>
      <p className="text-center text-xs text-text-tertiary">
        Sem senha pra decorar. O link vale por 15 minutos e só funciona uma vez.
      </p>
    </form>
  );
}
