import { test, expect } from "@playwright/test";

for (const prefix of ["", "/he"]) {
  test(`about copy, markdown and responsive layout: ${prefix || "en"}`, async ({
    page,
    request,
  }, info) => {
    await page.goto(`${prefix}/about`);
    await expect(page.locator("h1")).toHaveText(prefix ? "אודות" : "About");
    await expect(page.locator("html")).toHaveAttribute("dir", prefix ? "rtl" : "ltr");
    const paragraphs = page.locator("#about > div:first-of-type > div:last-child > p");
    await expect(paragraphs).toHaveCount(3);
    await expect(paragraphs.first()).toContainText(
      prefix ? "מערך הדיגיטל הלאומי" : "National Digital Agency",
    );
    await expect(paragraphs.last()).toContainText(
      prefix ? "לקחת אחריות על התוצאה" : "taking responsibility for making it work",
    );
    await expect(page.locator(`#about a[href="${prefix}/portfolio"]`)).toBeVisible();
    const photo = page.locator('img[src="/omri-profile.jpg"]');
    await expect
      .poll(() =>
        photo.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0),
      )
      .toBe(true);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(
      true,
    );
    const markdown = await request.get(`${prefix}/about.md`);
    expect(markdown.status()).toBe(200);
    // Rendered MDX uses smart punctuation; the Markdown route preserves the source.
    const renderedCopy = (await paragraphs.first().innerText()).replaceAll("\u2019", "'");
    expect(await markdown.text()).toContain(renderedCopy);
    await page.screenshot({ path: info.outputPath("about.png"), fullPage: true, scale: "css" });
  });
}
