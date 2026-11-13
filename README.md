# Forge Agenda

Agenda simples para quem atende com hora marcada — Firebase Auth (Google) + Firestore + Hosting.

## App na nuvem

https://forge-agenda-evn.web.app

## O que faz

- Login do profissional com Google
- Cadastro de serviços e disponibilidade
- Link público para o cliente agendar (sem login)
- Cancelar, remarcar e **excluir dados** do cliente no painel
- Feedback de UI, validações, logs de erro copiáveis

## Segurança (resumo)

- Dados do cliente (`appointments`) só o dono lê
- Grade pública (`dayBusy`) sem nome do cliente
- Dono pode apagar agendamento (exclusão real)
- Aviso de privacidade na tela de agendar
- Anti XSS na renderização
- Detalhes e riscos residuais: `SECURITY.md`

## Local

No Cursor: use a extensão **Live Server** (recomendado no curso).

Alternativa:

```bash
cd C:\forge
npx --yes serve -l 5500
```

## Testes

```bash
npm install
npm test
```

## Deploy

```bash
firebase deploy --only hosting,firestore:rules --project forge-agenda-evn
```

## Estrutura

```
index.html
login.html
painel.html
agendar.html
cadastro.html
js/config.js
js/logic.js
js/db.js
js/ui.js
js/auth.js
js/slots.js
js/agendar.js
js/painel.js
firestore.rules
SECURITY.md
GUIA-FIREBASE.md
curso/MODULOS.md
```