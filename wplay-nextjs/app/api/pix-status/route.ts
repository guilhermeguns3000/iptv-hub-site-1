import { NextRequest, NextResponse } from "next/server";
import { lerRefPedido, webhookJaProcessado } from "@/lib/store";
import { lerPedido } from "@/lib/auth";

export const runtime = "nodejs";

/** Polling do checkout: o front pergunta se o Pix já caiu. */
export async function GET(req: NextRequest) {
  const ref = req.nextUrl.searchParams.get("ref") || "";
  if (!ref) {
    return NextResponse.json({ paid: false }, { status: 400 });
  }

  const externalId = await lerRefPedido(ref);
  if (!externalId) {
    return NextResponse.json({ paid: false });
  }

  const pago = await webhookJaProcessado(externalId);
  if (!pago) {
    return NextResponse.json({ paid: false });
  }

  const pedido = await lerPedido(externalId);
  if (!pedido) {
    return NextResponse.json({ paid: false });
  }

  return NextResponse.json({ paid: true, username: pedido.u, password: pedido.pw });
}
