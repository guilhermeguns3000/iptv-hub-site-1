# Copy final: Preços (`/precos`)

## Meta

- **Slug:** `/precos`
- **Keyword primária:** preço do wplay (variantes: wplay planos, quanto custa o wplay)
- **Título (51 caracteres):** `Preço do WPlay em 2026: Plano Essencial IPTV + P2P`
- **Meta description (147 caracteres):** `Veja o preço do plano Essencial do WPlay: IPTV completo + 1 tela P2P num plano só, sem grade confusa de opções. Teste grátis antes de assinar.`
- **H1 (único):** Preço do WPlay: plano Essencial, sem grade de opções
- **Papel no cluster:** spoke "Comercial" do pillar home. Hoje 9 domínios de revenda distintos brigam por "wplay planos" no SERP, a maioria só com tabela de preço sem contexto nenhum. Esta página compete sendo mais transparente: explica o que está incluso, o que não está, e por que existe um preço só, em vez de empilhar planos para o visitante comparar sozinho.

---

## Corpo da página

### H1: Preço do WPlay: plano Essencial, sem grade de opções

O WPlay vende um plano só, chamado **Essencial**, por **R$ 29,99 por mês**, pago via PIX, sem fidelidade. Não existe uma versão mais barata com menos canais, nem uma mais cara com mais telas. É a mesma decisão de produto por trás de não pedir cartão de crédito no teste: menos escolha forçada, mais clareza sobre o que você está pagando.

### O que está incluso no Essencial

- **IPTV completo**, com canais ao vivo, filmes e séries, em qualidade que acompanha a sua internet (HD, Full HD ou 4K).
- **1 tela P2P dedicada**, pensada para segurar a estabilidade em jogos e eventos ao vivo com muita gente assistindo ao mesmo tempo.
- **App próprio WPlay**, com instalação guiada em Android, TV Box, Fire Stick, PC e Web Player para Smart TVs sem app nativo.
- **Suporte real via WhatsApp**, para dúvidas de instalação, login ou renovação.
- **Sem contrato de fidelidade.** Assinar não é um compromisso de meses fechados, é mês a mês.

### Por que não existe uma grade de planos

A maioria dos sites que disputa "wplay planos" hoje mostra 3, 4, às vezes mais opções lado a lado, forçando quem está decidindo a comparar telas, qualidade e preço ao mesmo tempo, sem nunca ter usado o serviço. Essa comparação custa energia mental e normalmente empurra a pessoa para o plano mais caro só porque parece "mais completo" na tabela. Aqui a lógica é inversa: existe um plano completo, e a decisão que resta é testar antes ou não. É mais simples de explicar e mais fácil de confiar, porque não há nada escondido atrás de um plano "básico" propositalmente fraco para empurrar upgrade.

### Como funciona o pagamento

Via PIX, cobrança mensal, sem cartão de crédito armazenado em lugar nenhum. Depois de gerado o código PIX, a confirmação do pagamento ativa o acesso automaticamente, sem depender de alguém validar manualmente durante o dia. Se por qualquer motivo a ativação demorar mais que alguns minutos, o suporte via WhatsApp confirma o status na hora.

### Teste antes de pagar, sempre

Mesmo aqui, na página de preço, o convite principal não é "assine agora", é [teste grátis por 4 horas antes de decidir](/teste-gratis). Um plano de R$ 29,99 por mês não é caro o bastante para justificar comprar às cegas, mas também não é tão barato que valha a pena arriscar sem saber se o app instala direito no seu aparelho e se a sua internet segura os canais. O teste resolve as duas dúvidas antes de qualquer PIX ser gerado.

### E se eu já assino e quero saber sobre renovação

A renovação segue o mesmo plano Essencial, no mesmo valor mensal, sem necessidade de gerar um novo cadastro. Se o acesso vencer e você quiser continuar, basta falar com o suporte pelo WhatsApp para reativar. Em caso de dúvida sobre acesso que parou de funcionar antes do vencimento, o roteiro de diagnóstico está em [WPlay não funciona: o que fazer](/wplay-nao-funciona).

---

## FAQ (schema FAQPage)

**Quanto custa o WPlay?**
R$ 29,99 por mês, plano Essencial, com IPTV completo mais 1 tela P2P, pago via PIX.

**Existe plano mais barato ou mais caro no WPlay?**
Não. O WPlay vende um plano só, o Essencial, com tudo incluso. Não há grade de opções para comparar.

**O pagamento é só por PIX?**
Sim, hoje o pagamento é feito por PIX, com ativação automática assim que o pagamento é confirmado.

**Tem fidelidade no plano Essencial?**
Não. A cobrança é mensal, sem contrato de permanência mínima.

**Quantas telas o plano Essencial permite usar ao mesmo tempo?**
O plano inclui IPTV completo mais 1 tela P2P dedicada, pensada especialmente para eventos ao vivo com muita audiência simultânea.

**Preciso testar antes de assinar, ou posso ir direto para o pagamento?**
Você pode assinar direto, mas o recomendado é testar por 4 horas antes, sem custo, para confirmar que o app funciona bem no seu aparelho e na sua internet.

**Como faço para renovar minha assinatura?**
Pelo suporte via WhatsApp, no mesmo valor e plano, sem precisar de um novo cadastro.

**O que acontece se eu pagar e o acesso não ativar na hora?**
A ativação costuma ser automática após a confirmação do PIX. Se demorar além de alguns minutos, o suporte confirma o status da sua conta diretamente.

---

## Schema recomendado (JSON-LD)

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "WPlay Essencial",
  "description": "Plano único de IPTV completo mais 1 tela P2P, com app próprio e suporte via WhatsApp.",
  "offers": {
    "@type": "Offer",
    "price": "29.99",
    "priceCurrency": "BRL",
    "priceValidUntil": "2026-12-31",
    "availability": "https://schema.org/InStock",
    "url": "https://iptu2022br.com.br/precos"
  }
}
```

FAQPage com as 8 perguntas acima. BreadcrumbList com dois níveis (Home, Preços).

---

## Notas para o `wplay-engineer`

- Preço usado: **R$ 29,99/mês**, decisão registrada em `arquitetura.md` (plano único Essencial). É o mesmo valor citado na home e no schema `SoftwareApplication` de lá; manter os três sincronizados se o dono ajustar o valor.
- `priceValidUntil` no schema `Product` é um placeholder de fim de ano; o `wplay-engineer` deve gerar essa data dinamicamente ou atualizar a cada ano, senão o Google pode considerar a oferta expirada.
- Não incluí número de créditos nem duração em dias (30/90/180) como o site-irmão WarezTV, porque a `arquitetura.md` define o WPlay como plano único mensal, sem os tiers trimestral/semestral. Se o dono decidir adicionar esses tiers depois, esta página precisa de uma seção nova, não uma reescrita.
- "Ativação automática após confirmação do PIX" reflete o desenho do webhook Woovi descrito em `arquitetura.md` seção 8.3. Se a ativação real ainda depender de conferência manual em algum ponto do fluxo, ajustar essa frase antes de publicar, para não prometer algo que o sistema ainda não garante.
