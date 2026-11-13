# Módulo 3 — Publicar e versionar

---

## Aula 3.0 — Checklist antes do deploy
**Meta:** 12–20 min · pode ser guia curto

### Gancho
“Deploy falha quando falta ferramenta. A IA instala; você só cola o que ela pedir.”

### Prompt modelo
*“Instale o que faltar para eu publicar este projeto Firebase no Windows: Git, Node LTS, Firebase CLI. Depois faça login no Firebase CLI (`firebase login`). Não me faça decorar comandos — diga só o que colar e o que eu devo ver na tela se deu certo.”*

### Conferir
- `node -v` e `firebase --version` (ou equivalentes que a IA indicar) mostram versão  
- Login Firebase ok  

### Erro comum
Pular esta aula e tomar erro críptico no 3.1.

### Recado
Terminal aqui = **colar e ler**, não virar programador de shell.

### Fechamento
“Agora publicamos.”

---

## Aula 3.1 — Pedir o deploy
**Meta:** 10–15 min

### Gancho
“O momento wow: URL no celular.”

### Prompt modelo
*“Faça deploy de hosting e firestore:rules deste projeto no meu Firebase. Me devolva a URL final. Pronto quando eu abrir no celular e ver o app.”*

### Conferir
- Abrir `*.web.app` no celular  
- Login + um fluxo curto  

### Erros comuns
- 403 / ToS do Firebase não aceito no console  
- Auth não iniciado  
- Projeto errado  

### Recado
Hosting ≠ mágica: é a pasta do site publicada.

### Fechamento
“Se o celular mostrar versão velha, próxima aula.”

---

## Aula 3.2 — Site não atualizou? (cache)
**Meta:** 8–10 min

### Gancho
“Às vezes o backend já está certo e o navegador mente.”

### Desenvolvimento
1. Ctrl+F5 / limpar cache  
2. Se falhar, prompt abaixo  

### Prompt modelo
*“O site não atualiza depois do deploy. Resolva cache/versionamento dos scripts (por exemplo query string ?v=). Não mude regra de negócio.”*

### Conferir
Mudança visível após novo deploy + hard refresh.

### Erro comum
Ficar republicando 10 vezes sem hard refresh.

### Recado
História real do Forge: permission-denied + cache de JS antigo.

### Fechamento
“Próxima: GitHub.”

---

## Aula 3.3 — GitHub via IA
**Meta:** 10–15 min

### Gancho
“Backup e portfólio. Você não precisa ser git expert.”

### Prompt modelo
*“Suba este projeto ao meu GitHub (me peça login/token se precisar) e atualize o README com a URL real do Hosting. README verdadeiro: listar páginas e pastas js que existem.”*

### Conferir
- Repo existe no github.com  
- README com URL correta  

### Erro comum
README ainda fala em localStorage / Vercel se o app é Firebase Hosting.

### Recado
Commit = ponto na história. Peça commits pequenos quando possível.

### Fechamento
“Checkpoint público.”

---

## Aula 3.4 — Checkpoint + Check-in #2
**Meta:** 10–15 min

### Checklist
- [ ] URL pública no celular  
- [ ] Profissional loga; cliente agenda em aba anônima  
- [ ] GitHub + README ok  

### Check-in #2
Postar a URL na comunidade.

### Pares / moderador
Usar rubrica “como verificar” (só itens já possíveis neste estágio).

### Recado
Daqui pra frente melhoramos qualidade e privacidade **em cima do que já está no ar**.

### Fechamento
“Módulo 4: qualidade.”