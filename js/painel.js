async function bootPainel() {
  if (!ensureConfigOrWarn()) return;
  const user = await requireAuth();
  if (!user) return;

  bindLogout("sair");
  document.getElementById("nomeUsuario").textContent = user.name;
  document.getElementById("linkCliente").href = `agendar.html?pro=${user.id}`;
  document.getElementById("linkCliente").textContent = `agendar.html?pro=${user.id}`;

  async function renderServicos() {
    const list = document.getElementById("listaServicos");
    const services = await ForgeUI.runRequest(
      "listarServicos",
      () => dbListServices(user.id),
      { loadingText: "Carregando serviços...", errorMessage: "Não foi possível carregar os serviços." }
    );
    if (!services) return;
    if (!services.length) {
      list.innerHTML = '<li class="list-group-item text-secondary">Nenhum serviço cadastrado.</li>';
      return;
    }
    list.innerHTML = services
      .map((s) => {
        const preco = s.price === null ? "—" : `R$ ${s.price.toFixed(2)}`;
        return `<li class="list-group-item d-flex flex-wrap justify-content-between align-items-center gap-2">
          <span><strong>${ForgeUI.escapeHtml(s.name)}</strong> — ${s.durationMinutes} min — ${preco}</span>
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
    const itemsRaw = await ForgeUI.runRequest(
      "listarDisponibilidade",
      () => dbListAvailability(user.id),
      {
        loadingText: "Carregando disponibilidade...",
        errorMessage: "Não foi possível carregar a disponibilidade."
      }
    );
    if (!itemsRaw) return;
    const items = itemsRaw.sort(
      (a, b) => a.weekday - b.weekday || a.start.localeCompare(b.start)
    );
    if (!items.length) {
      list.innerHTML =
        '<li class="list-group-item text-secondary">Nenhuma disponibilidade cadastrada.</li>';
      return;
    }
    list.innerHTML = items
      .map(
        (a) => `<li class="list-group-item d-flex flex-wrap justify-content-between align-items-center gap-2">
          <span>${globalThis.WEEKDAY_LABELS[a.weekday]} — ${a.start} às ${a.end}</span>
          <button type="button" class="btn btn-outline-danger btn-sm" data-av-del="${a.id}">Remover</button>
        </li>`
      )
      .join("");
  }

  async function renderAgenda() {
    const filtro = document.getElementById("filtroData").value;
    const list = document.getElementById("listaAgenda");
    let appointments = await ForgeUI.runRequest(
      "listarAgenda",
      () => dbListAppointments(user.id),
      { loadingText: "Carregando agenda...", errorMessage: "Não foi possível carregar a agenda." }
    );
    if (!appointments) return;
    if (filtro) {
      appointments = appointments.filter((a) => globalThis.datePart(a.start) === filtro);
    } else {
      const hoje = new Date();
      const y = hoje.getFullYear();
      const m = String(hoje.getMonth() + 1).padStart(2, "0");
      const d = String(hoje.getDate()).padStart(2, "0");
      const hojeStr = `${y}-${m}-${d}`;
      appointments = appointments.filter((a) => globalThis.datePart(a.start) >= hojeStr);
    }
    if (!appointments.length) {
      list.innerHTML = '<li class="list-group-item text-secondary">Nenhum agendamento.</li>';
      return;
    }
    const html = [];
    for (const a of appointments) {
      const service = await dbGetService(a.serviceId);
      const nomeServico = service ? service.name : "(serviço removido)";
      const statusLabel = a.status === "cancelado" ? " (cancelado)" : "";
      const actions =
        a.status === "agendado"
          ? `<button type="button" class="btn btn-outline-danger" data-cancel="${a.id}">Cancelar</button>
          <button type="button" class="btn btn-outline-primary" data-resched="${a.id}">Remarcar</button>
          <button type="button" class="btn btn-outline-dark" data-delete="${a.id}">Excluir dados</button>`
          : `<button type="button" class="btn btn-outline-dark" data-delete="${a.id}">Excluir dados</button>`;
      html.push(`<li class="list-group-item d-flex flex-wrap justify-content-between align-items-center gap-2">
        <span><strong>${ForgeUI.escapeHtml(globalThis.formatDateTime(a.start))}</strong> — ${ForgeUI.escapeHtml(nomeServico)} — ${ForgeUI.escapeHtml(a.clientName)}${statusLabel}</span>
        <span class="btn-group btn-group-sm">${actions}</span>
      </li>`);
    }
    list.innerHTML = html.join("");
  }

  document.getElementById("formServico").addEventListener("submit", async (event) => {
    event.preventDefault();
    ForgeUI.setText("erroServico", "");
    const form = event.target;
    const editId = form.editId.value;
    const parsed = ForgeLogic.validateServiceInput({
      name: form.name.value,
      durationMinutes: form.durationMinutes.value,
      price: form.price.value
    });
    if (!parsed.ok) {
      const msg = parsed.errors[0];
      ForgeUI.setText("erroServico", msg);
      ForgeUI.toast(msg, "warning");
      return;
    }
    const saved = await ForgeUI.runRequest(
      editId ? "atualizarServico" : "criarServico",
      async () => {
        if (editId) {
          return dbUpdateService(editId, parsed.value);
        }
        return dbCreateService({
          userId: user.id,
          name: parsed.value.name,
          durationMinutes: parsed.value.durationMinutes,
          price: parsed.value.price
        });
      },
      {
        loadingText: "Salvando serviço...",
        successMessage: editId ? "Serviço atualizado com sucesso." : "Serviço cadastrado com sucesso.",
        errorMessage: "Não foi possível salvar o serviço."
      }
    );
    if (!saved) return;
    form.reset();
    form.editId.value = "";
    document.getElementById("btnServico").textContent = "Salvar";
    await renderServicos();
  });

  document.getElementById("listaServicos").addEventListener("click", async (event) => {
    const del = event.target.getAttribute("data-del");
    const edit = event.target.getAttribute("data-edit");
    if (del) {
      const confirmed = await ForgeUI.confirm({
        title: "Excluir serviço",
        message: "Tem certeza que deseja excluir este serviço?",
        confirmText: "Excluir"
      });
      if (!confirmed) return;
      const ok = await ForgeUI.runRequest(
        "excluirServico",
        async () => {
          await dbDeleteService(del);
          return true;
        },
        {
          loadingText: "Removendo serviço...",
          successMessage: "Serviço removido com sucesso.",
          errorMessage: "Não foi possível remover o serviço."
        }
      );
      if (ok) await renderServicos();
    }
    if (edit) {
      const service = await ForgeUI.runRequest(
        "carregarServico",
        () => dbGetService(edit),
        { loadingText: "Carregando serviço...", errorMessage: "Não foi possível abrir o serviço." }
      );
      if (!service) return;
      const form = document.getElementById("formServico");
      form.editId.value = service.id;
      form.name.value = service.name;
      form.durationMinutes.value = service.durationMinutes;
      form.price.value = service.price === null ? "" : service.price;
      document.getElementById("btnServico").textContent = "Atualizar";
      ForgeUI.toast("Serviço carregado para edição.", "info");
    }
  });

  document.getElementById("formDisponibilidade").addEventListener("submit", async (event) => {
    event.preventDefault();
    ForgeUI.setText("erroDisponibilidade", "");
    const form = event.target;
    const parsed = ForgeLogic.validateAvailabilityInput({
      weekday: form.weekday.value,
      start: form.start.value,
      end: form.end.value
    });
    if (!parsed.ok) {
      const msg = parsed.errors[0];
      ForgeUI.setText("erroDisponibilidade", msg);
      ForgeUI.toast(msg, "warning");
      return;
    }
    const saved = await ForgeUI.runRequest(
      "criarDisponibilidade",
      () =>
        dbAddAvailability({
          userId: user.id,
          weekday: parsed.value.weekday,
          start: parsed.value.start,
          end: parsed.value.end
        }),
      {
        loadingText: "Salvando horário...",
        successMessage: "Disponibilidade cadastrada com sucesso.",
        errorMessage: "Não foi possível salvar a disponibilidade."
      }
    );
    if (!saved) return;
    form.reset();
    await renderDisponibilidade();
  });

  document.getElementById("listaDisponibilidade").addEventListener("click", async (event) => {
    const id = event.target.getAttribute("data-av-del");
    if (!id) return;
    const confirmed = await ForgeUI.confirm({
      title: "Remover disponibilidade",
      message: "Tem certeza que deseja remover este horário?",
      confirmText: "Remover"
    });
    if (!confirmed) return;
    const ok = await ForgeUI.runRequest(
      "removerDisponibilidade",
      async () => {
        await dbRemoveAvailability(id);
        return true;
      },
      {
        loadingText: "Removendo...",
        successMessage: "Disponibilidade removida com sucesso.",
        errorMessage: "Não foi possível remover a disponibilidade."
      }
    );
    if (ok) await renderDisponibilidade();
  });

  document.getElementById("filtroData").addEventListener("change", () => {
    renderAgenda();
  });

  async function fillRemarcarSlots() {
    const id = document.getElementById("remarcarId").value;
    const dateStr = document.getElementById("remarcarData").value;
    const select = document.getElementById("remarcarSlot");
    ForgeUI.setText("erroRemarcar", "");
    select.innerHTML = "";
    if (!id || !dateStr) return;
    const appointment = await dbGetAppointment(id);
    if (!appointment) {
      ForgeUI.toast("Agendamento não encontrado.", "warning");
      return;
    }
    const slots = await ForgeUI.runRequest(
      "horariosRemarcacao",
      () =>
        globalThis.getAvailableSlots({
          userId: user.id,
          serviceId: appointment.serviceId,
          dateStr,
          excludeAppointmentId: appointment.id
        }),
      {
        loadingText: "Buscando horários...",
        errorMessage: "Não foi possível buscar horários para remarcação."
      }
    );
    if (!slots) return;
    if (!slots.length) {
      select.innerHTML = "<option value=''>Nenhum horário livre</option>";
      ForgeUI.toast("Não há horário livre nesta data para remarcar.", "warning");
      return;
    }
    select.innerHTML = slots
      .map((s) => `<option value="${s.startIso}|${s.endIso}">${s.label}</option>`)
      .join("");
  }

  document.getElementById("listaAgenda").addEventListener("click", async (event) => {
    const cancelId = event.target.getAttribute("data-cancel");
    const deleteId = event.target.getAttribute("data-delete");
    const reschedId = event.target.getAttribute("data-resched");
    if (cancelId) {
      const confirmed = await ForgeUI.confirm({
        title: "Cancelar agendamento",
        message: "Tem certeza que deseja cancelar este agendamento?",
        confirmText: "Cancelar agendamento"
      });
      if (!confirmed) return;
      const ok = await ForgeUI.runRequest(
        "cancelarAgendamento",
        async () => {
          await dbCancelAppointment(cancelId);
          return true;
        },
        {
          loadingText: "Cancelando...",
          successMessage: "Agendamento cancelado com sucesso.",
          errorMessage: "Não foi possível cancelar o agendamento."
        }
      );
      if (ok) await renderAgenda();
    }
    if (deleteId) {
      const confirmed = await ForgeUI.confirm({
        title: "Excluir dados do cliente",
        message:
          "Isso apaga de verdade o agendamento e o nome do cliente deste registro. Não dá para desfazer. Continuar?",
        confirmText: "Excluir dados"
      });
      if (!confirmed) return;
      const ok = await ForgeUI.runRequest(
        "excluirAgendamento",
        async () => {
          await dbDeleteAppointment(deleteId);
          return true;
        },
        {
          loadingText: "Excluindo...",
          successMessage: "Dados do cliente excluídos.",
          errorMessage: "Não foi possível excluir os dados."
        }
      );
      if (ok) await renderAgenda();
    }
    if (reschedId) {
      const appointment = await ForgeUI.runRequest(
        "abrirRemarcacao",
        () => dbGetAppointment(reschedId),
        { loadingText: "Abrindo remarcação...", errorMessage: "Não foi possível abrir a remarcação." }
      );
      if (!appointment) return;
      const box = document.getElementById("boxRemarcar");
      box.hidden = false;
      document.getElementById("remarcarId").value = appointment.id;
      document.getElementById("remarcarInfo").textContent =
        `${appointment.clientName} — ${globalThis.formatDateTime(appointment.start)}`;
      document.getElementById("remarcarData").value = globalThis.datePart(appointment.start);
      await fillRemarcarSlots();
    }
  });

  document.getElementById("remarcarData").addEventListener("change", () => {
    fillRemarcarSlots();
  });

  document.getElementById("formRemarcar").addEventListener("submit", async (event) => {
    event.preventDefault();
    ForgeUI.setText("erroRemarcar", "");
    const id = document.getElementById("remarcarId").value;
    const value = document.getElementById("remarcarSlot").value;
    const parsed = ForgeLogic.validateRescheduleInput({ slot: value });
    if (!parsed.ok) {
      const msg = parsed.errors[0];
      ForgeUI.setText("erroRemarcar", msg);
      ForgeUI.toast(msg, "warning");
      return;
    }
    const [startIso, endIso] = parsed.value.slot.split("|");
    const ok = await ForgeUI.runRequest(
      "remarcarAgendamento",
      async () => {
        await dbRescheduleAppointment(id, startIso, endIso);
        return true;
      },
      {
        loadingText: "Remarcando...",
        successMessage: "Agendamento remarcado com sucesso.",
        errorMessage: "Não foi possível remarcar o agendamento."
      }
    );
    if (!ok) return;
    document.getElementById("boxRemarcar").hidden = true;
    await renderAgenda();
  });

  document.getElementById("fecharRemarcar").addEventListener("click", () => {
    document.getElementById("boxRemarcar").hidden = true;
  });

  await ForgeUI.runRequest(
    "syncDayBusy",
    () => dbSyncDayBusyFromAppointments(user.id),
    {
      loadingText: "Sincronizando agenda...",
      errorMessage: "Não foi possível sincronizar a agenda pública."
    }
  );
  await renderServicos();
  await renderDisponibilidade();
  await renderAgenda();
}

bootPainel();
