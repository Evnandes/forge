# Forge Builder — currículo do curso

**Posicionamento:** ensinar pessoas que **não sabem programar** a criar software de qualidade com IA (Cursor), do zero ao app na nuvem, com critério de produto — não só “gerar código”.

**Projeto-guia:** Forge Agenda (micro-SaaS de agendamento: Auth Google, Firestore, Hosting, painel + link público).

**Inspiração de estrutura (não cópia):** arco em 3 blocos — vibe → engenharia com qualidade → maturidade de produto/agente — como no curso *AI Coder: From Vibe Coder to Agentic Engineer*, adaptado à realidade BR (Hotmart, LGPD, Firebase Spark, público não-dev).

**Promessa:** ao final, o aluno tem um app real publicado, entende o que a IA fez, sabe pedir melhoria com método e sabe o que ainda é limite de plano/ferramenta.

---

## Mapa geral

| Módulo | Nome | Foco | Resultado |
|--------|------|------|-----------|
| 0 | Boas-vindas e mentalidade | Ser o chefe da IA | Aluno entende o jogo |
| 1 | Vibe Coding com propósito | Do chat ao app local | Agenda básica rodando |
| 2 | De protótipo a produto | Backend, auth, UI, deploy | App na nuvem |
| 3 | Qualidade sem ser programador | Testes, UX, logs, git | Fluxo confiável |
| 4 | Segurança, LGPD e limites | Revisão sênior + honestidade técnica | App “apresentável” |
| 5 | Agente, método e próximo nível | Regras, prompts, roadmap | Aluno autônomo |

**Formato sugerido por aula:** 8–15 min · problema → demo no Cursor → checklist · prompt modelo · erro comum.

---

## Módulo 0 — Boas-vindas e mentalidade
*Espelho leve da “semana 1 / day 1”: mapa do curso + o que é vibe coding.*

### Aula 0.1 — O que você vai construir (e o que não precisa saber)
- Promessa do curso e demo do Forge Agenda publicado
- “Não saber programar” ≠ “não ter critério”
- O que é HTML/JS/Firebase em uma frase cada

### Aula 0.2 — Vibe coding vs software de qualidade
- Gerar tela ≠ produto
- Histórias reais: app que “funcionava” e quebrava com 2 usuários / dado pessoal público
- Critério do curso: usable, deployado, com cuidado básico de dado

### Aula 0.3 — Você é o chefe; a IA é a equipe
- Cinco princípios: objetivo claro, pedaços pequenos, validar no navegador, ler o diff, não aceitar “mágica”
- Quando dizer não para a IA

### Aula 0.4 — Setup mínimo (Windows)
- Conta Google, Cursor, navegador, pasta do projeto
- Conta Firebase (plano gratuito Spark — sem cartão)
- GitHub (conta free)

### Aula 0.5 — Como pedir as coisas (prompt que funciona)
- Contexto + objetivo + restrições + definição de pronto
- Exemplo ruim vs exemplo bom (Forge Agenda)
- Salvar prompts que deram certo

**Entrega do módulo:** ambiente ok + primeiro prompt rodando no Cursor.

---

## Módulo 1 — Vibe Coding com propósito
*Espelho da semana 1: fundamentos + primeiro projeto comercial simples.*

### Aula 1.1 — Escolhendo um problema que vende
- Agenda para profissional liberal / Hotmart / serviço local
- MVP: o menor fluxo que gera valor (cadastrar serviço → abrir horário → cliente agenda)

### Aula 1.2 — Desenhar o fluxo antes do código
- 3 telas: início, painel do profissional, agendar
- Papéis: profissional logado vs cliente sem login
- Exercício: aluno desenha o fluxo do próprio nicho

### Aula 1.3 — Primeiro app só no navegador
- HTML + JS simples (sem framework)
- Dados no `localStorage` (protótipo honesto)
- Rodar com servidor local (`python -m http.server` ou Live Server)

### Aula 1.4 — Conversando com o agente (Cursor)
- Agent vs Chat
- Pedir feature por feature (serviço, disponibilidade, slots)
- Como recuperar quando a IA “inventar” demais

### Aula 1.5 — Regras do jogo no projeto
- Pasta limpa, nomes claros, README honesto
- Introduzir a ideia de “regras do Cursor” (ex.: português, sem comentários desnecessários) em linguagem leiga

### Aula 1.6 — Checkpoint: agenda local funcionando
- Checklist de aceite
- Gravar tela do fluxo completo
- O que ainda é protótipo (e está tudo bem)

**Entrega:** Forge Agenda v0 local (ou clone do template da aula).

---

## Módulo 2 — De protótipo a produto na nuvem
*Espelho da semana 2 / projeto SaaS: auth, dados, publish.*

### Aula 2.1 — Por que sair do localStorage
- Limites: outro celular, outro usuário, perda de dados
- Ideia de “backend como serviço” sem virar DevOps

### Aula 2.2 — Firebase na prática (visão de produto)
- Auth (Google), Firestore (dados), Hosting (site)
- Console Firebase passo a passo (Get started, provedor Google)
- Projeto `forge-agenda-*` e por que o nome importa

### Aula 2.3 — Migrar com a IA (sem drama)
- Prompt: “trocar localStorage por Firestore mantendo as mesmas telas”
- O que conferir depois da migração
- História real: e-mail Supabase / limite → Google Auth

### Aula 2.4 — Login do profissional e link do cliente
- Sessão, redirecionar para painel
- Link `agendar.html?pro=UID`
- Separar o que é público do que é privado (conceito, ainda sem LGPD profunda)

### Aula 2.5 — UI que não parece exercício de faculdade
- Bootstrap “default bom o suficiente”
- Toasts, loading, modal de confirmação (no lugar do `confirm` feio)
- Validação de formulário em linguagem humana

### Aula 2.6 — Deploy de verdade
- Firebase Hosting
- `firebase deploy`
- URL pública, testar no celular
- Erros clássicos: 403, ToS, Auth não iniciado

### Aula 2.7 — GitHub sem medo
- Por que versionar
- Commit, push, README atualizado (Hosting, não “só localStorage”)
- Não precisa ser git expert: preciso de histórico e backup

**Entrega:** app publicado (ex.: `*.web.app`) + repo no GitHub.

---

## Módulo 3 — Qualidade sem ser programador
*Espelho da “vibe engineering”: método, debug, testes leves.*

### Aula 3.1 — Separar responsabilidades (ideia limpa)
- `logic` (regras) · `db` (dados) · `ui` (interface)
- Por que isso ajuda a IA e o aluno a não bagunçar tudo

### Aula 3.2 — Quando quebra: ler o erro como chefe
- Log copiável, colar no chat
- Mensagens amigáveis vs detalhe técnico
- Reproduzir antes de pedir “corrige tudo”

### Aula 3.3 — Testes que importam (Vitest sem trauma)
- Testar conflito de horário e permissões na lógica
- O que **não** testar (string “bootstrap” no HTML)
- `npm test` como ritual de confiança

### Aula 3.4 — UX de produto pequeno
- Estados vazios, loading, sucesso, falha
- Cancelar / remarcar com confirmação
- Checklist de “eu deixaria minha mãe usar?”

### Aula 3.5 — Documentação mínima que evita vergonha
- README alinhado com a realidade
- Um guia Firebase curto
- Evitar 4 markdowns contraditórios

### Aula 3.6 — Checkpoint de qualidade
- Rodar fluxo completo na nuvem
- Rodar testes
- Pedir à IA uma “revisão de PR” e filtrar o que importa

**Entrega:** mesma URL, porém com UX + testes + docs coerentes.

---

## Módulo 4 — Segurança, LGPD e limites honestos
*Espelho da passagem a “expert”: revisão sênior, trade-offs, o que não fazer no free.*

### Aula 4.1 — Como um sênior reprova um protótipo
- Lista real: dado de cliente público, create sem validação, e-mail exposto, XSS, corrida de horário
- Exercício: aluno assiste uma revisão guiada do Forge

### Aula 4.2 — LGPD na prática (sem juridiquês)
- Dado pessoal = nome do cliente na agenda
- Quem pode ler o quê
- Coletar o mínimo

### Aula 4.3 — Regras do Firestore que o aluno entende
- `appointments` só o dono lê
- `dayBusy` público sem nome
- Validar campos no create
- Demo do que acontece se a regra negar (permission-denied)

### Aula 4.4 — Anti-XSS e higiene de formulário público
- Nome do cliente na tela do profissional
- Escape / sanitize pedindo à IA com critério
- Nunca confiar em texto que veio de formulário aberto

### Aula 4.5 — Conflito de horário e “quase produção”
- Transação no cliente: o que resolve e o que não resolve
- Cache do navegador quebrando deploy (história real + cache-bust)
- Plano Spark: o que **não** dá para fechar sem backend (Functions / Blaze)

### Aula 4.6 — Decisão de produto: free vs pagar
- Por que Cloud Functions pedem Blaze
- Quando o Spark basta (teste, curso, amigos)
- Quando o cartão faz sentido (cliente real, atacante, escala)
- Código “pronto para Functions” como próximo passo opcional — sem obrigar upgrade

### Aula 4.7 — SECURITY.md e conversa com o cliente
- Como explicar risco residual sem assustar nem mentir
- Checklist pré-venda / pré-Hotmart

**Entrega:** app com hardening Spark + documento de segurança + aluno sabe explicar limites.

---

## Módulo 5 — Método de agente e próximo nível
*Espelho da semana 3 (orquestração), em dose acessível a não-dev.*

### Aula 5.1 — De “uma conversa” a “sistema de trabalho”
- Regras do Cursor, skills, prompts salvos
- Mesmo pedido → mesmo padrão de qualidade

### Aula 5.2 — Pedidos em fatias (e por que isso evita desastre)
- Ordem boa: regras → XSS → transação → limpeza
- Ordem ruim: “deixa produção-ready” de uma vez

### Aula 5.3 — Revisar como product owner
- Diff, commit message, deploy, teste manual
- Quando reverter (história: voltar da tentativa Blaze)

### Aula 5.4 — Extensões do Forge (backlog do curso)
- Lembrete WhatsApp / e-mail
- Multi-profissional / marca branca
- Pagamento (Stripe etc.) — só mapa
- App Check / Functions quando fizer sentido

### Aula 5.5 — Seu próprio micro-SaaS
- Template de descoberta de nicho
- Copiar o método, não o código cegamente
- Publicar, compartilhar, iterar com alunos/clientes

### Aula 5.6 — Encerramento
- Antes/depois
- Portfólio: link + GitHub + 3 aprendizados
- Comunidade / próximos passos

**Entrega final:** Forge (ou fork de nicho) publicado + checklist de qualidade preenchido + 1 minuto de pitch.

---

## Trilha rápida (se o curso for “intensivo 7 dias”)

| Dia | Conteúdo |
|-----|----------|
| 1 | M0 + M1 (ideia → app local) |
| 2 | M2.1–2.4 (Firebase + auth) |
| 3 | M2.5–2.7 (UI + deploy + GitHub) |
| 4 | M3 (qualidade, testes, UX) |
| 5 | M4.1–4.4 (LGPD + rules + XSS) |
| 6 | M4.5–4.7 (limites Spark + doc) |
| 7 | M5 (método + pitch + encerramento) |

---

## Materiais por aula (padrão de produção)

Para cada aula, preparar:
1. **Roteiro** (gancho, demo, erro comum, fechamento)
2. **Prompt modelo** (copiar/colar no Cursor)
3. **Checklist de aceite**
4. **Asset** (print do console Firebase / URL / trecho de rules — sem despejar código demais na tela)
5. **Recado de honestidade** (“isso é protótipo / isso já é produto de teste / isso ainda não é banco”)

---

## O que NÃO fazer neste curso (diferenciação)

- Não prometer “virar engenheiro sênior em 3 semanas”
- Não obrigar Blaze / cartão no caminho feliz
- Não ensinar 4 IDEs diferentes só por marketing — **Cursor no centro**, outros como menção
- Não copiar projetos genéricos (kanban/FPS): o fio condutor é **Forge Agenda e o método**
- Não esconder falhas: permission-denied, cache, README mentiroso, tentativa de Functions — são aulas de ouro

---

## Rubrica de “software de qualidade” (avaliar o aluno)

| Critério | Nota mínima |
|----------|-------------|
| Fluxo completo na URL pública | Obrigatório |
| Profissional loga; cliente agenda sem login | Obrigatório |
| Nome do cliente não listável por anônimo | Obrigatório |
| Feedback de UI (loading/erro/sucesso) | Obrigatório |
| README verdadeiro | Obrigatório |
| Testes da lógica de conflito | Desejável |
| SECURITY / limites explicados | Desejável |
| Nicho próprio (fork) | Bônus |

---

## Nomes sugeridos para Hotmart / landing

- **Forge Builder:** Crie software de qualidade com IA — sem saber programar  
- Sub: Do vibe coding ao app na nuvem, com LGPD básica e critério de produto  
- Projeto: construa sua **Forge Agenda** (e adapte ao seu mercado)

---

## Próximo artefato (quando for gravar)

1. Roteiro detalhado só do **Módulo 2** (maior valor percebido: “está no ar”)  
2. Pack de prompts do Forge (PDF)  
3. Checklist imprimível da rubrica  
