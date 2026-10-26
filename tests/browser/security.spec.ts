import { test, expect } from "@playwright/test";

for (const prefix of ["", "/he"]) {
  test(`email updates uses a localized mail draft without signup requests: ${prefix || "en"}`, async ({
    page,
  }) => {
    const requests: string[] = [];
    page.on("request", (request) => requests.push(request.url()));
    await page.goto(`${prefix}/posts/2026/three-waves-of-ai`);
    const link = page.locator('.email-updates a[href^="mailto:"]');
    await expect(link).toHaveText(
      prefix ? "רוצים לקבל עדכונים? כתבו לי במייל" : "Email me for updates",
    );
    const draft = new URL((await link.getAttribute("href"))!);
    expect(draft.pathname).toBe("omribz156@gmail.com");
    expect(draft.searchParams.get("subject")).toBe(
      prefix ? "בקשה לעדכונים מהאתר" : "Updates from omribz.me",
    );
    expect(draft.searchParams.get("body")).toContain(
      prefix ? "אשמח לקבל" : "I'd like occasional updates",
    );
    await expect(page.locator(".email-updates form, .email-updates input")).toHaveCount(0);
    expect(
      requests.filter((url) => /\/api\/subscribe|challenges.cloudflare.com/.test(url)),
    ).toEqual([]);
    await page.locator(`.email-updates a[href="${prefix}/privacy"]`).click();
    await expect(page.locator("main")).toContainText("Gmail");
  });
  test(`bilingual post, CSP, and responsive layout: ${prefix || "en"}`, async ({
    page,
  }, testInfo) => {
    const errors: string[] = [];
    const requests: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("request", (request) => requests.push(request.url()));
    await page.route(/https:\/\/(?!127\.0\.0\.1)/, (route) => route.abort());
    await page.goto(`${prefix}/posts/2026/three-waves-of-ai`);
    await expect(page.locator("#article")).toBeVisible();
    await expect(page.locator('.email-updates a[href^="mailto:"]')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(
      true,
    );
    expect(requests.some((url) => url.includes("platform.twitter.com/widgets.js"))).toBe(false);
    const policy = await page
      .locator('meta[http-equiv="Content-Security-Policy"]')
      .getAttribute("content");
    expect(policy).toContain("'sha256-");
    expect(policy).not.toContain("'unsafe-inline'");
    expect(policy).not.toContain("'unsafe-eval'");
    await page.evaluate(() => {
      const script = document.createElement("script");
      script.textContent = "window.__injected = true";
      document.body.append(script);
    });
    expect(await page.evaluate(() => "__injected" in window)).toBe(false);
    expect(errors).toEqual([]);
    await page.screenshot({ path: testInfo.outputPath("post.png"), fullPage: true });
    await page
      .locator(".email-updates")
      .screenshot({ path: testInfo.outputPath("email-updates.png") });
  });
  test(`real 404 responses: ${prefix || "en"}`, async ({ request }) => {
    for (const path of ["/not-a-real-security-page", "/posts/2026/not-a-real-security-post"]) {
      expect((await request.get(prefix + path)).status()).toBe(404);
    }
  });
  test(`search still works under strict scripts: ${prefix || "en"}`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(prefix + "/search");
    const input = page.locator(".pagefind-ui__search-input");
    await expect(input).toBeVisible();
    await input.fill(prefix ? "גלים" : "waves");
    await expect(page.locator(".pagefind-ui__result-link").first()).toBeVisible();
    expect(errors).toEqual([]);
  });
}
test("API misses remain 404 and SW no longer intercepts navigation", async ({ request }) => {
  expect((await request.get("/api/not-a-real-security-endpoint")).status()).toBe(404);
  const worker = await (await request.get("/sw.js")).text();
  expect(worker).toContain("registration.unregister()");
  expect(worker).not.toContain('addEventListener("fetch"');
});
test("embedded code examples stay inert; standalone embeds still render", async ({ page }) => {
  await page.route("https://www.youtube-nocookie.com/**", (route) => route.abort());
  await page.goto("/posts/2026/three-waves-of-ai");
  await page.evaluate(() => {
    const article = document.querySelector("#article")!;
    const pre = document.createElement("pre");
    const code = document.createElement("code");
    code.textContent = '<img src=x onerror="window.__exampleRan=true"> {% youtube abcdefghijk %}';
    pre.append(code);
    const p = document.createElement("p");
    p.textContent = "{% youtube abcdefghijk %}";
    const invalid = document.createElement("p");
    invalid.textContent = "{% youtube https://youtube.com.evil.test/watch?v=abcdefghijk %}";
    article.append(pre, p, invalid);
    document.dispatchEvent(new Event("astro:page-load"));
  });
  await expect(page.locator("pre img, pre iframe")).toHaveCount(0);
  await expect(
    page.locator('iframe[src="https://www.youtube-nocookie.com/embed/abcdefghijk"]'),
  ).toHaveCount(1);
  expect(await page.evaluate(() => "__exampleRan" in window)).toBe(false);
});
test("language navigation preserves theme and mobile menu handlers", async ({ page, isMobile }) => {
  await page.goto("/");
  if (isMobile) await page.locator("#menu-btn").click();
  const initialTheme = await page.locator("html").getAttribute("data-theme");
  await page.locator("#theme-btn").click();
  await expect(page.locator("html")).not.toHaveAttribute("data-theme", initialTheme!);
  const theme = await page.locator("html").getAttribute("data-theme");
  await page.getByRole("link", { name: "Switch to Hebrew" }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "he");
  await expect(page.locator("html")).toHaveAttribute("data-theme", theme!);
  if (isMobile) {
    await page.locator("#menu-btn").click();
    await expect(page.locator("#menu-btn")).toHaveAttribute("aria-expanded", "true");
  }
  await page.getByRole("link", { name: "Switch to English" }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator("html")).toHaveAttribute("data-theme", theme!);
  if (isMobile) {
    await page.locator("#menu-btn").click();
    await expect(page.locator("#menu-btn")).toHaveAttribute("aria-expanded", "true");
  }
});
test("retired subscription endpoints and confirmation pages return 404", async ({ request }) => {
  for (const path of [
    "/api/subscribe",
    "/api/confirm-subscription",
    "/newsletter/confirm",
    "/he/newsletter/confirm",
  ]) {
    expect((await request.get(path)).status()).toBe(404);
    expect((await request.post(path, { data: { email: "fixture@example.com" } })).status()).toBe(
      404,
    );
  }
});
