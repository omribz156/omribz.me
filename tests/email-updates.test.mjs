import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readdirSync } from "node:fs";

test("static site has no application API or retired subscription routes", () => {
  const root = new URL("../", import.meta.url);
  const api = new URL("api/", root);
  assert.deepEqual(existsSync(api) ? readdirSync(api, { recursive: true }) : [], []);
  for (const path of [
    "server/newsletter.js",
    "src/pages/api",
    "src/pages/newsletter",
    "src/pages/he/newsletter",
    "src/components/NewsletterForm.astro",
    "src/components/ConfirmSubscription.astro",
  ]) {
    const target = new URL(path, root);
    if (path.endsWith("newsletter") || path.endsWith("/api")) {
      assert.deepEqual(existsSync(target) ? readdirSync(target, { recursive: true }) : [], [], path);
    } else {
      assert.equal(existsSync(target), false, path);
    }
  }
});
