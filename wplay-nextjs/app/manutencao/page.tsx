import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "WPlay em manutenção",
  robots: { index: false, follow: false },
};

export default function ManutencaoPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-5 bg-bg-base px-6 text-center">
      <Image src="/brand/icon-128.png" alt="" width={56} height={56} className="rounded-xl" />
      <h1 className="font-heading text-2xl font-extrabold tracking-tight text-text-primary sm:text-3xl">
        WPlay está em manutenção
      </h1>
      <p className="max-w-md text-text-secondary">
        Estamos ajustando o site. Volta ao ar em breve.
      </p>
    </div>
  );
}
