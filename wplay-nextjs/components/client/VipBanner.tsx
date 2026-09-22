"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";

/**
 * Regra real do appwplay: todo cliente que pagou é levado pro Suporte VIP
 * automaticamente, com contagem regressiva de 4s, mas só UMA vez por sessão
 * de navegador (sessionStorage) — recarregar a página não spam-abre o
 * WhatsApp de novo.
 */
export default function VipBanner({ url, chave }: { url: string; chave: string }) {
  const [segundos, setSegundos] = useState<number | null>(4);

  useEffect(() => {
    const key = `wplay_vip_${chave}`;
    if (sessionStorage.getItem(key)) {
      setSegundos(null);
      return;
    }
    let n = 4;
    const t = setInterval(() => {
      n -= 1;
      setSegundos(n);
      if (n <= 0) {
        clearInterval(t);
        sessionStorage.setItem(key, "1");
        window.location.href = url;
      }
    }, 1000);
    return () => clearInterval(t);
  }, [url, chave]);

  return (
    <div className="mb-6 rounded-xl bg-gradient-to-br from-primary to-primary-bright p-5 text-center text-bg-base">
      <p className="font-heading text-lg font-extrabold">Assinatura confirmada! Ative seu Suporte VIP</p>
      <p className="mt-1.5 text-sm opacity-90">
        Como assinante você tem atendimento exclusivo e prioritário no WhatsApp. Seus dados já vão preenchidos,
        é só enviar.
      </p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-2 rounded-xl bg-bg-base px-6 py-3 font-bold text-primary-bright"
      >
        <MessageCircle size={18} aria-hidden /> Ativar meu Suporte VIP
      </a>
      {segundos !== null && segundos > 0 && (
        <p className="mt-2.5 text-xs opacity-90">Abrindo seu WhatsApp VIP em {segundos}...</p>
      )}
    </div>
  );
}
