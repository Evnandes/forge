const ForgeUI = (function () {
  const errorLogs = [];
  let loadingCount = 0;

  function ensureShell() {
    if (document.getElementById("forge-toast-wrap")) return;

    const toastWrap = document.createElement("div");
    toastWrap.id = "forge-toast-wrap";
    toastWrap.className = "toast-container position-fixed top-0 end-0 p-3";
    toastWrap.style.zIndex = "1080";
    document.body.appendChild(toastWrap);

    const loading = document.createElement("div");
    loading.id = "forge-loading";
    loading.className = "position-fixed top-0 start-0 w-100 h-100 d-none";
    loading.style.zIndex = "1090";
    loading.style.background = "rgba(255,255,255,0.55)";
    loading.innerHTML =
      '<div class="d-flex h-100 align-items-center justify-content-center">' +
      '<div class="bg-white border rounded px-4 py-3 shadow-sm text-center">' +
      '<div class="spinner-border text-primary mb-2" role="status"></div>' +
      '<div id="forge-loading-text" class="small text-secondary">Carregando...</div>' +
      "</div></div>";
    document.body.appendChild(loading);

    const logBox = document.createElement("div");
    logBox.id = "forge-error-log";
    logBox.className = "position-fixed bottom-0 start-0 m-3 d-none";
    logBox.style.zIndex = "1085";
    logBox.style.maxWidth = "420px";
    logBox.innerHTML =
      '<div class="card shadow">' +
      '<div class="card-header py-2 d-flex justify-content-between align-items-center">' +
      '<strong class="small">Detalhes do erro</strong>' +
      '<button type="button" class="btn btn-sm btn-outline-secondary" id="forge-copy-error">Copiar</button>' +
      "</div>" +
      '<div class="card-body py-2">' +
      '<pre id="forge-error-text" class="small mb-2" style="white-space:pre-wrap;max-height:160px;overflow:auto;"></pre>' +
      '<button type="button" class="btn btn-sm btn-link p-0" id="forge-close-error">Fechar</button>' +
      "</div></div>";
    document.body.appendChild(logBox);

    document.getElementById("forge-copy-error").addEventListener("click", async () => {
      const text = document.getElementById("forge-error-text").textContent || "";
      try {
        await navigator.clipboard.writeText(text);
        toast("Log copiado. Pode colar no chat da IA.", "success");
      } catch (e) {
        toast("Não foi possível copiar. Selecione o texto manualmente.", "warning");
      }
    });
    document.getElementById("forge-close-error").addEventListener("click", () => {
      logBox.classList.add("d-none");
    });

    const confirmModal = document.createElement("div");
    confirmModal.id = "forge-confirm-modal";
    confirmModal.className = "modal fade";
    confirmModal.tabIndex = -1;
    confirmModal.setAttribute("aria-hidden", "true");
    confirmModal.innerHTML =
      '<div class="modal-dialog modal-dialog-centered">' +
      '<div class="modal-content">' +
      '<div class="modal-header">' +
      '<h5 class="modal-title" id="forge-confirm-title">Confirmação</h5>' +
      '<button type="button" class="btn-close" id="forge-confirm-x" aria-label="Fechar"></button>' +
      "</div>" +
      '<div class="modal-body" id="forge-confirm-message"></div>' +
      '<div class="modal-footer">' +
      '<button type="button" class="btn btn-outline-secondary" id="forge-confirm-cancel">Cancelar</button>' +
      '<button type="button" class="btn btn-danger" id="forge-confirm-ok">Confirmar</button>' +
      "</div></div></div>";
    document.body.appendChild(confirmModal);

    const backdrop = document.createElement("div");
    backdrop.id = "forge-confirm-backdrop";
    backdrop.className = "modal-backdrop fade d-none";
    document.body.appendChild(backdrop);
  }

  function openConfirmModal() {
    const modal = document.getElementById("forge-confirm-modal");
    const backdrop = document.getElementById("forge-confirm-backdrop");
    modal.classList.add("show");
    modal.style.display = "block";
    modal.setAttribute("aria-hidden", "false");
    backdrop.classList.remove("d-none");
    backdrop.classList.add("show");
    document.body.classList.add("modal-open");
    document.body.style.overflow = "hidden";
  }

  function closeConfirmModal() {
    const modal = document.getElementById("forge-confirm-modal");
    const backdrop = document.getElementById("forge-confirm-backdrop");
    modal.classList.remove("show");
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    backdrop.classList.remove("show");
    backdrop.classList.add("d-none");
    document.body.classList.remove("modal-open");
    document.body.style.overflow = "";
  }

  function confirmDialog(options) {
    ensureShell();
    const opts = options || {};
    return new Promise((resolve) => {
      const title = document.getElementById("forge-confirm-title");
      const message = document.getElementById("forge-confirm-message");
      const okBtn = document.getElementById("forge-confirm-ok");
      const cancelBtn = document.getElementById("forge-confirm-cancel");
      const closeBtn = document.getElementById("forge-confirm-x");

      title.textContent = opts.title || "Confirmação";
      message.textContent = opts.message || "Deseja continuar?";
      okBtn.textContent = opts.confirmText || "Confirmar";
      cancelBtn.textContent = opts.cancelText || "Cancelar";
      okBtn.className = opts.danger === false ? "btn btn-primary" : "btn btn-danger";

      const finish = (value) => {
        okBtn.removeEventListener("click", onOk);
        cancelBtn.removeEventListener("click", onCancel);
        closeBtn.removeEventListener("click", onCancel);
        closeConfirmModal();
        resolve(value);
      };
      const onOk = () => finish(true);
      const onCancel = () => finish(false);

      okBtn.addEventListener("click", onOk);
      cancelBtn.addEventListener("click", onCancel);
      closeBtn.addEventListener("click", onCancel);
      openConfirmModal();
    });
  }

  function toast(message, type) {
    ensureShell();
    const wrap = document.getElementById("forge-toast-wrap");
    const id = `t${Date.now()}${Math.floor(Math.random() * 1000)}`;
    const bg =
      type === "success"
        ? "text-bg-success"
        : type === "warning"
          ? "text-bg-warning"
          : type === "info"
            ? "text-bg-info"
            : "text-bg-danger";
    wrap.insertAdjacentHTML(
      "beforeend",
      `<div id="${id}" class="toast ${bg} show" role="alert">` +
        `<div class="d-flex"><div class="toast-body">${escapeHtml(message)}</div>` +
        `<button type="button" class="btn-close btn-close-white me-2 m-auto" data-close="${id}"></button>` +
        `</div></div>`
    );
    const el = document.getElementById(id);
    el.querySelector("[data-close]").addEventListener("click", () => el.remove());
    setTimeout(() => el && el.remove(), 4500);
  }

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function startLoading(text) {
    ensureShell();
    loadingCount += 1;
    const el = document.getElementById("forge-loading");
    const label = document.getElementById("forge-loading-text");
    if (label) label.textContent = text || "Carregando...";
    el.classList.remove("d-none");
  }

  function stopLoading() {
    loadingCount = Math.max(0, loadingCount - 1);
    if (loadingCount === 0) {
      const el = document.getElementById("forge-loading");
      if (el) el.classList.add("d-none");
    }
  }

  function buildErrorLog(context, error) {
    const err = error || {};
    return [
      "Forge Agenda — log de erro",
      `Quando: ${new Date().toLocaleString("pt-BR")}`,
      `Página: ${location.href}`,
      `Ação: ${context}`,
      `Mensagem: ${err.message || String(error)}`,
      `Nome: ${err.name || ""}`,
      `Code: ${err.code || ""}`,
      `Stack: ${err.stack || ""}`
    ].join("\n");
  }

  function showErrorLog(details) {
    ensureShell();
    errorLogs.push(details);
    document.getElementById("forge-error-text").textContent = details;
    document.getElementById("forge-error-log").classList.remove("d-none");
  }

  function fail(context, error, userMessage) {
    console.error(`[Forge] ${context}`, error);
    const details = buildErrorLog(context, error);
    showErrorLog(details);
    toast(userMessage || friendlyMessage(error), "danger");
    return details;
  }

  function friendlyMessage(error) {
    const msg = String((error && error.message) || error || "");
    const code = String((error && error.code) || "");
    if (/popup-closed-by-user|cancelled/i.test(code + msg)) {
      return "Login cancelado. Tente novamente quando quiser.";
    }
    if (/permission|insufficient|PERMISSION/i.test(code + msg)) {
      return "Sem permissão para esta ação. Entre com a conta correta.";
    }
    if (/network|unavailable|Failed to fetch/i.test(code + msg)) {
      return "Falha de conexão. Verifique a internet e tente de novo.";
    }
    if (/Horário indisponível/i.test(msg)) {
      return "Esse horário não está disponível. Escolha outro.";
    }
    return msg || "Não foi possível concluir a ação.";
  }

  async function runRequest(context, fn, options) {
    const opts = options || {};
    startLoading(opts.loadingText || "Processando...");
    try {
      const result = await fn();
      if (opts.successMessage) toast(opts.successMessage, "success");
      return result;
    } catch (error) {
      fail(context, error, opts.errorMessage || friendlyMessage(error));
      if (opts.rethrow) throw error;
      return undefined;
    } finally {
      stopLoading();
    }
  }

  function setText(id, message) {
    const el = document.getElementById(id);
    if (el) el.textContent = message || "";
  }

  return {
    ensureShell,
    toast,
    startLoading,
    stopLoading,
    fail,
    friendlyMessage,
    runRequest,
    setText,
    buildErrorLog,
    showErrorLog,
    confirm: confirmDialog
  };
})();

if (typeof globalThis !== "undefined") {
  globalThis.ForgeUI = ForgeUI;
}