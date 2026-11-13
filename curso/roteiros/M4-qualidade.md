# Módulo 4 — Qualidade

---

## Aula 4.1 — Organização do código
**Meta:** 8–12 min

### Gancho
“Você não precisa ler código. Precisa ver se a casa está organizada.”

### Prompt modelo
*“Organize o projeto mantendo nomes claros (logic / db / ui e páginas). Não mude o comportamento. Me diga quais arquivos cuidam de regra, dados e tela.”*

### Conferir
Olhar a pasta `js/`: nomes fazem sentido (`logic`, `db`, `ui`, `painel`, `agendar`…).

### Erro comum
Pedir “refatora tudo em React” no meio do curso.

### Recado
Organização ajuda a IA nas próximas aulas — e você no diff.

### Fechamento
“Próxima: quando quebra.”

---

## Aula 4.2 — Quando quebra
**Meta:** 10–12 min

### Gancho
“Erro não é fracasso. É material para o próximo prompt.”

### Desenvolvimento
1. Reproduzir o bug  
2. Copiar log / mensagem (Forge tem log copiável)  
3. Colar no chat com contexto  

### Prompt modelo
*“Com este log/erro: [colar]. Reproduzindo em [página]. Não refatore o app inteiro — corrija a causa e me diga como conferir.”*

### Conferir
Bug some; mensagem amigável se ainda falhar.

### Erro comum
“Corrige tudo” sem dizer onde quebrou.

### Recado
Chefe bom descreve o problema; não só manda emoção.

### Fechamento
“Próxima: testes com a IA.”

---

## Aula 4.3 — Testes com a IA (um exemplo)
**Meta:** 10–15 min

### Gancho
“Teste = rede de segurança. Você pede para rodar; a IA explica.”

### Prompt modelo
*“Rode os testes deste projeto (`npm test` se for o caso) e explique em português se passou ou o que falhou. Mostre um exemplo de conflito de horário em linguagem simples.”*

### Desenvolvimento
Ler **um** resultado juntos (pass/fail). Não ensinar Vitest como framework.

### Conferir
Aluno vê saída pass/fail e resume em uma frase.

### Erro comum
Achar que precisa escrever teste na mão.

### Recado
Node pode ser instalado agora via IA se ainda não foi (ligar com checklist do M3).

### Fechamento
“Ritual, não religião.”

---

## Aula 4.4 — Ritual, não framework
**Meta:** 8–10 min

### Gancho
“Depois de mudar regra de horário, rode os testes de novo.”

### Prompt modelo
*“Alterei a lógica de conflito/horário. Rode os testes e diga se ainda está seguro.”*

### Honestidade pedagógica
Se houver teste fraco no repo (ex.: só procurar texto em arquivo), mostre e peça:
*“Melhore os testes para validar comportamento útil, não só presença de string.”*

### Conferir
Aluno anota o ritual: mudança crítica → pedir testes.

### Recado
Você não virou QA engineer. Você tem um hábito.

### Fechamento
“UX de produto pequeno.”

---

## Aula 4.5 — UX
**Meta:** 10–12 min

### Gancho
“Eu deixaria minha mãe usar?”

### Prompt modelo
*“Melhore empty states e confirmações de cancelar/remarcar/excluir. Mensagens em português claro. Não mude o modelo de dados.”*

### Conferir
Lista vazia não parece “bug”; ações perigosas pedem confirmação.

### Erro comum
Modal demais / toast demais (ruído).

### Recado
Clareza > animação.

### Fechamento
“README verdadeiro.”

---

## Aula 4.6 — README verdadeiro
**Meta:** 8–10 min

### Prompt modelo
*“Reescreva o README listando as páginas e arquivos js que realmente existem, a URL de Hosting, e como rodar local (Live Server). Remova menções falsas (ex.: localStorage se já é Firebase).”*

### Conferir
Abrir pasta e README lado a lado.

### Erro comum
Estrutura incompleta (esquecer `agendar.js`, `painel.js`, etc.).

### Fechamento
“Checkpoint de qualidade.”

---

## Aula 4.7 — Checkpoint de qualidade
**Meta:** 8–12 min

### Checklist
- [ ] Fluxo na URL ainda ok  
- [ ] Pediu organização e entendeu os nomes  
- [ ] Sabe colar log  
- [ ] Rodou testes via IA pelo menos uma vez  
- [ ] README bate com a pasta  

### Prompt opcional
*“Faça uma revisão tipo PR deste projeto para leigo: 5 riscos e 5 acertos, sem reescrever tudo.”*

### Fechamento
“Módulo 5: segurança e LGPD.”