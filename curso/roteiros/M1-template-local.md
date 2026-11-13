# Módulo 1 — Primeiro fluxo no template (roteiro de gravação)

## Mapa do módulo

| Nº | Título | Tipo | Duração | Objetivo | Pré-requisito |
|----|--------|------|---------|----------|---------------|
| 1.01 | Reabrir o Forge no Live Server | mão na massa | 4–6 min | Ver de novo a página inicial no navegador | Checkpoint 0.16 |
| 1.02 | Por que seguimos o template | conceito | 5–7 min | Explicar por que não pedir app do zero agora | 1.01 |
| 1.03 | As três telas do Forge | demo | 5–7 min | Nomear início, painel e agendar | 1.02 |
| 1.04 | Desenhar o fluxo no papel | mão na massa | 6–8 min | Entregar um desenho profissional vs cliente | 1.03 |
| 1.05 | Percorrer as três telas no navegador | mão na massa | 6–9 min | Abrir Início, Login e Agendar no Live Server | 1.04 |
| 1.06 | O aviso de Firebase ainda não configurado | demo | 4–6 min | Reconhecer o aviso esperado antes do M2 | 1.05 |
| 1.07 | Pedir o texto do seu nicho na home | mão na massa | 7–10 min | Ver o nome do nicho na página inicial | 1.06, 0.07, 0.15 |
| 1.08 | Quando a IA muda demais | quando dá errado | 5–8 min | Rejeitar diff grande e refazer o pedido | 1.07 |
| 1.09 | Uma melhoria pequena de texto de ajuda | mão na massa | 6–9 min | Ver uma mensagem de ajuda nova na tela | 1.07 |
| 1.10 | README honesto (ainda local) | mão na massa | 6–9 min | README descrevendo estado local real | 1.09 |
| 1.11 | Checkpoint + Check-in #1 | checkpoint | 6–9 min | Checklist verde + post na comunidade | 1.04–1.10 |

**Soma estimada:** ~60–88 min de vídeo.

### Justificativa da divisão (reescrita do zero)

O rascunho antigo tinha 6 aulas no formato curto. Reescrevi no padrão do M0, com vitória cedo (1.01 já reabre o site), no máximo dois conceitos seguidos (1.02–1.03 e depois prática), e separei “entender fluxo” (papel) de “percorrer telas” (navegador). A melhoria de nicho e o README viraram aulas próprias; o exagero da IA ganhou aula `quando dá errado`. O aviso de Firebase não configurado ficou explícito para não assustar o aluno antes do M2.

### O que o aluno já traz do Módulo 0

- Tese pedir → IA faz → conferir  
- Glossário e comunidade  
- Contas Google, GitHub, Firebase Spark (projeto criado, **ainda não ligado ao app**)  
- Pasta `C:\Users\<nome>\forge` com o template  
- Cursor com a pasta aberta + Live Server  
- Accept/Reject/desfazer + um prompt de quatro peças já praticado  

---

## Aula 1.01 — Reabrir o Forge no Live Server
**Tipo:** mão na massa  
**Duração:** 4–6 min  
**Objetivo:** ao final, o aluno vê a página inicial do Forge de novo no navegador.  
**Pré-requisito:** Checkpoint 0.16 (pasta forge + Live Server + Cursor)

### Fala de abertura
Bem-vindo ao Módulo 1. Antes de falar de nicho e fluxo, vamos garantir que o chão do Módulo 0 ainda está firme. Abra o Cursor, abra o Live Server, olhe a página inicial. Se isso abrir, você está pronto. Se não abrir, a gente para e conserta — não adianta pedir feature com o site morto.

### Passo a passo na tela
1. Abrir o Cursor na pasta `C:\Users\<seu-nome>\forge`. `[PRINT: explorer com index.html]`
2. No explorador de arquivos, botão direito em `index.html` → **Open with Live Server** (ou **Go Live** na barra de status). `[PRINT: navegador em 127.0.0.1:5500]`
3. Confirmar que a página inicial aparece.

### Prompt modelo
**Onde colar:** Cursor Agent (só se o Live Server falhar)
> Contexto: Windows, pasta forge do template Forge Agenda no Cursor. Objetivo: fazer o Live Server abrir index.html de novo. Restrições: sem Python; sem instalar outra ferramenta se o Live Server já estiver instalado. Pronto quando: eu ver a página inicial em localhost no navegador.

### ✅ Deu certo se…
O navegador mostra a página inicial do Forge (não página em branco e não `file://` quebrado).

### 🔀 Se a IA responder diferente…
- Pedir Python → responder: *“Sem Python. Só Live Server.”*  
- Quiser recriar o projeto → *“Não crie projeto novo. Só abrir o que já tenho em forge.”*

### ❌ Erros comuns → o que fazer
- Live Server sumiu → voltar à aula 0.12 / 0.13; reinstalar a extensão **Live Server** (ritwickdey) e reiniciar o Cursor  
- Abriu a pasta errada → File → Open Folder na pasta que contém `index.html`

### Recado de honestidade
Se o login Google falhar ou aparecer aviso de configuração, por enquanto está ok — no Módulo 1 o foco é navegar e pedir textos, não a nuvem.

### Fechamento
Próxima aula: por que a gente não joga o template fora.

---

## Aula 1.02 — Por que seguimos o template
**Tipo:** conceito  
**Duração:** 5–7 min  
**Objetivo:** ao final, o aluno explica por que o fio condutor é o template Forge até o M5.  
**Pré-requisito:** 1.01

### Fala de abertura
Dá vontade de falar para a IA: “faz um app do zero do meu jeito”. No começo isso parece liberdade. Na prática, a IA inventa uma estrutura diferente — e depois as aulas de privacidade e segurança falam de pastas e botões que o seu app não tem. Por isso, até o Módulo 5, o projeto-base é o **template Forge**. No Módulo 6 você adapta ao seu nicho. Template não é falta de criatividade. É método para você não se perder.

### Passo a passo na tela
1. Slide: **M1–M5 = template Forge** · **M6 = adapte ao meu nicho**. `[PRINT: slide]`
2. Mostrar a URL do repositório **template** do aluno (sem a pasta `curso/`). `[VERIFICAR: URL_TEMPLATE publicada]` `[PRINT: página do GitHub do template]`

### Prompt modelo
**Onde colar:** nenhum

### ✅ Deu certo se…
O aluno diz: “Até o M5 eu sigo o Forge; o nicho vem no M6.”

### ❌ Erros comuns → o que fazer
- Pedir React/Next “porque a IA sugeriu” → *“Não. Continuamos no template HTML do Forge.”*

### Recado de honestidade
Se você já misturou outro stack no meio, volte ao ZIP limpo do template e recomece este módulo.

### Fechamento
Próxima: conhecer as três telas pelo nome.

---

## Aula 1.03 — As três telas do Forge
**Tipo:** demo  
**Duração:** 5–7 min  
**Objetivo:** ao final, o aluno nomeia início, painel e agendar e o arquivo de cada uma.  
**Pré-requisito:** 1.02

### Fala de abertura
O Forge tem três portas principais. **Início** — `index.html` — é a porta de entrada. **Login/Painel** — `login.html` e `painel.html` — é a área do profissional. **Agendar** — `agendar.html` — é a área do cliente, sem login. Quando você pedir mudança à IA, diga o nome da tela. Assim ela não mexe no lugar errado.

### Passo a passo na tela
1. No Cursor, apontar `index.html`, `login.html`, `painel.html`, `agendar.html`. `[PRINT: lista de arquivos]`
2. Abrir cada um só para mostrar o nome na aba (sem exigir fluxo completo ainda). `[PRINT: abas]`

### Prompt modelo
**Onde colar:** nenhum

### ✅ Deu certo se…
O aluno associa: início → index · profissional → painel · cliente → agendar.

### ❌ Erros comuns → o que fazer
- Achar que cliente também usa `painel.html` → corrigir: cliente usa `agendar.html`

### Pincelada técnica
Arquivos `.html` são as páginas; a pasta `js` é o comportamento — você não precisa ler o js agora.

### Recado de honestidade
Há também `cadastro.html` no repo; no fluxo do curso o caminho feliz é login Google → painel. Se aparecer cadastro, ignore por enquanto.

### Fechamento
Próxima: desenhar o fluxo no papel — sem código.

---

## Aula 1.04 — Desenhar o fluxo no papel
**Tipo:** mão na massa  
**Duração:** 6–8 min  
**Objetivo:** ao final, o aluno tem um desenho (foto ok) do fluxo profissional vs cliente.  
**Pré-requisito:** 1.03

### Fala de abertura
Antes de pedir mudança, desenhe o caminho. Papel e caneta bastam. Dois personagens: profissional e cliente. O profissional entra, vê o painel, copia um link. O cliente abre o link e agenda. Se você não consegue desenhar isso, a IA também não vai entender o seu pedido.

### Passo a passo na tela
1. Instrutor desenha no quadro: Profissional → Login → Painel → Link. Cliente → Agendar → Confirmar. `[PRINT: desenho do quadro]`
2. Pausar: aluno desenha o dele (2–3 minutos).  
3. Tirar foto do desenho (vai no Check-in #1).

### Prompt modelo
**Onde colar:** nenhum (é papel)

### ✅ Deu certo se…
Existe um desenho com os dois papéis e as setas principais.

### ❌ Erros comuns → o que fazer
- Colocar Google no cliente → refazer: cliente **sem** login neste app  
- Um único bloco “usuário” → separar profissional e cliente

### Recado de honesty
O desenho feio vale. O desenho mentiroso (que inventa telas que não existem) atrapalha.

### Fechamento
Próxima: caminhar esse fluxo no navegador de verdade.

---

## Aula 1.05 — Percorrer as três telas no navegador
**Tipo:** mão na massa  
**Duração:** 6–9 min  
**Objetivo:** ao final, o aluno abre Início, Login e Agendar pelo Live Server.  
**Pré-requisito:** 1.04 · Live Server da 1.01

### Fala de abertura
Agora o desenho vira clique. Você vai abrir as três telas no navegador. Não precisa conseguir logar na nuvem ainda. Precisa achar as portas. Se um link não abrir, anotamos e pedimos à IA o mínimo — sem refatorar o app.

### Passo a passo na tela
1. Com Live Server ligado, abrir a home. `[PRINT: index]`
2. Clicar no caminho de login (link/botão da home). `[PRINT: login.html]`
3. Voltar e abrir Agendar (pela home ou digitando `agendar.html` na URL local). `[PRINT: agendar.html]`
4. Conferir se as três URLs locais mudam (ex.: `.../index.html`, `.../login.html`, `.../agendar.html`).

### Prompt modelo
**Onde colar:** Cursor Agent (só se algum link estiver quebrado)
> Contexto: template Forge no Live Server. Objetivo: eu preciso conseguir abrir index, login e agendar pelos links da interface. Restrições: não mexer em Firebase; não redesenhar o visual; só corrigir link quebrado se houver. Pronto quando: eu clicar e ver as três páginas abrirem no navegador.

### ✅ Deu certo se…
As três páginas abrem no Live Server (mesmo que login mostre erro de configuração).

### 🔀 Se a IA responder diferente…
- Reescrever o menu inteiro → *“Não redesenhe. Só conserte o link que não abre.”*  
- Mudar para React Router → *“Não. Mantém HTML do template.”*

### ❌ Erros comuns → o que fazer
- Abrir pelo Explorer (`file://`) → sempre pelo Live Server  
- Página 404 → checar se o Live Server foi iniciado na pasta certa (`forge` com os html na raiz)

### Recado de honesty
Login pode falhar ou avisar configuração. Na próxima aula a gente olha esse aviso de frente — ele é esperado.

### Fechamento
Próxima: o famoso “configure o Firebase” — e por que ainda não é hora de entrar em pânico.

---

## Aula 1.06 — O aviso de Firebase ainda não configurado
**Tipo:** demo  
**Duração:** 4–6 min  
**Objetivo:** ao final, o aluno reconhece o aviso/erro de Firebase não configurado como comportamento esperado antes do M2.  
**Pré-requisito:** 1.05

### Fala de abertura
Se você clicar em login e aparecer algo como “Configure o Firebase” ou a tela não completar o Google, respira. No caminho do curso, o template do aluno começa **sem** o projeto Firebase dele ligado. Isso é de propósito. Ligar ao **seu** Firebase é trabalho do Módulo 2. No Módulo 1 a gente não força nuvem. A gente só quer texto, navegação e honestidade no README.

### Passo a passo na tela
1. Clicar em Login e mostrar o aviso/erro (ou explicar com print se a tela variar). `[PRINT: mensagem Configure o Firebase / falha de auth]`
2. Abrir `js/config.js` no Cursor e mostrar que ainda não é o projeto do aluno (placeholders `COLE_AQUI` **ou** valores de exemplo — ver Pendências). `[PRINT: config.js]`
3. Frase para o aluno decorar: **“Aviso de config no M1 = normal. Troca no M2.”**

### Prompt modelo
**Onde colar:** nenhum (não peça para “consertar” o Firebase nesta aula)

### ✅ Deu certo se…
O aluno não tenta “resolver Firebase” ainda e segue para pedir só textos.

### ❌ Erros comuns → o que fazer
- Pedir à IA “conecta meu Firebase agora” no meio do M1 → *“Guardamos isso para o Módulo 2.”*  
- Copiar o `config.js` do instrutor com projeto `forge-agenda-evn` → **proibido**; isso não é o seu projeto

### Pincelada técnica
O app tem um teste rápido (`forgeConfigOk`) para saber se a config ainda é placeholder. A proteção de verdade dos dados virá das rules no seu Firebase — depois.

### Recado de honesty
Usar o Firebase do autor do curso mistura a sua agenda com a dele e quebra o aprendizado. Nunca copie o projeto `forge-agenda-evn` para “fazer funcionar”.

### Nota de produção
Demo do instrutor em `https://forge-agenda-evn.web.app` é só exibição. Template do aluno: `{URL_TEMPLATE}` com `COLE_AQUI` — se o repo de desenvolvimento ainda tiver chaves reais, corrigir antes de gravar (ver Pendências).

### Fechamento
Próxima: primeira melhoria de verdade no texto do seu nicho.

---

## Aula 1.07 — Pedir o texto do seu nicho na home
**Tipo:** mão na massa  
**Duração:** 7–10 min  
**Objetivo:** ao final, o aluno vê o nome do nicho (ou do negócio) na página inicial.  
**Pré-requisito:** 1.06 · Accept/Reject (0.07) · fórmula de prompt (0.15)

### Fala de abertura
Agora o músculo do curso: um pedido pequeno, um diff, um refresh. Você vai colocar o nome do seu nicho na home — por exemplo “Agenda da Ana — manicure” ou “Forge Builder — aulas”. Só texto. Sem Firebase. Sem redesenhar o app. Se a IA exagerar, a próxima aula é exatamente sobre isso.

### Passo a passo na tela
1. Abrir Cursor Agent com a pasta forge.  
2. Colar o prompt modelo.  
3. Revisar o diff → Accept só se for texto da home. `[PRINT: diff]`  
4. Refresh no Live Server. `[PRINT: home com nicho]`  
5. Salvar o prompt em “Meus prompts”.

### Prompt modelo
**Onde colar:** Cursor Agent
> Contexto: template Forge Agenda no Cursor (Windows), site no Live Server, Firebase ainda NÃO configurado (e está ok).  
> Objetivo: alterar só o texto visível da página inicial (`index.html`) para incluir meu nicho: “[SEU NICHO]”.  
> Restrições: não mexer em login, agendar, painel, js de Firebase nem `config.js`; um arquivo só se possível.  
> Pronto quando: eu der refresh no Live Server e vir “[SEU NICHO]” na página inicial.

### ✅ Deu certo se…
O nicho aparece na home após o refresh.

### 🔀 Se a IA responder diferente…
- Alterou 8 arquivos → Reject + *“Desfaz. Só o texto da home.”* (seguir 1.08 se precisar)  
- Mexeu em `config.js` → Reject imediato  
- Disse pronto mas nada mudou → *“Qual arquivo você mudou? No Live Server não apareceu.”*

### ❌ Erros comuns → o que fazer
- Aceitar diff enorme → Reject all e repetir o prompt  
- Esquecer refresh → Ctrl+R / refresh do Live Server

### Recado de honesty
Se o Módulo 0 já mudou o título, agora o título precisa carregar o **seu** nicho de verdade — não o texto genérico da aula 0.15.

### Fechamento
Próxima: o que fazer quando a IA resolve “melhorar o mundo”.

---

## Aula 1.08 — Quando a IA muda demais
**Tipo:** quando dá errado  
**Duração:** 5–8 min  
**Objetivo:** ao final, o aluno rejeita um diff grande e refaz o pedido com restrição mais dura.  
**Pré-requisito:** 1.07

### Fala de abertura
Vou te mostrar o filme que todo mundo vive: você pediu uma linha e a IA reescreveu o site. Isso não é você sendo ruim de prompt. É a IA sendo ansiosa. O chefe rejeita, aperta a restrição e pede de novo. Vamos ensaiar a fala.

### Passo a passo na tela
1. Simular ou relembrar um diff grande. `[PRINT: diff com muitos arquivos]`  
2. Clicar Reject / rejeitar mudanças.  
3. Colar o prompt de correção abaixo.  
4. Aceitar só o mínimo.

### Prompt modelo
**Onde colar:** Cursor Agent
> Pare. Desfaça a última mudança. Quero APENAS o texto da página inicial com o nicho “[SEU NICHO]”. Proibido alterar login, Firebase, CSS geral, outros html. Pronto quando: um diff pequeno e o Live Server mostrar só essa mudança.

### ✅ Deu certo se…
O aluno consegue voltar a um diff pequeno e a home certa.

### 🔀 Se a IA responder diferente…
- “Não consigo desfazer” → *“Restaure os arquivos da última versão boa”* ou baixar o ZIP de novo e refazer só 1.07  
- Continuar expandindo escopo → abrir chat **novo** só com o prompt curto

### ❌ Erros comuns → o que fazer
- Aceitar “já que ela fez” → desfazer; o curso prefere lento e controlado  
- Xingar a IA na comunidade com print do projeto inteiro → pode vazar dado; mande só o trecho do pedido

### Recado de honesty
Rejeitar é parte do trabalho. Quantidade de Reject no começo é normal.

### Fechamento
Próxima: mais uma melhoria pequena — mensagem de ajuda.

---

## Aula 1.09 — Uma melhoria pequena de texto de ajuda
**Tipo:** mão na massa  
**Duração:** 6–9 min  
**Objetivo:** ao final, o aluno vê uma frase de ajuda nova em uma das telas.  
**Pré-requisito:** 1.07 (e 1.08 se já exagerou)

### Fala de abertura
Segundo pedido do módulo: uma frase que ajude o usuário. Por exemplo, na home: “Profissional entra com Google. Cliente usa o link sem criar conta.” Ou no agendar, reforçar o aviso curto — sem inventar política jurídica nova. Texto curto. Diff curto. Conferência no navegador.

### Passo a passo na tela
1. Escolher **uma** tela: home **ou** agendar.  
2. Colar o prompt.  
3. Accept cuidadoso + refresh. `[PRINT: frase nova na tela]`

### Prompt modelo
**Onde colar:** Cursor Agent
> Contexto: Forge Agenda local no Live Server, Firebase ainda não configurado.  
> Objetivo: adicionar UMA frase curta de ajuda na página inicial explicando: profissional usa Google; cliente agenda pelo link sem login.  
> Restrições: não alterar `config.js`, login, regras, nem o fluxo; não remover textos de privacidade se existirem.  
> Pronto quando: eu der refresh e ler essa frase na home.

### ✅ Deu certo se…
A frase aparece e o resto do site continua igual.

### 🔀 Se a IA responder diferente…
- Criar modal complexo → *“Só uma frase visível. Sem modal novo.”*  
- Apagar aviso de privacidade do agendar → Reject + *“Não remova textos de privacidade.”*

### ❌ Erros comuns → o que fazer
- Mudar as duas páginas “já que estamos” → uma página por pedido

### Recado de honesty
Duas melhorias pequenas batem uma “reforma” grande. É assim que o curso escala.

### Fechamento
Próxima: README que não mente.

---

## Aula 1.10 — README honesto (ainda local)
**Tipo:** mão na massa  
**Duração:** 6–9 min  
**Objetivo:** ao final, o README descreve o estado real: local + Live Server + Firebase ainda não ligado ao projeto do aluno.  
**Pré-requisito:** 1.09

### Fala de abertura
README mentiroso é o começo de vergonha em público. O seu ainda é local. Então o README tem que dizer: roda no Live Server; Firebase do aluno ainda não configurado; sem URL pública ainda. Não copie a URL do instrutor. Não diga que já está no ar.

### Passo a passo na tela
1. Abrir `README.md` no Cursor. `[PRINT: README atual]`  
2. Colar o prompt.  
3. Ler o README em voz alta depois do Accept. `[PRINT: README novo]`

### Prompt modelo
**Onde colar:** Cursor Agent
> Contexto: sou aluno do Forge Builder; projeto local em C:\Users\...\forge; uso Live Server; meu Firebase Spark ainda NÃO está conectado neste app.  
> Objetivo: reescrever o README com honestidade: o que o app faz, como abrir no Live Server, que a config Firebase do aluno vem no próximo passo, sem inventar URL pública.  
> Restrições: não colar projeto ou URL do autor (forge-agenda-evn); não apagar a lista útil de arquivos se existir — atualize para bater com a pasta.  
> Pronto quando: eu abrir o README e ele descrever exatamente o estado local atual.

### ✅ Deu certo se…
O README fala em Live Server + local e **não** mostra a URL `forge-agenda-evn.web.app` como se fosse do aluno.

### 🔀 Se a IA responder diferente…
- Colocar a URL do autor → *“Remova a URL do autor. Eu ainda não publiquei.”*  
- Inventar Vercel/Netlify → *“Não. Este curso usa Firebase Hosting no Módulo 3.”*

### ❌ Erros comuns → o que fazer
- README em inglês misturado → pedir português claro  
- Estrutura de pastas inventada → *“Liste só arquivos que existem na pasta.”*

### Recado de honesty
README verdadeiro já vale ponto na rubrica final. Começa agora.

### Fechamento
Checkpoint: vamos fechar o Módulo 1.

---

## Aula 1.11 — Checkpoint + Check-in #1
**Tipo:** checkpoint  
**Duração:** 6–9 min  
**Objetivo:** ao final, o aluno marca o checklist e posta o Check-in #1 na comunidade.  
**Pré-requisito:** 1.04 a 1.10

### Fala de abertura
Fim do Módulo 1. Sem este check-in, o Módulo 2 (Firebase) fica perigoso: a pessoa sobe dado na nuvem sem nem ter entendido o fluxo. Olha a lista comigo. Depois posta na comunidade.

### Passo a passo na tela
Checklist:

- [ ] Live Server abre a home  
- [ ] Sei por que sigo o template até o M5  
- [ ] Nomeio as três telas (início, painel, agendar)  
- [ ] Tenho o desenho do fluxo (foto)  
- [ ] Percorri as três páginas no navegador  
- [ ] Entendi que aviso de Firebase no M1 é esperado  
- [ ] Home mostra meu nicho  
- [ ] README descreve estado local sem URL falsa  

**Check-in #1 (comunidade):**  
Postar: (1) print da home com nicho, (2) foto do desenho do fluxo, (3) três frases: o que o profissional faz / o que o cliente faz / o que ainda falta (Firebase).

`[PRINT: checklist + exemplo de post]`

### Prompt modelo
**Onde colar:** nenhum

### ✅ Deu certo se…
Checklist marcado + post publicado na comunidade.

### ❌ Erros comuns → o que fazer
- Post só com “ok” sem print → pedir os três itens do check-in  
- Pular desenho → voltar 1.04 (2 minutos)

### Recado de honesty
Você ainda não está na internet. Está com método. O Módulo 2 liga o **seu** Firebase — com calma e sem copiar o do autor.

### Fechamento
Próximo módulo: dados na nuvem. Leve o check-in #1 feito.

---

## Material de apoio do Módulo 1

### Prompts (PDF do aluno)
1. Religar Live Server (1.01)  
2. Corrigir link quebrado entre páginas (1.05)  
3. Texto do nicho na home (1.07)  
4. Desfazer exagero da IA (1.08)  
5. Frase de ajuda na home (1.09)  
6. README honesto local (1.10)

### Termos novos / reforço no glossário
- **Template** — projeto-base que você copia e só adapta depois  
- **Nicho** — para quem é o app (ex.: manicure, professor, consultório)  
- **README** — texto que explica o projeto; deve bater com a realidade  
- **Check-in** — post na comunidade provando uma etapa  

### Prints a capturar
- Home no Live Server  
- Slide template vs nicho no M6  
- Arquivos html no Cursor  
- Desenho do fluxo no quadro  
- Três URLs locais  
- Aviso/erro de Firebase não configurado  
- Diff pequeno do nicho  
- Diff grande rejeitado  
- README honesto  
- Checklist 1.11  

---

## Pendências

- `[VERIFICAR: URL_TEMPLATE]` — repositório do aluno **sem** pasta `curso/`, com ZIP via Code → Download ZIP. Hoje o curso e o app convivem em `Evnandes/forge`.  
- `[VERIFICAR: template com `COLE_AQUI` em `js/config.js` e `.firebaserc` limpo]` — o repo atual de desenvolvimento ainda aponta para `forge-agenda-evn` com apiKey real; o currículo/prompt pedem placeholder. **Contradição currículo ↔ código:** seguir a tese do curso no roteiro (aluno nunca usa o Firebase do autor); corrigir o artefato template antes de gravar o M1.06.  
- `[VERIFICAR: texto exato do aviso na UI quando config está incompleta]` — em alguns fluxos a falha aparece como erro no toast/log (“Configure o Firebase…”).  
- **M0 (dívida):** o prompt novo exige instalação do Cursor em aula própria e ordem sem depender de aula futura; o M0 atual ainda tem 0.07 antes de 0.11 na numeração. Recomendado: revisar o M0 numa passagem só de sequência antes da gravação em massa.
