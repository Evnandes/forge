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
      "firestore.rules",
      "SECURITY.md"
    ]) {
      expect(existsSync(join(root, file))).toBe(true);
    }
  });

  it("protege leitura de appointments e expoe dayBusy", () => {
    const rules = read("firestore.rules");
    expect(rules).toContain("match /appointments/{id}");
    expect(rules).toContain("match /dayBusy/{dayId}");
    expect(rules).toMatch(/allow read: if isOwner\(resource\.data\.userId\)/);
  });

  it("ui escapa html e db usa transacao", () => {
    expect(read("js/ui.js")).toContain("function escapeHtml");
    expect(read("js/db.js")).toContain("runTransaction");
    expect(read("js/db.js")).toContain("dayBusy");
    expect(read("js/painel.js")).toContain("ForgeUI.escapeHtml");
    expect(read("js/agendar.js")).toContain("ForgeUI.escapeHtml");
  });
});