# Módulo 2 — Dados na nuvem

---

## Aula 2.1 — Por que sair do só-local
**Meta:** 8–10 min

### Gancho
“Se só funciona no seu Chrome, não é produto para cliente.”

### Desenvolvimento
- Outro celular / outro PC / limpar dados do navegador  
- localStorage = memória daquele browser  
- Precisamos de lugar na nuvem: Firebase  

### Conferir
Aluno explica com palavras próprias por que o local não basta.

### Erro comum
Achar que “publicar HTML” sozinho já compartilha a agenda entre usuários.

### Recado
Ainda não vamos deployar o site (isso é M3). Agora é **dado**.

### Fechamento
“Próxima: Firebase em português de produto.”

---

## Aula 2.2 — Firebase em linguagem de produto
**Meta:** 10–12 min

### Gancho
“Três peças: quem entra, onde guarda, onde publica.”

### Desenvolvimento (mostrar console)
- **Auth** = login Google do profissional  
- **Firestore** = banco (serviços, horários, agendamentos)  
- **Hosting** = URL pública (detalhe no M3)  
- **Spark** = caminho feliz sem cartão  

### Conferir
Aluno encontra no console os menus Auth e Firestore (mesmo em inglês).

### Erro comum
Criar segundo projeto Firebase sem querer e se perder.

### Recado
Não precisa entender rede/servidor. Precisa saber **o que pedir** e **onde clicar Get started**.

### Fechamento
“Próxima: pedir a migração.”

---

## Aula 2.3 — Pedir a migração
**Meta:** 12–15 min (+ tempo de console)

### Gancho
“A IA conecta o template ao SEU Firebase. Você clica o que ela pedir no console.”

### Prompt modelo
*“Conecta este template Forge ao MEU projeto Firebase. Atualize `js/config.js` e `.firebaserc`. Mantenha as telas. Me diga o que clicar no console (Auth com Google, Firestore). Spark sem cartão. Pronto quando eu fizer login Google no painel e os dados sobreviverem a um F5.”*

### Conferir
- Login Google no painel  
- Criar um serviço  
- F5 → serviço continua  

### Erros comuns
- Auth sem “Get started” / provedor Google off  
- Domínio autorizado / popup bloqueado  
- Projeto errado no config  

### Pincelada apiKey (1–2 min)
Mostrar `js/config.js`: “Essa apiKey **é pública por design** no Firebase Web. Não é senha. Quem protege dado são as **rules**. Fonte: documentação oficial Firebase (API keys).”

### Recado
Se a IA “esconder” a key em `.env` achando que virou segredo, questione: no Web Client isso não resolve rules ruins.

### Fechamento
“Próxima: link do cliente.”

---

## Aula 2.4 — Link do cliente
**Meta:** 10–12 min

### Gancho
“Profissional loga. Cliente só abre um link.”

### Desenvolvimento
- No painel: copiar link `agendar.html?pro=...`  
- **UID** = código do usuário (glossário)  

### Prompt modelo (se o link não aparecer)
*“Mostre no painel o link público de agendamento com o UID do profissional logado. Não exija login na página de agendar.”*

### Conferir
Aba anônima / outro navegador: abrir só o link → consegue ver serviços/horários (sem ver nomes de outros clientes).

### Erro comum
Testar agendar logado como profissional e achar que “cliente também está logado”.

### Recado
Privacidade forte (nome do cliente) a gente aperta no M5; aqui o foco é o **papel**.

### Fechamento
“Próxima: UI que não parece exercício.”

---

## Aula 2.5 — UI usable
**Meta:** 12–15 min

### Gancho
“Produto pequeno precisa de feedback: loading, erro, sucesso.”

### Prompt modelo
*“Garanta toasts, loading e modal de confirmação no template Forge (em vez de confirm nativo). Validações com mensagem clara em português. Não mude regras de negócio de horário. Pronto quando eu vir loading ao salvar e toast de sucesso/erro.”*

### Conferir
- Campo vazio → mensagem  
- Salvar ok → toast  
- Excluir/cancelar → modal  

### Erro comum
Bonito demais sem mensagem de erro (usuário acha que “não aconteceu nada”).

### Recado
Ainda pode não ter URL final. Entrega do M2 = Firebase + UI usable.

### Fechamento
“Módulo 3: colocar no ar.”