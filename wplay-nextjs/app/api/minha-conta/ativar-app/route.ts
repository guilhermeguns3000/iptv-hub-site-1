import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { buscarTestePorEmail, rateLimit } from "@/lib/store";
import { ativarAppPorMac } from "@/lib/knewcms";
import { APPS_ATIVACAO_MAC } from "@/content/apps";

export const runtime = "nodejs";

interface Body {
  nameApp?: string;
  mac?: string;
}

/**
 * Importa a lista IPTV direto num dos apps por MAC/código, sem digitar
 * usuário e senha. Mesmo mecanismo real do appwplay (`wtv_ep_ativar_app`):
 * o cliente logado escolhe um app da whitelist e cola o código que o próprio
 * app mostra na tela do aparelho.
 */
export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session?.email) {
    return NextResponse.json({ ok: false, erro: "Faça login para importar a lista." }, { status: 401 });
  }

  if (!(await rateLimit(`ativar-app:${session.email}`, 10, 3600))) {
    return NextResponse.json({ ok: false, erro: "Muitas tentativas. Tente novamente mais tarde." }, { status: 429 });
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, erro: "Requisição inválida." }, { status: 400 });
  }

  const nameApp = (body.nameApp || "").trim();
  const mac = (body.mac || "").trim();

  const app = APPS_ATIVACAO_MAC.find((a) => a.nameApp === nameApp);
  if (!app) {
    return NextResponse.json({ ok: false, erro: "Aplicativo inválido." }, { status: 400 });
  }
  // MAC (AA:BB:CC:DD:EE:FF) ou código curto do app: letras, dígitos, ":" e
  // "-". Lista permitida, não proibida; e tamanho máximo pra não repassar
  // lixo pra API externa.
  if (!/^[A-Za-z0-9:\-]{6,64}$/.test(mac)) {
    return NextResponse.json({ ok: false, erro: "Código inválido. Verifique e tente novamente." }, { status: 400 });
  }

  const cliente = await buscarTestePorEmail(session.email);
  if (!cliente) {
    return NextResponse.json({ ok: false, erro: "Não encontramos sua conta." }, { status: 400 });
  }

  try {
    const resp = await ativarAppPorMac({
      id: cliente.id,
      nameApp: app.nameApp,
      mac,
      xstream: app.xstream,
      namePlaylist: `WPlay - ${cliente.nome}`,
    });

    if (!resp.success) {
      const msg = resp.message || resp.error || "Código não reconhecido. Verifique se digitou corretamente.";
      return NextResponse.json({ ok: false, erro: msg }, { status: 422 });
    }

    return NextResponse.json({
      ok: true,
      mensagem: "Lista importada com sucesso! Abra o aplicativo e aguarde alguns segundos.",
    });
  } catch (e) {
    console.error("[ativar-app] falha ao chamar KnewCMS:", e);
    return NextResponse.json(
      { ok: false, erro: "Erro de conexão com o servidor. Tente novamente." },
      { status: 502 },
    );
  }
}
