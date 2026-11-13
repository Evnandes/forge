# Forge Agenda

Agenda simples para quem atende com hora marcada — sem planilha e sem WhatsApp confuso.

Este é o **protótipo de lógica** do Forge: HTML e JavaScript puros, sem visual elaborado. O foco é o fluxo funcionar de ponta a ponta. Design vem depois.

## O que dá para fazer

- Criar conta e entrar
- Cadastrar serviços (nome, duração, preço opcional)
- Definir dias e horários em que você atende
- Gerar um link para o cliente agendar
- Ver a agenda do dia / próximos horários
- Cancelar ou remarcar

## Como abrir

1. Clone ou baixe este repositório
2. Abra o arquivo `index.html` no navegador  
   (se algo não gravar entre as páginas, sirva a pasta com um servidor local simples)

Ou, com Python instalado:

```bash
cd C:\forge
python -m http.server 5500
```

Depois acesse: http://localhost:5500

## Caminho sugerido para testar

1. Em **Criar conta**, cadastre-se
2. No **Painel**, adicione um serviço (ex.: Consulta, 30 min)
3. Em **Disponibilidade**, coloque um dia da semana (ex.: segunda, 09:00–18:00)
4. Copie o **link para clientes** e abra
5. Marque um horário com um nome de cliente
6. Volte ao painel e confira a agenda — teste cancelar e remarcar

## Estrutura

```
index.html      → início
cadastro.html   → criar conta
login.html      → entrar
painel.html     → serviços, disponibilidade e agenda
agendar.html    → página do cliente
js/             → lógica (dados no Firebase (Google Auth + Firestore))
mapa-agendamentos.md → escopo do produto-prova
```

## Observações

- Os dados ficam **só no navegador** (`localStorage`). Limpar dados do site apaga tudo.
- Auth e banco: **Firebase**. Design e deploy (Vercel) vêm depois.

Configure com o arquivo `GUIA-FIREBASE.md`.
- Feito para validar a lógica do MVP de agendamentos do Forge.

## Repositório

https://github.com/Evnandes/forge

## Testes

`ash
npm install
npm test
`

Cobre a lógica de horários, conflitos, mapeamento e o modelo de permissão (profissional com login / cliente sem login).