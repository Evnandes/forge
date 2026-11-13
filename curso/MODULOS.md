# Forge Builder — currículo do curso

**Tese:** pessoa leiga **pede à IA** (Cursor); a IA faz o trabalho técnico; o aluno aprende o **mínimo** para pedir bem e **conferir no navegador**. Não é curso de terminal, Node ou Firebase CLI.

**Projeto-guia (fio condutor):** o aluno **clona / segue o template Forge Agenda**. O “app próprio” vem no fim: *“adapte este template ao meu nicho”*. Assim M4/M5 fazem sentido (o código do aluno tem a mesma estrutura).

**Promessa:** app real na nuvem, critério de produto, LGPD básica sem juridiquês, sem obrigar Blaze/cartão no Firebase.

**Âncora:** o que o curso ensina existe no repo (`README.md`, `SECURITY.md`, rules, painel, agendar).

---

## Decisão estrutural (ler antes de gravar)

| Decisão | Escolha |
|---------|---------|
| Template vs app do zero | **Template Forge** do M1 ao M5; nicho próprio no M6 |
| Formato comercial | Preferência Hotmart: **ritmo próprio** + comunidade assíncrona; trilha 11 dias = sugestão de ritmo, não turma obrigatória |
| Pares | Obrigatória leve; se não houver par, moderador/instrutor faz o papel |
| Firebase | Spark (sem cartão) no caminho feliz |
| Cursor | Avisar na **landing** que o plano free tem cota; pode ser preciso plano pago para terminar |

---

## Mapa geral

| Módulo | Nome | Competência do aluno | Resultado |
|--------|------|----------------------|-----------|
| 0 | Mentalidade e setup via IA | Pedir instalação e validar ambiente | Cursor + pasta do template |
| 1 | Primeiro fluxo no template | Pedir features; conferir no browser | Agenda local |
| 2 | Dados na nuvem | Pedir migração Firebase; testar login | Auth + Firestore |
| 3 | Publicar | Pedir deploy; conferir URL no celular | Site no ar + GitHub |
| 4 | Qualidade | Pedir organização/testes; conferir | UX + ritual de teste |
| 5 | Segurança e LGPD | Pedir correção; conferir aba anônima | App apresentável |
| 6 | Método e nicho | Adaptar template; pares; pitch | Autonomia |

**Formato de aula (padrão):** 8–15 min · problema → **prompt modelo** → aluno confere → erro comum → recado de honestidade.

**Exceção:** setup/FAQ = `tipo: guia` (podem ser longos ou sob demanda).

**Padrão pedagógico “pedir + conferir”:** quase toda aula técnica termina com *o que digitar para a IA* e *o que olhar no navegador* — nunca com “agora configure o X na mão”.

---

## Glossário vivo

| Termo | Em uma frase |
|-------|----------------|
| **HTML / JS** | Estrutura da página / comportamento dos botões. |
| **Bootstrap** | Visual pronto (botões, formulários). |
| **Template Forge** | Projeto-base do curso que o aluno copia e adapta. |
| **localStorage** | Dados só naquele navegador. |
| **Firebase** | Login, banco e site hospedado sem montar servidor. |
| **Auth / Google** | Login do profissional. |
| **Firestore** | Onde ficam serviços, horários e agendamentos. |
| **Hosting** | URL pública do app. |
| **Rules** | Quem pode ler/escrever cada dado. |
| **UID** | Código do usuário logado (aparece no link `?pro=`). |
| **apiKey (Firebase)** | Identificador **público** do app web — não é senha; a proteção real são as rules. |
| **Deploy** | Publicar versão nova. |
| **Cache** | Navegador mostrando página velha; tente Ctrl+F5. |
| **Git / GitHub** | Histórico e cópia do projeto. |
| **Terminal** | Janelinha de texto onde a IA (ou você) cola comandos curtos. |
| **Node / npm** | Ferramenta que o Firebase CLI e os testes usam — a IA instala. |
| **Firebase CLI** | Programa que publica o site (`firebase deploy`) — a IA instala e usa. |
| **Live Server** | Extensão do Cursor para abrir o site local sem Python. |
| **Prompt** | O pedido à IA. |
| **Agente (Cursor)** | IA que edita arquivos com sua aprovação. |
| **Diff** | O que mudou; o chefe olha antes de aceitar. |
| **LGPD** | Cuidado com dado pessoal (nome do cliente). |
| **Exclusão** | Apagar de verdade o registro (diferente de só “cancelar”). |
| **XSS** | Texto de formulário virando código perigoso na tela. |
| **Transação** | Gravar agenda e horário ocupado “juntos” para reduzir conflito. |
| **dayBusy** | Grade pública de horários ocupados **sem** nome do cliente. |
| **permission-denied** | O Firebase bloqueou a ação (quase sempre rules). |
| **App Check** | Proteção extra (reCAPTCHA); disponível no Spark com cota grátis. |
| **Cloud Functions / Blaze** | Código no servidor Firebase; Blaze pede cartão — fora do caminho feliz. |
| **README** | Texto que explica o projeto; deve bater com a realidade. |
| **Vitest / teste** | Conferência automática de regras da lógica; a IA roda e explica. |
| **MVP / micro-SaaS** | Menor versão útil / produto pequeno focável. |

---

## Módulo 0 — Mentalidade e setup via IA

### 0.1 — O que você vai construir
- Demo do Forge publicado
- Você não programa; você **pede e confere**
- Glossário: onde fica

### 0.2 — Vibe vs qualidade
- Tela bonita ≠ produto
- Critério: usable, no ar, dado mínimo cuidado

### 0.3 — Você é o chefe
- Pedidos pequenos, validar no navegador, ler o diff, dizer não
- Entrar na comunidade (ritmo próprio: postar quando fizer, sem data de turma)

### 0.4 — Setup via IA (`tipo: guia`)
**Prompt modelo:** *“Estou no Windows. Quero usar o template Forge Agenda no Cursor. Me guie para: abrir a pasta do projeto, instalar a extensão Live Server, e conferir se consigo ver o site local. Não use Python.”*

Checklist de aceite:
- Cursor abre a pasta do template
- Live Server (ou equivalente) mostra o site
- Conta Google + Firebase Spark (sem cartão) + GitHub criados

**FAQ (anexo):** antivírus, permissão de pasta, Cursor login, console Firebase em PT/EN, “preciso de cartão?” → não no Spark.

### 0.5 — Custo do Cursor (e da verdade na venda)
- Free tem cota de agente
- Se travar: novo chat curto, esperar cota, ou plano pago
- Landing do curso deve dizer o custo esperado

### 0.6 — Prompt que funciona
- Contexto + objetivo + restrições + “como saberei que está pronto”
- Salvar prompts bons

**Entrega:** ambiente ok + post “setup ok” na comunidade.

---

## Módulo 1 — Primeiro fluxo no template

### 1.1 — Por que template (não app do zero)
- Decisão explícita: seguir Forge até publicar com segurança
- Nicho = adaptação depois

### 1.2 — Entender o fluxo (sem código)
- 3 telas; profissional vs cliente
- **Check-in #1:** postar print do fluxo / entendimento (após concluir M1 — ver trilha)

### 1.3 — Rodar o template local
- Live Server
- Conferir: abre início, login, agendar

### 1.4 — Pedir a primeira melhoria
- Feature pequena (texto, validação, empty state)
- Conferir no navegador

### 1.5 — Regras leves do projeto
- Pedir à IA: README honesto (“ainda local / já na nuvem”)

### 1.6 — Checkpoint local
- Checklist + **Check-in #1** aqui (fim do M1)

**Entrega:** template rodando local + check-in #1.

---

## Módulo 2 — Dados na nuvem (pedir migração)

### 2.1 — Por que sair do só-local
- Outro celular / perda de dados

### 2.2 — Firebase em linguagem de produto
- Auth, Firestore, Hosting (Hosting detalhado no M3)
- Spark sem cartão

### 2.3 — Pedir a migração
**Prompt:** *“Conecta este template ao MEU projeto Firebase. Atualize `js/config.js` e `.firebaserc`. Mantenha as telas. Me diga o que clicar no console (Auth Google, Firestore).”*

**Conferir:** login Google funciona; dados aparecem depois de recarregar.

### 2.4 — Link do cliente
- `agendar.html?pro=UID`
- Conferir: abrir o link sem estar logado

### 2.5 — UI usable
**Prompt:** toasts, loading, modal, validações claras  
**Conferir:** erro e sucesso visíveis

**Entrega:** app com Firebase; ainda pode não ter URL final.

---

## Módulo 3 — Publicar e versionar

### 3.0 — Checklist “antes do deploy” (via IA)
**Prompt:** *“Instale o que faltar para eu publicar este projeto Firebase no Windows: Git, Node LTS, Firebase CLI. Depois faça login no Firebase CLI. Não me peço para decorar comandos — me diga só o que colar e o que esperar ver.”*

### 3.1 — Pedir o deploy
**Prompt:** *“Faça deploy de hosting e rules deste projeto.”*  
**Conferir:** abrir URL no celular

### 3.2 — Site não atualizou?
- Primeiro: Ctrl+F5
- Se falhar: *“O site não atualiza depois do deploy. Resolva cache/versionamento.”*
- (Pincelada: às vezes o navegador mente)

### 3.3 — GitHub via IA
**Prompt:** *“Suba este projeto ao meu GitHub e atualize o README com a URL real.”*  
**Conferir:** repo existe; README não mente

### 3.4 — Checkpoint público + Check-in #2
- Postar URL na comunidade
- Par (ou moderador) abre o link e usa a rubrica “como verificar”

**Entrega:** URL pública + GitHub + check-in #2.

---

## Módulo 4 — Qualidade (pedir + conferir)

### 4.1 — Organização do código
**Pedir:** *“Organize mantendo nomes claros (logic / db / ui). Não mude o comportamento.”*  
**Conferir:** pastas/arquivos com nomes que fazem sentido (não precisa entender o código)

### 4.2 — Quando quebra
- Copiar log → colar no chat
- Reproduzir antes de “corrige tudo”

### 4.3 — Testes com a IA (um exemplo em voz alta)
**Pedir:** *“Rode os testes e me explique em português se passou ou o que falhou.”*  
Ler **um** caso juntos (conflito de horário) só para ver o ritual  
**Conferir:** terminal mostrou pass/fail e a IA explicou

### 4.4 — Ritual, não framework
- Depois de mudar regra de horário: pedir para rodar testes de novo
- Honestidade: se o repo tiver teste fraco, a aula mostra e pede melhoria à IA

### 4.5 — UX
- Empty states, cancelar/remarcar com confirmação  
**Conferir:** “minha mãe usaria?”

### 4.6 — README verdadeiro
**Pedir:** listar páginas e js reais  
**Conferir:** bate com a pasta

### 4.7 — Checkpoint de qualidade

**Entrega:** mesma URL mais polida + ritual de teste conhecido.

---

## Módulo 5 — Segurança e LGPD (pedir correção + conferir)

### 5.1 — Olhar como “cliente chato”
- Lista de falhas clássicas (dado público, XSS, etc.)

### 5.2 — Pincelada de LGPD (aula curta, ~10 min)
*Não é aula de advogado. É o mínimo para o dono do app não fazer besteira óbvia.*

**O que o aluno precisa entender (4 frases):**
1. **Nome do cliente na agenda = dado pessoal** — não é “só um campinho”.
2. **Quem responde** pelo uso desse dado no atendimento é o profissional (dono da agenda), não “a IA” nem “o Firebase”.
3. **Avisar** na tela pública o que é coletado e para quê (já existe no template em `agendar.html`).
4. **Cancelar ≠ apagar** — cancelar só libera horário; **Excluir dados** apaga o registro de verdade (pedido de exclusão).

**Política simples de guarda (falar na aula):**  
guardar enquanto fizer sentido para o atendimento; se o cliente pedir para apagar, usar **Excluir dados** no painel.

**Prompt modelo (se faltar algo no fork):**  
*“Garanta LGPD mínima neste template: aviso de privacidade na tela de agendar, e botão no painel para o dono excluir de verdade o agendamento (não só cancelar). Me diga onde conferir no navegador.”*

**Conferir:**
- Abrir agendar → ler o aviso
- No painel → achar **Excluir dados** → depois o nome some
- Recado: isso não substitui advogado; é higiene de produto para micro-SaaS / Hotmart

### 5.3 — Privacidade na prática
**Conferir (rubrica):** aba anônima — o **nome do cliente** aparece em algum lugar público? Se sim: *“Corrija: anônimo não pode ler nome de cliente.”*

### 5.4 — Formulário público / XSS
**Pedir:** escape/sanitize  
**Conferir:** tentar nome estranho com `<` e ver se não “quebra” a página

### 5.5 — Conflito de horário e limites do Spark
- Transação no cliente = melhora o fluxo normal
- Risco residual: escrita direta / spam de agendamentos sem login
**Pedir:** atualizar SECURITY.md com riscos honestos

### 5.6 — Free vs pagar + App Check
- Functions/Blaze = cartão; fora do caminho feliz
- **App Check** pode rodar no **Spark** (reCAPTCHA, cota grátis) — pincelada: *“Se quiser, ative App Check no Spark e me guie.”*
- Sem obrigar

### 5.7 — Explicar risco sem mentir + Check-in #3
- SECURITY.md + conversa com cliente
- Incluir: spam de creates públicos; dayBusy; o que o dono controla (link, exclusão)

**Entrega:** hardening + doc + check-in #3.

---

## Módulo 6 — Método, pares e nicho

### 6.1 — Sistema de trabalho
- Prompts salvos, glossário, pedir em fatias

### 6.2 — Ordem boa de pedidos
- Privacidade → exclusão/aviso → limpeza (não “produção-ready” de uma vez)

### 6.3 — Product owner leigo
- Diff, deploy, teste manual, quando pedir revert

### 6.4 — Revisão por pares (obrigatória leve)
- 15 min com rubrica “como verificar”
- Sem par → moderador

### 6.5 — Backlog opcional
- WhatsApp, pagamento (mapa)
- App Check / Functions se fizer sentido

### 6.6 — Adaptar ao nicho
**Prompt:** *“Adapte este template Forge ao meu nicho X mantendo login, agenda e privacidade do nome do cliente.”*

### 6.7 — Encerramento
- URL + GitHub + 3 aprendizados + pitch 1 min

**Entrega final:** template (ou nicho) no ar + rubrica + pares + pitch.

---

## Trilha sugerida (11 dias) — ritmo próprio

Sugestão de calendário para quem quer disciplina; **não exige turma ao vivo**.

| Dia | Conteúdo |
|-----|----------|
| 1 | M0 |
| 2 | M1.1–1.3 |
| 3 | M1.4–1.6 + **check-in #1** |
| 4 | M2.1–2.3 |
| 5 | M2.4–2.5 |
| 6 | M3 + **check-in #2** |
| 7 | M4.1–4.4 |
| 8 | M4.5–4.7 |
| 9 | M5.1–5.4 |
| 10 | M5.5–5.7 + **check-in #3** |
| 11 | M6 |

Variante 10 dias: juntar 9+10 só se o piloto não mostrar fadiga.  
Variante 7 dias: compressão consciente.

---

## Rubrica (com “como verificar”)

| Critério | Nível | Como verificar (leigo / par) |
|----------|--------|------------------------------|
| Fluxo completo na URL pública | Obrigatório | Abrir a URL no celular; agendar um horário de ponta a ponta |
| Profissional loga; cliente agenda sem login | Obrigatório | Aba 1: login Google no painel. Aba anônima: só o link de agendar |
| Nome do cliente não listável por anônimo | Obrigatório | Aba anônima: vasculhar telas públicas; **não** deve aparecer nome de cliente de outra pessoa |
| Aviso de privacidade na tela de agendar | Obrigatório | Abrir `agendar.html` e achar o texto de privacidade |
| Dono consegue excluir dados do cliente | Obrigatório | No painel: botão de excluir; depois o nome some da agenda |
| Feedback de UI | Obrigatório | Forçar um erro (campo vazio) e um sucesso; ver mensagem |
| README verdadeiro | Obrigatório | Abrir README e conferir URL + arquivos citados |
| Check-ins #1–#3 | Obrigatório | Posts na comunidade |
| Revisão por pares (6.4) | Obrigatório | Par preenche esta tabela |
| Anti-XSS básico | Desejável | No agendar, tentar nome com `<script>` ou `<b>`; painel não deve “estranhar” a página |
| Ritual de testes via IA | Desejável | Pedir à IA rodar testes e colar o resumo no check-in |
| SECURITY / riscos com palavras próprias | Desejável | Aluno cita spam de agenda + dayBusy em 3 frases |
| Nicho próprio | Bônus | URL adaptada |

---

## O que NÃO fazer

- Não virar curso de terminal/Node/Firebase CLI
- Não obrigar Blaze no caminho feliz
- Não mandar o aluno construir app do zero e depois ensinar peças só do Forge
- Não ensinar “cancelar = apagar dado” (é falso)
- Não esconder custo do Cursor na venda
- Não prometer “sênior em 3 semanas”

---

## Landing (checklist de honestidade)

- [ ] Firebase Spark sem cartão no caminho feliz  
- [ ] Cursor: free pode não bastar; custo esperado  
- [ ] Ritmo próprio + comunidade (pares/moderador)  
- [ ] Projeto = template Forge + adaptação de nicho  

---

## Próximos artefatos

1. Pack de prompts (PDF) espelhando cada aula  
2. FAQ da 0.4  
3. Rubrica imprimível  
4. Texto pronto da landing (custos)