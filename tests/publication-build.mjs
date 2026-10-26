import { mkdirSync, writeFileSync, rmSync, readFileSync, globSync } from "node:fs";
import { spawnSync } from "node:child_process";
import assert from "node:assert/strict";

const created = [];
try {
  for (const locale of ["en", "he"]) {
    for (const kind of ["draft", "unlisted", "future"]) {
      const dir = `src/content/blog/${locale}/2099`;
      mkdirSync(dir, { recursive: true });
      const path = `${dir}/security-fixture-${kind}.md`;
      const frontmatter = [
        "---",
        `title: security-fixture-${locale}-${kind}`,
        "description: Synthetic publication boundary test",
        `lang: ${locale}`,
        `pubDatetime: ${kind === "future" ? "2099-01-01" : "2020-01-01"}T00:00:00Z`,
        kind === "future" ? "" : `${kind}: true`,
        "---",
        "SECURITY_FIXTURE_NOT_PUBLIC",
      ].join("\n");
      writeFileSync(path, frontmatter, { flag: "wx" });
      created.push(path);
    }
  }
  const result = spawnSync("corepack", ["pnpm", "run", "build"], { stdio: "inherit" });
  assert.equal(result.status, 0, "fixture build must succeed");
  for (const file of globSync("dist/**/*", { exclude: (path) => path.includes("node_modules") })) {
    assert.ok(!file.includes("security-fixture"), `Hidden route emitted: ${file}`);
    if (/\.(html|md|xml|js|json)$/.test(file)) {
      assert.ok(
        !/security-fixture-|SECURITY_FIXTURE_NOT_PUBLIC/.test(readFileSync(file, "utf8")),
        `Hidden content leaked: ${file}`,
      );
    }
  }
  console.log(
    "Hidden posts absent from HTML, Markdown, OG routes, feeds, sitemap, and static indexes.",
  );
} finally {
  for (const path of created) rmSync(path);
}
