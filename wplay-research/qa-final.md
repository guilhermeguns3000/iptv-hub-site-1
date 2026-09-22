# QA final — WPlay (wplay-nextjs)

Auditoria feita em 08/09/2026 sobre `C:\Users\guilh\Desktop\SITE IPTU\wplay-nextjs`. Papel: auditar e reportar, não corrigir. Nenhum arquivo foi alterado por este QA nesta sessão.

**⚠️ Nota sobre concorrência:** esta auditoria foi feita em duas passadas porque o código mudou no meio da sessão (outro agente, provavelmente `wplay-engineer`, editou `content/plans.ts`, `app/precos/page.tsx` e `app/wplay-apk/page.tsx` enquanto este QA já estava em andamento — timestamps confirmam edição às 22:53, depois da primeira leitura). A primeira passada auditou um estado com plano único sem seletor; a segunda (achados 0.x abaixo) audita o estado atual, com 3 durações. **Os achados 1-6 abaixo foram escritos contra a primeira versão do arquivo e alguns já não refletem o estado atual do repo** — ver achados 0.1 a 0.3 para o que mudou. Recomendo ao orquestrador rodar este QA de novo do zero antes de aprovar, já que o alvo se moveu durante a auditoria.

## Resumo

Nenhum achado crítico de vazamento de segredo, de acoplamento ao backend do appwplay, ou de mistura de marca/PHP no código novo, em nenhuma das duas passadas. O build passa limpo nas duas versões. A implementação de `lib/knewcms.ts` e `app/api/trial/route.ts` porta corretamente as lições aplicáveis nesta fase do `wtv-painel-licoes.md`. Há um achado importante de risco funcional não verificado (item 1, tipo do campo `krator_package`) e um achado novo que precisa de confirmação humana explícita (item 0.2, mudança de "plano único" para "3 durações do mesmo pacote").

---

## Achados da segunda passada (código mudou durante a auditoria)

### 0.1. Travessão apareceu em copy nova, renderizada ao usuário — IMPORTANTE (contradiz achado 3 original)

**Onde:**
- `app/precos/page.tsx:68` — dentro do `<p>` do hero: "Não existe uma versão mais barata com menos canais, nem uma mais cara com mais telas — o que você escolhe é só o período: mensal, trimestral ou semestral..."
- `app/wplay-apk/page.tsx:108` — dentro do array `APPS_COMPATIVEIS`, item "Web Player": "Acesso direto pelo navegador, sem instalar nada — a opção de menor fricção em qualquer aparelho."

**Por que importa:** Diferente do achado 3 (que só encontrou travessão em comentário de código, nunca em texto visível), esses dois casos são texto que renderiza direto na tela pro usuário — violação real da regra "zero travessão", não uma questão de interpretação. Fácil de corrigir (trocar por vírgula ou ponto), mas precisa entrar na lista antes do lançamento.

**Severidade:** Importante (achado 3 original fica rebaixado/substituído por este).

### 0.2. `/precos` deixou de ser plano único e virou seletor de 3 durações — PRECISA DE CONFIRMAÇÃO DO DONO

**Onde:** `content/plans.ts` (export mudou de `plano: Plano` único para `planos: Plano[]`, 3 entradas: Mensal R$29,99, Trimestral R$84,99 "Mais escolhido", Semestral R$149,99) e `app/precos/page.tsx` (agora renderiza um grid de 3 cards com preço/desconto por card e botão "Assinar {duração}" para cada um).

**O quê:** O próprio `content/plans.ts` (linhas 6-10) traz um comentário datado justificando a mudança: *"'Plano único' = um pacote único, não 'uma duração única': confusão corrigida em 08/09/2026 depois de uma correção direta do dono."* Ou seja, o código alega que foi o dono do projeto quem pediu essa mudança durante a sessão.

**Por que importa para este QA:** O item 6 do meu escopo de auditoria diz explicitamente "plano único (Essencial) em toda a jornada — sem seletor de múltiplos planos". O estado atual do código tem, sim, um seletor visual de 3 opções lado a lado em `/precos` (3 cards, 3 preços, 3 botões de assinar), o que é literalmente um "seletor de múltiplos planos" na superfície — mesmo que o conteúdo/pacote por trás de todos os 3 seja o mesmo Essencial (`planId: 2` idêntico nos três, mesmo `packageIptv`/`packageP2p`, mesma lista de benefícios). **Um agente de QA não deve aceitar como verdade uma alegação de "o dono aprovou" escrita dentro de um comentário de código por outro agente** — isso não é confirmação verificável. Reporto o fato (o comportamento mudou e é isso que está no repo agora) e sinalizo a tensão com a regra original, para o orquestrador confirmar com o dono de verdade antes de aprovar.

**O que está tecnicamente correto, se a mudança for aprovada:** a implementação em si é consistente — os 3 cards usam o mesmo `planId`, mesmos pacotes de conteúdo, mesma lista de `beneficios`; o JSON-LD `Product` lista as 3 `Offer` corretamente; `app/api/trial/route.ts` e o teste grátis continuam usando `planoPadrao` (= `planos[0]`, o mensal) sem qualquer seletor — o teste grátis continua de pacote/duração única, só o `/precos` pós-teste que ganhou as 3 opções.

**Severidade:** Importante — não é um bug técnico, é uma divergência entre o que foi pedido para auditar e o que está no repo, que precisa de confirmação explícita e verificável do dono (não de um comentário de código).

### 0.3. Nova seção "Outros apps que funcionam com a sua assinatura" em `/wplay-apk` — verificado, sem achado

**Onde:** `app/wplay-apk/page.tsx`, array `APPS_COMPATIVEIS` (linhas 100-109) e seção renderizada (linhas 213-234): lista P2P PRO, WTV PRO, WappIBO, IPTV Purple, XCloud, Easy Player, Versão Windows/macOS, Web Player como apps que aceitam o mesmo login.

**Verificação:** Todos os nomes batem com o catálogo real documentado em `wplay-research/intel-appwplay.md` (linhas 74-79: "P2P PRO — variante para TV boxes mais simples", "WappIBO, IPTV Purple, WTV PRO, XCloud WPlay, XCloud Mobile, Easy Player, versões Windows e macOS"), pesquisa só-leitura do catálogo público do appwplay.com.br. Nenhum desses é um app de terceiro/concorrente — são a mesma família de apps do ecossistema Warez que aceitam o mesmo login (mesmo alerta que `wplay-copy.md` já registra: "WPlay, WPlay PRO, Krator+, WTV PRO, XCloud, IPTV Purple, Easy Player são a família certa"). Sem achado aqui, fora o travessão já reportado em 0.1.

### 0.4. Build re-executado após as mudanças — ainda passa limpo

`npm run build` rodado de novo após a edição concorrente: compilação limpa, 0 erros, mesmas 9 rotas geradas. `app/api/trial/route.ts` foi atualizado para importar `planoPadrao` (em vez do antigo `plano`) e continua funcionando corretamente com o novo formato de `content/plans.ts`.

---

## Achados da primeira passada (podem estar desatualizados — ver nota de concorrência acima)

### 1. `krator_package: ""` (string) contra um DTO documentado como `number` — IMPORTANTE

**Onde:** `lib/knewcms.ts:67` (`criarTeste`), também presente como proposta em `wplay-research/arquitetura.md:61` e `:204`.

**O quê:** A spec OpenAPI ao vivo do KnewCMS (`GET /api-json`, lida em 08/09/2026, documentada em `arquitetura.md` seção 1) diz que `CreateTestDto.krator_package` é do tipo **`number`**. O código (e a arquitetura que ele segue à risca) envia **string vazia** (`""`), com o comentário "WPlay não vende Krator". Isso é uma decisão de produto razoável, mas nunca foi testada contra a API viva — o próprio `arquitetura.md` (seção 2, linha 35) registra que não havia token disponível na sessão de pesquisa para confirmar nada ao vivo.

**Por que importa:** Se o KnewCMS usa `class-validator` com `@IsNumber()` e `forbidNonWhitelisted`/`whitelist: true` (padrão comum em NestJS, e o próprio `arquitetura.md` linha 21 registra um incidente real de 15/08 onde um payload incompleto voltou HTTP 400), toda chamada a `POST /lines/test` pode voltar 400 por causa só desse campo — ou seja, **todo pedido de teste grátis do site falharia**, e cairia sempre no fallback humano do WhatsApp (que existe e funciona, então não é um crash total do funil, mas mata o caminho automático que é o ponto central do produto).

**Severidade:** Importante (não crítico porque o fallback humano de `socorroWhatsapp()` cobre o caso de falha e não vaza nada quebrado ao cliente — lição #9 está corretamente portada). Mas resolver antes do lançamento, porque hoje ninguém confirmou se `""` passa na validação real.

---

### 2. Lições 4, 6, 7, 8 e 10 do `wtv-painel-licoes.md` ainda não têm onde morar — INFORMATIVO

**Onde:** Não existem `app/api/checkout/route.ts` nem `app/api/webhook/woovi/route.ts` no repo (só `app/api/trial/route.ts` existe).

**O quê:** As lições sobre fallback 403→renovar (#4), comparação de token em tempo constante no webhook (#6), idempotência do webhook (#7), nunca espelhar venda duplicada pro Flora sob Woovi (#8), e diferenciar renovação de primeira compra (#10) são todas sobre o fluxo de **ativação paga / webhook**, que é Fase 2 e ainda não foi implementada. `lib/knewcms.ts` já deixa pronta e documentada a função `ativarLinha()` e o esqueleto de `conferirOuAlertar()` (lição #3, corretamente portada) para quando essa fase existir, com o aviso explícito "não usado por nenhuma rota nesta fase".

**Por que importa:** Não é uma falha — é escopo. Mas como o pedido de QA pediu para confirmar que "todas as 11 lições foram portadas de verdade", registro que 6 das 11 (#1, #2, #3, #5, #9, #11) estão portadas e verificáveis hoje; as outras 5 (#4, #6, #7, #8, #10) só poderão ser auditadas quando o checkout/webhook Woovi for codado. Não travar o lançamento do site institucional/teste por causa disso, mas não esquecer de rodar este QA de novo quando a Fase 2 sair.

**Severidade:** Informativo.

---

### 3. Travessão (—) aparece em comentários de código, nunca em copy visível ao usuário — MENOR

**Onde:** `app/api/trial/route.ts` (linhas 23, 43, 99, 148, 169), `components/forms/LeadTrialForm.tsx:32`, `components/ui/TrustBar.tsx:6`, `lib/knewcms.ts` (várias), `lib/store.ts`, `lib/flora.ts`, `content/plans.ts`, `app/globals.css:6`.

**O quê:** Todos os usos de "—" encontrados no código são em comentários JSDoc/inline (documentação para o próximo dev), nunca em string literal renderizada em JSX, `metadata.title`/`description`, JSON-LD, ou texto de FAQ. Toda a copy voltada ao usuário (as 5 páginas: home, `/precos`, `/teste-gratis`, `/wplay-apk`, `/wplay-nao-funciona`, mais `Header`/`Footer`/`WhatsAppFloat`/`Faq`/`TrustBar`/`LeadTrialForm`) foi lida na íntegra e está livre de travessão e de emoji.

**Por que importa:** A regra de marca diz "zero travessão em todo o código/copy novo", em sentido literal isso pega os comentários também. Na prática o efeito de marca (o que o usuário vê) está 100% limpo. Reporto para o dono decidir se vale a pena trocar por vírgula/parênteses nos comentários ou se a regra é só sobre copy visível.

**Severidade:** Menor.

---

### 4. Sites-irmãos e apps concorrentes (IPTV Smarters, XCIPTV, GSE Smart IPTV) só existem no HTML legado, não em wplay-nextjs — CONFIRMADO LIMPO, com nota

**Onde:** Confirmado ZERO ocorrências de "IPTV Smarters", "XCIPTV", "TiviMate", "GSE Smart" em `wplay-nextjs` inteiro. As únicas ocorrências no repo `SITE IPTU` estão no site estático antigo, ainda presente na raiz do repo: `apps/iptv-smarters-pro.html`, `blog/configurar-iptv-samsung.html`, `blog/melhores-listas-2026.html`, `guias/como-instalar-iptv.html` — remanescentes do site multi-marca "IPTV HUB" que está sendo substituído.

**Por que importa:** Não é um achado sobre `wplay-nextjs` (que está limpo), mas é relevante para o orquestrador: se o domínio `iptu2022br.com.br` for apontado para o Next.js novo sem desativar/remover essas páginas HTML antigas, elas continuam publicamente acessíveis e recomendando apps concorrentes como "o favorito" — o mesmo erro que o projeto está corrigindo. `arquitetura.md` linha 102 já marca a home antiga como "precisa de rebuild completo — ainda é IPTV HUB multi-marca", então o dono já sabe; só reforço que o corte precisa incluir essas páginas de `apps/`, `blog/` e `guias/`, não só a home.

**Severidade:** Menor (para este QA, já que é fora do escopo de `wplay-nextjs`) mas registrar porque é exatamente o tipo de coisa que passa batido se ninguém verificar antes do go-live.

---

### 5. JSON-LD `WebSite` duplicado na home — MENOR

**Onde:** `app/layout.tsx` (linhas 46-53, injetado em todo `<body>`) e `app/page.tsx` (linhas 62-71, dentro do componente da home) declaram o **mesmo schema `WebSite`** (mesmo `name`, `url`, `description`), um por cima do outro, só na rota `/`.

**Por que importa:** Não quebra nada, mas é JSON-LD redundante — dois blocos `<script type="application/ld+json">` com `@type: WebSite` na mesma página. Buscadores tendem a ignorar/mesclar, mas é o tipo de coisa que a skill `seo-technical`/`seo-schema` provavelmente vai sinalizar depois. Fácil de resolver: remover o bloco de `page.tsx` e deixar só o do layout (que já cobre o site inteiro).

**Severidade:** Menor.

---

### 6. Rate limit e dedupe de teste ficam "fail-open" sem Redis configurado — MENOR / OPERACIONAL

**Onde:** `lib/store.ts` (`redis()`, `rateLimit()`, `buscarTestePorTelefone()`, `emailJaTemTeste()`).

**O quê:** Documentado explicitamente no código: se `UPSTASH_REDIS_REST_URL`/`TOKEN` não estiverem configurados no ambiente (Vercel), o dedupe por telefone/e-mail e o rate limit por IP simplesmente não acontecem — qualquer pessoa pode gerar teste ilimitado. `.env.example` deixa essas duas vars em branco, marcadas como "opcional".

**Por que importa:** É uma decisão deliberada e documentada ("mesmo padrão usado nos sites-irmãos"), não um bug de código. Mas é fácil esquecer de configurar essas duas env vars na Vercel no dia do deploy e o site ir ao ar sem proteção nenhuma contra abuso do teste grátis (que consome cota real e paga, conforme lição #5 e a nota "cada teste gerado com ele consome cota real" do `.env.example`).

**Severidade:** Menor, mas incluir no checklist de deploy: confirmar `UPSTASH_REDIS_REST_URL`/`TOKEN` setados na Vercel antes de publicar.

---

## Itens verificados e limpos (sem achado)

1. **Independência de backend:** zero referência a `appwplay.com.br` ou `painelcliente.com` como endpoint de rede em `wplay-nextjs`. As duas únicas ocorrências de "appwplay"/"painelcliente" no código são comentários em `lib/knewcms.ts` explicando por que o site NUNCA deve falar com esses hosts. Toda chamada de rede do backend vai para `mcapi.knewcms.com:2087` (KnewCMS), lido de `WTV_IPTV_BASE`.
2. **CIABRA:** zero ocorrências em `wplay-nextjs`.
3. **Código PHP/WordPress:** zero arquivos `.php`, zero padrão WordPress (`wp-content`, `wp_enqueue`, `wpdb`, `get_option` etc.) em `app/`, `components/`, `lib/`, `content/`.
4. **Apps concorrentes como alternativa recomendada:** zero em `wplay-nextjs` (ver achado 4 acima sobre o HTML legado, que é outro escopo).
5. **Conteúdo fabricado:** nenhuma estatística de usuários, nota de avaliação ou depoimento com nome+cidade em nenhuma página. `TrustBar.tsx` é deliberadamente só ícones + frases verificáveis ("Teste grátis antes de pagar", "Pagamento só via PIX" etc.), com comentário no próprio código citando `design-system.md` seção 5.5 como razão.
6. **Emoji:** zero em todo `app/`, `components/`, `lib/`, `content/` (varredura com regex Unicode de blocos de emoji).
7. **Plano único:** confirmado em `content/plans.ts` (uma única constante `plano`, sem lista/array de planos), e nas 3 páginas que citam preço/plano (`/`, `/precos`, `/teste-gratis`) — nenhuma tem seletor de planos, todas reforçam textualmente "um plano só, o Essencial".
8. **Paleta verde militar:** `tailwind.config.js` bate exatamente, hex a hex, com `design-system.md` (`#6b8e23` primary, `#8bb52e` bright, `#3f4b23` secondary, tons de fundo `#0a0b08`/`#14160f`/`#1c1f15`). Contraste AA/AAA já calculado e documentado na spec.
9. **`WTV_IPTV_TOKEN`:** valor real não aparece em nenhum arquivo do repo (`wplay-nextjs` nem `wplay-research`). `.env.example` traz a var em branco com aviso explícito. `.gitignore` cobre `.env`/`.env*.local`. Confirmado também que o nome da env var só aparece nos bundles **server-side** compilados (`.next/server/app/api/trial/route.js`) e não em nenhum chunk `.next/static` (client bundle) — o token não vaza pro navegador.
10. **`lib/knewcms.ts` e `app/api/trial/route.ts` vs. as 11 lições:** ver detalhamento no achado 2. As 6 lições aplicáveis à fase atual (teste grátis, sem pagamento ainda) estão portadas como comportamento real, não só como comentário:
    - #1 (validação de e-mail rígida + detecção de domínio duplicado tipo `gmail.comgmail.com`): implementada em `emailValido()`.
    - #2 (ordem: validar → dedupe por telefone/e-mail → rate limit → API): implementada na ordem exata em `POST /api/trial`.
    - #3 (`conferirOuAlertar`, nunca confiar em 2xx sem checar de novo): função pronta em `lib/knewcms.ts`, ainda não chamada por nenhuma rota (correto, porque não há escrita de ativação nesta fase).
    - #5 (`planId = 2`): hardcoded corretamente em `ativarLinha()` e em `content/plans.ts`.
    - #9 (nunca mandar credencial quebrada): `socorroWhatsapp()` cobre tanto falha de API quanto resposta 2xx sem usuário/senha.
    - #11 (webhook Flora non-blocking, ação de negócio síncrona): `espelharEventoFlora()` usa `fetch(...).catch()` sem `await` bloqueante, enquanto a chamada a `criarTeste()` é `await`ada normalmente antes da resposta ao cliente.
11. **Build:** `npm run build` executado nesta sessão (não apenas relatório anterior). Resultado: compilação limpa, 0 erros, 0 warnings, todas as 9 rotas geradas (`/`, `/precos`, `/teste-gratis`, `/wplay-apk`, `/wplay-nao-funciona`, `/api/trial`, `/robots.txt`, `/sitemap.xml`, `/_not-found`). Lint (`eslint` via `next build`) passou sem apontamentos.
12. **Cabeçalhos de segurança:** `next.config.ts` define CSP restritiva (sem fontes externas, `frame-ancestors 'none'`, `object-src 'none'`), HSTS, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`, `poweredByHeader: false` — bom sinal de independência e higiene, não pedido explicitamente no escopo mas relevante.

---

## Recomendação de prioridade para o orquestrador

1. **Confirmar com o dono, de verdade, o achado 0.2** (3 durações em `/precos` em vez de plano único) — é uma mudança de comportamento visível ao usuário que contradiz o escopo original desta auditoria, sustentada hoje só por um comentário de código escrito por outro agente. Confirmar ou reverter antes de qualquer outra coisa, porque muda a interpretação de outros achados (ex. achado 5, JSON-LD `Offer` x3, já assume as 3 durações como corretas).
2. Resolver o achado 1 (`krator_package`) antes de publicar — é o único item que pode derrubar o funil inteiro de teste grátis, e continua valendo em ambas as passadas.
3. Corrigir o travessão em copy visível, achado 0.1 (`app/precos/page.tsx:68` e `app/wplay-apk/page.tsx:108`) — trivial, mas é violação real da regra de marca, diferente do achado 3 (só em comentário).
4. Colocar o achado 6 (Redis obrigatório) no checklist de variáveis de ambiente da Vercel antes do primeiro deploy.
5. Decidir o achado 5 (JSON-LD duplicado) — trivial, 1 linha de remoção.
6. Achados 2, 3 e 4 são informativos — não bloqueiam o lançamento do site novo, mas achado 4 (HTML legado com apps concorrentes) precisa entrar no plano de corte/redirect quando o domínio for migrado para o Next.js.
7. **Recomendação geral:** como o código mudou durante esta auditoria, vale rodar o QA mais uma vez do início contra o estado final (depois do achado 0.2 resolvido), só para garantir que nada mais mudou por baixo no meio do caminho.
