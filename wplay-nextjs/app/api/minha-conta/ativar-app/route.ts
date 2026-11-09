import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { buscarTestePorEmail, rateLimit } from "@/lib/store";
import { ativarAppPorMac } from "@/lib/knewcms";
import { APPS_ATIVACAO_MAC } from "@/content/apps";

export const runtime = "nodejs";

interface Body {
  nameApp?: string;
  mac?: string;
  deviceKey?: string;
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
  const deviceKey = (body.deviceKey || "").trim();

  const app = APPS_ATIVACAO_MAC.find((a) => a.nameApp === nameApp);
  if (!app) {
    return NextResponse.json({ ok: false, erro: "Aplicativo inválido." }, { status: 400 });
  }
  // MAC (AA:BB:CC:DD:EE:FF) ou código curto do app: letras, dígitos, ":" e
  // "-". Lista permitida, não proibida; e tamanho máximo pra não repassar
  // lixo pra API externa. O Max Player ativa sem MAC, então não cobra.
  if (!app.nomac && !/^[A-Za-z0-9:\-]{6,64}$/.test(mac)) {
    return NextResponse.json({ ok: false, erro: "Código inválido. Verifique e tente novamente." }, { status: 400 });
  }
  if (app.key && !/^[A-Za-z0-9:\-]{1,64}$/.test(deviceKey)) {
    return NextResponse.json(
      { ok: false, erro: "Esse aplicativo também pede a device key, que aparece na mesma tela do MAC." },
      { status: 400 },
    );
  }

  const cliente = await buscarTestePorEmail(session.email);
  if (!cliente) {
    return NextResponse.json({ ok: false, erro: "Não encontramos sua conta." }, { status: 400 });
  }

  try {
    /**
     * O painel recusa nome de playlist acima de 30 BYTES, não de 30 letras, e
     * conta byte: acento e travessão ocupam mais de um. Reduzindo a ASCII,
     * byte e caractere voltam a ser a mesma coisa, e aí 30 é 30.
     */
    const primeiro = (cliente.nome || "")
      .split(" ")[0]
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^A-Za-z0-9]/g, "");
    const namePlaylist = `WPlay ${primeiro}`.trim().slice(0, 30);

    const resp = await ativarAppPorMac({
      id: cliente.id,
      nameApp: app.nameApp,
      mac,
      xstream: app.xstream,
      namePlaylist,
      deviceKey,
    });

    if (!resp.success) {
      const msg = resp.message || resp.error || "Código não reconhecido. Verifique se digitou corretamente.";
      return NextResponse.json({ ok: false, erro: msg }, { status: 422 });
    }

    if (app.nomac) {
      // Max Player: o painel devolve um dado que o cliente digita no app. A doc
      // não promete o nome do campo, então gravamos a resposta e usamos o
      // primeiro que vier, com um recado honesto se não vier nenhum.
      console.info("[ativar-app] ativacao", app.nameApp, JSON.stringify(resp));
      const codigo = resp.code || resp.access_code || resp.activation_code || null;
      return NextResponse.json({
        ok: true,
        codigo,
        mensagem: codigo
          ? "Ativação gerada. Digite no aplicativo:"
          : "Ativação gerada. Abra o aplicativo e entre com o seu usuário e senha.",
      });
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
