# Segurança e LGPD — Forge Agenda

## Modelo

- Profissional autentica com Google.
- Cliente agenda sem login.
- Nome do cliente é dado pessoal: só o profissional dono lê `appointments`.
- Grade pública `dayBusy`: intervalos ocupados **sem** nome do cliente.
- Cancelar libera o horário, mas **mantém** o registro (e o nome).
- **Excluir dados** apaga o documento do agendamento de verdade (pedido de exclusão / art. 18 LGPD, operação do dono).

## Controles atuais

- Rules: leitura de `appointments` só do dono; create público com validação de campos; **delete só do dono**.
- Escape/sanitize na UI (anti XSS).
- Perfis públicos sem e-mail.
- Transação no cliente em create/cancel/remarcar/excluir (reduz corrida no fluxo normal).
- Aviso de privacidade na tela de agendar.

## Riscos residuais (Spark, sem Cloud Functions)

Seja honesto com o aluno/cliente:

1. **Escrita direta em `dayBusy`:** alguém técnico pode manipular a grade pública.
2. **Spam de agendamentos:** qualquer pessoa com a config do app pode criar agendamentos (nomes falsos) sem login — não há rate limit no cliente.
3. **Sobreposição via API:** create público não prova conflito contra todos os documentos no servidor; a proteção forte de conflito no servidor pediria backend (ex.: Cloud Functions no Blaze).

Mitigações possíveis depois:

- App Check (reCAPTCHA) — **disponível no Spark** com cota gratuita mensal
- Cloud Functions + Admin SDK (Blaze)
- Não divulgar o link de agenda sem necessidade; monitorar a agenda

## Sobre a apiKey no `js/config.js`

No Firebase Web a `apiKey` é **pública por design**. Não é senha. A proteção de dados são as **rules**, Auth e (opcional) App Check. Não “esconda” a key achando que virou segredo — foque nas rules.

## Operação LGPD (checklist do profissional)

- Coletar só o nome necessário.
- Manter o aviso na tela pública.
- Atender pedido de exclusão com **Excluir dados** no painel (não basta cancelar).
- Não expor o link da agenda em local desnecessário.