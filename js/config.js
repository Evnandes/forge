window.FORGE_CONFIG = {
  apiKey: "COLE_AQUI",
  authDomain: "COLE_AQUI",
  projectId: "COLE_AQUI",
  storageBucket: "COLE_AQUI",
  messagingSenderId: "COLE_AQUI",
  appId: "COLE_AQUI"
};

window.forgeConfigOk = function forgeConfigOk() {
  const c = window.FORGE_CONFIG || {};
  return c.apiKey && c.projectId && !String(c.apiKey).includes("COLE_AQUI");
};