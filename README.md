# Forge Agenda

Agenda simples para quem atende com hora marcada — Firebase Auth (Google) + Firestore + Hosting.

## App na nuvem

https://forge-agenda-evn.web.app

## O que faz

- Login do profissional com Google
- Cadastro de serviços e disponibilidade
- Link público para o cliente agendar (sem login)
- Cancelar e remarcar no painel
- Feedback de UI, validações, logs de erro copiáveis

## Segurança (resumo)

- Dados do cliente (`appointments`) só o dono lê
- Grade pública (`dayBusy`) sem nome do cliente
- Anti XSS na renderização
- Ver detalhes em `SECURITY.md`

## Local

```bash
cd C:\forge
python -m http.server 5500
```

Abra http://localhost:5500

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
index.html / login.html / painel.html / agendar.html
js/logic.js   regras de negócio testáveis
js/db.js      Firebase + transações
js/ui.js      toasts, loading, modal, logs
js/auth.js    sessão Google
firestore.rules
SECURITY.md
```