import { test, expect } from "@playwright/test";
import { NavigationPage } from "../page-objects/navigationPage";

// Navigate to the target page and set up the test environment before each test
test.beforeEach(async ({ page }) => {
  // Go to the base URL of the application
  await page.goto("http://localhost:4200/");
});

test("navigate to form page", async ({ page }) => {
  const navigationTo = new NavigationPage(page);
  await navigationTo.formLayoutPage();
});
