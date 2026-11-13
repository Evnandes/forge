import { describe, expect, it } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = join(process.cwd());

function read(path) {
  return readFileSync(join(root, path), "utf8");
}

describe("arquivos criticos do app", () => {
  it("mantem paginas principais", () => {
    for (const file of [
      "index.html",
      "login.html",
      "painel.html",
      "agendar.html",
      "js/db.js",
      "js/logic.js",
      "js/ui.js",
      "js/slots.js",
      "js/config.js",
      "firestore.rules"
    ]) {
      expect(existsSync(join(root, file))).toBe(true);
    }
  });

  it("carrega logic.js e ui.js nos fluxos", () => {
    expect(read("painel.html")).toContain("js/logic.js");
    expect(read("painel.html")).toContain("js/ui.js");
    expect(read("agendar.html")).toContain("js/logic.js");
    expect(read("agendar.html")).toContain("js/ui.js");
  });

  it("usa Bootstrap nas paginas principais", () => {
    expect(read("index.html")).toContain("bootstrap");
    expect(read("painel.html")).toContain("bootstrap");
    expect(read("agendar.html")).toContain("bootstrap");
  });

  it("login continua com Google e agendar nao exige login", () => {
    expect(read("login.html")).toMatch(/Continuar com Google|btnGoogle/);
    expect(read("agendar.html")).not.toContain("requireAuth");
  });

  it("rules: cliente cria appointment; dono gerencia servicos", () => {
    const rules = read("firestore.rules");
    expect(rules).toMatch(/match \/appointments\/\{id\}[\s\S]*allow create: if true/);
    expect(rules).toMatch(/match \/services\/\{id\}[\s\S]*request\.auth != null/);
  });
});