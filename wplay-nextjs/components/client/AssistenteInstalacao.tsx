"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Tv, Cable, Box, Smartphone, Monitor, Laptop, Radio, MessageCircle, Copy, Check, Download, Loader2, ArrowLeft, RotateCcw, Rocket,
} from "lucide-react";
import { APARELHOS, DNS_TV_ANTIGA, appsParaAparelho, type Aparelho, type AparelhoId, type AppAssistente } from "@/content/assistente";

interface Props {
  nome: string;
  username: string;
  password: string;
  whatsapp: string;
  plano: string;
  expira: string | null;
  ehTeste: boolean;
}

const ICONE: Record<AparelhoId, React.ComponentType<{ size?: number; className?: string }>> = {
  samsung: Tv, lg: Tv, roku: Radio, android_tv: Tv, tv_box: Box, fire_stick: Cable,
  celular_android: Smartphone, iphone: Smartphone, windows: Monitor, mac: Laptop, tv_antiga: Tv,
};

const PASSOS = ["Aparelho", "App", "Instalar", "Pronto"];

function Copiar({ valor }: { valor: string }) {
  const [ok, setOk] = useState(false);
  return (
    <button
      type="button"
      onClick={() => { navigator.clipboard?.writeText(valor).then(() => { setOk(true); setTimeout(() => setOk(false), 1500); }); }}
      className="rounded-sm border border-border-strong px-2 py-1 text-xs text-text-secondary hover:text-text-primary"
      aria-label={`Copiar ${valor}`}
    >
      {ok ? <Check size={14} aria-hidden /> : <Copy size={14} aria-hidden />}
    </button>
  );
}

function Credenciais({ username, password }: { username: string; password: string }) {
  return (
    <div className="rounded-md border border-primary-bright/40 bg-primary/10 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-primary-bright">Seus dados de acesso</p>
      {[["Usuário", username], ["Senha", password]].map(([l, v]) => (
        <div key={l} className="mt-2 flex items-center gap-3">
          <span className="w-16 shrink-0 text-sm text-text-tertiary">{l}</span>
          <span className="flex-1 break-all font-mono font-bold text-text-primary">{v}</span>
          <Copiar valor={v} />
        </div>
      ))}
    </div>
  );
}

function Metodos({ app }: { app: AppAssistente }) {
  if (!app.apk && !app.codigos?.length && !app.loja) return null;
  return (
    <div className="rounded-md border border-border-subtle bg-bg-base p-3 text-sm">
      {app.apk && (
        <a href={app.apk} target="_blank" rel="noopener noreferrer nofollow" className="btn btn-primary mb-2 flex w-full items-center justify-center gap-2 py-2 text-sm">
          <Download size={16} aria-hidden /> Baixar {app.nome}
        </a>
      )}
      {app.loja && (
        <a href={app.loja} target="_blank" rel="noopener noreferrer nofollow" className="btn btn-outline mb-2 flex w-full items-center justify-center gap-2 py-2 text-sm">
          Abrir na App Store
        </a>
      )}
      {app.codigos?.map((c) => (
        <div key={c.metodo} className="flex items-center justify-between gap-2 border-t border-border-subtle py-2">
          <span className="text-text-tertiary">Código {c.metodo}</span>
          <span className="flex items-center gap-2 font-mono font-bold text-primary-bright">{c.codigo}<Copiar valor={c.codigo} /></span>
        </div>
      ))}
    </div>
  );
}

function ImportarMac({ app }: { app: AppAssistente }) {
  const [mac, setMac] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; texto: string } | null>(null);

  async function importar() {
    setMsg(null);
    if (mac.trim().length < 6) return setMsg({ ok: false, texto: "Informe o código que aparece no app." });
    setLoading(true);
    try {
      const res = await fetch("/api/minha-conta/ativar-app", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nameApp: app.nameApp, mac: mac.trim() }),
      });
      const d = await res.json();
      setMsg(d.ok ? { ok: true, texto: d.mensagem } : { ok: false, texto: d.erro || "Não foi possível importar. Tente de novo." });
      if (d.ok) setMac("");
    } catch {
      setMsg({ ok: false, texto: "Erro de conexão. Tente de novo." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-md border border-primary-bright bg-bg-raised p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-primary-bright">Recomendado: importar a lista pelo código</p>
      <p className="mt-1 text-sm text-text-secondary">
        Abra o {app.nome}: ele mostra um código de ativação ou MAC na tela. Cole aqui e a lista entra sozinha,
        sem digitar usuário e senha no controle.
      </p>
      <div className="mt-3 flex gap-2">
        <input
          value={mac}
          onChange={(e) => setMac(e.target.value)}
          disabled={loading}
          placeholder="Cole o código ou MAC"
          aria-label="Código ou MAC do aparelho"
          className="min-w-0 flex-1 rounded-md border border-border-strong bg-bg-base px-3 py-2 font-mono text-sm text-text-primary outline-none focus:border-primary-bright"
        />
        <button type="button" onClick={importar} disabled={loading} className="btn btn-primary shrink-0 py-2 text-sm">
          {loading ? <Loader2 size={16} className="animate-spin" aria-hidden /> : "Importar"}
        </button>
      </div>
      {msg && (
        <p role={msg.ok ? "status" : "alert"} className={`mt-2 text-sm ${msg.ok ? "text-success" : "text-danger"}`}>{msg.texto}</p>
      )}
    </div>
  );
}

export default function AssistenteInstalacao({ nome, username, password, whatsapp, plano, expira, ehTeste }: Props) {
  const [passo, setPasso] = useState(1);
  const [aparelho, setAparelho] = useState<Aparelho | null>(null);
  const [app, setApp] = useState<AppAssistente | null>(null);

  const ajuda = `https://wa.me/${whatsapp}?text=${encodeURIComponent(
    `Olá! Não encontrei meu aparelho na lista e preciso de ajuda para configurar meu acesso.\nNome: ${nome}\nUsuário: ${username}\nSenha: ${password}\nPlano: ${plano}\nExpira: ${expira || "-"}`,
  )}`;

  const apps = aparelho ? appsParaAparelho(aparelho.id) : [];
  const iptv = apps.filter((a) => a.servico === "iptv");
  const p2p = apps.filter((a) => a.servico === "p2p");
  const ehAndroidTv = aparelho && ["android_tv", "tv_box", "fire_stick"].includes(aparelho.id);

  function escolherAparelho(a: Aparelho) {
    setAparelho(a); setApp(null);
    if (a.plataforma === "dns") { setPasso(3); return; }
    setPasso(2);
  }

  const Card = ({ a, onClick }: { a: AppAssistente; onClick?: () => void }) => (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-md border p-3 text-left transition-colors ${onClick ? "border-border-strong hover:border-primary-bright" : "border-primary-bright"}`}
    >
      {a.icone ? (
        <Image src={`/brand/apps/${a.icone}`} alt="" width={40} height={40} className="h-10 w-10 shrink-0 rounded-lg object-cover" />
      ) : (
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-bg-base font-heading text-sm font-bold text-primary-bright">{a.nome.slice(0, 2)}</span>
      )}
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-2 font-semibold text-text-primary">
          {a.nome}
          {a.nameApp && <span className="badge text-[10px]">Importação por código</span>}
          {a.recomendado && <span className="rounded-sm border border-primary-bright px-1.5 text-[10px] text-primary-bright">Recomendado</span>}
        </span>
        <span className="block text-xs text-text-tertiary">{a.descricao}</span>
      </span>
    </button>
  );

  return (
    <div className="card card-destaque overflow-hidden">
      <div className="flex items-center gap-3 border-b border-border-subtle px-5 py-4">
        <span className="icon-tile"><Rocket size={20} aria-hidden /></span>
        <div>
        <p className="font-heading text-lg font-bold text-text-primary">Vamos configurar seu acesso</p>
        <p className="text-xs text-text-tertiary">
          {passo === 1 && "Em qual aparelho você vai usar?"}
          {passo === 2 && aparelho && `${aparelho.nome}: escolha o aplicativo`}
          {passo === 3 && "Quase lá: siga os passos para ativar"}
          {passo === 4 && "Configuração concluída"}
        </p>
        </div>
      </div>
      <ol className="flex border-b border-border-subtle text-[11px] font-bold uppercase tracking-wide">
        {PASSOS.map((p, i) => (
          <li key={p} className={`flex-1 border-b-2 py-2 text-center ${i + 1 === passo ? "border-primary-bright text-primary-bright" : i + 1 < passo ? "border-transparent text-primary" : "border-transparent text-text-tertiary"}`}>
            {i + 1}. {p}
          </li>
        ))}
      </ol>

      <div className="p-5">
        {passo === 1 && (
          <>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {APARELHOS.map((a) => {
                const Icon = ICONE[a.id];
                return (
                  <button key={a.id} type="button" onClick={() => escolherAparelho(a)} className="card card-hover border border-border-subtle p-3 text-center">
                    <Icon size={24} className="mx-auto text-primary-bright" aria-hidden />
                    <span className="mt-1.5 block text-xs font-semibold text-text-secondary">{a.nome}</span>
                  </button>
                );
              })}
            </div>
            <a href={ajuda} target="_blank" rel="noopener noreferrer" className="mt-4 flex items-center gap-3 rounded-md border border-primary/40 bg-primary/10 p-3 text-sm">
              <MessageCircle size={20} className="shrink-0 text-primary-bright" aria-hidden />
              <span><strong className="block text-text-primary">Não encontrou seu aparelho?</strong><span className="text-text-secondary">Fale com o suporte: seus dados já vão na mensagem.</span></span>
            </a>
          </>
        )}

        {passo === 2 && aparelho && (
          <>
            {p2p.length > 0 && aparelho.id === "celular_android" && (
              <div className="mb-4">
                <p className="mb-2 text-xs font-bold uppercase tracking-wide text-primary-bright">P2P: esportes ao vivo</p>
                <div className="space-y-2">{p2p.map((a) => <Card key={a.nome} a={a} onClick={() => { setApp(a); setPasso(3); }} />)}</div>
              </div>
            )}
            {iptv.length > 0 && (
              <div className="mb-4">
                <p className="mb-2 text-xs font-bold uppercase tracking-wide text-primary-bright">IPTV: canais ao vivo, filmes e séries</p>
                <div className="space-y-2">{iptv.map((a) => <Card key={a.nome} a={a} onClick={() => { setApp(a); setPasso(3); }} />)}</div>
              </div>
            )}
            {p2p.length > 0 && aparelho.id !== "celular_android" && (
              <div className="mb-4">
                <p className="mb-2 text-xs font-bold uppercase tracking-wide text-primary-bright">P2P: esportes ao vivo</p>
                <div className="space-y-2">{p2p.map((a) => <Card key={a.nome} a={a} onClick={() => { setApp(a); setPasso(3); }} />)}</div>
              </div>
            )}
            {aparelho.plataforma === "tv" && (
              <p className="mb-4 rounded-md border border-warning/40 bg-bg-raised p-3 text-xs text-text-secondary">
                Na {aparelho.nome} o P2P não roda (só Android). O IPTV funciona pelos apps acima, buscando o nome na {aparelho.loja}.
              </p>
            )}
            <button type="button" onClick={() => setPasso(1)} className="btn btn-outline py-2 text-sm"><ArrowLeft size={16} aria-hidden /> Voltar</button>
          </>
        )}

        {passo === 3 && aparelho && (
          <div className="space-y-4">
            {aparelho.plataforma === "dns" ? (
              <>
                <p className="font-semibold text-text-primary">Sua TV não tem loja de apps: o caminho é configurar o DNS</p>
                <ol className="list-decimal space-y-1 pl-5 text-sm text-text-secondary">
                  {DNS_TV_ANTIGA.passos.map((p) => <li key={p}>{p}</li>)}
                </ol>
                <div className="rounded-md border border-border-subtle bg-bg-base p-3 text-sm">
                  <p className="text-xs uppercase tracking-wide text-text-tertiary">DNS recomendado ({DNS_TV_ANTIGA.principal.rotulo})</p>
                  <p className="flex items-center gap-2 font-mono text-lg font-bold text-text-primary">{DNS_TV_ANTIGA.principal.ip}<Copiar valor={DNS_TV_ANTIGA.principal.ip} /></p>
                  <p className="mt-2 text-xs uppercase tracking-wide text-text-tertiary">Alternativo ({DNS_TV_ANTIGA.alternativo.rotulo})</p>
                  <p className="flex items-center gap-2 font-mono text-lg font-bold text-text-primary">{DNS_TV_ANTIGA.alternativo.ip}<Copiar valor={DNS_TV_ANTIGA.alternativo.ip} /></p>
                </div>
                <Credenciais username={username} password={password} />
              </>
            ) : app ? (
              <>
                <Card a={app} />
                <ol className="list-decimal space-y-1 pl-5 text-sm text-text-secondary">
                  {aparelho.plataforma === "tv" && <li>Na {aparelho.loja}, busque <strong className="text-text-primary">{app.nome}</strong> e instale.</li>}
                  {ehAndroidTv && (app.codigos?.length ? <li>Na TV, instale o app <strong className="text-text-primary">Downloader</strong>, abra e digite o código abaixo para baixar o {app.nome}.</li> : <li>Instale o <strong className="text-text-primary">{app.nome}</strong> pela loja do aparelho.</li>)}
                  {aparelho.id === "celular_android" && <li>Baixe e instale o <strong className="text-text-primary">{app.nome}</strong> pelo botão abaixo. Autorize a instalação quando o Android pedir.</li>}
                  {(aparelho.plataforma === "windows" || aparelho.plataforma === "mac") && <li>Baixe o <strong className="text-text-primary">{app.nome}</strong> abaixo, instale e abra.</li>}
                  {aparelho.plataforma === "ios" && <li>Instale o <strong className="text-text-primary">{app.nome}</strong> pela App Store.</li>}
                  {app.nameApp ? (
                    <>
                      <li>Abra o app: ele mostra um <strong className="text-text-primary">código de ativação</strong> ou MAC.</li>
                      <li>Cole esse código no campo abaixo e toque em Importar. A lista entra sozinha.</li>
                    </>
                  ) : (
                    <li>Abra o app e entre com o <strong className="text-text-primary">usuário</strong> e a <strong className="text-text-primary">senha</strong> abaixo.</li>
                  )}
                </ol>
                <Metodos app={app} />
                {app.nameApp && <ImportarMac app={app} />}
                {app.nameApp && <p className="text-xs text-text-tertiary">Ou, se preferir, entre manualmente com seus dados:</p>}
                <Credenciais username={username} password={password} />
              </>
            ) : null}
            <div className="flex gap-2">
              <button type="button" onClick={() => setPasso(aparelho.plataforma === "dns" ? 1 : 2)} className="btn btn-outline py-2 text-sm"><ArrowLeft size={16} aria-hidden /> Voltar</button>
              <button type="button" onClick={() => setPasso(4)} className="btn btn-primary flex-1 py-2 text-sm">Concluir</button>
            </div>
          </div>
        )}

        {passo === 4 && (
          <div className="space-y-4 text-center">
            <p className="font-heading text-xl font-bold text-text-primary">Você está pronto para assistir</p>
            <p className="text-sm text-text-secondary">Suas credenciais estão abaixo. Copie e cole no aplicativo.</p>
            <div className="text-left"><Credenciais username={username} password={password} /></div>
            <p className="rounded-md border border-border-subtle bg-bg-base p-3 text-left text-sm text-text-secondary">
              <strong className="text-text-primary">Quer assistir no celular também?</strong> Instale um dos apps de celular e entre com o mesmo usuário e senha.
              Configurou e não funcionou? Tente outro app da lista: alguns funcionam melhor em cada aparelho.
            </p>
            {ehTeste && (
              <p className="text-sm text-text-secondary">
                Seu teste é por tempo limitado. Gostou?{" "}
                <Link href="/precos" className="font-semibold text-primary-bright underline underline-offset-2">Assine e não perca o acesso</Link>.
              </p>
            )}
            <div className="flex gap-2">
              <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn btn-outline flex-1 py-2 text-sm"><MessageCircle size={16} aria-hidden /> Preciso de ajuda</a>
              <button type="button" onClick={() => { setPasso(1); setAparelho(null); setApp(null); }} className="btn btn-outline flex-1 py-2 text-sm"><RotateCcw size={16} aria-hidden /> Outro aparelho</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
