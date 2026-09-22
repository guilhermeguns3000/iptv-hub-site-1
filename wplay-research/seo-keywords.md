# WPlay — Pesquisa de Keyword e Estratégia "Entrelinhas"

Domínio: `iptu2022br.com.br` (site novo, marca WPlay, ecossistema IPTV/Warez)
Data da pesquisa: 08-09/09/2026
Autor: agente `wplay-seo`

---

## 0. Transparência sobre ferramentas (leia antes do resto)

Instrução do papel: nunca chutar volume/dificuldade. Aqui está exatamente o que estava disponível nesta sessão e o que não estava:

| Ferramenta | Status | Uso neste relatório |
|---|---|---|
| **DataForSEO MCP** (`seo-dataforseo`) | ❌ Extensão **não conectada** nesta sessão (`ToolSearch` não encontrou nenhuma tool `mcp__dataforseo__*`) | **Nenhum número de volume de busca, CPC, keyword difficulty ou SERP-live oficial foi gerado.** Todo "volume" abaixo é proxy observacional (contagem de resultados reais), nunca uma estimativa numérica de busca. |
| **Moz API / Bing Webmaster** (`seo-backlinks`) | ❌ Sem chave configurada (`backlinks_auth.py --check` → tier 0, ambos `available: false`) | Sem Domain Authority, spam score ou contagem de domínios referenciadores. |
| **Common Crawl** (`seo-backlinks`) | ✅ Disponível (gratuito, sem chave) | Usado — domínio presente no crawl mas **sem PageRank/rank calculado** (pequeno/novo demais para o threshold de ranking do Common Crawl) |
| **Wayback Machine CDX API** | ✅ Disponível (gratuito, público) | Usado para reconstruir o histórico do domínio (não é uma skill oficial do pacote, mas é dado real e verificável) |
| **Supabase da Flora Dashboard** (`mcp__supabase__*`) | ✅ Conectado | Usado — `iptu2022br.com.br` já está cadastrado no Flora (`site_id 7866967c-...`) e o robô `roboseo` já coleta Search Console real dele desde 02/07/2026 |
| **WebSearch (Google real, ao vivo)** | ✅ Disponível | Usado para mapear quem ocupa o SERP hoje para "wplay" e variantes — é dado real de ranking, não é volume/dificuldade |
| **seo-technical, seo-cluster, seo-backlinks (skills)** | ✅ Invocadas de verdade | Metodologias seguidas; onde a skill pedia uma API ausente, isso está registrado explicitamente na seção correspondente |

**Conclusão prática:** este relatório tem dados reais e verificáveis de três fontes — GSC real (Flora/roboseo), SERP ao vivo (WebSearch), e histórico de domínio (Wayback + Common Crawl) — mas **não tem** volume/dificuldade numérica do DataForSEO. Isso é dito explicitamente em cada seção onde faria diferença, em vez de preenchido com estimativa.

---

## 1. O dado mais importante: GSC real diz que "wplay" ainda não existe para o Google

Consultei a tabela `seo_monitor` do Supabase da Flora (Search Console real, coletado pelo `roboseo`) para `site_id = 7866967c-e92e-4ad0-b594-1ef73224e401` (iptu2022br.com.br):

- **179 linhas**, cobrindo **02/07/2026 a 03/09/2026** (~9 semanas de dados reais).
- **Zero impressões** para "wplay", "wplay apk", "wplay teste grátis", "wplay login", "wplay não funciona", "wplay planos", "baixar wplay", "instalar wplay" — qualquer variante da marca. Confirmado por query SQL direta (`ilike '%wplay%'` → só retornou **"warez tv"**, 2 impressões, posição média 7.0, sem clique).
- As impressões reais que o site **já recebe** são genéricas de IPTV, todas em posição fraca (maioria 50-90), refletindo o conteúdo antigo/genérico ainda por otimizar:

| Query real (GSC) | Impressões | Cliques | Posição média |
|---|---|---|---|
| iptv teste gratis abril 2023 | 153 | 0 | 90.7 |
| a melhor lista de teste de iptv do brasil | 101 | 0 | 73.6 |
| lista iptv sem travamento | 86 | 0 | 62.6 |
| melhor teste iptv | 82 | 0 | 74.6 |
| iptv sem travar | 69 | 3 | 49.8 |
| iptv sem travamentos | 59 | 10 | 49.7 |
| iptv sem travamento | 49 | 0 | 52.2 |
| teste iptv p2p | 8 | 4 | 108.0 |

- Também confirmei que **nenhuma query legada do site antigo de IPTU** aparece nos dados reais (`ilike '%iptu%' or '%1099%' or '%duplex%'` → zero linhas). Ou o Google já esqueceu completamente o tema antigo, ou o roboseo só começou a monitorar depois da limpeza — de qualquer forma, hoje não há "vazamento" de tema antigo nas impressões reais.

**O que isso significa para a estratégia:** o site ainda não foi indexado/não recebe impressões para nenhuma variante de "wplay" — nem "vencendo pouco", está zerado. Os únicos cliques reais que existem hoje vêm de páginas genéricas de IPTV (provavelmente `guias/como-instalar-iptv.html`, `blog/*`), não das páginas de marca. Isso não é um problema de dificuldade de keyword — é um problema de **as páginas de marca ainda não terem sinal suficiente (idade, links, cliques) para o Google começar a mostrá-las** nessas buscas.

---

## 2. SERP real para "wplay" e variantes (WebSearch, Google, Set/2026)

Busquei ao vivo cada uma das 8 variantes pedidas + 2 extras (`wplay tv`, `wplay tv box instalar`). Isto é **ranking real observado**, não volume. `iptu2022br.com.br` **não aparece em nenhum dos 10 SERPs verificados** (confirmado também por `site:iptu2022br.com.br wplay`, que não retornou nada).

### O que domina o SERP hoje, por variante

| Keyword | Quem domina | Tipo de resultado |
|---|---|---|
| `wplay iptv` | YouTube (6 dos 10 links), `wplaytvv.com` | Vídeos de tutorial/review, 1 site funil |
| `wplay apk` / baixar wplay | `apkpure.com`, `apkcombo.com`, `appbrain.com`, `androidout.com`, `apktodo.io` | Agregadores de APK de terceiros — **nenhum é o site oficial** |
| `wplay teste grátis` | `wplayp2p.com`, `lp.lojawplay.site`, `tvsuper.net`, `wplay-tv.app/teste/`, `wplaywarez.app/teste/`, `wplay.tvbr.app`, `wplaytv.app`, TikTok | 8 domínios de revenda distintos + rede social, todos com página `/teste` dedicada |
| `wplay não funciona` | **ReclameAqui** (2 resultados no topo) | Reclamações públicas: sumiço após pagamento, suporte no WhatsApp sem resposta, "perfil do WPlay bloqueado pela Cyber Gaeco por pirataria audiovisual" |
| `wplay login entrar` | `app-wplay.com`, `wplay-co.co` | **Colisão de marca**: é uma casa de apostas/cassino colombiana chamada "Wplay", nada a ver com IPTV — domina 100% do topo para essa query |
| `wplay planos preço` | `wplaypremium.com.br`, `tvsuper.net`, `wplaytv.com.br`, `app.painelwplay.com`, `wplayconectcom.online`, `wplayusa.com`, `kplay.online`, `wplay.sbs`, `wplay.website` | **9 domínios de revenda diferentes** brigando pela mesma keyword |
| `wplay tv` | Google Play (apps não-relacionados: "descoberta de filmes", "notícias e esportes"), YouTube | Mais colisão de marca — apps completamente diferentes usando "WPlay TV" |
| `wplay instalar firestick/smart tv/tv box` | 100% YouTube + TikTok (nenhum site) | Nicho de tutorial em vídeo, zero conteúdo em texto/blog nesse espaço |

### Achado central: o "SERP fraco" da tese original é real, mas é mais caótico do que "7 concorrentes"

A lista de 7 concorrentes do briefing (`wplay.tvbr.app`, `wplaytv.app`, `wplaywarez.app`, `wplay.website`, `wplaytv.shop`, `tvsuper.net`, `wapptv.com.br`) é só a ponta do iceberg. No SERP real apareceram **mais de 20 domínios distintos** disputando variantes de "wplay": `wplayp2p.com`, `lp.lojawplay.site`, `wplayoficial.com`, `wplayoficial.com.br`, `wplaytvoficial.com`, `app.wapptv.me`, `wappplus.com.br`, `wplayapptv.com`, `wplaytv.top`, `painelwapptv.com.br`, `wplaypremium.com.br`, `wplaytv.com.br`, `app.painelwplay.com`, `wplayconectcom.online`, `wplayusa.com`, `kplay.online`, `wplay.sbs`, `wplayconnect.com`, além de agregadores de APK e um site de conteúdo real (`omaleiro.com.br`, blog "O Maleiro — IPTV Barato", que publicou uma review escrita sobre o WPlay — não consegui abrir o conteúdo completo, 403 no fetch, mas é o único concorrente orgânico de **conteúdo** encontrado, não de funil).

Isso confirma a premissa "entrelinhas" do briefing, mas com dois ajustes de realidade:

1. **Não dá pra "vencer" `wplay` puro tão cedo.** É um nome curto, sem marca forte assentada, disputado por dezenas de revendedores, um app de apostas colombiano homônimo e um app de "descoberta de filmes" homônimo no Google Play. Brigar pelo termo nu é caro e lento.
2. **O buraco real não é keyword, é FORMATO.** Testei 3 dos concorrentes diretamente (fetch completo das páginas):

### Auditoria de conteúdo dos concorrentes (fetch real, não estimativa)

| Domínio | Estrutura | Blog/guia por aparelho? | FAQ | Avaliação |
|---|---|---|---|---|
| `wplay.tvbr.app` | Hero + 4 planos + form de teste + form de pagamento + modal de termos | Não | Não tem seção de FAQ | "Facilitador técnico neutro" — linguagem vaga, zero profundidade |
| `wplaywarez.app` | Nav com Conteúdo/Diferenciais/Depoimentos/Planos/FAQ | Não | 8 perguntas básicas | Depoimentos sem verificação, texto "Carregando..." never resolvido, thin content |
| `tvsuper.net` | Início/Recursos/Planos/Revendedor/FAQ/Contato | Não | 6 perguntas básicas | Sem blog, sem instalação detalhada, tudo empurra pro WhatsApp |

**Nenhum dos 3 tem**: comparativo com concorrentes, guia de instalação por aparelho, página de suporte para "não funciona", ou blog. São páginas de conversão de uma tela só — exatamente o oposto da estrutura que `iptu2022br.com.br` já tem pronta (`comparativo.html`, `guias/`, `blog/`, `apps/`).

**A keyword "wplay não funciona" é o achado mais acionável do dia**: hoje ela é dominada por ReclameAqui — ou seja, quem busca isso está P chateado e sem alternativa oficial de suporte. Nenhum concorrente (nem os 3 auditados nem os ~20 do SERP amplo) tem uma página de suporte/troubleshooting para essa keyword. É a página de menor concorrência de conteúdo de toda a lista e a de maior intenção comercial (usuário pagante frustrado, prestes a cancelar ou procurar outro provedor).

---

## 3. Perfil de backlink / histórico do domínio `iptu2022br.com.br`

**Sem Moz/Bing/DataForSEO conectados, não há contagem real de domínios referenciadores, Domain Authority ou spam score.** O que consegui medir com fontes gratuitas (Common Crawl + Wayback Machine, ambas públicas e sem chave):

### Common Crawl (via skill `seo-backlinks`, script `commoncrawl_graph.py`)
```
in_crawl: true
in_rankings: false
pagerank: null
note: "Domain found in CC crawl but below ranking threshold (too small/new for PageRank rankings)."
```
Ou seja: o domínio existe no grafo, mas é pequeno/novo demais pro Common Crawl calcular um PageRank — não há sinal de autoridade forte nem fraca, só "não computado".

### Wayback Machine CDX (histórico real, confirmado por HTTP 200 arquivado)

Esta é a descoberta mais importante desta seção, e é **mais séria do que o briefing original sugeria**:

- Primeira captura: **02/07/2022**. Domínio ativo há ~4 anos.
- Rodou **`ads.txt` e `app-ads.txt`** — ou seja, monetizava via publicidade programática (Google AdSense/rede de anúncios), padrão clássico de "content farm".
- **~1.230 URLs distintas arquivadas**, das quais **1.031 são posts/páginas** (excluindo arquivos de data/paginação/wp-).
- O conteúdo antigo **não era só IPTU**. Encontrei duas famílias de conteúdo:
  1. ~20 páginas de imposto de fato (`iptu-2022`, `iptu-bh-nota-10-2022`, `iptu-porto-alegre-2022`, `consultar-iptu-2022`, etc.)
  2. **Uma segunda família muito maior e completamente fora do tema**: centenas de páginas no padrão `/o-que-e-o-[assunto]/` cobrindo tópicos aleatórios sem relação nenhuma entre si nem com IPTU — anime (`o-que-e-o-abismo-de-made-in-abyss`, `o-que-e-o-adao-em-evangelion`), pôquer (`o-que-e-o-all-in-no-poker`), biologia (`o-que-e-o-alveolo-pulmonar`), TI (`o-que-e-o-acesso-ssh`, `o-que-e-o-agendador-de-tarefas`, `o-que-e-o-ambiente-linux`), literatura (`o-que-e-o-amor-gibran`), INSS (`o-que-e-o-codigo-1099-inss`), etc.

Esse padrão — um template genérico "o que é o X" replicado em centenas de tópicos sem coerência temática — é a assinatura clássica de **fazenda de conteúdo programático/gerado em massa** para captar cauda longa de busca informacional e monetizar com anúncios. Não é um crime nem torna o domínio "tóxico" por si (é conteúdo próprio, não é rede de blogs de terceiros vendendo link), mas é um sinal real de que o Google historicamente indexou este domínio como um site de **conteúdo genérico de baixa relevância temática**, não como um site de nicho definido. Isso é mais relevante para o pivot de nicho do que a parte de IPTU sozinha.

### Confirmação de limpeza (dado real, não suposição)

Testei ao vivo (curl) se as URLs antigas ainda respondem:

| URL legada testada | Status HTTP hoje |
|---|---|
| `/iptu-2022/` | 404 |
| `/iptu-verde-2022/` | 404 |
| `/o-que-e-o-abdomen/` | 404 |
| `/o-que-e-o-codigo-1099-inss/` | 404 |
| `/o-que-e-o-duplex-play/` | 404 |

Todas as URLs antigas retornam **404 puro** (GitHub Pages, sem WordPress rodando, sem redirect, sem soft-404 com conteúdo fantasma). Não há resíduo técnico vivo do site antigo. O `robots.txt` atual bloqueia só 3 paths de exemplo (`/iptu-verde-2022/`, `/o-que-e-o-codigo-1099-inss/`, `/o-que-e-o-duplex-play/`) mais os wildcards `/wp-admin/`, `/wp-content/` etc — isso é praticamente decorativo hoje, já que **nenhuma** das ~1.031 URLs antigas existe mais fisicamente no host atual (GitHub Pages nunca rodou WordPress). Não é um problema, mas também não protege nada relevante — pode ser simplificado.

### Avaliação de risco (com a ressalva de que não há dado de link count real)

- **Risco de conteúdo/tema herdado no índice do Google:** baixo-médio. O histórico existe e o Google certamente rastreou essas 1000+ páginas em algum momento, mas (a) todas retornam 404 hoje há tempo suficiente para provavelmente já terem sido removidas do índice, e (b) os dados reais do GSC (seção 1) não mostram nenhuma impressão residual para termos de IPTU/INSS/etc — se ainda estivesse indexado e recebendo impressão, apareceria nos 179 registros do `seo_monitor`. Isso é evidência real a favor de "o índice já esqueceu o tema antigo", não uma garantia 100%.
- **Risco de backlink tóxico:** **não verificável** nesta sessão (sem Moz/Bing/DataForSEO). O que dá pra dizer com o Common Crawl é que o domínio não tem autoridade computável — nem positiva nem negativa. Recomendo rodar `seo-backlinks` de novo assim que houver uma chave Moz (gratuita, 2.500 linhas/mês) configurada — é o próximo passo mais barato para fechar essa lacuna.
- **Risco real que os dados confirmam:** não é "backlink tóxico", é **diluição de relevância temática histórica** — um domínio de 4 anos que o Google associava a "site genérico de curiosidades + imposto", agora pivotando pra "IPTV". Isso normalmente custa alguns meses de recalibração do Google sobre "do que este domínio trata", o que é consistente com o que a seção 1 já mostra (zero impressão pra marca ainda).

---

## 4. Auditoria técnica (via skill `seo-technical`, dados reais do site ao vivo + arquivos locais)

| Item | Resultado | Fonte |
|---|---|---|
| `robots.txt` | Válido, `Allow: /` geral, bloqueia paths legados (hoje decorativo) e `/*:443` | curl ao vivo |
| `sitemap.xml` | Válido, declarado no robots.txt, HTTP 200, tipo `urlset` confirmado | `sitemap_discovery.py` |
| Canonical tags | **Auto-referenciados corretamente em todas as 19 páginas HTML verificadas**, sem conflito | `grep` em todos os `.html` |
| Meta robots | Páginas de conteúdo: `index, follow`. Páginas legais/utilitárias (`privacidade`, `termos`, `cookies`, `contato`, `quem-somos`, `404`): `noindex, follow` — configuração correta | `grep` em todos os `.html` |
| Schema/JSON-LD | Presente em 9 das 19 páginas (home, wplay-apk, comparativo, blog x4, guias, apps) | `grep` |
| HTTPS | Válido, Let's Encrypt, 58 dias restantes na data da checagem | `site_checks` do Flora + curl |
| Hospedagem | GitHub Pages, edge cache em `brazilsouth`/`cache-gru` (bom para público BR) | headers HTTP |
| Security headers (CSP/HSTS/X-Frame-Options) | **Ausentes** na resposta ao vivo | curl -I |
| Estrutura de URL | Limpa, sem parâmetros, hierarquia lógica (`/blog/`, `/guias/`, `/apps/`, `/legal/`) | leitura direta |

**Achados:**
- **Crítico:** nenhum.
- **Alto:** nenhum residual técnico do site antigo — a migração foi limpa (canonical, robots, sitemap todos corretos).
- **Médio:** ausência de security headers (CSP/HSTS/X-Frame-Options/X-Content-Type-Options). GitHub Pages não permite headers customizados sem um proxy na frente (ex.: Cloudflare) — não é regressão de ranking direta (HTTPS em si é o sinal leve confirmado pelo Google; headers de segurança não são fator de ranking documentado), mas vale considerar se o domínio crescer.
- **Baixo:** as 3 linhas de `Disallow` para paths legados específicos no robots.txt são hoje decorativas (todas as ~1.031 URLs antigas já são 404 puro) — pode simplificar para só os wildcards `/wp-*`, sem mudar nada de prático.

---

## 5. Mapa keyword → página (com origem real de cada prioridade)

Cobertura atual real do site (confirmada por grep): **apenas 2 de 9 páginas publicadas mencionam "WPlay"** — `index.html` (42 ocorrências) e `wplay-apk.html` (39 ocorrências). `comparativo.html`, `guias/como-instalar-iptv.html`, `apps/iptv-smarters-pro.html` e os 4 posts de blog têm **zero** menções à marca — são conteúdo genérico de IPTV hoje desconectado do cluster WPlay.

| # | Keyword | Página alvo | Status | Prioridade | Por quê (dado real, não achismo) |
|---|---|---|---|---|---|
| 1 | wplay teste grátis / wplay tv / wplay iptv | `/` (home) | ✅ Já existe, já targeting | **P1 — reforçar** | Página certa, mas GSC real mostra zero impressão ainda (seção 1) — precisa de link interno de outras páginas do site + tempo de indexação, não de retrabalho de conteúdo |
| 2 | wplay apk / baixar wplay / instalar wplay | `/wplay-apk.html` | ✅ Já existe, já targeting | **P1 — reforçar** | SERP real hoje é 100% dominado por agregadores de terceiros (apkpure, apkcombo, appbrain) — nenhum é o site oficial da marca. Página própria bem-feita tem chance real de deslocar agregador genérico assim que ganhar sinal |
| 3 | **wplay não funciona** | Não existe — **gap** | ❌ Falta página | **P1 — criar, maior oportunidade do relatório** | SERP hoje = 100% ReclameAqui, nenhum concorrente (nem os 3 auditados nem os ~20 do SERP amplo) tem página própria de suporte/troubleshooting. Intenção de altíssimo valor: usuário pagante frustrado buscando ajuda ou alternativa |
| 4 | wplay login / wplay entrar | Não existe — **gap parcial** | ⚠️ Cuidado | **P3 — baixa prioridade** | SERP hoje **colidido com marca não relacionada** (casa de apostas colombiana "Wplay"/`app-wplay.com`). Difícil de vencer e risco de tráfego errado. Melhor resolver dentro da própria página de FAQ/suporte do que criar página dedicada |
| 5 | wplay planos / wplay preço | Não existe — **gap** | ❌ Falta página | **P2 — criar** | 9 domínios de revenda distintos brigam por essa keyword no SERP real hoje — mercado fragmentado, nenhum dominante, oportunidade real se a página for mais transparente/completa que a concorrência (que hoje é só tabela de preço sem contexto) |
| 6 | instalar wplay firestick / smart tv / tv box | Não existe como página própria — só `guias/como-instalar-iptv.html` genérico | ⚠️ Gap de branding | **P2 — expandir guia existente ou desdobrar por aparelho** | SERP real é **100% vídeo (YouTube/TikTok)**, zero resultado em texto — nicho de conteúdo em texto praticamente vazio. Reaproveitar `guias/como-instalar-iptv.html` como hub e desdobrar spokes por aparelho (Fire Stick, Samsung/LG, TV Box) citando a marca WPlay explicitamente |
| 7 | wplay vs [concorrente] / comparativo wplay | `/comparativo.html` (existe, mas **não menciona WPlay hoje**) | ⚠️ Desalinhado | **P2 — corrigir** | A página já compara Vizzion/Warez TV/Vision mas tem zero menção a "WPlay" — perde a chance óbvia de capturar quem busca comparação envolvendo a própria marca. Ajuste de conteúdo, não página nova |
| 8 | wplay teste grátis 4 horas (specific) | `/` (home) | ✅ Cobrir como variante na home | **P2** | Aparece nos SERPs de concorrentes como oferta padrão (teste de 4h); confirmar se a oferta real do WPlay é a mesma antes de prometer no conteúdo |

### Hub-and-spoke recomendado (metodologia `seo-cluster`, overlap real de SERP)

**Pillar:** `/` (home) — "WPlay: Teste Grátis e Assine IPTV + P2P" já é o hub natural, com maior intenção comercial e maior overlap de SERP com as demais variantes de marca.

- **Cluster "Instalação"** (spokes): `/wplay-apk.html` (existe) + novos spokes por aparelho a partir de `guias/como-instalar-iptv.html` (Fire Stick, Samsung/LG, TV Box/Android) — SERP hoje 100% vídeo, zero texto, gap real.
- **Cluster "Suporte/Confiança"** (spokes): **página nova "wplay não funciona"** (P1) + FAQ que absorve "wplay login" sem virar página própria (evita a colisão de marca com o site de apostas).
- **Cluster "Comercial"** (spokes): página nova "wplay planos e preços" + correção de `/comparativo.html` para incluir WPlay explicitamente.

Regra de não-canibalização (do briefing): nenhuma dessas páginas deve competir por "Warez" puro — isso já pertence a `appwplay.com.br`, do mesmo dono. O cluster inteiro aqui é sobre a cauda "wplay + [modificador]" que hoje vaza para os ~20 revendedores de terceiro.

---

## 6. Resumo executivo (3 frases)

1. **O site ainda não tem nenhum sinal de marca no Google** (GSC real: zero impressão pra "wplay" em 9 semanas) — o trabalho agora é ganhar esse sinal inicial, não brigar por dificuldade de keyword que ninguém consegue medir sem DataForSEO.
2. **O SERP de "wplay" é uma bagunça de ~20+ revendedores de terceiro + colisões de marca (apostas, app de filmes) + ReclameAqui** — nenhum deles tem conteúdo robusto (blog, comparativo, suporte); a vantagem estrutural do `iptu2022br.com.br` (que já tem `blog/`, `guias/`, `comparativo.html`) é real e mensurável, mas ainda subaproveitada porque 7 das 9 páginas publicadas nem mencionam "WPlay".
3. **O histórico do domínio é mais carregado do que "só IPTU"** — é uma fazenda de conteúdo programático de ~1.031 páginas em dezenas de temas aleatórios, hoje 100% 404 e sem eco nas impressões reais do GSC, mas sem dado de backlink real (Moz/Bing/DataForSEO ausentes) para confirmar 100% que não há peso residual. Recomendo configurar a chave gratuita do Moz para fechar essa lacuna específica.

---

## 7. Próximos passos concretos

1. Configurar Moz API (gratuita) para fechar a lacuna de backlink real — `"$HOME/.claude/skills/seo/bin/claude-seo" run backlinks_auth.py --check --json` mostra exatamente como.
2. Instalar/conectar a extensão DataForSEO para obter volume/dificuldade real antes de priorizar orçamento de conteúdo por número (hoje a priorização acima é 100% por overlap de SERP + gap de formato, não por volume).
3. Criar a página "wplay não funciona" — maior oportunidade identificada, zero concorrência de conteúdo.
4. Ajustar `comparativo.html` para mencionar WPlay explicitamente.
5. Interligar `guias/`, `apps/`, `blog/*` à home e ao `wplay-apk.html` — hoje estão isolados do cluster de marca.
