# Como este site vai ao ar

Domínio de produção: **iptu2022br.com.br** (projeto Vercel `wplay-nextjs`).

## Fluxo

`git push` na branch `main` → a Vercel builda e publica sozinha.

## Por que isto está escrito aqui

Até 09/11/2026 **não era assim, e falhava em silêncio**: o projeto da Vercel
não estava conectado ao GitHub. O push subia o commit, o GitHub mostrava tudo
certo, e o site continuava igual. Quando percebemos, o deploy em produção tinha
49 dias e havia 7 commits nunca publicados, incluindo a troca dos apps parceiros
de 06/10. Na prática a área do cliente passou um mês oferecendo apps que já não
ativavam.

Duas coisas foram ajustadas naquele dia:

- o projeto foi conectado ao repositório `guilhermeguns3000/iptv-hub-site-1`;
- o **Root Directory** virou `wplay-nextjs`. A raiz do repositório é o site
  estático antigo e não tem `package.json`, então o build pelo GitHub morreria
  antes de começar.

## Publicar pela CLI (fallback)

Com o Root Directory apontando para `wplay-nextjs`, o deploy manual roda **da
raiz do repositório**, não de dentro da pasta do app:

```
cd "SITE IPTU" && npx vercel --prod
```

## Antes de dizer que subiu

```
npx vercel ls
```

Olhe a **idade** do primeiro da lista. Push aceito não é prova de deploy.
