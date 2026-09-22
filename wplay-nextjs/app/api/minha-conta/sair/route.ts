import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const res = NextResponse.redirect(`${req.nextUrl.origin}/minha-conta`);
  res.cookies.set(SESSION_COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}
