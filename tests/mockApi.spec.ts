import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.route("*//**/api/tags", async (route) => {
    const tags = {
      tags: ["tag-a", "tag-b", "tag-c", "tag-d"],
    };

    await route.fulfill({
      body: JSON.stringify(tags),
    });
  });

  await page.goto("https://conduit.bondaracademy.com/");
  await page.waitForTimeout(5000);
});

test("verify conduit title", async ({ page }) => {
  // Assert that the navbar brand contains the text 'conduit'
  await expect(page.locator(".navbar-brand")).toHaveText("conduit");
});
