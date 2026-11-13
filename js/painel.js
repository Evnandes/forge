async function bootPainel() {
  if (!ensureConfigOrWarn()) return;
  const user = await requireAuth();
  if (!user) return;

  bindLogout("sair");
  document.getElementById("nomeUsuario").textContent = user.name;
  document.getElementById("linkCliente").href = `agendar.html?pro=${user.id}`;
  document.getElementById("linkCliente").textContent = `agendar.html?pro=${user.id}`;

  function showErro(id, message) {
    document.getElementById(id).textContent = message || "";
  }

  async function renderServicos() {
    const list = document.getElementById("listaServicos");
    const services = await dbListServices(user.id);
    if (!services.length) {
      list.innerHTML = '<li class="list-group-item text-secondary">Nenhum serviço cadastrado.</li>';
      return;
    }
    list.innerHTML = services
      .map((s) => {
        const preco = s.price === null ? "—" : `R$ ${s.price.toFixed(2)}`;
        return `<li class="list-group-item d-flex flex-wrap justify-content-between align-items-center gap-2">
          <span><strong>${s.name}</strong> — ${s.durationMinutes} min — ${preco}</span>
          <span class="btn-group btn-group-sm">
            <button type="button" class="btn btn-outline-primary" data-edit="${s.id}">Editar</button>
            <button type="button" class="btn btn-outline-danger" data-del="${s.id}">Excluir</button>
          </span>
        </li>`;
      })
      .join("");
  }

  async function renderDisponibilidade() {
    const list = document.getElementById("listaDisponibilidade");
    const items = (await dbListAvailability(user.id)).sort(
      (a, b) => a.weekday - b.weekday || a.start.localeCompare(b.start)
    );
    if (!items.length) {
      list.innerHTML = '<li class="list-group-item text-secondary">Nenhuma disponibilidade cadastrada.</li>';
      return;
    }
    list.innerHTML = items
      .map(
        (a) => `<li class="list-group-item d-flex flex-wrap justify-content-between align-items-center gap-2">
          <span>${WEEKDAY_LABELS[a.weekday]} — ${a.start} às ${a.end}</span>
          <button type="button" class="btn btn-outline-danger btn-sm" data-av-del="${a.id}">Remover</button>
        </li>`
      )
      .join("");
  }

  async function renderAgenda() {
    const filtro = document.getElementById("filtroData").value;
    const list = document.getElementById("listaAgenda");
    let appointments = await dbListAppointments(user.id);
    if (filtro) {
      appointments = appointments.filter((a) => datePart(a.start) === filtro);
    } else {
      const hoje = new Date();
      const y = hoje.getFullYear();
      const m = String(hoje.getMonth() + 1).padStart(2, "0");
      const d = String(hoje.getDate()).padStart(2, "0");
      const hojeStr = `${y}-${m}-${d}`;
      appointments = appointments.filter((a) => datePart(a.start) >= hojeStr);
    }
    if (!appointments.length) {
      list.innerHTML = '<li class="list-group-item text-secondary">Nenhum agendamento.</li>';
      return;
    }
    const html = [];
    for (const a of appointments) {
      const service = await dbGetService(a.serviceId);
      const nomeServico = service ? service.name : "(serviço removido)";
      html.push(`<li class="list-group-item d-flex flex-wrap justify-content-between align-items-center gap-2">
        <span><strong>${formatDateTime(a.start)}</strong> — ${nomeServico} — ${a.clientName}</span>
        <span class="btn-group btn-group-sm">
          <button type="button" class="btn btn-outline-danger" data-cancel="${a.id}">Cancelar</button>
          <button type="button" class="btn btn-outline-primary" data-resched="${a.id}">Remarcar</button>
        </span>
      </li>`);
    }
    list.innerHTML = html.join("");
  }

  document.getElementById("formServico").addEventListener("submit", async (event) => {
    event.preventDefault();
    showErro("erroServico", "");
    const form = event.target;
    const editId = form.editId.value;
    try {
      if (editId) {
        await dbUpdateService(editId, {
          name: form.name.value,
          durationMinutes: form.durationMinutes.value,
          price: form.price.value
        });
      } else {
        await dbCreateService({
          userId: user.id,
          name: form.name.value,
          durationMinutes: form.durationMinutes.value,
          price: form.price.value
        });
      }
      form.reset();
      form.editId.value = "";
      document.getElementById("btnServico").textContent = "Salvar serviço";
      await renderServicos();
    } catch (e) {
      showErro("erroServico", e.message);
    }
  });

  document.getElementById("listaServicos").addEventListener("click", async (event) => {
    const del = event.target.getAttribute("data-del");
    const edit = event.target.getAttribute("data-edit");
    if (del) {
      await dbDeleteService(del);
      await renderServicos();
    }
    if (edit) {
      const service = await dbGetService(edit);
      if (!service) return;
      const form = document.getElementById("formServico");
      form.editId.value = service.id;
      form.name.value = service.name;
      form.durationMinutes.value = service.durationMinutes;
      form.price.value = service.price === null ? "" : service.price;
      document.getElementById("btnServico").textContent = "Atualizar serviço";
    }
  });

  document.getElementById("formDisponibilidade").addEventListener("submit", async (event) => {
    event.preventDefault();
    showErro("erroDisponibilidade", "");
    const form = event.target;
    try {
      await dbAddAvailability({
        userId: user.id,
        weekday: form.weekday.value,
        start: form.start.value,
        end: form.end.value
      });
      form.reset();
      await renderDisponibilidade();
    } catch (e) {
      showErro("erroDisponibilidade", e.message);
    }
  });

  document.getElementById("listaDisponibilidade").addEventListener("click", async (event) => {
    const id = event.target.getAttribute("data-av-del");
    if (!id) return;
    await dbRemoveAvailability(id);
    await renderDisponibilidade();
  });

  document.getElementById("filtroData").addEventListener("change", () => {
    renderAgenda();
  });

  async function fillRemarcarSlots() {
    const id = document.getElementById("remarcarId").value;
    const dateStr = document.getElementById("remarcarData").value;
    const select = document.getElementById("remarcarSlot");
    const appointment = await dbGetAppointment(id);
    showErro("erroRemarcar", "");
    select.innerHTML = "";
    if (!appointment || !dateStr) return;
    const slots = await getAvailableSlots({
      userId: user.id,
      serviceId: appointment.serviceId,
      dateStr,
      excludeAppointmentId: appointment.id
    });
    if (!slots.length) {
      select.innerHTML = "<option value=''>Nenhum horário livre</option>";
      return;
    }
    select.innerHTML = slots
      .map((s) => `<option value="${s.startIso}|${s.endIso}">${s.label}</option>`)
      .join("");
  }

  document.getElementById("listaAgenda").addEventListener("click", async (event) => {
    const cancelId = event.target.getAttribute("data-cancel");
    const reschedId = event.target.getAttribute("data-resched");
    if (cancelId) {
      if (confirm("Cancelar este agendamento?")) {
        await dbCancelAppointment(cancelId);
        await renderAgenda();
      }
    }
    if (reschedId) {
      const appointment = await dbGetAppointment(reschedId);
      if (!appointment) return;
      const box = document.getElementById("boxRemarcar");
      box.hidden = false;
      document.getElementById("remarcarId").value = appointment.id;
      document.getElementById("remarcarInfo").textContent =
        `${appointment.clientName} — ${formatDateTime(appointment.start)}`;
      document.getElementById("remarcarData").value = datePart(appointment.start);
      await fillRemarcarSlots();
    }
  });

  document.getElementById("remarcarData").addEventListener("change", () => {
    fillRemarcarSlots();
  });

  document.getElementById("formRemarcar").addEventListener("submit", async (event) => {
    event.preventDefault();
    showErro("erroRemarcar", "");
    const id = document.getElementById("remarcarId").value;
    const value = document.getElementById("remarcarSlot").value;
    if (!value) {
      showErro("erroRemarcar", "Escolha um horário.");
      return;
    }
    const [startIso, endIso] = value.split("|");
    try {
      await dbRescheduleAppointment(id, startIso, endIso);
      document.getElementById("boxRemarcar").hidden = true;
      await renderAgenda();
    } catch (e) {
      showErro("erroRemarcar", e.message);
    }
  });

  document.getElementById("fecharRemarcar").addEventListener("click", () => {
    document.getElementById("boxRemarcar").hidden = true;
  });

  await renderServicos();
  await renderDisponibilidade();
  await renderAgenda();
}

bootPainel();