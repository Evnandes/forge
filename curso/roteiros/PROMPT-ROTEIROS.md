# Prompt — gerar roteiros de gravação (Forge Builder)

Copie tudo abaixo da linha e cole na LLM (Cursor Agent, Claude, ChatGPT). Rode **um módulo por vez**.
Substitua `{MÓDULO}` pelo número (0 a 6).

---

Você é roteirista de cursos em vídeo para **iniciantes absolutos** e especialista em ensinar pessoas que **não sabem programar** a construir software usando IA (Cursor). Sua tarefa é reescrever o roteiro do **Módulo {MÓDULO}** do curso *Forge Builder*, dividindo-o em micro-aulas e escrevendo cada uma com detalhe suficiente para **gravar sem improvisar**.

## 1. Leia antes de escrever

Leia estes arquivos do repositório e use-os como fonte de verdade:

- `curso/MODULOS.md` — currículo, tese, rubrica, glossário
- `curso/roteiros/M{MÓDULO}-*.md` — roteiro atual (rascunho a expandir, não a copiar)
- `curso/roteiros/M{MÓDULO-1}-*.md` — para saber o que o aluno já tem pronto ao começar
- `README.md`, `SECURITY.md`, `GUIA-FIREBASE.md`, `firestore.rules`, `js/config.js` — o que o template Forge Agenda realmente faz

Se algo do currículo contradizer o código, siga o código e liste a contradição no final.

## 2. Público e tese (não negociável)

- Aluno: leigo total, Windows, nunca abriu terminal, não sabe o que é HTML.
- Tese: **o aluno pede à IA e confere no navegador.** Técnico só como pincelada de 1–2 frases ("para você saber o que está acontecendo").
- Fio condutor: o **template Forge Agenda**. O aluno adapta ao próprio nicho só no Módulo 6.
- Ferramentas: Cursor (Agent), Live Server, Firebase **Spark sem cartão**, GitHub. Não use Python. Não ensine comandos para decorar — se precisar de terminal, o aluno **cola o que a IA indicar e lê o resultado**.
- Tom: português do Brasil, conversa direta, frases curtas, sem jargão sem explicação. Encorajador, mas honesto sobre limites.

## 3. Divida em micro-aulas

O roteiro atual tem poucas aulas longas. Reestruture assim:

- **Uma aula = um objetivo = um resultado visível.** Se a aula tem "e" no objetivo ("instalar X e configurar Y"), divida.
- Duração alvo: **4–10 min** por aula padrão. Aulas `tipo: guia` (setup, FAQ) podem ter 10–20 min, mas prefira quebrar em passos.
- Meta de quantidade: **10 a 15 aulas por módulo** (o curso inteiro deve ficar entre 70 e 100 aulas). Não encha linguiça para bater número: se o módulo só comportar 8 aulas reais, faça 8 e explique.
- Tipos de aula que você pode usar:
  - `conceito` (por que isso importa — curta, 3–6 min)
  - `demo` (mostrar na tela, aluno só assiste)
  - `mão na massa` (aluno faz junto, com prompt)
  - `quando dá errado` (um erro real + como sair dele)
  - `checkpoint` (checklist + check-in na comunidade)
- Todo módulo termina com uma aula `checkpoint`.
- Numeração: `{MÓDULO}.01`, `{MÓDULO}.02`… (dois dígitos).

## 4. Formato obrigatório de cada aula

```markdown
## Aula {MÓDULO}.NN — Título curto e concreto
**Tipo:** conceito | demo | mão na massa | quando dá errado | checkpoint
**Duração:** X–Y min
**Objetivo:** ao final, o aluno consegue… (uma frase, verbo observável)
**Pré-requisito:** o que já precisa estar funcionando (ou "nenhum")

### Fala de abertura
Texto corrido de 4–8 frases, do jeito que o instrutor fala. Inclua um gancho
(problema, curiosidade ou história real do Forge).

### Passo a passo na tela
1. Onde clicar / o que abrir (nome exato do botão/menu do Cursor, Firebase, GitHub)
2. O que colar
3. O que deve aparecer
(Indique `[PRINT: descrição]` onde a edição deve mostrar captura de tela.)

### Prompt modelo
> Texto pronto para colar no Cursor, seguindo a fórmula:
> Contexto · Objetivo · Restrições · Pronto quando…

### ✅ Deu certo se…
Descrição concreta do que o aluno vê (texto na tela, URL, mensagem, cor).

### 🔀 Se a IA responder diferente…
2–3 variações prováveis da resposta da IA e o que o aluno deve fazer em cada uma
(ex.: pediu token, quis usar Python, mudou muitos arquivos, disse que terminou mas não terminou).

### ❌ Erros comuns → o que fazer
- Sintoma que o aluno vê → ação concreta (sempre com solução, nunca só o nome do erro)

### Pincelada técnica (opcional, máx. 2 frases)
O que está acontecendo por baixo, em linguagem leiga. Atualize o glossário se usar termo novo.

### Recado de honestidade
O que ainda é limite / protótipo / risco, sem assustar.

### Fechamento
1–2 frases + gancho da próxima aula.
```

## 5. Armadilhas conhecidas — trate onde se aplicarem

- **Baixar o template:** o Git só é instalado no Módulo 3. No M0/M1 use GitHub → botão **Code → Download ZIP**, descompactar em `C:\Users\<nome>\forge`. Nunca em Downloads, Desktop sincronizado com OneDrive ou Program Files.
- **Firestore no M2:** ao criar o banco, o console pergunta "modo de produção" ou "modo de teste". Em produção tudo é bloqueado até publicar as rules; em teste fica aberto e expira em 30 dias. Como o Firebase CLI só vem no M3, ensine a **colar o conteúdo de `firestore.rules` no console (Firestore → Regras → Publicar)**. No M3 o deploy passa a publicar as rules automaticamente.
- **`.firebaserc` e `js/config.js`** apontam para o projeto do autor (`forge-agenda-evn`). O aluno precisa trocar pelos dele antes de qualquer deploy (prompt de "conectar ao MEU Firebase").
- **apiKey no `config.js`** é pública por design no Firebase Web; quem protege os dados são as rules. Se a IA quiser "esconder em .env", explique por que não resolve.
- **GitHub pedindo token:** prefira login pelo navegador (GitHub Desktop ou o fluxo que o Cursor oferecer). Se a IA pedir Personal Access Token, mostre o passo a passo e avise para nunca colar o token em chat público/comunidade.
- **Diff no Cursor:** mostre os botões de aceitar/rejeitar mudanças e o "desfazer" na primeira vez que o aluno aceitar algo (M0).
- **Cota do Cursor:** quando a IA ficar lenta/recusar, é cota — não erro do aluno.
- **Cache após deploy:** Ctrl+F5 antes de pedir correção à IA.
- **LGPD:** cancelar agendamento **não apaga** o nome do cliente. Exclusão real é ação do dono. Tela pública de agendar precisa de aviso de privacidade curto.
- **App Check** funciona no Spark (grátis, com cota do reCAPTCHA). Cloud Functions exigem Blaze.

Se não tiver certeza de um nome de botão, menu ou comportamento de ferramenta, escreva `[VERIFICAR: …]` em vez de inventar.

## 6. Regras de qualidade (autochecagem antes de entregar)

Confira cada aula:

- [ ] O aluno consegue seguir **sem conhecimento prévio** além das aulas anteriores?
- [ ] Todo erro listado tem **ação de saída**?
- [ ] Existe **critério visível** de sucesso?
- [ ] O prompt modelo tem "Pronto quando…" verificável no navegador?
- [ ] Nenhum comando para decorar; termos novos estão no glossário?
- [ ] A duração é plausível para o conteúdo escrito (fala de ~130 palavras/min + tempo de tela)?
- [ ] Nada contradiz o código do template?

## 7. Formato da entrega

Entregue nesta ordem:

1. **Mapa do módulo** — tabela: nº · título · tipo · duração · objetivo. Mostre a soma de minutos.
2. **Justificativa curta da divisão** (3–5 linhas): o que foi quebrado e por quê.
3. **Roteiros completos** de todas as aulas no formato da seção 4.
4. **Material de apoio do módulo:** lista de prompts do módulo (para o PDF do aluno), termos novos para o glossário, prints a capturar.
5. **Pendências:** itens `[VERIFICAR]` e contradições currículo ↔ código encontradas.

Salve o resultado substituindo `curso/roteiros/M{MÓDULO}-*.md` e atualize o índice em `curso/roteiros/README.md` e as aulas correspondentes em `curso/MODULOS.md` (mantendo a numeração nova).
