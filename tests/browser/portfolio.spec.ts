import { test, expect } from "@playwright/test";
import { projects } from "../../src/data/portfolio";

for (const locale of ["en", "he"] as const) {
  const path = locale === "he" ? "/he/portfolio" : "/portfolio";
  test(`portfolio content, metadata and downloads: ${locale}`, async ({ page, request }, info) => {
    await page.route(/^https:\/\//, (route) => route.abort());
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.locator("html")).toHaveAttribute("lang", locale);
    await expect(page.locator("html")).toHaveAttribute("dir", locale === "he" ? "rtl" : "ltr");
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator(".project")).toHaveCount(6);
    await expect(page.locator(".project-index a")).toHaveCount(6);
    await expect(page.locator("#more-work, .small-project")).toHaveCount(0);
    await expect(page.locator(".system-map bdi")).toHaveText("Oracle / Horizon");
    await expect(page.locator(".system-map bdi")).toHaveAttribute("dir", "ltr");
    if (locale === "he") {
      await expect(page.locator("#security-research-harness h2")).toHaveText(
        "רתמת מחקר אבט״מ לסוכנים",
      );
    }
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `https://omribz.me${path}`,
    );
    await expect(page.locator('link[hreflang="en"]')).toHaveAttribute(
      "href",
      "https://omribz.me/portfolio",
    );
    await expect(page.locator('link[hreflang="he"]')).toHaveAttribute(
      "href",
      "https://omribz.me/he/portfolio",
    );
    const image = await page.locator('meta[property="og:image"]').getAttribute("content");
    expect(image).toMatch(/^https:\/\/omribz\.me\//);
    expect((await request.get(new URL(image!).pathname)).status()).toBe(200);
    const pdf = await request.get("/portfolio/Omri_Ben_Zvi_Portfolio.pdf");
    expect(pdf.status()).toBe(200);
    expect(pdf.headers()["content-type"]).toContain("application/pdf");
    await expect(page.locator(".evidence-link")).toHaveAttribute("href", /is%3Amerged/);
    for (const img of await page.locator("main img").all()) {
      await img.scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          img.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0),
        )
        .toBe(true);
      expect(await img.getAttribute("alt")).toBeTruthy();
    }
    for (const project of projects) {
      const article = page.locator(`article#${project.id}`);
      expect(await article.locator("img").count()).toBeGreaterThan(0);
      if (project.symbol) {
        await expect(article.locator(".project-symbol")).toHaveAttribute(
          "alt",
          project.symbol.alt[locale],
        );
      }
      await expect(article.locator(".project-story p")).toBeVisible();
      await expect(article.locator(".project-story p")).toHaveText(project.role[locale]);
      await expect(article.locator("details p")).toBeHidden();
      await article.locator("summary").click();
      await expect(article.locator("details p")).toBeVisible();
      await expect(article.locator("details p")).toHaveText(project.detail[locale]);
      await article.locator("summary").press("Enter");
      await expect(article.locator("details p")).toBeHidden();
    }
    for (const id of projects.map((project) => project.id)) {
      await page.locator(`#${id}`).screenshot({ path: info.outputPath(`${id}.png`) });
    }
    await page.screenshot({ path: info.outputPath("portfolio-loaded.png"), fullPage: true });
  });

  test(`portfolio layout at narrow and wide sizes: ${locale}`, async ({ page }, info) => {
    test.setTimeout(60000);
    await page.route(/^https:\/\//, (route) => route.abort());
    for (const width of [320, 390, 768, 1280]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(path);
      for (const theme of ["light", "dark"]) {
        await page.evaluate((value) => {
          document.documentElement.dataset.theme = value;
        }, theme);
        expect(
          await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),
        ).toBe(true);
        const overflow = await page.locator("main").evaluate((main) =>
          [...main.querySelectorAll("h1,h2,h3,h4,p,a,figure")]
            .filter((node) => {
              if (!(node as HTMLElement).offsetParent) return false;
              const rect = node.getBoundingClientRect();
              return rect.width > 0 && (rect.left < -1 || rect.right > innerWidth + 1);
            })
            .map((node) => node.textContent?.slice(0, 50)),
        );
        expect(overflow).toEqual([]);
        for (const project of projects) {
          const article = page.locator(`article#${project.id}`);
          const heading = await article.locator(":scope > .project-heading").boundingBox();
          const description = await article.locator(":scope > .summary").boundingBox();
          expect(description!.y - (heading!.y + heading!.height)).toBeCloseTo(16, 0);
          await expect(article.locator(".project-heading h2")).toHaveCount(1);
          const figure = article.locator(":scope > figure");
          if (await figure.count()) {
            const media = await figure.boundingBox();
            const role = await article.locator(":scope > .project-story").boundingBox();
            expect(media!.y).toBeGreaterThanOrEqual(description!.y + description!.height);
            expect(role!.y).toBeGreaterThanOrEqual(media!.y + media!.height);
          }
          if (project.symbol) {
            const symbol = await article.locator(".project-symbol").boundingBox();
            expect(symbol!.width).toBe(width <= 600 ? 64 : 72);
            expect(symbol!.height).toBe(symbol!.width);
          }
          const status = await article.locator(":scope > .project-meta .status").boundingBox();
          expect(status).not.toBeNull();
          for (const content of await article.locator(".project-heading, img").all()) {
            const bounds = await content.boundingBox();
            expect(bounds).not.toBeNull();
            expect(status!.y + status!.height).toBeLessThanOrEqual(bounds!.y + 1);
          }
        }
        for (const label of await page
          .locator("figcaption, .system-map span, .contributions p, .contributions small")
          .all()) {
          const style = await label.evaluate((element) => {
            const computed = getComputedStyle(element);
            return { size: parseFloat(computed.fontSize), opacity: computed.opacity };
          });
          expect(style.size).toBeGreaterThanOrEqual(14);
          expect(style.opacity).toBe("1");
        }
        await page.screenshot({
          path: info.outputPath(`${locale}-${width}-${theme}.png`),
          fullPage: true,
        });
        await page.screenshot({
          path: info.outputPath(`${locale}-${width}-${theme}-top.png`),
        });
      }
    }
  });

  test(`portfolio is discoverable in search: ${locale}`, async ({ page }) => {
    await page.goto(locale === "he" ? "/he/search" : "/search");
    await page.locator(".pagefind-ui__search-input").fill(locale === "he" ? "החוזה" : "Hachozeh");
    await expect(
      page.locator(
        `.pagefind-ui__result-link[href$="${path}/"], .pagefind-ui__result-link[href$="${path}"]`,
      ),
    ).toBeVisible();
  });

  test(`portfolio image viewer can always be dismissed: ${locale}`, async ({ page }) => {
    await page.goto(path);
    const viewer = page.locator("#portfolio-image-viewer");
    const close = viewer.getByRole("button", {
      name: locale === "he" ? "סגירת התמונה" : "Close image",
    });
    for (const link of await page.locator("a[data-portfolio-image]").all()) {
      await link.scrollIntoViewIfNeeded();
      const url = page.url();
      const scroll = await page.evaluate(() => scrollY);
      await link.click();
      await expect(viewer).toBeVisible();
      await expect(close).toBeFocused();
      await expect(viewer.locator("img")).toHaveAttribute(
        "src",
        new URL((await link.getAttribute("href"))!, url).href,
      );
      await expect
        .poll(() =>
          viewer
            .locator("img")
            .evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0),
        )
        .toBe(true);
      expect(page.url()).toBe(url);
      await close.click();
      await expect(viewer).not.toBeVisible();
      await expect(link).toBeFocused();
      expect(await page.evaluate(() => scrollY)).toBeCloseTo(scroll, 0);
    }
    const link = page.locator("a[data-portfolio-image]").first();
    await link.focus();
    await link.press("Enter");
    await expect(viewer).toBeVisible();
    await close.press("Escape");
    await expect(viewer).not.toBeVisible();
    await expect(link).toBeFocused();
    await link.click();
    await page.mouse.click(2, 2);
    await expect(viewer).not.toBeVisible();
    await expect(page.locator("html")).not.toHaveCSS("overflow", "hidden");
  });
}

test("portfolio language navigation preserves route, menu and theme", async ({
  page,
  isMobile,
}) => {
  await page.goto("/portfolio");
  if (isMobile) await page.locator("#menu-btn").click();
  const initial = await page.locator("html").getAttribute("data-theme");
  await page.locator("#theme-btn").click();
  await expect(page.locator("html")).not.toHaveAttribute("data-theme", initial!);
  const theme = await page.locator("html").getAttribute("data-theme");
  await page.getByRole("link", { name: "Switch to Hebrew" }).click();
  await expect(page).toHaveURL(/\/he\/portfolio$/);
  await expect(page.locator("html")).toHaveAttribute("data-theme", theme!);
  await page.locator("a[data-portfolio-image]").first().click();
  await expect(page.locator("#portfolio-image-viewer")).toBeVisible();
  await page.getByRole("button", { name: "סגירת התמונה" }).click();
  await expect(page.locator("#portfolio-image-viewer")).not.toBeVisible();
  if (isMobile) await page.locator("#menu-btn").click();
  await page.getByRole("link", { name: "Switch to English" }).click();
  await expect(page).toHaveURL(/\/portfolio$/);
  if (isMobile) {
    await page.locator("#menu-btn").click();
    await expect(page.locator("#menu-btn")).toHaveAttribute("aria-expanded", "true");
  }
});
