async function requireAuth() {
  try {
    const user = await dbGetSessionUser();
    if (!user) {
      window.location.href = "login.html";
      return null;
    }
    return user;
  } catch (e) {
    ForgeUI.fail("requireAuth", e, "Não foi possível validar sua sessão. Entre novamente.");
    window.location.href = "login.html";
    return null;
  }
}

async function redirectIfLogged() {
  try {
    const user = await dbGetSessionUser();
    if (user) window.location.href = "painel.html";
  } catch (e) {
    ForgeUI.fail("redirectIfLogged", e, "Não foi possível verificar o login.");
  }
}

function bindLogout(buttonId) {
  const button = document.getElementById(buttonId);
  if (!button) return;
  button.addEventListener("click", async () => {
    await ForgeUI.runRequest(
      "logout",
      async () => {
        await dbClearSession();
        window.location.href = "index.html";
      },
      {
        loadingText: "Saindo...",
        errorMessage: "Não foi possível sair. Tente novamente."
      }
    );
  });
}

function ensureConfigOrWarn() {
  ForgeUI.ensureShell();
  if (!window.forgeConfigOk()) {
    document.body.insertAdjacentHTML(
      "afterbegin",
      '<div class="alert alert-danger m-3">Falta configurar o Firebase em <code>js/config.js</code>. Siga o arquivo <code>GUIA-FIREBASE.md</code>.</div>'
    );
    ForgeUI.toast("Configuração do Firebase ausente.", "danger");
    return false;
  }
  return true;
}

async function bindGoogleLogin(buttonId, erroId) {
  const button = document.getElementById(buttonId);
  if (!button) return;
  button.addEventListener("click", async () => {
    ForgeUI.setText(erroId, "");
    const result = await ForgeUI.runRequest(
      "loginGoogle",
      async () => dbSignInWithGoogle(),
      {
        loadingText: "Entrando com Google...",
        errorMessage: "Não foi possível entrar com Google."
      }
    );
    if (result) {
      ForgeUI.toast("Login realizado com sucesso.", "success");
      window.location.href = "painel.html";
    }
  });
}