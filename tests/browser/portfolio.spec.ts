import { test, expect } from "@playwright/test";
import { portfolio, projects } from "../../src/data/portfolio";

for (const locale of ["en", "he"] as const) {
  const path = locale === "he" ? "/he/portfolio" : "/portfolio";
  test(`portfolio content, metadata and downloads: ${locale}`, async ({ page, request }, info) => {
    await page.route(/^https:\/\//, (route) => route.abort());
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.locator("html")).toHaveAttribute("lang", locale);
    await expect(page.locator("html")).toHaveAttribute("dir", locale === "he" ? "rtl" : "ltr");
    await expect(page.locator("h1")).toHaveCount(1);
    const copy = portfolio[locale];
    await expect(page.locator(".introduction .lead")).toHaveText(copy.intro);
    await expect(page.locator(".introduction .background")).toHaveText(copy.background);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      copy.description,
    );
    await expect(page.locator(".method > p")).toHaveText([
      copy.methodText,
      copy.methodAgents,
      copy.methodLearning,
      copy.compatibility,
    ]);
    await expect(page.locator(".contact > p")).toHaveText(copy.contactText);
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
    await page.locator(".introduction").screenshot({ path: info.outputPath("introduction.png") });
    await page.locator(".method").screenshot({ path: info.outputPath("method.png") });
    await page.screenshot({ path: info.outputPath("portfolio-loaded.png"), fullPage: true });
  });

  test(`portfolio layout at narrow and wide sizes: ${locale}`, async ({ page }, info) => {
    test.setTimeout(60000);
    await page.route(/^https:\/\//, (route) => route.abort());
    for (const width of [320, 390, 768, 1280]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(path);
      await page.evaluate(() => {
        document.documentElement.style.scrollBehavior = "auto";
      });
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
          // Read related boxes in one frame; lazy media and scroll anchoring can move the page.
          const boxes = await article.evaluate((element) => {
            const rect = (selector: string) => {
              const box = element.querySelector(selector)?.getBoundingClientRect();
              return box
                ? { top: box.top, bottom: box.bottom, width: box.width, height: box.height }
                : null;
            };
            return {
              heading: rect(":scope > .project-heading")!,
              description: rect(":scope > .summary")!,
              media: rect(":scope > figure"),
              role: rect(":scope > .project-story")!,
              symbol: rect(".project-symbol"),
              status: rect(":scope > .project-meta .status")!,
              contentTops: [...element.querySelectorAll(".project-heading, img")].map(
                (node) => node.getBoundingClientRect().top,
              ),
            };
          });
          expect(boxes.description.top - boxes.heading.bottom).toBeCloseTo(16, 0);
          await expect(article.locator(".project-heading h2")).toHaveCount(1);
          if (boxes.media) {
            expect(boxes.media.top).toBeGreaterThanOrEqual(boxes.description.bottom);
            expect(boxes.role.top).toBeGreaterThanOrEqual(boxes.media.bottom);
          }
          if (project.symbol) {
            expect(boxes.symbol!.width).toBe(width <= 600 ? 64 : 72);
            expect(boxes.symbol!.height).toBe(boxes.symbol!.width);
          }
          expect(boxes.status).not.toBeNull();
          for (const top of boxes.contentTops) {
            expect(boxes.status.bottom).toBeLessThanOrEqual(top + 1);
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
        if (width <= 600) {
          await expect(page.locator(".summary").first()).toHaveCSS("font-size", "18px");
          await expect(page.locator(".summary").first()).toHaveCSS("line-height", "28.8px");
          await expect(page.locator(".summary").first()).toHaveCSS("text-wrap", "wrap");
          await expect(page.locator(".project-story").first()).toHaveCSS("margin-top", "20px");
          for (const row of await page.locator(".system-map > div").all()) {
            const title = await row.locator("strong").boundingBox();
            const description = await row.locator("span").boundingBox();
            expect(description!.y).toBeGreaterThanOrEqual(title!.y + title!.height);
          }
        }
        if (width === 390 && theme === "dark") {
          await page
            .locator(locale === "he" ? "#security-research-harness" : "#hachozeh")
            .screenshot({ path: info.outputPath(`${locale}-mobile-project.png`) });
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

  test(`reading progress follows scroll and expanded content: ${locale}`, async ({ page }) => {
    await page.goto(path);
    const bar = page.locator("[data-reading-progress]");
    await expect(bar).toHaveCount(1);
    await expect(bar).toHaveCSS("width", "0px");
    await page.evaluate(() => {
      document.documentElement.style.scrollBehavior = "auto";
      window.scrollTo(0, (document.documentElement.scrollHeight - innerHeight) / 2);
    });
    await expect.poll(() => bar.evaluate((el) => parseFloat(el.style.width))).toBeGreaterThan(0);
    await page.locator("#security-research-harness summary").click();
    await expect
      .poll(async () => {
        return bar.evaluate((el) => {
          const expected = (scrollY / (document.documentElement.scrollHeight - innerHeight)) * 100;
          return Math.abs(parseFloat(el.style.width) - expected);
        });
      })
      .toBeLessThan(1);
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await expect.poll(() => bar.evaluate((el) => parseFloat(el.style.width))).toBeCloseTo(100, 0);
    await page.locator("footer a[href$='/privacy']").click();
    await expect(page).toHaveURL(/\/privacy$/);
    await expect(bar).toHaveCount(0);
    await page.goBack();
    await expect(bar).toHaveCount(1);
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
  await expect(page.locator("[data-reading-progress]")).toHaveCount(1);
  await expect(page.locator("html")).toHaveAttribute("data-theme", theme!);
  await page.locator("a[data-portfolio-image]").first().click();
  await expect(page.locator("#portfolio-image-viewer")).toBeVisible();
  await page.getByRole("button", { name: "סגירת התמונה" }).click();
  await expect(page.locator("#portfolio-image-viewer")).not.toBeVisible();
  if (isMobile) await page.locator("#menu-btn").click();
  await page.getByRole("link", { name: "Switch to English" }).click();
  await expect(page).toHaveURL(/\/portfolio$/);
  await expect(page.locator("[data-reading-progress]")).toHaveCount(1);
  if (isMobile) {
    await page.locator("#menu-btn").click();
    await expect(page.locator("#menu-btn")).toHaveAttribute("aria-expanded", "true");
    const tools = page.locator("#menu-items > li:nth-last-child(-n+3)");
    const positions = await tools.evaluateAll((items) =>
      items.map((item) => item.getBoundingClientRect().top),
    );
    expect(Math.max(...positions) - Math.min(...positions)).toBeLessThan(1);
  }
});

test("search localizes and mirrors controls across language navigation", async ({
  page,
  isMobile,
}, info) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/search");
  for (const locale of ["en", "he", "en"]) {
    const input = page.locator(".pagefind-ui__search-input");
    await expect(page.locator("html")).toHaveAttribute("lang", locale);
    await expect(input).toHaveAttribute("placeholder", locale === "he" ? /חיפוש/ : /Search posts/);
    await input.fill(locale === "he" ? "החוזה" : "Hachozeh");
    const clear = page.getByRole("button", {
      name: locale === "he" ? "נקה" : "Clear",
      exact: true,
    });
    await expect(clear).toBeVisible();
    await expect(page.locator(".pagefind-ui__message")).toContainText(
      locale === "he" ? /תוצא/ : /result/,
    );
    if (locale === "he") {
      await expect(input).toHaveCSS("direction", "rtl");
      await expect(input).toHaveCSS("text-align", "start");
      const clearBox = await clear.boundingBox();
      const inputBox = await input.boundingBox();
      expect(clearBox!.x + clearBox!.width).toBeLessThan(inputBox!.x + inputBox!.width / 2);
      await page.screenshot({ path: info.outputPath("he-search.png") });
    }
    await clear.click();
    await expect(input).toHaveValue("");
    await expect(page).not.toHaveURL(/\?q=/);
    await input.fill("zxqvzzxqv");
    await expect(page.locator(".pagefind-ui__message")).toContainText(
      locale === "he" ? "לא נמצאו" : "No results",
    );
    if (isMobile) await page.locator("#menu-btn").click();
    await page.screenshot({ path: info.outputPath(`${locale}-menu.png`) });
    await page
      .getByRole("link", { name: locale === "he" ? "Switch to English" : "Switch to Hebrew" })
      .click();
  }
  expect(errors).toEqual([]);
});
