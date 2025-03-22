import { test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
});

test.describe("suite1", () => {
  test.beforeEach(async ({ page }) => {
    await page.getByText("Charts").click();
  });

  test("navigate to the form layouts", async ({ page }) => {
    await page.getByText("Form Layouts").click();
  });

  test("navigate to the datepicker page", async ({ page }) => {
    await page.getByText("Datepicker").click();
  });
});

test.describe.only("suite2", () => {
  test.beforeEach(async ({ page }) => {
    await page.getByText("Forms").click();
  });

  test("test3 ", async ({ page }) => {
    await page.getByText("Form Layouts").click();
  });

  test("test4", async ({ page }) => {
    await page.getByText("Datepicker").click();
  });
});
