import assert from "node:assert/strict";

const origin = new URL(process.argv[2] || "https://omribz.me");
if (!["https:", "http:"].includes(origin.protocol)) throw new Error("HTTP(S) origin required");
for (const [path, expected] of [
  ["/", 200],
  ["/he", 200],
  ["/portfolio", 200],
  ["/he/portfolio", 200],
  ["/privacy", 200],
  ["/he/privacy", 200],
  ["/posts/2026/three-waves-of-ai", 200],
  ["/he/posts/2026/three-waves-of-ai", 200],
  ["/__health_missing_page", 404],
  ["/he/__health_missing_page", 404],
  ["/api/__health_missing_endpoint", 404],
  ["/api/subscribe", 404],
  ["/api/confirm-subscription", 404],
  ["/.well-known/security.txt", 200],
]) {
  const response = await fetch(new URL(path, origin), { signal: AbortSignal.timeout(15000) });
  assert.equal(response.status, expected, `${path}: unexpected HTTP status`);
  if (path === "/") {
    assert.equal(response.headers.get("x-content-type-options"), "nosniff");
    assert.equal(response.headers.get("x-frame-options"), "DENY");
    assert.ok(response.headers.get("content-security-policy")?.includes("object-src 'none'"));
  }
  if (path.endsWith("security.txt")) {
    const expiry = (await response.text()).match(/^Expires: (.+)$/m)?.[1];
    assert.ok(
      expiry && Date.parse(expiry) > Date.now() + 30 * 86400000,
      "Renew security.txt within 30 days",
    );
  } else {
    await response.body?.cancel();
  }
  console.log(`${response.status} ${path}`);
}

for (const path of ["/api/subscribe", "/api/confirm-subscription"]) {
  const response = await fetch(new URL(path, origin), {
    method: "POST",
    signal: AbortSignal.timeout(15000),
  });
  assert.equal(response.status, 404, `${path}: retired POST endpoint is still active`);
  await response.body?.cancel();
  console.log(`${response.status} POST ${path}`);
}
