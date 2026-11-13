window.FORGE_CONFIG = {
  apiKey: "AIzaSyAMxiog3sTGs1QCzQt4fFi1ufP-VhyjdFw",
  authDomain: "forge-agenda-evn.firebaseapp.com",
  projectId: "forge-agenda-evn",
  storageBucket: "forge-agenda-evn.firebasestorage.app",
  messagingSenderId: "147866049337",
  appId: "1:147866049337:web:30ef0181a4201d3a38a6e8"
};

window.forgeConfigOk = function forgeConfigOk() {
  const c = window.FORGE_CONFIG || {};
  return c.apiKey && c.projectId && !String(c.apiKey).includes("COLE_AQUI");
};