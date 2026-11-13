# Guia leigo: publicar o Forge Agenda

Você só precisa abrir sites, criar conta e copiar/colar. A IA (ou um ajudante) faz o resto.

## Parte 1 — Banco (Supabase)

1. Abra https://supabase.com e clique em **Start your project**
2. Entre com **GitHub** ou Google
3. Clique em **New project**
4. Preencha:
   - Nome: `forge-agenda`
   - Senha do banco: invente uma senha forte e guarde
   - Região: escolha a mais perto (ex.: South America)
5. Clique em **Create new project** e espere ficar pronto (1–2 minutos)
6. No menu esquerdo, abra **SQL Editor**
7. Clique em **New query**
8. Abra o arquivo `supabase/schema.sql` deste projeto, copie TODO o conteúdo e cole no SQL Editor
9. Clique em **Run** (deve aparecer sucesso)
10. No menu, abra **Project Settings** (engrenagem) → **API**
11. Copie:
    - **Project URL**
    - **anon public** key
12. Cole esses dois valores em `js/config.js` no lugar de `COLE_AQUI_A_URL` e `COLE_AQUI_A_CHAVE_ANON`

### Dica importante (cadastro)

Em **Authentication** → **Providers** → **Email**:
- Para testar mais fácil, desative **Confirm email** (ou confirme o e-mail quando chegar)

## Parte 2 — Site (Vercel)

1. Abra https://vercel.com e entre com a **mesma conta GitHub**
2. Clique em **Add New…** → **Project**
3. Importe o repositório `forge` (Evnandes/forge)
4. Deixe as opções padrão (não precisa build)
5. Clique em **Deploy**
6. Quando terminar, a Vercel mostra um link tipo `https://forge-xxxx.vercel.app`

## Parte 3 — Testar

1. Abra o link da Vercel
2. Crie uma conta
3. Cadastre serviço + disponibilidade
4. Abra o link de agendar e marque um horário
5. Confira no painel

## O que é de quem

| Quem | Faz |
|------|-----|
| Você (leigo) | Criar contas, colar URL/chave, autorizar GitHub |
| IA / ajudante | Código, SQL, ajustes, deploy se você pedir |

## Se der erro

- Mensagem pedindo configurar Supabase → faltou preencher `js/config.js`
- Não consegue cadastrar → confira Confirm email no Supabase
- Site no ar mas dados não gravam → URL/chave erradas ou SQL não rodou