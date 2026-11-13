# Segurança e LGPD — Forge Agenda

## Modelo

- Profissional autentica com Google.
- Cliente agenda sem login.
- Nome do cliente é dado pessoal: só o profissional dono da agenda pode ler `appointments`.
- A grade pública usa `dayBusy` (apenas intervalos ocupados, sem nome do cliente).

## Controles atuais

- Regras do Firestore com validação de campos e dono.
- Escape de HTML na UI (anti XSS).
- Sanitização de texto em nomes.
- Perfis públicos sem e-mail (e-mail fica só no Auth).
- Criação/remarcação/cancelamento em transação no documento do dia (`dayBusy`), reduzindo corrida de dupla reserva.

## Limite conhecido (próximo passo)

No plano Spark (gratuito), sem Cloud Functions, um atacante técnico ainda pode tentar escrever direto em `dayBusy`. Mitigações no plano Blaze:

1. Cloud Functions com Admin SDK para criar/remarcar/cancelar
2. App Check
3. Rate limit

## Operação LGPD

- Coletar só o nome necessário para o atendimento.
- Profissional é responsável pelos dados dos clientes da própria agenda.
- Evitar expor o link de agenda sem necessidade.