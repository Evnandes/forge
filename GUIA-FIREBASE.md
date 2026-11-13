# Guia leigo: Firebase (Google) para o Forge Agenda

Sem e-mail de confirmação. Login = botão **Continuar com Google**.

## Parte 1 — Criar o projeto

1. Abra https://console.firebase.google.com
2. Entre com sua conta Google
3. Clique em **Adicionar projeto** / **Create a project**
4. Nome: `forge-agenda`
5. Pode desligar o Google Analytics se quiser (mais simples)
6. Criar projeto e espere ficar pronto

## Parte 2 — Ligar o app Web

1. Na tela do projeto, clique no ícone **Web** `</>`
2. Apelido do app: `forge-web`
3. **Não** precisa marcar Firebase Hosting agora
4. Clique em registrar
5. Na tela aparece um bloco `firebaseConfig = { ... }`
6. Copie os valores e me envie (ou cole em `js/config.js`):
   - apiKey
   - authDomain
   - projectId
   - storageBucket
   - messagingSenderId
   - appId

## Parte 3 — Login com Google

1. Menu **Build** → **Authentication** → **Get started**
2. Aba **Sign-in method**
3. Clique em **Google** → ative (**Enable**) → salve
4. Em **Authorized domains**, deixe `localhost` (já vem)

## Parte 4 — Banco Firestore

1. Menu **Build** → **Firestore Database** → **Create database**
2. Escolha modo **Start in test mode** (para o protótipo) → Next
3. Região: `southamerica-east1` (São Paulo) se aparecer → Enable
4. Depois, aba **Rules**
5. Cole o conteúdo do arquivo `firestore.rules` deste projeto → **Publish**

(Se quiser ir mais rápido no teste: deixe test mode alguns dias; depois publique as rules.)

## Parte 5 — Testar

1. Abra http://localhost:5500/login.html
2. **Continuar com Google**
3. Cadastre serviço + disponibilidade
4. Abra o link de agendar e marque um horário

## O que a pessoa leiga faz de verdade

| Passo | Ação |
|-------|------|
| 1 | Criar projeto Firebase com Google |
| 2 | Copiar config / autorizar Google login |
| 3 | Criar Firestore |
| 4 | Usar o app |

Sem SMTP, sem rate limit de e-mail de cadastro.