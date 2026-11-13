function getQueryProId() {
  return new URLSearchParams(window.location.search).get("pro");
}

async function fillProfissionais() {
  const select = document.getElementById("profissional");
  const pros = await ForgeUI.runRequest(
    "listarProfissionais",
    () => dbListProfessionals(),
    { loadingText: "Carregando profissionais...", errorMessage: "Não foi possível carregar profissionais." }
  );
  if (!pros) return;
  if (!pros.length) {
    select.innerHTML = "<option value=''>Nenhum profissional cadastrado</option>";
    ForgeUI.toast("Ainda não há profissionais cadastrados.", "warning");
    return;
  }
  select.innerHTML = pros
    .map((p) => `<option value="${p.id}">${ForgeUI.escapeHtml(p.name)}</option>`)
    .join("");
  const fromQuery = getQueryProId();
  if (fromQuery && pros.some((p) => p.id === fromQuery)) {
    select.value = fromQuery;
  }
}

async function fillServicos() {
  const userId = document.getElementById("profissional").value;
  const select = document.getElementById("servico");
  select.innerHTML = "";
  if (!userId) {
    select.innerHTML = "<option value=''>—</option>";
    return;
  }
  const services = await ForgeUI.runRequest(
    "listarServicosAgendar",
    () => dbListServices(userId),
    { loadingText: "Carregando serviços...", errorMessage: "Não foi possível carregar os serviços." }
  );
  if (!services) return;
  if (!services.length) {
    select.innerHTML = "<option value=''>Nenhum serviço</option>";
    ForgeUI.toast("Este profissional ainda não cadastrou serviços.", "warning");
    return;
  }
  select.innerHTML = services
    .map((s) => {
      const preco = s.price === null ? "" : ` — R$ ${s.price.toFixed(2)}`;
      return `<option value="${s.id}">${ForgeUI.escapeHtml(s.name)} (${s.durationMinutes} min)${preco}</option>`;
    })
    .join("");
}

async function fillSlots() {
  const userId = document.getElementById("profissional").value;
  const serviceId = document.getElementById("servico").value;
  const dateStr = document.getElementById("data").value;
  const select = document.getElementById("horario");
  select.innerHTML = "";
  ForgeUI.setText("erro", "");
  if (!userId || !serviceId || !dateStr) {
    select.innerHTML = "<option value=''>Selecione profissional, serviço e data</option>";
    return;
  }
  const slots = await ForgeUI.runRequest(
    "listarHorarios",
    () => globalThis.getAvailableSlots({ userId, serviceId, dateStr }),
    { loadingText: "Buscando horários...", errorMessage: "Não foi possível buscar horários." }
  );
  if (!slots) return;
  if (!slots.length) {
    select.innerHTML = "<option value=''>Nenhum horário livre neste dia</option>";
    ForgeUI.toast("Não há horário livre nesta data. Escolha outro dia.", "warning");
    return;
  }
  select.innerHTML = slots
    .map((s) => `<option value="${s.startIso}|${s.endIso}">${s.label}</option>`)
    .join("");
}

async function bootAgendar() {
  if (!ensureConfigOrWarn()) return;
  document.getElementById("profissional").addEventListener("change", async () => {
    await fillServicos();
    await fillSlots();
  });
  document.getElementById("servico").addEventListener("change", () => fillSlots());
  document.getElementById("data").addEventListener("change", () => fillSlots());

  document.getElementById("form").addEventListener("submit", async (event) => {
    event.preventDefault();
    ForgeUI.setText("erro", "");
    ForgeUI.setText("ok", "");
    const parsed = ForgeLogic.validateBookingInput({
      userId: document.getElementById("profissional").value,
      serviceId: document.getElementById("servico").value,
      dateStr: document.getElementById("data").value,
      slot: document.getElementById("horario").value,
      clientName: document.getElementById("cliente").value
    });
    if (!parsed.ok) {
      const msg = parsed.errors[0];
      ForgeUI.setText("erro", msg);
      ForgeUI.toast(msg, "warning");
      return;
    }
    const [startIso, endIso] = parsed.value.slot.split("|");
    const created = await ForgeUI.runRequest(
      "criarAgendamento",
      () =>
        dbCreateAppointment({
          userId: parsed.value.userId,
          serviceId: parsed.value.serviceId,
          clientName: parsed.value.clientName,
          startIso,
          endIso
        }),
      {
        loadingText: "Confirmando agendamento...",
        successMessage: "Agendamento realizado com sucesso.",
        errorMessage: "Não foi possível concluir o agendamento."
      }
    );
    if (!created) return;
    ForgeUI.setText(
      "ok",
      `Agendado: ${parsed.value.clientName} em ${globalThis.formatDateTime(startIso)}`
    );
    document.getElementById("cliente").value = "";
    await fillSlots();
  });

  await fillProfissionais();
  await fillServicos();
  await fillSlots();
}

bootAgendar();