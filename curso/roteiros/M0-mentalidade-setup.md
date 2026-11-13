# Módulo 0 — Mentalidade e setup via IA

---

## Aula 0.1 — O que você vai construir
**Meta:** 8–10 min · padrão · Ver o produto final e o papel do aluno

### Gancho
“No fim deste curso você tem um app de agenda na internet — igual a este.”  
*(Abrir https://forge-agenda-evn.web.app ou o seu deploy.)*

### Desenvolvimento
- Mostrar: login profissional → painel → link do cliente → agendar sem login
- Frase-chave: **você não precisa saber programar; precisa pedir bem e conferir**
- Mostrar onde fica o **glossário** (comunidade / PDF / MODULOS)

### Prompt modelo
Nenhum nesta aula (só demo).

### Conferir
Aluno anota a URL de demo e a frase: pedir + conferir.

### Erro comum
Achar que vai “aprender JavaScript do zero”. Não é o curso.

### Recado de honestidade
O app da demo já passou por erros reais (permissão, cache, segurança). Vamos usar isso a favor.

### Fechamento
“Próxima aula: diferença entre vibe coding e produto.”

---

## Aula 0.2 — Vibe vs qualidade
**Meta:** 8–12 min · padrão

### Gancho
“Dá para a IA gerar uma tela linda em 2 minutos. Isso ainda não é produto.”

### Desenvolvimento
- Vibe = gerar rápido
- Qualidade neste curso = **usable + no ar + cuidado mínimo com dado do cliente**
- Contar 1 história curta: dado pessoal público / app que só funciona numa máquina

### Conferir
Aluno repete os 3 critérios em voz alta ou no chat da comunidade.

### Erro comum
Julgar só pela “beleza” da tela.

### Recado
Protótipo honesto é etapa. Mentir no README não é.

### Fechamento
“Próxima: você é o chefe da IA.”

---

## Aula 0.3 — Você é o chefe
**Meta:** 8–12 min · padrão

### Gancho
“A IA é equipe. Quem decide o que entra no app é você.”

### Desenvolvimento — 5 princípios
1. Objetivo claro numa frase  
2. Pedido pequeno (uma coisa por vez)  
3. Validar no navegador  
4. Olhar o diff (o que mudou) antes de aceitar  
5. Dizer não / pedir para desfazer  

### Prompt modelo (exemplo de “não”)
*“Desfaz a última mudança. Quero só alterar o texto do botão, nada mais.”*

### Conferir
Entrar na comunidade e postar: “Olá, quero construir [nicho].”

### Erro comum
Aceitar tudo que a IA propõe sem abrir o site.

### Recado
Ritmo próprio: não tem chamada ao vivo obrigatória; tem check-ins.

### Fechamento
“Próxima aula é guia de setup — pode pausar e voltar.”

---

## Aula 0.4 — Setup via IA
**Meta:** guia · 20–40 min (ou sob demanda) · `tipo: guia`

### Gancho
“A maior causa de desistência é ambiente quebrado. Hoje a IA monta o ambiente com você.”

### Desenvolvimento (na tela)
1. Conta Google  
2. Instalar/abrir Cursor; login  
3. Conta GitHub  
4. Conta Firebase (Spark — **sem cartão**) — só criar projeto  
5. Clonar/baixar template Forge para pasta tipo `C:\forge`  
6. Extensão **Live Server** no Cursor  
7. Abrir o site local  

### Prompt modelo
*“Estou no Windows. Quero usar o template Forge Agenda no Cursor. Me guie para: abrir a pasta do projeto, instalar a extensão Live Server, e conferir se consigo ver o site local. Não use Python. Se faltar alguma conta (Google, GitHub, Firebase Spark sem cartão), me diga o que criar e o que clicar.”*

### Conferir (checklist)
- [ ] Cursor abre a pasta do template  
- [ ] Live Server mostra o site  
- [ ] Google / Firebase Spark / GitHub ok  
- [ ] Post na comunidade: “setup ok”

### Erros comuns / FAQ (falar ou pin na comunidade)
- Antivírus bloqueando Cursor → exceção temporária  
- Pasta em lugar com permissão estranha → usar pasta no seu usuário (`C:\Users\...`)  
- Console Firebase em inglês → seguir ícones Auth / Build  
- “Preciso de cartão no Firebase?” → **não** no caminho feliz (Spark)  
- Live Server não aparece → reinstalar extensão / recarregar Cursor  

### Recado
Você não precisa decorar instalação. Precisa ter o checklist verde.

### Fechamento
“Se travou, posta o print do erro na comunidade antes de avançar.”

---

## Aula 0.5 — Custo do Cursor
**Meta:** 8–10 min · padrão

### Gancho
“Este curso depende do agente do Cursor. Cota grátis acaba — e isso é normal.”

### Desenvolvimento
- Free vs pago (visão prática, sem decorar tabela de preço eterno)
- Sinais de cota: agente lento, recusa, limite
- Plano B: pedido menor, novo chat com contexto curto, esperar reset, upgrade

### Conferir
Aluno sabe onde ver o plano/conta no Cursor (mostrar na tela).

### Erro comum
Achar que “a IA ficou burra” quando na verdade acabou cota.

### Recado / landing
Na venda do curso: Firebase Spark sem cartão **e** aviso de que Cursor free pode não bastar.

### Fechamento
“Próxima: como escrever o pedido.”

---

## Aula 0.6 — Prompt que funciona
**Meta:** 10–12 min · padrão

### Gancho
“Prompt bom tem quatro peças.”

### Desenvolvimento — fórmula
1. **Contexto** (Windows, template Forge, Cursor)  
2. **Objetivo** (o que quer que aconteça)  
3. **Restrições** (não use Python; não mude login; etc.)  
4. **Pronto quando…** (como conferir no navegador)  

### Prompt modelo (bom)
*“Contexto: template Forge Agenda no Cursor (Windows). Objetivo: mudar o título da página inicial para ‘Minha Agenda’. Restrição: não mexer em login nem Firebase. Pronto quando: eu abrir com Live Server e ver o novo título.”*

### Prompt modelo (ruim — mostrar e criticar)
*“Faz meu app ficar profissional.”*

### Conferir
Aluno salva a fórmula num bloco de notas / Notion.

### Erro comum
Pedido vago + aceitar 40 arquivos mudados.

### Recado
Guardar prompts que funcionaram = seu kit de ferramenta.

### Fechamento do módulo 0
Entrega: setup ok + fórmula de prompt. Próximo módulo: template local.