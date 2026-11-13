# Módulo 1 — Primeiro fluxo no template

---

## Aula 1.1 — Por que template (não app do zero)
**Meta:** 8–10 min

### Gancho
“Se você pedir um app do zero agora, a IA inventa uma estrutura. Depois as aulas de segurança não batem com o seu código. Por isso o fio condutor é o **template Forge**.”

### Desenvolvimento
- M1–M5: seguir / clonar Forge  
- M6: *adapte ao meu nicho*  
- Mostrar repo GitHub do Forge na tela  

### Conferir
Aluno confirma: “meu projeto-base é o Forge”.

### Erro comum
Começar outro stack (React, etc.) “porque a IA sugeriu”.

### Recado
Template não é falta de criatividade; é método.

### Fechamento
“Próxima: entender o fluxo sem código.”

---

## Aula 1.2 — Entender o fluxo (sem código)
**Meta:** 10–12 min

### Gancho
“Antes de pedir mudança, desenhe o caminho do usuário.”

### Desenvolvimento
- 3 telas: início / painel / agendar  
- Papéis: profissional **logado** vs cliente **sem login**  
- Desenhar no quadro ou papel: setas do fluxo  

### Conferir
Aluno reproduz o desenho (foto ok).

### Erro comum
Misturar “cliente também precisa de Google” — no Forge, não.

### Recado
Check-in #1 só no **fim do M1** (aula 1.6), não agora.

### Fechamento
“Próxima: rodar o template na sua máquina.”

---

## Aula 1.3 — Rodar o template local
**Meta:** 10–15 min

### Gancho
“Se não abre local, não adianta pedir feature.”

### Prompt modelo
*“Abra este projeto Forge com Live Server e me diga a URL local. Quero clicar em Início, Login e Agendar. Se algo não abrir, corrija o mínimo necessário.”*

### Conferir
- Início carrega  
- Login existe (pode falhar Firebase ainda — ok se for só tela)  
- Agendar abre  

### Erro comum
Abrir arquivo com `file://` em vez do Live Server.

### Recado
Sem Firebase configurado, login na nuvem pode falhar — o objetivo aqui é **navegação local**.

### Fechamento
“Próxima: primeira melhoria pedida à IA.”

---

## Aula 1.4 — Pedir a primeira melhoria
**Meta:** 10–15 min

### Gancho
“Uma mudança pequena. Uma conferência. Esse é o músculo do curso.”

### Prompt modelo
*“No template Forge, altere apenas o texto de boas-vindas / título da página inicial para incluir meu nome ou meu nicho. Não mexa em Firebase, login nem agendamento. Pronto quando eu recarregar o Live Server e ver o texto novo.”*

### Conferir
Reload → texto novo visível.

### Erro comum
IA refatorar metade do projeto; aluno aceita sem olhar diff.

### Recado
Se o diff for enorme: *“Desfaz. Quero só o texto.”*

### Fechamento
“Próxima: README honesto.”

---

## Aula 1.5 — Regras leves / README
**Meta:** 8–12 min

### Gancho
“README mentiroso destrói confiança.”

### Prompt modelo
*“Atualize o README para dizer com honestidade o estado atual: rodando local com Live Server; Firebase ainda não configurado no MEU projeto (se for o caso). Não invente URL pública.”*

### Conferir
Abrir README e ler em voz alta se bate com a realidade.

### Erro comum
Copiar README do instrutor com URL dele.

### Recado
README verdadeiro é item da rubrica final.

### Fechamento
“Checkpoint do módulo.”

---

## Aula 1.6 — Checkpoint local + Check-in #1
**Meta:** 8–12 min

### Gancho
“Fim do M1: prova mínima.”

### Checklist
- [ ] Template abre no Live Server  
- [ ] Fluxo das 3 áreas entendido (desenho)  
- [ ] Uma melhoria pequena feita por prompt  
- [ ] README honesto  

### Check-in #1 (comunidade)
Postar: print do site local + 3 frases (“o que é profissional / cliente / o que ainda falta”).

### Erro comum
Pular check-in; chegar no M5 sem base.

### Recado
Ainda é etapa local — e está certo.

### Fechamento
“Módulo 2: dados na nuvem.”