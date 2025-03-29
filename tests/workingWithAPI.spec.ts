import { test, expect } from "@playwright/test";
import tags from "./test-data/tags.json";

test.beforeEach(async ({ page }) => {
  await page.route(
    "https://conduit-api.bondaracademy.com/api/tags",
    async (route) => {
      console.log("✅ Intercepted and fulfilled API call to /api/tags");
      await route.fulfill({
        body: JSON.stringify(tags),
      });
    }
  );

  await page.goto("https://conduit.bondaracademy.com/");
  await page.waitForTimeout(5000);
  console.log("✅ Navigated to the base URL");
});

test("verify conduit title", async ({ page }) => {
  // Assert that the navbar brand contains the text 'conduit'
  await expect(page.locator(".navbar-brand")).toHaveText("conduit");
});
