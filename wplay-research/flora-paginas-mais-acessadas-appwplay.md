# Páginas mais acessadas do appwplay.com.br — dado real do Flora (90 dias)

Fonte: tabela `events` do Supabase da Flora, `site_id = eb13444e-d2b6-4df1-a169-18426fef67d9` (WarezTV), `type in ('pageview','visit')`, últimos 90 dias. Consultado em 09/09/2026.

| Página | Visitas | Papel no funil |
|---|---|---|
| `/baixar-wplay/` | **34.477** | Pilar absoluto — mais de 6x a segunda colocada |
| `/downloads/` | 5.999 | Catálogo completo de apps (equivalente ao nosso `/apps`) |
| `/minha-conta/` | 4.871 | Área do cliente (não existe no WPlay ainda, fase 2) |
| `/` (home) | 4.370 | — |
| `/loja-warez/` | 4.329 | Vitrine visual dos apps (não temos equivalente) |
| `/home/` | 2.131 | Variante de home |
| `/wtv-player-wapp-tv-smart-tv-android-guia/` | **2.049** | **Tutorial de app específico em aparelho específico** |
| `/teste-gratis-warez-tv/` | 1.654 | Landing de teste |
| `/planos-warez-tv/` | 1.502 | Preços |
| `/xcloud-tv-mobile-instalacao-df/` | **1.168** | **Tutorial de app específico** |
| `/selecionar-plano/` | 1.024 | Renovação |
| `/aplicativos/` | 867 | Catálogo (framing diferente de `/downloads/`) |
| `/wareztv-tutoriais-iptv-apps/` | **727** | **HUB de tutoriais — existe e recebe tráfego real** |
| `/ativar-plano/` | 558 | Ativação |
| `/kplay-smart-tv-como-instalar-ativar/` | **251** | **Tutorial de app específico** |
| `/krator-plus-download/` | 186 | (fora do escopo do WPlay) |
| `/brasil-iptv-como-instalar/` | **55** | **Tutorial de app específico** |

## O que isso muda na estratégia do WPlay

1. **`/wplay-apk` (nosso equivalente a `/baixar-wplay/`) é DE LONGE a página mais importante do site inteiro** — não é "mais uma página", é o pilar absoluto. Todo esforço de link interno deve apontar pra ela.
2. **Existe demanda real e comprovada por tutorial POR APP + POR APARELHO**, não um card genérico dentro de uma página só. O padrão de URL deles é `[app]-[aparelho]-guia` (ex.: `wtv-player-wapp-tv-smart-tv-android-guia`, `xcloud-tv-mobile-instalacao`, `kplay-smart-tv-como-instalar-ativar`, `brasil-iptv-como-instalar`) — cada um com título/H1/schema próprio, não uma seção dentro de outra página.
3. **Um HUB de tutoriais (`/wareztv-tutoriais-iptv-apps/`) é estrutura real e validada**, não teoria — é exatamente o "hub de aparelhos" que faltava no WPlay.
4. Volume relativo confirma prioridade: valeria muito mais criar guias dedicados pros apps que já têm código Downloader/APK no `/apps` (WPlay, WPlay PRO, WTV PRO, XCloud) do que investir em conteúdo novo sem ligação com o funil de download.

## Plano imediato (não é mais teoria, é replicar o que já é comprovado)

- Criar `/guias` (hub), espelhando `/wareztv-tutoriais-iptv-apps/`.
- Criar guias individuais dedicados (spokes), a partir do conteúdo que já existe em `/wplay-apk` (hoje comprimido em cards numa página só) — desdobrar em páginas próprias: Samsung/LG, Fire Stick/Fire TV, TV Box/Android TV, PC/Windows, Celular Android.
- Interligar tudo: `/guias` ↔ cada guia ↔ `/wplay-apk` (pilar) ↔ `/apps` (catálogo/download) ↔ `/teste-gratis` (conversão).

Ver [[wplay-rebuild-smarters]], [[flora-rastreamento-sites]] (contrato da tabela `events`).
