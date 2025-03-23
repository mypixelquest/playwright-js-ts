import { expect, test } from "@playwright/test";

// Navigate to the required page before each test
test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
  await page.getByText("Forms").click();
  await page.getByText("Form Layouts").click();
});

// Test for demonstrating various locator syntax rules
test("Verify locator syntax examples", async ({ page }) => {
  // Locate by tag name
  await page.locator("input").first().click();

  // Locate by id
  page.locator("#inputEmail1");

  // Locate by class value
  page.locator(".shape-rectangle");

  // Locate by attribute
  page.locator('[placeholder="Email"]');

  // Locate by full class value
  page.locator(
    '[class="input-full-width size-medium status-basic shape-rectangle nb-transition cdk-focused cdk-mouse-focused"]'
  );

  // Chain locators
  page.locator('input[placeholder="Email"][nbinput]');

  // Locate by Xpath (not recommended)
  page.locator("//*[@id='inputEmail1']");

  // Locate by partial text match
  page.locator(':text("Using")');

  // Locate by text match
  page.locator(':text-is("Using the Grid")');
});

// Test for demonstrating user-facing locators
test("Verify user-facing locators", async ({ page }) => {
  // Locate by role
  await page.getByRole("textbox", { name: "Email" }).first().click();

  // Locate by role (button)
  await page.getByRole("button", { name: "Sign in" }).first().click();

  // Locate by label
  await page.getByLabel("Email").first().click();

  // Locate by placeholder
  await page.getByPlaceholder("Jane Doe").first().click();

  // Locate by text
  await page.getByText("Using the Grid").click();

  // Locate by TestID
  await page.getByTestId("Sign in").click();

  // Locate by title
  await page.getByTitle("IoT Dashboard").click();
});

// Test for locating child elements using various strategies
test("Verify locating child elements", async ({ page }) => {
  // Locate child element using text match
  await page.locator("nb-card nb-radio :text-is('Option 1')").click();

  // Chaining locators
  await page
    .locator("nb-card")
    .locator("nb-radio")
    .locator(":text-is('Option 1')")
    .click();

  // Locate button inside a card
  await page
    .locator("nb-card")
    .getByRole("button", { name: "Sign in" })
    .first()
    .click();

  // Locate specific child element using nth()
  await page.locator("nb-card").nth(3).getByRole("button").click();
});

// Test for locating parent elements using various strategies
test("Verify locating parent elements", async ({ page }) => {
  // Locate parent by text content
  await page
    .locator("nb-card", { hasText: "Using the Grid" })
    .getByRole("textbox", { name: "Email" })
    .click();

  // Locate parent by child element
  await page
    .locator("nb-card", { has: page.locator("#inputEmail1") })
    .getByRole("textbox", { name: "Email" })
    .click();

  // Filter parent by text content
  await page
    .locator("nb-card")
    .filter({ hasText: "Basic form" })
    .getByRole("textbox", { name: "Email" })
    .click();

  // Filter parent by child element
  await page
    .locator("nb-card")
    .filter({ has: page.locator(".status-danger") })
    .getByRole("textbox", { name: "Password" })
    .click();

  // Filter parent by multiple child elements
  await page
    .locator("nb-card")
    .filter({ has: page.locator("nb-checkbox") })
    .filter({ hasText: "Sign in" })
    .getByRole("textbox", { name: "Password" })
    .click();

  // Locate parent by Xpath (not recommended)
  await page
    .locator(':text-is("Using the Grid")')
    .locator("..")
    .getByRole("textbox", { name: "Password" })
    .click();
});

// Test for reusing locators to simplify and optimize code
test("Reusing locators", async ({ page }) => {
  // Locate the "Basic form" card
  const basicForm = page.locator("nb-card", { hasText: "Basic form" });

  // Locate email input field within the card
  const emailInput = basicForm.getByRole("textbox", { name: "Email" });

  // Fill email input
  await emailInput.fill("test@123");

  // Fill password input
  await basicForm.getByRole("textbox", { name: "Password" }).fill("Welcome123");

  // Click checkbox
  await basicForm.locator("nb-checkbox").click();

  // Click submit button
  await basicForm.getByRole("button", { name: "Submit" }).click();

  // Verify email input value
  await expect(emailInput).toHaveValue("test@123");
});
