async function requireAuth() {
  try {
    const user = await dbGetSessionUser();
    if (!user) {
      window.location.href = "login.html";
      return null;
    }
    return user;
  } catch (e) {
    window.location.href = "login.html";
    return null;
  }
}

async function redirectIfLogged() {
  try {
    const user = await dbGetSessionUser();
    if (user) window.location.href = "painel.html";
  } catch (e) {}
}

function bindLogout(buttonId) {
  const button = document.getElementById(buttonId);
  if (!button) return;
  button.addEventListener("click", async () => {
    await dbClearSession();
    window.location.href = "index.html";
  });
}

function ensureConfigOrWarn() {
  if (!window.forgeConfigOk()) {
    document.body.insertAdjacentHTML(
      "afterbegin",
      "<p style='color:red'>Falta configurar o Firebase em <code>js/config.js</code>. Siga o arquivo <code>GUIA-FIREBASE.md</code>.</p>"
    );
    return false;
  }
  return true;
}

async function bindGoogleLogin(buttonId, erroId) {
  const button = document.getElementById(buttonId);
  if (!button) return;
  button.addEventListener("click", async () => {
    const erro = document.getElementById(erroId);
    if (erro) erro.textContent = "";
    try {
      await dbSignInWithGoogle();
      window.location.href = "painel.html";
    } catch (e) {
      if (erro) erro.textContent = e.message || String(e);
    }
  });
}