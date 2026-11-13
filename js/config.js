window.FORGE_CONFIG = {
  supabaseUrl: "https://uqqldxvypiuhctcfebon.supabase.co",
  supabaseAnonKey: "sb_publishable_EqTXPFORuVlUwDKAXv2TgA___iwG9vt"
};

window.forgeConfigOk = function forgeConfigOk() {
  const c = window.FORGE_CONFIG || {};
  return (
    c.supabaseUrl &&
    c.supabaseAnonKey &&
    !String(c.supabaseUrl).includes("COLE_AQUI") &&
    !String(c.supabaseAnonKey).includes("COLE_AQUI")
  );
};