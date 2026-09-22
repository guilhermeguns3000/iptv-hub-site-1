/**
 * O WPlay vende UM PACOTE só: "Essencial" (IPTV completo + 1 tela P2P,
 * planId=2 no KnewCMS). Isso nunca muda — não existe versão "Completo",
 * Krator ou Nexus à venda aqui (arquitetura.md seção 6).
 *
 * O que existe são 3 DURAÇÕES desse mesmo pacote (mensal/trimestral/
 * semestral) — o mesmo padrão comercial que o appwplay.com.br já usa em
 * produção para o Essencial (ver wplay-research/intel-appwplay.md seção 5).
 * "Plano único" = um pacote único, não "uma duração única": confusão
 * corrigida em 08/09/2026 depois de uma correção direta do dono.
 */
export interface Plano {
  id: "mensal" | "trimestral" | "semestral";
  nome: string;
  /** Preço total do período, em centavos. */
  preco: number;
  /** Em dias. */
  duracao: number;
  /** Preço equivalente por mês, em centavos (para ancoragem, igual ao appwplay). */
  precoMensalEquivalente: number;
  /** Percentual de economia frente ao mensal (0 para o próprio mensal). */
  economiaPercentual: number;
  maisEscolhido: boolean;
  /**
   * Id do plano no KnewCMS. planId=2 = "Essencial (2 IPTV + 1 P2P)" — mesmo
   * para as 3 durações, confirmado por duas fontes de produção independentes
   * (arquitetura.md seção 2 e wtv-painel-licoes.md item 5), não verificado
   * ao vivo nesta sessão para não gastar crédito real.
   */
  planId: number;
  /** package_iptv (número) — Completo sem/com conteúdo adulto. Proposta, ver arquitetura.md seção 3. */
  packageIptv: { semAdulto: number; comAdulto: number };
  /** package_p2p (hex) — Completo sem/com conteúdo adulto. Proposta, ver arquitetura.md seção 3. */
  packageP2p: { semAdulto: string; comAdulto: string };
  /**
   * Custo em créditos da ativação, por duração. Confirmado em 16/09/2026
   * direto no catálogo real de planos do appwplay (wtv-painel.php linhas
   * 63-65: mensal=1, trimestral=3, semestral=6 — mesmos preços do WPlay,
   * 29.99/84.99/149.99, o que também confirma que os dois catálogos
   * batem). Lido por SSH, sem nenhuma chamada à API — nunca gasto crédito
   * real só para descobrir isso.
   */
  creditos: number;
}

const PACKAGE_IPTV = { semAdulto: 69, comAdulto: 95 };
/**
 * Corrigido em 14/09/2026: os dois hex daqui estavam com caracteres errados
 * (marcados como "Proposta" desde a arquitetura, nunca tinham sido conferidos
 * contra fonte nenhuma). Um ObjectId de 24 hex com um caractere trocado é
 * outro pacote, ou nenhum — teria dado erro (ou entregue a coisa errada) na
 * hora de ativar um cliente pago de verdade. Valor certo, conferido contra a
 * doc oficial do painel (ENUM_P2P_PACKAGES, "Pacote Completo").
 */
const PACKAGE_P2P = {
  semAdulto: "667a0f479ab1ca5452bf15ad",
  comAdulto: "5da17892133a1d61888029aa",
};

export const planos: Plano[] = [
  {
    id: "mensal",
    nome: "Mensal",
    preco: 2999,
    duracao: 30,
    precoMensalEquivalente: 2999,
    economiaPercentual: 0,
    maisEscolhido: false,
    planId: 2,
    packageIptv: PACKAGE_IPTV,
    packageP2p: PACKAGE_P2P,
    creditos: 1,
  },
  {
    id: "trimestral",
    nome: "Trimestral",
    preco: 8499,
    duracao: 90,
    precoMensalEquivalente: 2833,
    economiaPercentual: 6,
    maisEscolhido: true,
    planId: 2,
    packageIptv: PACKAGE_IPTV,
    packageP2p: PACKAGE_P2P,
    creditos: 3,
  },
  {
    id: "semestral",
    nome: "Semestral",
    preco: 14999,
    duracao: 180,
    precoMensalEquivalente: 2500,
    economiaPercentual: 17,
    maisEscolhido: false,
    planId: 2,
    packageIptv: PACKAGE_IPTV,
    packageP2p: PACKAGE_P2P,
    creditos: 6,
  },
];

/** Referência rápida para textos que citam só "o preço do WPlay" (ex. teste-gratis, wplay-p2p). */
export const planoPadrao = planos[0];

export function getPlano(id: string): Plano | undefined {
  return planos.find((p) => p.id === id);
}

export const beneficios = [
  "Teste grátis antes de assinar",
  "IPTV completo + 1 tela P2P",
  "Canais ao vivo, filmes e séries em HD/4K",
  "App próprio (WPlay / WPlay PRO)",
  "Suporte no WhatsApp",
  "Sem fidelidade",
];

/**
 * Duração do teste grátis, em HORAS (não minutos, não dias). `testDuration`
 * do KnewCMS é em horas — medido de verdade no appkplay em 18/08/2026 (código
 * real: server-api/testes/confere-teste-4h.php), não a descrição genérica da
 * doc de API ("dias"), que está errada para este campo. O bug anterior daqui
 * mandava 240 (pensado como "240 minutos") e teria gerado testes de 240
 * HORAS (10 dias) em vez de 4h — nunca chegou a rodar em produção porque o
 * backend só foi ligado depois desse conserto.
 */
export const TESTE_DURACAO_HORAS = 4;

/** Formata centavos como "0,00" (sem o R$). */
export const formatBRL = (centavos: number) =>
  (centavos / 100).toFixed(2).replace(".", ",");
