import { describe, expect, it } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = join(process.cwd());
function read(path) {
  return readFileSync(join(root, path), "utf8");
}

describe("arquivos criticos do app", () => {
  it("mantem paginas e modulos principais", () => {
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
      "js/agendar.js",
      "js/painel.js",
      "firestore.rules",
      "SECURITY.md",
      "README.md"
    ]) {
      expect(existsSync(join(root, file))).toBe(true);
    }
  });

  it("protege leitura e permite exclusao pelo dono", () => {
    const rules = read("firestore.rules");
    expect(rules).toContain("match /appointments/{id}");
    expect(rules).toContain("match /dayBusy/{dayId}");
    expect(rules).toMatch(/allow read: if isOwner\(resource\.data\.userId\)/);
    expect(rules).toMatch(/allow delete: if isOwner\(resource\.data\.userId\)/);
  });

  it("ui escapa html, db usa transacao e exclusao", () => {
    expect(read("js/ui.js")).toContain("function escapeHtml");
    expect(read("js/db.js")).toContain("runTransaction");
    expect(read("js/db.js")).toContain("dbDeleteAppointment");
    expect(read("js/painel.js")).toContain("ForgeUI.escapeHtml");
    expect(read("js/painel.js")).toContain("data-delete");
    expect(read("js/agendar.js")).toContain("ForgeUI.escapeHtml");
    expect(read("agendar.html")).toMatch(/privacidade|nome necessário|excluí/i);
  });
});