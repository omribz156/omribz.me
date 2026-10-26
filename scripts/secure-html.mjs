import { createHash } from "node:crypto";
import { globSync, readFileSync, writeFileSync } from "node:fs";
import { parse, parseFragment, serialize } from "parse5";

function walk(node, visit) {
  visit(node);
  for (const child of node.childNodes || []) walk(child, visit);
}

const files = globSync("dist/**/*.html");
if (!files.length) throw new Error("No HTML to secure");
const pages = files.map((file) => ({ file, document: parse(readFileSync(file, "utf8")) }));
const hashes = new Set();
for (const { document } of pages) {
  walk(document, (node) => {
    if (node.tagName !== "script" || node.attrs.some((attr) => attr.name === "src")) return;
    const text = (node.childNodes || []).map((child) => child.value || "").join("");
    if (text) hashes.add(`'sha256-${createHash("sha256").update(text).digest("base64")}'`);
  });
}
// Share hashes across pages so Astro client navigation can execute trusted page scripts.
// The response header remains an outer resource policy; this adds strict script enforcement.
const policy = [
  "script-src 'self' 'wasm-unsafe-eval'",
  "https://platform.twitter.com https://cdn.syndication.twimg.com",
  "https://va.vercel-scripts.com",
  ...[...hashes].sort(),
].join(" ");
for (const { file, document } of pages) {
  let head;
  walk(document, (node) => {
    if (node.tagName === "head") head = node;
    if (node.attrs?.some((attr) => /^on/i.test(attr.name)))
      throw new Error(`Inline event handler in ${file}`);
  });
  if (!head) throw new Error(`Missing head: ${file}`);
  const meta = parseFragment('<meta http-equiv="Content-Security-Policy" content="">')
    .childNodes[0];
  meta.attrs.find((attr) => attr.name === "content").value = policy;
  meta.parentNode = head;
  head.childNodes.unshift(meta);
  writeFileSync(file, serialize(document));
}
console.log(`Secured ${pages.length} HTML pages with ${hashes.size} script hashes.`);
