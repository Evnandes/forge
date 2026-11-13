# Módulo 5 — Segurança e LGPD

Fontes: docs Firebase (API keys, App Check/pricing), `SECURITY.md` do Forge, prática do template.

---

## Aula 5.1 — Olhar como “cliente chato”
**Meta:** 8–12 min

### Gancho
“Antes de vender, tente quebrar o seu próprio app.”

### Desenvolvimento — lista clássica
- Nome de cliente visível sem login  
- Qualquer um cria lixo na agenda  
- Texto estranho no formulário “quebra” a tela (XSS)  
- Dois agendamentos no mesmo horário  
- README / tela promete o que o app não faz  

### Conferir
Aluno anota 3 itens para testar no próprio deploy.

### Recado
Isso prepara as aulas seguintes — não assusta para vender medo.

### Fechamento
“LGPD mínima.”

---

## Aula 5.2 — LGPD mínima (tópicos)
**Meta:** 8–12 min · manter em tópicos

### Gancho
“Nome na agenda não é detalhe. É dado pessoal.”

### Tópicos (falar um a um)
- Nome = dado pessoal  
- Aviso na tela de agendar  
- **Cancelar ≠ apagar** → botão **Excluir dados**  
- Tempo de guarda simples: enquanto o atendimento precisar / até pedido de exclusão  

### Conferir
- Aviso visível em `agendar.html`  
- No painel: Excluir dados; nome some  

### Erro comum
Ensinar que “cancelar resolve LGPD” (falso).

### Recado
Não é consultoria jurídica; é higiene de microproduto.

### Fechamento
“Privacidade na prática.”

---

## Aula 5.3 — Privacidade na prática
**Meta:** 10–12 min

### Gancho
“Aba anônima é o seu laboratório.”

### Conferir (rubrica)
1. Agendar um cliente teste logado como profissional  
2. Abrir aba anônima nas telas públicas  
3. **Nome do cliente não pode aparecer** para anônimo  

### Prompt modelo (se falhar)
*“Corrija: usuário anônimo não pode ler nome de cliente. Mantenha a grade de horários ocupados sem PII. Me diga como retestar em aba anônima.”*

### Erro comum
Testar só logado e achar que está privado.

### Recado
`dayBusy` = ocupado sem nome (conceito em uma frase).

### Fechamento
“Formulário público.”

---

## Aula 5.4 — Formulário público / XSS
**Meta:** 8–12 min

### Gancho
“Cliente digita qualquer coisa. Seu painel não pode virar zona.”

### Prompt modelo
*“Garanta escape/sanitize de nomes vindos do formulário público. Pronto quando eu tentar um nome com `<b>` ou `<script>` e o painel não quebrar.”*

### Conferir
Agendar com nome estranho → abrir painel → página estável.

### Erro comum
Só “confiar” no navegador sem testar.

### Recado
Anti-XSS é desejável na rubrica; fácil de demonstrar.

### Fechamento
“Limites do Spark.”

---

## Aula 5.5 — Conflito de horário e limites Spark
**Meta:** 10–12 min

### Gancho
“O app melhora o fluxo normal. Atacante técnico ainda existe.”

### Desenvolvimento (honesto)
- Transação no cliente ajuda quem usa a tela  
- Risco: escrever direto no Firestore / spam de creates sem login  
- Sem Cloud Functions no caminho feliz (Blaze = cartão)  

### Prompt modelo
*“Atualize SECURITY.md listando riscos residuais com honestidade: dayBusy, spam de agendamentos públicos, e o que o Spark não fecha sem backend.”*

### Conferir
SECURITY.md menciona spam + dayBusy.

### Recado
Produto de teste/curso ≠ banco. Diga isso ao cliente.

### Fechamento
“Free vs pagar + App Check.”

---

## Aula 5.6 — Free vs pagar + App Check
**Meta:** 8–12 min

### Gancho
“Nem tudo que é ‘mais seguro’ exige cartão — e nem tudo cabe no grátis.”

### Desenvolvimento
- **Blaze / Functions:** fora do caminho feliz do curso  
- **App Check:** na tabela de preços Firebase, App Check aparece no Spark sujeito a quotas do provedor; reCAPTCHA Enterprise tem faixa gratuita de assessments (docs Google/Firebase). Pincelada opcional.  

### Prompt modelo (opcional)
*“Se fizer sentido no Spark, me guie para ativar App Check com reCAPTCHA neste app web. Se exigir algo fora do Spark, diga e pare.”*

### Conferir
Aluno sabe: Spark ok para o curso; App Check = opcional; Functions = depois.

### Erro comum
Obrigar upgrade no meio da turma.

### Recado
apiKey pública ≠ “hackeado” — reforçar docs Firebase.

### Fechamento
“Check-in #3.”

---

## Aula 5.7 — Risco sem mentir + Check-in #3
**Meta:** 10–12 min

### Gancho
“Saber explicar o risco é parte do produto.”

### Desenvolvimento
Aluno formula em 3 frases:
1. O que está protegido (nome só o dono lê; exclusão existe)  
2. O que ainda é risco (spam / dayBusy / sem Functions)  
3. O que o dono controla (link, exclusão, não divulgar à toa)  

### Check-in #3
Postar as 3 frases na comunidade.

### Conferir
Par/moderador entende o texto sem ser técnico.

### Recado
Melhor risco dito do que segurança inventada.

### Fechamento
“Módulo 6: método e nicho.”