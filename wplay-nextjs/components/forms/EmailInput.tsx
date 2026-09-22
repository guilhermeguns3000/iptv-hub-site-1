"use client";

import { useId, useRef, useState } from "react";

const DOMINIOS = ["gmail.com", "hotmail.com", "outlook.com", "yahoo.com.br", "icloud.com"];

const inputCls =
  "w-full rounded-md border border-border-strong bg-bg-raised px-4 py-3 text-text-primary placeholder:text-text-tertiary outline-none ease-std transition-colors duration-200 focus:border-primary-bright disabled:opacity-60";

interface Props {
  id: string;
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

/**
 * Campo de e-mail com sugestão de domínio, igual o real do appwplay.
 *
 * O bug que já aconteceu antes: cliente digita o e-mail completo
 * ("fulano@gmail.com") e ainda clica na sugestão "@gmail.com", duplicando
 * pra "fulano@gmail.com@gmail.com". Aqui isso é estruturalmente impossível
 * — ao escolher uma sugestão, o componente sempre CORTA qualquer "@..." que
 * já exista no valor atual antes de colar o domínio escolhido, nunca
 * concatena em cima do que já está lá.
 */
export default function EmailInput({ id, value, onChange, disabled, placeholder }: Props) {
  const [aberto, setAberto] = useState(false);
  const listboxId = useId();
  const blurTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const arroba = value.indexOf("@");
  const usuario = (arroba === -1 ? value : value.slice(0, arroba)).trim();
  const digitadoAposArroba = arroba === -1 ? "" : value.slice(arroba + 1).toLowerCase();

  const sugestoes =
    usuario.length === 0
      ? []
      : DOMINIOS.filter((d) => digitadoAposArroba === "" || d.startsWith(digitadoAposArroba));

  function escolher(dominio: string) {
    // Corta qualquer "@..." já existente antes de colar — nunca duplica.
    onChange(`${usuario}@${dominio}`);
    setAberto(false);
  }

  return (
    <div className="relative">
      <input
        id={id}
        className={inputCls}
        type="email"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setAberto(true);
        }}
        onFocus={() => setAberto(true)}
        onBlur={() => {
          // Delay pro clique na sugestão registrar antes do dropdown sumir.
          blurTimeout.current = setTimeout(() => setAberto(false), 150);
        }}
        placeholder={placeholder ?? "voce@email.com"}
        autoComplete="email"
        disabled={disabled}
        role="combobox"
        aria-expanded={aberto && sugestoes.length > 0}
        aria-controls={listboxId}
        aria-autocomplete="list"
      />
      {aberto && sugestoes.length > 0 && (
        <ul
          id={listboxId}
          role="listbox"
          className="absolute left-0 right-0 top-full z-10 mt-1.5 overflow-hidden rounded-md border border-border-strong bg-bg-raised shadow-card"
        >
          {sugestoes.map((d) => (
            <li key={d} role="option" aria-selected={false}>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => escolher(d)}
                className="flex w-full items-center px-4 py-2.5 text-left text-sm text-text-secondary ease-std transition-colors duration-200 hover:bg-bg-base hover:text-text-primary"
              >
                <span className="text-text-tertiary">{usuario}@</span>
                <span className="font-semibold">{d}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
