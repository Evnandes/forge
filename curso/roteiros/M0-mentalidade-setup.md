# Módulo 0 — Mentalidade e setup via IA (roteiro de gravação)

## Mapa do módulo

| Nº | Título | Tipo | Duração | Objetivo |
|----|--------|------|---------|----------|
| 0.01 | O app pronto na sua frente | demo | 5–7 min | Ver o Forge publicado e o fluxo profissional → cliente |
| 0.02 | Você pede, a IA faz, você confere | conceito | 4–6 min | Repetir a tese do curso em uma frase |
| 0.03 | Glossário: seu dicionário de bolso | demo | 3–5 min | Saber onde consultar termos sem travar |
| 0.04 | Vibe coding não é produto | conceito | 5–7 min | Distinguir tela gerada de app usable |
| 0.05 | Três critérios de qualidade | conceito | 4–6 min | Citar usable + no ar + cuidado com dado |
| 0.06 | Você é o chefe da IA | conceito | 5–7 min | Listar os 5 princípios de trabalho |
| 0.07 | Aceitar, rejeitar e desfazer no Cursor | demo + mão na massa | 6–9 min | Usar Accept/Reject/Undo sem medo |
| 0.08 | Entrar na comunidade | mão na massa | 3–5 min | Publicar o primeiro post “olá + nicho” |
| 0.09 | Contas: Google, GitHub e Firebase Spark | mão na massa | 8–12 min | Ter as três contas criadas (Spark sem cartão) |
| 0.10 | Baixar o template Forge (ZIP) | mão na massa | 6–9 min | Ter a pasta do projeto em `C:\Users\...\forge` |
| 0.11 | Abrir o projeto no Cursor | mão na massa | 4–6 min | Pasta aberta no Cursor com arquivos visíveis |
| 0.12 | Live Server: ver o site no navegador | mão na massa | 6–9 min | Abrir o site local e clicar Início |
| 0.13 | Quando o setup quebra | quando dá errado | 6–10 min | Sair de 3 falhas comuns de ambiente |
| 0.14 | Cota do Cursor: o que fazer quando trava | conceito | 4–6 min | Reconhecer cota e aplicar plano B |
| 0.15 | Prompt com quatro peças | mão na massa | 7–10 min | Escrever e salvar um prompt no formato certo |
| 0.16 | Checkpoint do Módulo 0 | checkpoint | 5–8 min | Checklist verde + post “setup ok” |

**Soma estimada:** ~78–132 min de vídeo (gravar em blocos; aluno pausa entre mãos na massa).

### Justificativa da divisão

O rascunho antigo juntava setup inteiro numa aula 0.4 de 20–40 min — isso é exatamente onde o leigo desiste. Quebrei contas, ZIP, Cursor, Live Server e FAQ em aulas separadas, cada uma com um resultado visível. Diff do Cursor virou aula própria (sem isso o aluno aceita 40 arquivos sem querer). Prompt e cota ficaram depois do ambiente mínimo, para o aluno já ter onde testar um pedido pequeno.

---

## Aula 0.01 — O app pronto na sua frente
**Tipo:** demo  
**Duração:** 5–7 min  
**Objetivo:** ao final, o aluno descreve o fluxo profissional → cliente do Forge Agenda.  
**Pré-requisito:** nenhum

### Fala de abertura
No fim deste curso você não vai só “ter conversado com uma IA”. Você vai ter um app de agenda na internet, parecido com este que estou abrindo agora. Olha comigo: aqui o profissional entra com Google, cadastra serviço e horário, copia um link. Neste outro aparelho — ou nesta aba anônima — o cliente abre o link e marca horário sem criar conta. É isso que vamos construir juntos. Você não precisa virar programador. Precisa aprender a pedir e a conferir.

### Passo a passo na tela
1. Abrir o navegador em `https://forge-agenda-evn.web.app` (ou a URL demo do curso). `[PRINT: página inicial do Forge]`
2. Clicar em área de login / entrar com Google (conta de demonstração se houver). `[PRINT: painel com nome do usuário]`
3. Mostrar link do cliente no painel. `[PRINT: alert com link agendar.html?pro=...]`
4. Abrir o link em aba anônima e mostrar formulário de agendar. `[PRINT: agendar.html]`

### Prompt modelo
Nenhum (só demo).

### ✅ Deu certo se…
O aluno, em voz alta ou no chat, consegue dizer: “profissional loga; cliente só usa o link”.

### 🔀 Se a IA responder diferente…
Não se aplica.

### ❌ Erros comuns → o que fazer
- Site demo fora do ar → usar print/vídeo gravado de backup na edição; anotar `[VERIFICAR: URL demo estável antes de gravar]`

### Pincelada técnica
O site está hospedado no Firebase Hosting; os dados ficam no Firestore — isso é só para você saber o nome das peças.

### Recado de honestidade
Este app já quebrou na nossa cara (permissão, cache, segurança). Vamos usar esses erros como aula, não esconder.

### Fechamento
Próxima aula: a frase que define o curso inteiro.

---

## Aula 0.02 — Você pede, a IA faz, você confere
**Tipo:** conceito  
**Duração:** 4–6 min  
**Objetivo:** ao final, o aluno repete a tese do curso em uma frase.  
**Pré-requisito:** 0.01

### Fala de abertura
Tem curso que te joga no terminal no dia um. Aqui é o contrário. A regra é esta: você pede para a IA no Cursor; a IA mexe nos arquivos; você confere no navegador se funcionou. Se não funcionou, você descreve o que viu e pede de novo. Técnico a gente só pincela — uma ou duas frases — para você não ficar perdido. O chefe é você.

### Passo a passo na tela
1. Mostrar diagrama simples no quadro/slide: **Pedir → IA faz → Conferir no navegador**. `[PRINT: slide dos 3 passos]`
2. Mostrar o Cursor Agent aberto (sem executar nada ainda). `[PRINT: painel Agent do Cursor]`

### Prompt modelo
Nenhum.

### ✅ Deu certo se…
O aluno escreve: “Eu peço, a IA faz, eu confiro no navegador.”

### 🔀 Se a IA responder diferente…
Não se aplica.

### ❌ Erros comuns → o que fazer
- Achar que precisa decorar código → reforçar: código é responsabilidade da IA; critério é seu.

### Recado de honesty
Isso não te transforma em engenheiro sênior. Te transforma em alguém que coloca software útil no ar com critério.

### Fechamento
Próxima: onde consultar as palavrinhas estranhas.

---

## Aula 0.03 — Glossário: seu dicionário de bolso
**Tipo:** demo  
**Duração:** 3–5 min  
**Objetivo:** ao final, o aluno sabe onde abrir o glossário quando travar num termo.  
**Pré-requisito:** 0.02

### Fala de abertura
Ao longo do curso vão aparecer palavras: Firebase, Hosting, prompt, deploy. Você não precisa decorar. Precisa saber onde olhar. Temos um glossário vivo — uma frase por termo. Sempre que eu falar uma palavra nova, ela entra ali.

### Passo a passo na tela
1. Abrir `curso/MODULOS.md` na seção Glossário (ou PDF/Notion pinado na comunidade). `[PRINT: tabela do glossário]`
2. Ler em voz alta 3 termos: Prompt, Firebase, Live Server.

### Prompt modelo
Nenhum.

### ✅ Deu certo se…
O aluno marca/favorita o link do glossário.

### ❌ Erros comuns → o que fazer
- Fechar o glossário e “ir no feeling” → pin na comunidade: “Glossário — abrir sempre”.

### Recado de honestidade
Glossário incompleto é normal no começo; a gente atualiza quando um termo novo aparecer.

### Fechamento
Próxima: vibe coding versus produto de verdade.

---

## Aula 0.04 — Vibe coding não é produto
**Tipo:** conceito  
**Duração:** 5–7 min  
**Objetivo:** ao final, o aluno distingue “tela gerada rápido” de “produto usable”.  
**Pré-requisito:** 0.02

### Fala de abertura
Vibe coding é pedir e sair tela em dois minutos. É poderoso — e perigoso. Porque uma tela linda que só funciona no seu computador, ou que mostra nome de cliente para qualquer estranho, não é produto. É rascunho. Neste curso a gente respeita o rascunho, mas não mente chamando rascunho de pronto.

### Passo a passo na tela
1. Slide: **Vibe** = gerar rápido · **Produto neste curso** = usable + no ar + cuidado com dado. `[PRINT: slide]`
2. Contar história curta real do Forge: app “ok” com dado pessoal público / ou só localStorage.

### Prompt modelo
Nenhum.

### ✅ Deu certo se…
O aluno evita a frase “está pronto porque ficou bonito”.

### ❌ Erros comuns → o que fazer
- Julgar só por design → voltar aos três critérios da próxima aula.

### Recado de honesty
Protótipo honesto é etapa. README mentiroso é problema.

### Fechamento
Próxima: os três critérios que vamos usar o curso inteiro.

---

## Aula 0.05 — Três critérios de qualidade
**Tipo:** conceito  
**Duração:** 4–6 min  
**Objetivo:** ao final, o aluno cita os três critérios de qualidade do curso.  
**Pré-requisito:** 0.04

### Fala de abertura
Memoriza só isto: um app nosso está bom o bastante quando (1) dá para usar sem se perder, (2) está na internet numa URL, (3) trata o nome do cliente com o mínimo de respeito. Usable. No ar. Dado cuidado. O resto é melhoria.

### Passo a passo na tela
1. Escrever os 3 critérios no quadro. `[PRINT: usable / no ar / dado]`
2. Ligar cada um a um exemplo do Forge (toasts; web.app; appointments só o dono lê).

### Prompt modelo
Nenhum.

### ✅ Deu certo se…
O aluno repete os três critérios sem olhar.

### ❌ Erros comuns → o que fazer
- Trocar “no ar” por “abre no meu PC” → corrigir: no ar = URL pública.

### Recado de honesty
No Módulo 0 ainda não teremos URL pública — e está ok. Os critérios são a bússola.

### Fechamento
Próxima: como mandar na IA sem ser grosso nem ser tapete.

---

## Aula 0.06 — Você é o chefe da IA
**Tipo:** conceito  
**Duração:** 5–7 min  
**Objetivo:** ao final, o aluno lista os cinco princípios de trabalho com a IA.  
**Pré-requisito:** 0.02

### Fala de abertura
A IA é equipe. Equipe boa precisa de chefe claro. Cinco regras: objetivo numa frase; um pedido por vez; validar no navegador; olhar o que mudou antes de aceitar; dizer não e pedir para desfazer. Se você aceitar tudo no automático, a IA vira chefe — e aí o projeto vira bagunça.

### Passo a passo na tela
1. Slide com os 5 princípios. `[PRINT: lista numerada]`

### Prompt modelo (exemplo de chefe)
> Desfaz a última mudança. Quero só alterar o texto do botão, nada mais.

### ✅ Deu certo se…
O aluno salva os 5 princípios junto com o glossário.

### ❌ Erros comuns → o que fazer
- Pedido “faz tudo profissional” → quebrar em pedidos pequenos (aula 0.15).

### Recado de honesty
Dizer não não é ser difícil. É proteger o projeto.

### Fechamento
Próxima: na prática, os botões de aceitar e rejeitar no Cursor.

---

## Aula 0.07 — Aceitar, rejeitar e desfazer no Cursor
**Tipo:** demo + mão na massa  
**Duração:** 6–9 min  
**Objetivo:** ao final, o aluno identifica Accept/Reject (ou equivalentes) e sabe pedir desfazer.  
**Pré-requisito:** Cursor instalado (se ainda não, pule e volte depois da 0.11) · idealmente após 0.11

### Fala de abertura
Antes de pedir qualquer milagre, você precisa saber frear. No Cursor, quando a IA muda arquivos, aparece um resumo do que mudou — o diff. Você pode aceitar ou rejeitar. Se aceitou errado, pede para desfazer. Isso é o cinto de segurança do curso.

### Passo a passo na tela
1. Abrir o Cursor com uma pasta qualquer (ou o Forge se já tiver). `[PRINT: Cursor aberto]`
2. Mostrar onde fica o **Agent** / chat de agente. `[VERIFICAR: nome exato do modo Agent na versão atual do Cursor]`
3. Fazer um pedido mínimo só para gerar diff (ex.: mudar um texto). `[PRINT: diff com Accept/Reject]`
4. Clicar **Reject** / rejeitar se for demonstração; ou Accept e depois pedir desfazer.

### Prompt modelo
> Contexto: estou aprendendo o Cursor no Windows. Objetivo: altere só um texto visível na página inicial para eu ver o diff. Restrição: um arquivo só; não mexa em Firebase. Pronto quando: eu ver a proposta de mudança e os botões de aceitar/rejeitar.

### ✅ Deu certo se…
O aluno aponta na tela onde aceita e onde rejeita.

### 🔀 Se a IA responder diferente…
- Mudou 10 arquivos → *“Desfaz tudo. Quero um arquivo só.”*
- Não mostrou diff (aplicou auto) → `[VERIFICAR: setting de auto-apply]` · pedir para mostrar mudanças antes de aplicar
- Não achou Agent → mostrar Chat e anotar diferença na edição

### ❌ Erros comuns → o que fazer
- Aceitar sem ler → regra: se não entendeu o pedido, rejeita  
- Medo de quebrar → por isso existe desfazer e o ZIP original

### Pincelada técnica
Diff = lista do que a IA quer mudar; você é o filtro.

### Recado de honesty
Na primeira semana você vai rejeitar muito. Isso é sinal de saúde, não de fracasso.

### Fechamento
Próxima: comunidade — você não está sozinho.

---

## Aula 0.08 — Entrar na comunidade
**Tipo:** mão na massa  
**Duração:** 3–5 min  
**Objetivo:** ao final, o aluno publicou o primeiro post na comunidade do curso.  
**Pré-requisito:** acesso à comunidade (Hotmart/Discord/WhatsApp)

### Fala de abertura
Este curso é no seu ritmo. Não tem turma com chamada obrigatória. Tem comunidade e check-ins. Agora você entra e se apresenta. Isso vale presença.

### Passo a passo na tela
1. Abrir o link da comunidade do curso. `[PRINT: tela da comunidade]`
2. Criar post: “Olá, quero construir agenda para [seu nicho].”
3. `[PRINT: post publicado]`

### Prompt modelo
Nenhum.

### ✅ Deu certo se…
O post aparece na comunidade.

### ❌ Erros comuns → o que fazer
- Sem acesso → falar com suporte Hotmart antes de seguir setup longo

### Recado de honesty
Check-ins depois (M1, M3, M5) usam este mesmo canal.

### Fechamento
Agora vamos criar as contas — com calma.

---

## Aula 0.09 — Contas: Google, GitHub e Firebase Spark
**Tipo:** mão na massa  
**Duração:** 8–12 min  
**Objetivo:** ao final, o aluno tem Google, GitHub e um projeto Firebase no plano Spark sem cartão.  
**Pré-requisito:** 0.08

### Fala de abertura
Três contas. Google você provavelmente já tem. GitHub guarda o projeto. Firebase hospeda login, dados e site — no plano Spark, sem cartão, no caminho deste curso. Não configure Auth ainda a fundo; só crie o projeto.

### Passo a passo na tela
1. Confirmar login Google.  
2. Criar conta em github.com se não tiver. `[PRINT: GitHub signed in]`  
3. Abrir https://console.firebase.google.com → Add project / criar projeto. `[PRINT: Firebase project overview]`  
4. Confirmar que está no plano **Spark** (sem pedir cartão). `[PRINT: plano Spark]`  
5. `[VERIFICAR: caminho exato “Upgrade” vs Spark no console atual]`

### Prompt modelo
> Estou no Windows, sou iniciante. Quero só CRIAR um projeto no Firebase no plano Spark sem cartão, e ter conta no GitHub. Não configure Auth nem Hosting ainda. Me diga o que clicar, passo a passo, e como eu sei que deu certo.

### ✅ Deu certo se…
Existe um projeto Firebase no console e o GitHub abre logado.

### 🔀 Se a IA responder diferente…
- Pedir cartão / Blaze → *“Pare. Quero apenas Spark sem cartão.”*  
- Quiser configurar Auth agora → *“Deixa Auth para o Módulo 2.”*

### ❌ Erros comuns → o que fazer
- Criar dois projetos sem querer → anotar o **Project ID** num bloco de notas  
- Console em inglês → seguir ícones; não precisa traduzir tudo

### Pincelada técnica
Firebase = serviço da Google com login, banco e hospedagem sem você montar servidor.

### Recado de honesty
“Sem cartão” vale para o Firebase Spark neste caminho. O Cursor é outra conta e pode ter cota — aula 0.14.

### Fechamento
Próxima: baixar o template — sem Git ainda.

---

## Aula 0.10 — Baixar o template Forge (ZIP)
**Tipo:** mão na massa  
**Duração:** 6–9 min  
**Objetivo:** ao final, o aluno tem a pasta do Forge descompactada fora de Downloads/OneDrive.  
**Pré-requisito:** 0.09 (GitHub ajuda; ZIP público não exige Git instalado)

### Fala de abertura
Ainda não vamos instalar Git — isso fica para o Módulo 3. Hoje baixamos o template pelo site do GitHub: botão Code → Download ZIP. E escolhemos um lugar seguro na pasta do seu usuário, tipo `C:\Users\seu-nome\forge`. Evite Desktop sincronizado com OneDrive, Downloads eternos e Program Files.

### Passo a passo na tela
1. Abrir o repositório do curso no GitHub (URL do template Forge). `[PRINT: página do repo]`  
2. Clicar **Code** → **Download ZIP**. `[PRINT: menu Code]`  
3. Descompactar.  
4. Mover/renomear para `C:\Users\<seu-nome>\forge`. `[PRINT: Explorer com a pasta forge e arquivos index.html etc.]`

### Prompt modelo
> Sou iniciante no Windows. Quero baixar o template Forge Agenda do GitHub como ZIP (sem usar git clone), descompactar em C:\Users\<meu-usuario>\forge, e confirmar quais arquivos principais eu deveria ver (index.html, pasta js). Não use Python nem terminal.

### ✅ Deu certo se…
Dentro de `forge` existem `index.html`, pasta `js`, `README.md`.

### 🔀 Se a IA responder diferente…
- Insistir em `git clone` → *“Sem Git. Só Download ZIP.”*  
- Mandar salvar em Downloads → *“Mover para C:\Users\...\forge.”*

### ❌ Erros comuns → o que fazer
- Pasta `forge-main` aninhada → entrar até achar `index.html` na raiz do projeto  
- OneDrive bloqueando → mover para pasta local do usuário

### Recado de honesty
O `js/config.js` do ZIP ainda pode apontar para o Firebase do autor. No Módulo 2 você conecta ao **seu** projeto. No M0 só queremos abrir as telas.

### Fechamento
Próxima: abrir essa pasta no Cursor.

---

## Aula 0.11 — Abrir o projeto no Cursor
**Tipo:** mão na massa  
**Duração:** 4–6 min  
**Objetivo:** ao final, o aluno vê os arquivos do Forge no explorador do Cursor.  
**Pré-requisito:** 0.10 · Cursor instalado

### Fala de abertura
Cursor é o editor onde a IA trabalha com você. Abrir pasta certa é metade do setup. Se você abrir a pasta errada, a IA edita o lugar errado.

### Passo a passo na tela
1. Abrir o Cursor.  
2. **File → Open Folder** (ou equivalente) → selecionar `C:\Users\...\forge`. `[VERIFICAR: rótulo exato do menu na versão atual]` `[PRINT: explorer lateral com index.html, js]`  
3. Confirmar que não abriu só a pasta pai vazia.

### Prompt modelo
> Acabei de baixar o template Forge para C:\Users\<meu-usuario>\forge. Me guie para abrir ESTA pasta no Cursor (Open Folder) e confirmar que vejo index.html e a pasta js. Não rode terminal.

### ✅ Deu certo se…
A barra lateral lista `index.html`, `painel.html`, `agendar.html`, `js`.

### 🔀 Se a IA responder diferente…
- Quiser criar projeto novo → *“Não criar. Só abrir a pasta existente.”*

### ❌ Erros comuns → o que fazer
- Abriu `forge\forge` errado → Open Folder de novo na pasta que contém `index.html`  
- Cursor pede login → concluir login antes de seguir

### Recado de honesty
Antivírus às vezes bloqueia o Cursor na primeira execução — exceção temporária resolve na maioria dos casos.

### Fechamento
Próxima: ver o site no navegador com Live Server.

---

## Aula 0.12 — Live Server: ver o site no navegador
**Tipo:** mão na massa  
**Duração:** 6–9 min  
**Objetivo:** ao final, o aluno abre o site local e clica em Início.  
**Pré-requisito:** 0.11

### Fala de abertura
Para ver o site, não vamos usar Python — no Windows isso vira dor de cabeça. Vamos usar a extensão Live Server no Cursor. Ela sobe um endereço local e você confere no Chrome ou Edge.

### Passo a passo na tela
1. Extensões do Cursor → buscar **Live Server** → Install. `[PRINT: extensão instalada]`  
2. Clicar com o botão direito em `index.html` → **Open with Live Server** (ou Go Live na barra). `[VERIFICAR: comando exato da extensão]` `[PRINT: navegador com localhost e página inicial]`  
3. Clicar nos links Início / Login / Agendar só para ver se navega.

### Prompt modelo
> Estou no Windows com o template Forge aberto no Cursor. Me guie para instalar a extensão Live Server e abrir index.html no navegador. Não use Python. Pronto quando eu ver a página inicial do Forge num endereço localhost.

### ✅ Deu certo se…
O navegador mostra a página inicial do Forge (não uma página em branco `file://` quebrada).

### 🔀 Se a IA responder diferente…
- Sugerir `python -m http.server` → *“Proibido Python. Use Live Server.”*  
- Sugerir `npx serve` → aceitável como plano B, mas prefira Live Server nesta aula

### ❌ Erros comuns → o que fazer
- Extensão não aparece → recarregar Cursor / instalar de novo  
- Porta ocupada → pedir à IA: *“Live Server falhou por porta. Me diga o que clicar para mudar a porta.”*  
- Login Google falha local → esperado se ainda não conectou seu Firebase; só navegação importa agora

### Pincelada técnica
Live Server entrega as páginas HTML/JS ao navegador como um site de verdade faria.

### Recado de honesty
Com o `config.js` do autor, partes que falam com a nuvem podem funcionar ou falhar. M0 valida navegação; M2 valida “seu” Firebase.

### Fechamento
Próxima: o que fazer quando o setup te cutuca.

---

## Aula 0.13 — Quando o setup quebra
**Tipo:** quando dá errado  
**Duração:** 6–10 min  
**Objetivo:** ao final, o aluno tem um caminho de saída para três falhas comuns de ambiente.  
**Pré-requisito:** 0.09–0.12 (pode assistir sob demanda)

### Fala de abertura
Setup quebra. Não é sinal de que você “não presta para isso”. Vamos a três sintomas e a saída de cada um. Se não estiver na lista, print na comunidade.

### Passo a passo na tela
1. **Sintoma:** Cursor não abre / tela branca → reinstalar Cursor; desativar bloqueio do antivírus na pasta; rodar sem “admin” forçado.  
2. **Sintoma:** Live Server não inicia → reinstalar extensão; fechar processos na porta; reiniciar Cursor.  
3. **Sintoma:** Firebase pediu cartão → você clicou upgrade Blaze sem querer; volte ao Spark / crie projeto novo sem upgrade. `[VERIFICAR: UI atual de planos]`

### Prompt modelo
> Meu setup Forge no Windows falhou assim: [colar sintoma/print]. Sou iniciante. Me dê a saída mais simples sem Python e sem Blaze. Pronto quando eu conseguir abrir o site no Live Server de novo.

### ✅ Deu certo se…
O aluno recupera Live Server **ou** posta print + o que já tentou na comunidade.

### ❌ Erros comuns → o que fazer
- Ficar 2 horas no mesmo erro sem postar → regra: 15 minutos tentando + post

### Recado de honesty
Guia sob demanda: volte nesta aula sempre que o ambiente quebrar.

### Fechamento
Próxima: a verdade sobre o custo do Cursor.

---

## Aula 0.14 — Cota do Cursor: o que fazer quando trava
**Tipo:** conceito  
**Duração:** 4–6 min  
**Objetivo:** ao final, o aluno reconhece limite de cota e aplica um plano B.  
**Pré-requisito:** 0.07

### Fala de abertura
Este curso depende do agente do Cursor. No plano free a cota acaba. Quando a IA fica lenta, recusa ou “some”, muitas vezes não é você — é limite. Plano B: pedido menor, chat novo com contexto curto, esperar reset, ou upgrade. Na landing do curso isso precisa estar escrito com honestidade.

### Passo a passo na tela
1. Mostrar onde ver conta/plano no Cursor. `[VERIFICAR: caminho Settings/Account atual]` `[PRINT: tela de plano]`  
2. Slide do plano B. `[PRINT: 4 passos do plano B]`

### Prompt modelo
Nenhum obrigatório.

### ✅ Deu certo se…
O aluno não interpreta cota como “eu sou incapaz”.

### ❌ Erros comuns → o que fazer
- Abrir 10 chats gigantes → um objetivo por chat

### Recado de honesty
Firebase Spark sem cartão ≠ Cursor ilimitado. São produtos diferentes.

### Fechamento
Última peça do M0: escrever pedido que funciona.

---

## Aula 0.15 — Prompt com quatro peças
**Tipo:** mão na massa  
**Duração:** 7–10 min  
**Objetivo:** ao final, o aluno escreve e salva um prompt no formato Contexto·Objetivo·Restrições·Pronto quando.  
**Pré-requisito:** 0.12 (Live Server) · 0.07 (diff)

### Fala de abertura
Prompt bom tem quatro peças: contexto, objetivo, restrições e “pronto quando”. Vamos escrever um pedido pequeno de verdade e conferir no navegador. Se a IA exagerar, você rejeita.

### Passo a passo na tela
1. Abrir o Agent no Cursor com a pasta Forge.  
2. Colar o prompt modelo abaixo.  
3. Revisar o diff → Accept só se for o texto pedido. `[PRINT: diff]`  
4. Recarregar Live Server e ver o texto. `[PRINT: página com título novo]`  
5. Salvar o prompt num Bloco de Notas/Notion “Meus prompts”.

### Prompt modelo
> Contexto: template Forge Agenda aberto no Cursor (Windows), site no Live Server.  
> Objetivo: mudar só o título/texto principal da página inicial para incluir a palavra “Forge Builder”.  
> Restrições: um arquivo de página só; não mexer em login, Firebase nem pasta js de regras.  
> Pronto quando: eu der refresh no Live Server e vir “Forge Builder” na página inicial.

### ✅ Deu certo se…
O texto aparece no navegador e o prompt está salvo fora do chat.

### 🔀 Se a IA responder diferente…
- Alterou CSS/login → Reject + *“Só o texto. Desfaz o resto.”*  
- Disse que terminou mas nada mudou → *“Qual arquivo você mudou? O Live Server não mostra mudança.”*

### ❌ Erros comuns → o que fazer
- Prompt vago “deixa profissional” → reescrever com as quatro peças  
- Aceitar 20 arquivos → Reject all e repetir

### Recado de honesty
Seus prompts salvos são o verdadeiro material permanente do curso.

### Fechamento
Checkpoint: vamos fechar o Módulo 0.

---

## Aula 0.16 — Checkpoint do Módulo 0
**Tipo:** checkpoint  
**Duração:** 5–8 min  
**Objetivo:** ao final, o aluno marca o checklist e posta “setup ok” na comunidade.  
**Pré-requisito:** 0.09–0.15

### Fala de abertura
Fim do Módulo 0. Sem checklist verde, não adianta correr para Firebase. Olha comigo item a item. Depois posta na comunidade: setup ok.

### Passo a passo na tela
Checklist na tela:

- [ ] Sei a tese: pedir → IA faz → conferir  
- [ ] Sei onde está o glossário  
- [ ] Contas Google, GitHub, Firebase Spark  
- [ ] Pasta `...\forge` com `index.html`  
- [ ] Cursor abre essa pasta  
- [ ] Live Server mostra a página inicial  
- [ ] Sei aceitar/rejeitar diff  
- [ ] Tenho um prompt salvo no formato de quatro peças  
- [ ] Post na comunidade: “setup ok”

`[PRINT: checklist completo]`

### Prompt modelo
Nenhum.

### ✅ Deu certo se…
Todos os itens marcados + post publicado.

### ❌ Erros comuns → o que fazer
- Falta Live Server → voltar 0.12 / 0.13  
- Sem post → M1 espera o check-in de setup

### Recado de honesty
Você ainda não publicou na internet. Isso é Módulo 3. Agora você tem chão.

### Fechamento
Próximo módulo: primeiro fluxo no template — ainda local, já com método.

---

## Material de apoio do Módulo 0

### Lista de prompts (para PDF do aluno)
1. Criar só Firebase Spark + GitHub (aula 0.09)  
2. Baixar ZIP do Forge sem git (0.10)  
3. Abrir pasta no Cursor (0.11)  
4. Live Server sem Python (0.12)  
5. Setup falhou — saída simples (0.13)  
6. Diff mínimo + Accept/Reject (0.07)  
7. Prompt quatro peças — título da home (0.15)

### Termos para o glossário (reforço)
Já cobertos em MODULOS; reforçar na aula: **Prompt**, **Agente (Cursor)**, **Diff**, **Live Server**, **Firebase**, **Spark**, **Template Forge**, **Hosting** (só menção).  
Novo se falar na 0.07: **Accept/Reject** — botões para aceitar ou recusar mudanças da IA.

### Prints a capturar
- Demo web.app fluxo completo  
- Slide pedir→fazer→conferir  
- Glossário  
- Diff Accept/Reject  
- Firebase Spark  
- GitHub Code → Download ZIP  
- Explorer `C:\Users\...\forge`  
- Live Server localhost  
- Checklist 0.16  

---

## Pendências

- `[VERIFICAR: URL demo estável / conta demo de gravação]`  
- `[VERIFICAR: nomes exatos Agent, Open Folder, Open with Live Server, Account/Billing no Cursor da versão usada na gravação]`  
- `[VERIFICAR: UI atual Firebase para confirmar Spark sem cartão]`  
- **Contradição currículo ↔ código:** o ZIP/template traz `js/config.js` e projeto `forge-agenda-evn` do autor. O currículo fala em “seu Firebase” no M2 — correto. No M0, login Google pode falhar ou cair no projeto do autor; o roteiro trata isso como esperado (só navegação).  
- **Contradição leve:** aula 0.07 funciona melhor depois de 0.11; no mapa ela aparece antes por pedagogia do “freio”. Na gravação, pode inverter a ordem de filmagem (filmar 0.07 após 0.12) mantendo a numeração didática, ou gravar 0.07 com pasta já aberta e editar a ordem. Recomendação de edição: **gravar 0.07 logo após 0.12**.