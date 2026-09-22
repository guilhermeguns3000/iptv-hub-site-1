"use client";

import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { Loader2, Search, Tv } from "lucide-react";

interface Categoria { category_id: string; category_name: string }
interface Canal { stream_id: number; name: string; stream_icon?: string }

/**
 * Web Player: categorias, lista de canais com busca e vídeo HLS. Mesmo
 * mecanismo real do appwplay ([wtv_player]), em componente próprio.
 */
type Cfg = { base: string; username: string; password: string };

/** Lista direto do host pelo navegador; se falhar (CORS/TV antiga), usa o proxy do servidor. */
async function listar(cfg: Cfg | null, acao: "categorias" | "canais", cat = ""): Promise<unknown> {
  if (cfg?.base) {
    const action = acao === "categorias" ? "get_live_categories" : "get_live_streams" + (cat ? `&category_id=${encodeURIComponent(cat)}` : "");
    try {
      const r = await fetch(`${cfg.base}/player_api.php?username=${encodeURIComponent(cfg.username)}&password=${encodeURIComponent(cfg.password)}&action=${action}`);
      if (r.ok) { const d = await r.json(); if (Array.isArray(d)) return d; }
    } catch { /* cai no proxy */ }
  }
  return fetch(`/api/player?acao=${acao}${cat ? `&cat=${encodeURIComponent(cat)}` : ""}`).then((r) => r.json());
}

export default function WebPlayer() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [cat, setCat] = useState("");
  const [canais, setCanais] = useState<Canal[]>([]);
  const [busca, setBusca] = useState("");
  const [atual, setAtual] = useState<Canal | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [cfg, setCfg] = useState<Cfg | null | undefined>(undefined);
  const video = useRef<HTMLVideoElement>(null);
  const hls = useRef<Hls | null>(null);

  useEffect(() => {
    fetch("/api/player?acao=config").then((r) => r.json()).then((c) => setCfg(c?.base ? c : null)).catch(() => setCfg(null));
  }, []);

  useEffect(() => {
    if (cfg === undefined) return;
    listar(cfg, "categorias").then((d) => {
      if (Array.isArray(d) && d.length) { setCategorias(d as Categoria[]); setCat((d as Categoria[])[0].category_id); }
      else setErro("Não foi possível carregar as categorias agora.");
    }).catch(() => setErro("Erro de conexão.")).finally(() => setLoading(false));
  }, [cfg]);

  useEffect(() => {
    if (!cat || cfg === undefined) return;
    setLoading(true);
    listar(cfg, "canais", cat).then((d) => setCanais(Array.isArray(d) ? (d as Canal[]) : [])).finally(() => setLoading(false));
  }, [cat, cfg]);

  async function tocar(c: Canal) {
    setAtual(c);
    const r = await fetch(`/api/player?acao=stream&id=${c.stream_id}`).then((x) => x.json());
    const el = video.current;
    if (!el || !r.url) return;
    hls.current?.destroy();
    if (Hls.isSupported()) {
      const h = new Hls({ enableWorker: true });
      hls.current = h;
      h.loadSource(r.url);
      h.attachMedia(el);
      h.on(Hls.Events.MANIFEST_PARSED, () => { el.play().catch(() => {}); });
    } else if (el.canPlayType("application/vnd.apple.mpegurl")) {
      el.src = r.url;
      el.play().catch(() => {});
    }
  }

  useEffect(() => () => { hls.current?.destroy(); }, []);

  const lista = busca ? canais.filter((c) => c.name.toLowerCase().includes(busca.toLowerCase())) : canais;

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <div>
        <div className="aspect-video overflow-hidden rounded-lg border border-border-subtle bg-black">
          <video ref={video} controls playsInline className="h-full w-full" aria-label={atual ? `Reproduzindo ${atual.name}` : "Player"} />
        </div>
        <p className="mt-2 flex items-center gap-2 text-sm text-text-secondary">
          <Tv size={16} className="text-primary-bright" aria-hidden />
          {atual ? atual.name : "Escolha um canal na lista para começar."}
        </p>
      </div>

      <div className="card flex max-h-[70vh] flex-col border border-border-subtle p-3">
        <label className="sr-only" htmlFor="player-cat">Categoria</label>
        <select id="player-cat" value={cat} onChange={(e) => setCat(e.target.value)} className="rounded-md border border-border-strong bg-bg-raised px-3 py-2 text-sm text-text-primary outline-none focus:border-primary-bright">
          {categorias.map((c) => <option key={c.category_id} value={c.category_id}>{c.category_name}</option>)}
        </select>
        <div className="relative mt-2">
          <Search size={14} className="pointer-events-none absolute left-2.5 top-2.5 text-text-tertiary" aria-hidden />
          <input value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Buscar canal" aria-label="Buscar canal" className="w-full rounded-md border border-border-strong bg-bg-raised py-2 pl-8 pr-3 text-sm text-text-primary outline-none focus:border-primary-bright" />
        </div>
        {erro && <p role="alert" className="mt-3 text-sm text-danger">{erro}</p>}
        <ul className="mt-2 flex-1 space-y-1 overflow-y-auto">
          {loading && <li className="flex items-center gap-2 p-2 text-sm text-text-tertiary"><Loader2 size={14} className="animate-spin" aria-hidden /> Carregando</li>}
          {!loading && lista.length === 0 && !erro && <li className="p-2 text-sm text-text-tertiary">Nenhum canal nesta categoria.</li>}
          {lista.map((c) => (
            <li key={c.stream_id}>
              <button type="button" onClick={() => tocar(c)} className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm transition-colors ${atual?.stream_id === c.stream_id ? "bg-primary/15 text-primary-bright" : "text-text-secondary hover:bg-bg-raised hover:text-text-primary"}`}>
                {c.stream_icon ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={c.stream_icon} alt="" width={24} height={24} loading="lazy" className="h-6 w-6 shrink-0 rounded object-contain" onError={(e) => { (e.currentTarget as HTMLImageElement).style.visibility = "hidden"; }} />
                ) : <span className="h-6 w-6 shrink-0" />}
                <span className="truncate">{c.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
