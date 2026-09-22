# Lições reais do wtv-painel.php (appwplay) — ler ANTES de codar o backend do WPlay

Leitura só-leitura via SSH do plugin `wtv-painel.php` (8.627 linhas, appwplay.com.br) em 08/09/2026. Zero alteração no appwplay. Isto não é código pra copiar — é o registro de bugs reais já resolvidos em produção, pra o `wplay-engineer` NÃO reintroduzir o mesmo erro escrevendo do zero.

## 1. Validação de e-mail rígida (bug real: 36 clientes perdidos)

O código antigo só tinha `sanitize_email()` (limpa formato, não valida). Comentário no código: **"Sem e-mail o cliente some do funil... 36 clientes ficaram assim"**. Usar validação de verdade (equivalente a `is_email()`), e checar padrão de domínio duplicado tipo `gmail.comgmail.com` (erro de digitação comum) antes de aceitar.

## 2. Ordem de verificação no formulário de teste importa

1. Validar nome (nome+sobrenome), whatsapp, e-mail — **antes de qualquer outra coisa**.
2. Checar se já existe cliente com esse telefone OU e-mail:
   - Mesmo telefone → loga direto na conta existente (é ele mesmo).
   - Mesmo e-mail, telefone diferente → **nunca mostrar a credencial direto** (risco de outra pessoa saber só o e-mail). Manda link de acesso único (magic link) por e-mail.
3. **Rate limit (por IP/hora) vem DEPOIS da checagem de cliente existente**, de propósito — cliente voltando pra própria conta nunca esbarra no limite.
4. Só DEPOIS de tudo isso, chama a API do painel pra criar a linha.

## 3. `conferir()` — nunca confiar em HTTP 2xx sem checar de novo depois

Toda chamada de escrita (`PATCH /lines/active`, `PATCH /lines/extend`) passa por uma função de verificação central: se não for 2xx, **loga (buffer rotativo + error log) E manda e-mail pro admin com o contexto completo** ("o cliente pode ter pago sem receber o serviço"). Nunca falha em silêncio. Portar esse padrão pro `lib/knewcms.ts` como uma função `conferirOuAlertar()` chamada depois de toda escrita.

## 4. Ativação: 403 "não é teste" precisa de fallback pra renovar

Se a linha já não é mais um teste (ex.: cliente antigo com PIX pendente de meses atrás), o painel recusa "ativar" com 403. **A saída certa aqui é chamar "renovar/estender" em vez de "ativar"** — resolvido automaticamente, sem virar alarme. Sem esse fallback, o cliente paga e não recebe (foi um caso real, 21/08/2026).

## 5. `planId = 2` é o valor certo para IPTV puro (confirmação adicional, direto do código de produção)

O comentário no código confirma, com data: **"medido em 01/09/2026... a rota antiga `/lines/active` deixa a conta com planId 2 (Essencial IPTV + P2P)"**. Isso reforça (não substitui) a confirmação já registrada em `krator-pacote-ativacao.md` — agora são duas fontes de produção independentes apontando pro mesmo valor, sem precisar gastar crédito pra testar de novo (ver `nunca-gastar-credito-warez.md`).

## 6. Segurança do webhook: comparação de token em tempo constante

O validador do webhook usa `hash_equals()` pra comparar o token recebido — nunca `===`/`==` simples, porque comparação normal vaza o segredo aos poucos por tempo de resposta (timing attack). No Next.js, usar `crypto.timingSafeEqual` (Node) em vez de comparação direta de string.

## 7. Idempotência do webhook

Só ativa pagamento se o registro estiver em status `pendente` ou `expirado` — nunca reprocessa um pagamento já marcado como `pago`. Sem isso, um webhook duplicado (comum em gateways de pagamento) ativaria/creditaria duas vezes.

## 8. ⚠️ Sob Woovi (o único gateway do WPlay), NUNCA espelhar a venda de novo pro Flora a partir do próprio backend

O código do appwplay tem essa trava **explicitamente desligada** (`$wtv_espelhar_flora = false`) com o comentário: **"Sob Woovi, o Flora (hub) JÁ registra a venda pelo webhook da própria Woovi... espelhar aqui gerava venda e e-mail EM DOBRO, e ainda na marca errada (caso Rodrigo Araujo, 08/2026)"**. Isso bate exatamente com o que já estava certo na arquitetura do WPlay (`arquitetura.md` seção 9, item 4) — **confirmação, não novidade**, mas reforça: o webhook do WPlay só deve **ativar a linha no KnewCMS**, nunca reenviar `flora_event` de venda pro hub.

## 9. Nunca mandar credencial que não funciona

Se a ativação no painel falhar depois do pagamento confirmado, **não envia usuário/senha quebrados** — manda um e-mail de "recebemos seu pagamento, estamos liberando" e alerta o time (via `conferir()`, item 3). Mandar credencial errada é pior que não mandar nada.

## 10. Renovação e primeira compra são fluxos diferentes (rota de API E e-mail)

Decide isso **antes** de atualizar o registro do cliente (lê o estado antigo primeiro): quem renova recebe e-mail de "renovado até X", não "bem-vindo" com passo a passo de instalação de novo.

## 11. Webhook de tracking (Flora) é non-blocking, mas a ação de negócio não é

`wp_remote_post` pro Flora sempre usa `blocking => false` (não trava a resposta por causa de telemetria) — mas a chamada real de ativação/criação de linha no KnewCMS e o envio do e-mail de credencial são **síncronos**, aguardados antes de responder. Não confundir os dois padrões (ver também `trial-perdia-email-blocking-false.md`, sobre um bug diferente de e-mail perdido por `blocking:false` usado no lugar errado).

---

**Resumo pro `wplay-engineer`:** `lib/knewcms.ts` e as rotas `/api/trial`, `/api/checkout`, `/api/webhook/woovi` do WPlay devem portar essas 11 lições como comportamento (validação forte de e-mail, dedupe por telefone/e-mail com magic link, rate limit pós-dedupe, verificação pós-escrita com alerta, fallback 403→renovar, token do webhook em tempo constante, idempotência por status, nunca espelhar venda duplicada sob Woovi, nunca mandar credencial quebrada) — não é pra importar PHP pro TypeScript, é pra não redescobrir esses mesmos bugs com dinheiro/cliente real.
