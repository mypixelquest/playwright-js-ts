import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.route("*/**/api/tags", async (route) => {
    const tags = {
      tags: ["tag-a", "tag-b", "tag-c", "tag-d"],
    };

    await route.fulfill({
      body: JSON.stringify(tags),
    });
  });

  await page.route("*/**/api/articles*", async (route) => {
    const response = await route.fetch();
    const responseBody = await response.json();
    responseBody.articles[0].title = "modified title";
    responseBody.articles[0].description = "modified description";

    await route.fulfill({
      body: JSON.stringify(responseBody),
    });
  });

  await page.goto("https://conduit.bondaracademy.com/");
  await page.waitForTimeout(5000);
});

test("Verification", async ({ page }) => {
  // Assert that the navbar brand contains the text 'conduit'
  await expect(page.locator(".navbar-brand")).toHaveText("conduit");
  await expect(page.locator("app-article-list h1").first()).toContainText(
    "modified title"
  );
  await expect(page.locator("app-article-list p").first()).toContainText(
    "modified description"
  );
});
