import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { buscarTestePorEmail } from "@/lib/store";

export const runtime = "nodejs";

/**
 * Web Player: proxy autenticado do padrão Xtream (`player_api.php`), mesmo
 * mecanismo real do appwplay (`wtv_ep_player_*`). Usuário e senha nunca vão
 * pro navegador na URL da API; só a URL final do vídeo (m3u8) leva as
 * credenciais, e isso é inerente ao protocolo, igual no original.
 */
const BASE = (process.env.STREAM_BASE || "").replace(/\/$/, "");

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session?.email) return NextResponse.json({ erro: "login" }, { status: 401 });
  if (!BASE) return NextResponse.json({ erro: "player indisponível" }, { status: 503 });

  const cliente = await buscarTestePorEmail(session.email);
  if (!cliente) return NextResponse.json({ erro: "conta" }, { status: 401 });

  const acao = req.nextUrl.searchParams.get("acao");
  const u = encodeURIComponent(cliente.username);
  const p = encodeURIComponent(cliente.password);

  // Config pro navegador do cliente falar direto com o host (o host bloqueia
  // IP de datacenter, e o IP residencial do cliente passa). Mesma exposição
  // que a URL do m3u8 já tem; são as credenciais do próprio cliente.
  if (acao === "config") {
    return NextResponse.json({ base: BASE, username: cliente.username, password: cliente.password });
  }

  if (acao === "stream") {
    const id = parseInt(req.nextUrl.searchParams.get("id") || "", 10);
    if (!id) return NextResponse.json({ erro: "id inválido" }, { status: 400 });
    return NextResponse.json({ url: `${BASE}/live/${u}/${p}/${id}.m3u8` });
  }

  let action: string;
  if (acao === "categorias") action = "get_live_categories";
  else if (acao === "canais") {
    const cat = (req.nextUrl.searchParams.get("cat") || "").replace(/[^\w-]/g, "");
    action = "get_live_streams" + (cat ? `&category_id=${cat}` : "");
  } else return NextResponse.json({ erro: "ação inválida" }, { status: 400 });

  try {
    // O host recusa o User-Agent padrão do fetch/curl (403 "Access denied");
    // com UA de navegador responde normal. Medido em 22/09/2026.
    const r = await fetch(`${BASE}/player_api.php?username=${u}&password=${p}&action=${action}`, {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/128 Safari/537.36" },
      signal: AbortSignal.timeout(20_000),
      cache: "no-store",
    });
    const texto = await r.text();
    let data: unknown = [];
    try { data = JSON.parse(texto); } catch { /* corpo não-JSON: cai no log abaixo */ }
    if (!r.ok || !Array.isArray(data)) {
      console.error(`[player] upstream ${r.status} base=${BASE ? "ok" : "vazia"} corpo=${texto.slice(0, 120).replace(/s+/g, " ")}`);
      return NextResponse.json({ erro: "Não foi possível carregar agora." }, { status: 502 });
    }
    return NextResponse.json(data);
  } catch (e) {
    console.error("[player] falha no player_api:", e instanceof Error ? e.message : e);
    return NextResponse.json({ erro: "Não foi possível carregar agora." }, { status: 502 });
  }
}
