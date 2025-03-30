import { test } from "@playwright/test";

// Global setup: Navigate to the base URL before each test
test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
});

// Test suite 1: Tests related to "Charts" navigation
test.describe("Charts Navigation Tests", () => {
  // Suite-specific setup: Click on "Charts" before each test in this suite
  test.beforeEach(async ({ page }) => {
    await page.getByText("Charts").click();
  });

  // Test 1: Verify navigation to the "Form Layouts" page from Charts
  test("should navigate to the Form Layouts page from Charts", async ({
    page,
  }) => {
    await page.getByText("Form Layouts").click();
  });

  // Test 2: Verify navigation to the "Datepicker" page from Charts
  test("should navigate to the Datepicker page from Charts", async ({
    page,
  }) => {
    await page.getByText("Datepicker").click();
  });
});

// Test suite 2: Tests related to "Forms" navigation
test.describe("Forms Navigation Tests", () => {
  // Suite-specific setup: Click on "Forms" before each test in this suite
  test.beforeEach(async ({ page }) => {
    await page.getByText("Forms").click();
  });

  // Test 3: Verify navigation to the "Form Layouts" page from Forms
  test("should navigate to the Form Layouts page from Forms", async ({
    page,
  }) => {
    await page.getByText("Form Layouts").click();
  });

  // Test 4: Verify navigation to the "Datepicker" page from Forms
  test("should navigate to the Datepicker page from Forms", async ({
    page,
  }) => {
    await page.getByText("Datepicker").click();
  });
});
