# Forge Builder — currículo do curso

**Posicionamento:** ensinar pessoas que **não sabem programar** a criar software de qualidade com IA (Cursor), do zero ao app na nuvem, com critério de produto — não só “gerar código”.

**Projeto-guia:** Forge Agenda (micro-SaaS de agendamento: Auth Google, Firestore, Hosting, painel + link público).

**Inspiração de estrutura (não cópia):** arco vibe → engenharia → maturidade de produto, adaptado à realidade BR (Hotmart, LGPD, Firebase Spark, público não-dev).

**Promessa:** ao final, o aluno tem um app real publicado, entende o que a IA fez, sabe pedir melhoria com método e sabe o que ainda é limite de plano/ferramenta.

**Âncora de verdade:** o que o currículo promete existe no repo (`README.md`, `SECURITY.md`, rules, testes). Não é currículo especulativo.

---

## Mapa geral

| Módulo | Nome | Foco | Resultado |
|--------|------|------|-----------|
| 0 | Boas-vindas, setup e mentalidade | Ser o chefe da IA + ambiente que funciona | Cursor rodando + glossário em mãos |
| 1 | Vibe Coding com propósito | Do chat ao app local | Agenda básica local |
| 2 | Backend e dados na nuvem | Firebase, Auth, Firestore, UI | Dados reais + telas usáveis |
| 3 | Publicação e versionamento | Hosting, GitHub, ritual de deploy | URL pública + histórico |
| 4 | Qualidade sem ser programador | Logs, UX, primeiro teste | Fluxo confiável |
| 5 | Segurança, LGPD e limites | Revisão sênior + honestidade | App apresentável no Spark |
| 6 | Método, comunidade e próximo nível | Autonomia + backlog | Pitch + plano próprio |

**Formato sugerido por aula:** 8–15 min · problema → demo no Cursor → checklist · prompt modelo · erro comum · recado de honestidade.

**Suporte contínuo (não só no fim):**
- Comunidade (Discord/WhatsApp/Hotmart) **desde o Módulo 0**
- Check-in leve após M1, M3 e M5 (postar print/URL + 3 frases)
- Revisão por pares opcional antes do Módulo 6 (trocar checklist com outro aluno)

---

## Glossário vivo (consultar o curso inteiro)

Anexo permanente (PDF/Notion/aula pinada). Cada termo em **uma frase**. Expandir quando um módulo introduzir palavra nova.

| Termo | Em uma frase |
|-------|----------------|
| **HTML** | Estrutura da página (títulos, botões, formulários). |
| **CSS / Bootstrap** | Aparência; Bootstrap é um kit pronto de visual. |
| **JavaScript (JS)** | Comportamento: cliques, validar formulário, falar com o Firebase. |
| **Navegador** | Onde o aluno testa o app (Chrome/Edge). |
| **Servidor local** | Forma de abrir o projeto no PC como se fosse um site. |
| **localStorage** | “Memória” só naquele navegador — some em outro aparelho. |
| **Firebase** | Serviço da Google: login, banco e hospedagem sem montar servidor. |
| **Auth** | Login (no curso: Google). |
| **Firestore** | Banco de dados na nuvem onde ficam serviços, horários e agendamentos. |
| **Hosting** | Coloca o site numa URL pública (`*.web.app`). |
| **Regras (Firestore rules)** | Quem pode ler/escrever cada dado. |
| **LGPD** | Lei de proteção de dados; no app = cuidado com nome do cliente. |
| **Deploy** | Publicar a versão nova na internet. |
| **Git / GitHub** | Histórico do projeto + cópia na nuvem. |
| **Commit / push** | Salvar um “ponto na história” e enviar ao GitHub. |
| **Prompt** | O pedido que você faz à IA. |
| **Agente (Cursor)** | Modo em que a IA edita arquivos e roda passos sozinha (com sua aprovação). |
| **Diff** | O que mudou no código; o chefe olha antes de aceitar. |
| **XSS** | Risco de texto malicioso em formulário virar código na tela. |
| **Spark / Blaze** | Planos Firebase: Spark grátis; Blaze exige cartão (Functions). |
| **Vitest / teste** | Script que confere se uma regra (ex.: conflito de horário) continua certa. |
| **MVP** | Menor versão que já entrega valor. |
| **Micro-SaaS** | Produto pequeno, focado, que pode cobrar assinatura/uso. |

*Regra de produção:* toda aula nova que usar termo fora da tabela **atualiza o glossário** no mesmo commit de conteúdo.

---

## Módulo 0 — Boas-vindas, setup e mentalidade

### Aula 0.1 — O que você vai construir (e o que não precisa saber)
- Promessa do curso e demo do Forge Agenda publicado
- “Não saber programar” ≠ “não ter critério”
- Apresentar o **glossário vivo** (onde fica e como usar)
- Recado: você não precisa decorar; precisa saber onde olhar

### Aula 0.2 — Vibe coding vs software de qualidade
- Gerar tela ≠ produto
- Histórias: app que “funcionava” e quebrava com 2 usuários / dado pessoal público
- Critério do curso: usable, deployado, cuidado básico de dado
- Recado: protótipo honesto é etapa, não vergonha

### Aula 0.3 — Você é o chefe; a IA é a equipe
- Cinco princípios: objetivo claro, pedaços pequenos, validar no navegador, ler o diff, não aceitar “mágica”
- Quando dizer não para a IA
- Entrar na **comunidade** do curso (primeiro post: “olá + o que quero construir”)

### Aula 0.4 — Setup robusto no Windows (aula longa / guia)
Não é “instale e pronto”. É a rede de segurança contra evasão.

**Passo a passo filmado:**
1. Conta Google
2. Instalar Cursor (site oficial) + abrir a primeira pasta de projeto
3. Navegador recomendado (Chrome ou Edge)
4. Conta Firebase (Spark, **sem cartão**) — só criar projeto; configuração profunda é no M2
5. Conta GitHub (free)
6. Onde criar a pasta do projeto (ex.: `C:\forge`) e por que evitar Desktop/Downloads bagunçados
7. (Opcional agora, obrigatório no M4 testes) Node.js LTS — instalar **só quando a aula pedir**, com link fixo da versão

**FAQ / troubleshooting (anexo da 0.4 — pode ser aula 0.4b ou PDF):**
- Cursor não abre / tela branca → reinstalar, desativar antivírus temporário, rodar como usuário normal
- “Não aparece Agent” → plano/login Cursor, reiniciar
- Permissão negada ao salvar arquivo → pasta em `C:\...` do usuário, não em Program Files
- Windows diferente (10 vs 11) → mesmos passos; prints dos dois quando possível
- Proxy/empresa bloqueando → rede pessoal para as aulas de setup
- Firebase em português/inglês do console → mapa visual dos menus
- “Preciso de cartão no Firebase?” → **não** no caminho feliz do curso (Spark)

**Checklist de aceite 0.4:** Cursor abre uma pasta vazia · Google logado · Firebase com projeto criado · GitHub com perfil · postou “setup ok” na comunidade.

### Aula 0.5 — Custo e limites da IA (Cursor) — aula que faltava
- O curso depende do Cursor: o que é plano free vs pago (visão de produto, sem virar consultoria de pricing eterno)
- O que acontece quando acaba cota / a IA “trava” ou fica lenta
- Plano B: pausar, resumir o pedido, novo chat com contexto curto, esperar reset de cota
- Como não queimar crédito: pedidos pequenos, um objetivo por vez, não “refaz o app inteiro”
- Recado: limite de ferramenta é normal; não é “você que é burro”

### Aula 0.6 — Como pedir as coisas (prompt que funciona)
- Contexto + objetivo + restrições + definição de pronto
- Exemplo ruim vs bom (Forge Agenda)
- Salvar prompts que deram certo (arquivo ou Notion do aluno)

**Entrega do módulo:** setup validado na comunidade + glossário localizado + primeiro prompt consciente.

---

## Módulo 1 — Vibe Coding com propósito

### Aula 1.1 — Escolhendo um problema que vende
- Agenda para profissional liberal / Hotmart / serviço local
- MVP: cadastrar serviço → abrir horário → cliente agenda

### Aula 1.2 — Desenhar o fluxo antes do código
- 3 telas: início, painel, agendar
- Papéis: profissional logado vs cliente sem login
- Exercício: fluxo do próprio nicho
- **Check-in #1 (formativo):** postar o desenho/foto do fluxo na comunidade

### Aula 1.3 — Primeiro app só no navegador
- HTML + JS simples (sem framework)
- Dados no `localStorage` (protótipo honesto)
- Rodar com servidor local
- Troubleshooting: porta ocupada, abriu `file://` em vez do servidor

### Aula 1.4 — Conversando com o agente (Cursor)
- Agent vs Chat
- Feature por feature (serviço, disponibilidade, slots)
- Quando a IA inventa demais: voltar o pedido, restringir arquivos

### Aula 1.5 — Regras do jogo no projeto
- Pasta limpa, nomes claros, README honesto (“ainda é local”)
- Ideia de regras do Cursor em linguagem leiga

### Aula 1.6 — Checkpoint: agenda local funcionando
- Checklist de aceite + gravar tela do fluxo
- Recado: ainda é protótipo — e está certo

**Entrega:** agenda v0 local + check-in #1 feito.

---

## Módulo 2 — Backend e dados na nuvem
*Antes era metade de um módulo único inchado. Aqui só: Firebase, Auth, dados, UI. Deploy fica no M3.*

### Aula 2.1 — Por que sair do localStorage
- Outro celular, outro usuário, perda de dados
- “Backend como serviço” sem virar DevOps

### Aula 2.2 — Firebase na prática (visão de produto)
- Auth, Firestore, Hosting (Hosting só conceituado; publish no M3)
- Console: Get started, provedor Google
- Spark sem cartão — reforço

### Aula 2.3 — Migrar com a IA (sem drama)
- Prompt: trocar localStorage por Firestore mantendo as telas
- O que conferir depois
- História real: e-mail/limites → Google Auth

### Aula 2.4 — Login do profissional e link do cliente
- Sessão → painel
- Link `agendar.html?pro=UID`
- Público vs privado (conceito; LGPD profunda no M5)

### Aula 2.5 — UI que não parece exercício
- Bootstrap “bom o suficiente”
- Toasts, loading, modal no lugar do `confirm`
- Validação em linguagem humana
- Recado: bonito demais sem fluxo claro ainda é protótipo

**Entrega do módulo:** app falando com Firebase localmente (ou preview) + login Google + formulários usáveis. **Ainda pode não ter URL final.**

---

## Módulo 3 — Publicação e versionamento
*Segunda metade do antigo Módulo 2 — respiro e checkpoint “está no ar”.*

### Aula 3.1 — Deploy de verdade (Firebase Hosting)
- `firebase deploy` (ou fluxo guiado pela IA)
- URL pública, testar no celular
- Erros clássicos: 403, ToS, Auth não iniciado

### Aula 3.2 — Quando o site “não atualiza”
- Cache do navegador (história real do Forge)
- Ctrl+F5 / versionar scripts (`?v=`)
- Recado: às vezes o backend já está certo e o navegador mente

### Aula 3.3 — GitHub sem medo
- Por que versionar
- Commit, push, README alinhado à realidade (Hosting, não “só localStorage”)
- Não precisa ser git expert

### Aula 3.4 — Checkpoint público
- Checklist: profissional loga · cliente agenda · URL no celular
- **Check-in #2:** postar a URL na comunidade
- Revisão por pares leve: outro aluno abre o link e marca 3 itens do checklist

**Entrega:** URL `*.web.app` (ou equivalente) + repo no GitHub + check-in #2.

---

## Módulo 4 — Qualidade sem ser programador

### Aula 4.1 — Separar responsabilidades (ideia limpa)
- `logic` · `db` · `ui`
- Por que isso ajuda a IA e o aluno

### Aula 4.2 — Quando quebra: ler o erro como chefe
- Log copiável → colar no chat
- Mensagem amigável vs detalhe técnico
- Reproduzir antes de “corrige tudo”

### Aula 4.3 — Primeiro teste junto (linha por linha)
- Instalar Node **agora** (se ainda não), com FAQ da 0.4
- Abrir um teste de conflito de horário já pronto
- Ler em voz alta: “dado de entrada → expectativa → se falhar, a regra quebrou”
- Rodar `npm test` uma vez com o aluno
- Recado: você não está virando engenheiro de QA; está criando uma rede de segurança

### Aula 4.4 — Testes que importam (generalizar com cuidado)
- O que vale testar (conflito, permissão na lógica)
- O que **não** testar (string “bootstrap” no HTML)
- Ritual: depois de mudança crítica na lógica → `npm test`

### Aula 4.5 — UX de produto pequeno
- Estados vazios, loading, sucesso, falha
- Cancelar / remarcar com confirmação
- “Eu deixaria minha mãe usar?”

### Aula 4.6 — Documentação mínima
- README verdadeiro
- Um guia Firebase curto
- Evitar markdowns contraditórios

### Aula 4.7 — Checkpoint de qualidade
- Fluxo na nuvem + testes + pedir “revisão de PR” à IA e filtrar o que importa

**Entrega:** mesma URL com UX + pelo menos a ritualística de teste + docs coerentes.

---

## Módulo 5 — Segurança, LGPD e limites honestos

### Aula 5.1 — Como um sênior reprova um protótipo
- Lista real: cliente público, create frouxo, e-mail exposto, XSS, corrida de horário
- Revisão guiada do Forge

### Aula 5.2 — LGPD na prática (sem juridiquês)
- Nome do cliente = dado pessoal
- Quem pode ler o quê
- Coletar o mínimo

### Aula 5.3 — Regras do Firestore que o aluno entende
- `appointments` só o dono lê
- `dayBusy` público sem nome
- Validar campos no create
- Demo de `permission-denied` e como ler o erro

### Aula 5.4 — Anti-XSS e formulário público
- Nome do cliente no painel
- Escape / sanitize com critério
- Não confiar em texto de formulário aberto

### Aula 5.5 — Conflito de horário e “quase produção”
- Transação no cliente: o que resolve e o que não
- Spark: o que não fecha sem backend (Functions / Blaze)

### Aula 5.6 — Free vs pagar (decisão de produto)
- Por que Functions pedem Blaze
- Quando Spark basta (teste, curso, confiança)
- Quando cartão faz sentido (cliente real, atacante, escala)
- Sem obrigar upgrade no caminho feliz

### Aula 5.7 — SECURITY.md e conversa com o cliente
- Explicar risco residual sem mentir
- Checklist pré-venda / pré-Hotmart
- **Check-in #3:** postar “li o SECURITY e entendi X / ainda tenho dúvida Y”

**Entrega:** hardening Spark + doc de segurança + check-in #3.

---

## Módulo 6 — Método, comunidade e próximo nível
*Antes M5; agora com comunidade já aquecida desde o M0.*

### Aula 6.1 — De uma conversa a um sistema de trabalho
- Regras do Cursor, prompts salvos, glossário atualizado

### Aula 6.2 — Pedidos em fatias
- Ordem boa: rules → XSS → limpeza
- Ordem ruim: “deixa produção-ready” de uma vez

### Aula 6.3 — Revisar como product owner
- Diff, commit, deploy, teste manual
- Quando reverter (história: tentativa Blaze / voltar versão)

### Aula 6.4 — Revisão por pares (obrigatória leve)
- Trocar URL + rubrica com outro aluno
- 15 minutos: o que passou / o que falhou / um elogio / um risco
- Instrutor/moderador só intercede em deadlock (opcional no plano do curso)

### Aula 6.5 — Extensões do Forge (backlog)
- WhatsApp/e-mail, multi-profissional, pagamento (mapa)
- App Check / Functions quando fizer sentido

### Aula 6.6 — Seu próprio micro-SaaS
- Template de nicho
- Copiar o método, não o código cegamente

### Aula 6.7 — Encerramento e portfólio
- Antes/depois
- Link + GitHub + 3 aprendizados
- Pitch de 1 minuto
- Comunidade continua depois do certificado

**Entrega final:** Forge (ou fork) publicado + rubrica preenchida + pares ok + pitch.

---

## Trilha intensiva (10 dias — pacing humano)

| Dia | Conteúdo |
|-----|----------|
| 1 | M0 (mentalidade, setup, custo Cursor, glossário) |
| 2 | M1.1–1.3 (ideia → app local) |
| 3 | M1.4–1.6 (agente + checkpoint local) + check-in #1 |
| 4 | M2.1–2.3 (Firebase + migração) |
| 5 | M2.4–2.5 (auth + UI) |
| 6 | M3 (deploy + GitHub + URL) + check-in #2 |
| 7 | M4.1–4.4 (erros + primeiro teste) |
| 8 | M4.5–4.7 (UX + docs) |
| 9 | M5 (LGPD + rules + limites) + check-in #3 |
| 10 | M6 (método + pares + pitch) |

*Versão 7 dias continua possível comprimindo 4+5 e 7+8; a recomendação padrão passa a ser **10 dias** para não-devs.*

---

## Materiais por aula (padrão de produção)

1. Roteiro (gancho, demo, erro comum, fechamento)
2. Prompt modelo
3. Checklist de aceite
4. Asset (print console / URL / trecho de rules)
5. Recado de honestidade (protótipo / produto de teste / ainda não é banco)
6. Atualização do glossário se houver termo novo

---

## O que NÃO fazer neste curso

- Não prometer “virar engenheiro sênior em 3 semanas”
- Não obrigar Blaze / cartão no caminho feliz
- Não ensinar 4 IDEs por marketing — **Cursor no centro**
- Não trocar o fio Forge Agenda por projetos genéricos sem método
- Não esconder falhas: permission-denied, cache, README mentiroso, tentativa de Functions
- Não deixar o aluno sozinho até o encerramento — comunidade desde o dia 1

---

## Rubrica de “software de qualidade”

| Critério | Nível |
|----------|--------|
| Fluxo completo na URL pública | Obrigatório |
| Profissional loga; cliente agenda sem login | Obrigatório |
| Nome do cliente não listável por anônimo | Obrigatório |
| Feedback de UI (loading/erro/sucesso) | Obrigatório |
| README verdadeiro | Obrigatório |
| Check-ins #1–#3 feitos na comunidade | Obrigatório |
| Ritual `npm test` após mudança de lógica | Desejável |
| SECURITY / limites explicados com palavras próprias | Desejável |
| Revisão por pares (M6) | Desejável |
| Nicho próprio (fork) | Bônus |

---

## Nomes sugeridos (Hotmart / landing)

- **Forge Builder:** Crie software de qualidade com IA — sem saber programar
- Sub: Do vibe coding ao app na nuvem, com LGPD básica e critério de produto
- Projeto: construa sua **Forge Agenda** e adapte ao seu mercado

---

## Próximos artefatos de produção

1. FAQ completo da Aula 0.4 (PDF) + prints Windows 10/11
2. Roteiro detalhado do **Módulo 3** (deploy — maior “wow”)
3. Pack de prompts do Forge
4. Rubrica imprimível + template de post dos check-ins
5. Glossário em página pinada da comunidade
