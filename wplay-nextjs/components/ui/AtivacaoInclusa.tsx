import Link from "next/link";
import { BadgeCheck } from "lucide-react";

/**
 * Diferencial real: os players de Smart TV cobram taxa de ativação do
 * desenvolvedor do app (paga pelo cliente final quando o fornecedor de IPTV
 * não tem integração). No nosso servidor a ativação já vem inclusa, então o
 * cliente não paga nada além da assinatura. Vale destacar onde a pessoa está
 * escolhendo o app, não só no FAQ.
 */
export default function AtivacaoInclusa({ className = "" }: { className?: string }) {
  return (
    <div className={`rounded-xl border border-primary-bright bg-bg-raised p-6 ${className}`}>
      <div className="flex items-center gap-2">
        <BadgeCheck size={22} className="shrink-0 text-primary-bright" aria-hidden />
        <p className="font-heading text-lg font-bold text-text-primary">
          A ativação do aplicativo é por nossa conta
        </p>
      </div>
      <p className="mt-3 max-w-3xl text-text-secondary">
        Quase todo player de IPTV para Smart TV cobra uma taxa de ativação do próprio desenvolvedor do
        aplicativo, cobrada uma vez por aparelho e separada da assinatura de IPTV. Quem contrata um fornecedor
        sem integração acaba pagando essa taxa do próprio bolso, além da mensalidade.
      </p>
      <p className="mt-3 max-w-3xl text-text-secondary">
        Aqui não. Como a ativação é feita direto pelo nosso servidor, ela já está inclusa: você instala o app
        na loja da sua TV, importa a lista pelo código e não paga nada além da sua assinatura.
      </p>
      <Link href="/precos" className="btn btn-outline mt-5 inline-flex">
        Ver o preço da assinatura
      </Link>
    </div>
  );
}
