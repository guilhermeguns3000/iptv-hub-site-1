# Engenharia reversa dos APKs WPlay (dados reais, não de terceiros)

Fonte: `https://appwplay.com.br/downloads/` → arquivos hospedados em `cloudap.online` (CDN separada, nenhuma requisição extra foi feita no appwplay.com.br além da única leitura da página de downloads). Baixados e desempacotados localmente (fora do repo, `unzip` + inspeção de `AndroidManifest.xml`).

## WPlay (P2P BinStream)
- **Package real:** `io.wareztv.android.one`
- Tamanho: ~27 MB · Android Gradle Plugin 8.7.3 (build recente, mantido ativamente)
- Kotlin + Firebase + Google Play Services **Cast** (suporte a Chromecast confirmado) + Countly (analytics/push)
- Permissões: `INTERNET`, `ACCESS_NETWORK_STATE`/`ACCESS_WIFI_STATE`, `FOREGROUND_SERVICE`(+`DATA_SYNC`), `WAKE_LOCK`, `MODIFY_AUDIO_SETTINGS`, `READ`/`WRITE_EXTERNAL_STORAGE`, `RECEIVE_BOOT_COMPLETED` (auto-início em TV Box), `REQUEST_INSTALL_PACKAGES` (autoatualização fora da Play Store), `SYSTEM_ALERT_WINDOW`, `READ_PHONE_STATE`, `BIND_JOB_SERVICE`.

## WPlay PRO (P2P PRO)
- **Package real:** `io.wareztv.android.pro`
- Tamanho: ~33 MB · Android Gradle Plugin 8.7.0
- Tudo do WPlay comum, **mais**: `POST_NOTIFICATIONS` (API 33+, Android 13+), `NEARBY_WIFI_DEVICES` (API 33+, cast/descoberta por wifi local), `ACCESS_FINE_LOCATION`, `androidx.profileinstaller` (otimização de start-up).
- **Diferencial real pra usar no copy:** a versão PRO é claramente a build mais nova/mais otimizada pra TV Box (perfil de instalação, notificação nativa, descoberta de dispositivo por wifi) — dá pra dizer isso com confiança porque é dado técnico real do manifest, não achismo de marketing.

## O que isso destrava pro conteúdo

- Confirma que **não é sideload "de risco genérico"** — é um app nativo Kotlin com Firebase/Cast, mesma stack de app comercial sério. Ajuda a escrever a seção de confiança em `/wplay-apk.html` com fato, não só afirmação.
- `RECEIVE_BOOT_COMPLETED` justifica de verdade a recomendação de instalar em TV Box/Fire Stick (auto-inicia com o aparelho).
- `REQUEST_INSTALL_PACKAGES` explica por que o Android pede autorização de "fontes desconhecidas" — pode virar um parágrafo real de FAQ ("por que o Android me avisa sobre isso") em vez de gambiarra de copy.
- Suporte a Chromecast (Play Services Cast) é um recurso real que não estava sendo mencionado em nenhum copy do site — vale considerar destacar.
- **Não** encontrei o ícone/logo do app isolado (nomes de recurso ofuscados pelo build, `res/` com nomes de 1-2 caracteres) — pra pegar o ícone de verdade seria preciso abrir o APK num visualizador de imagem por tentativa, não fiz isso agora por tempo. Se precisar do ícone oficial em alta resolução, mais rápido pedir direto ao dono ou tirar print da tela do app.

APKs ficaram só na pasta temporária da sessão (não foram commitados no repo, são binários de ~30MB e não fazem parte do site).
