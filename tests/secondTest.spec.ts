import { test } from "@playwright/test";

// This hook runs before each test to navigate to the required page
test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
  await page.getByText("Forms").click();
  await page.getByText("Form Layouts").click();
});

// Test for demonstrating various locator syntax rules
test("Verify locator syntax examples", async ({ page }) => {
  // by tag name
  await page.locator("input").first().click();

  // by id
  page.locator("#inputEmail1");

  // by class value
  page.locator(".shape-rectangle");

  // by attribute
  page.locator('[placeholder="Email"]');

  // by class value (full)
  page.locator(
    '[class="input-full-width size-medium status-basic shape-rectangle nb-transition cdk-focused cdk-mouse-focused"]'
  );

  // chain locators
  page.locator('input[placeholder="Email"][nbinput]');

  // by Xpath (Not recommended)
  page.locator("//*[@id='inputEmail1']");

  // by partial text match
  page.locator(':text("Using")');

  // by text match
  page.locator(':text-is("Using the Grid")');
});

// Test for demonstrating user-facing locators
test("Verify user-facing locators", async ({ page }) => {
  // by role
  await page.getByRole("textbox", { name: "Email" }).first().click();
  await page.getByRole("button", { name: "Sign in" }).first().click();

  // by label
  await page.getByLabel("Email").first().click();

  // by placeholder
  await page.getByPlaceholder("Jane Doe").first().click();

  // by text
  await page.getByText("Using the Grid").click();

  // by TestID
  await page.getByTestId("Sign in").click();

  // by title
  await page.getByTitle("IoT Dashboard").click();
});

// Test for locating child elements using various strategies
test("Verify locating child elements", async ({ page }) => {
  // Locate child element using text match
  await page.locator("nb-card nb-radio :text-is('Option 1')").click();

  // Chaining locators to locate child elements
  await page
    .locator("nb-card")
    .locator("nb-radio")
    .locator(":text-is('Option 1')")
    .click();

  // Chaining locators to locate a button inside a card
  await page
    .locator("nb-card")
    .getByRole("button", { name: "Sign in" })
    .first()
    .click();

  // Using nth() to locate a specific child element (least preferred)
  await page.locator("nb-card").nth(3).getByRole("button").click();
});

// Test for locating parent elements using various strategies
test("Verify locating parent elements", async ({ page }) => {
  // Locate parent element by text content
  await page
    .locator("nb-card", { hasText: "Using the Grid" })
    .getByRole("textbox", { name: "Email" })
    .click();

  // Locate parent element by child element
  await page
    .locator("nb-card", { has: page.locator("#inputEmail1") })
    .getByRole("textbox", { name: "Email" })
    .click();

  // Filter parent element by text content
  await page
    .locator("nb-card")
    .filter({ hasText: "Basic form" })
    .getByRole("textbox", { name: "Email" })
    .click();

  // Filter parent element by child element
  await page
    .locator("nb-card")
    .filter({ has: page.locator(".status-danger") })
    .getByRole("textbox", { name: "Password" })
    .click();

  // Filter parent element by multiple child elements
  await page
    .locator("nb-card")
    .filter({ has: page.locator("nb-checkbox") })
    .filter({ hasText: "Sign in" })
    .getByRole("textbox", { name: "Password" })
    .click();

  // Not recommended: Locate parent element by Xpath
  await page
    .locator(':text-is("Using the Grid")')
    .locator("..")
    .getByRole("textbox", { name: "Password" })
    .click();
});
