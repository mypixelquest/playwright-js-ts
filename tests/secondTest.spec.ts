import { expect, test } from "@playwright/test";

// Navigate to the required page before each test
test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
  await page.getByText("Forms").click();
  await page.getByText("Form Layouts").click();
});

// Test for demonstrating various locator syntax rules
test("Verify locator syntax examples", async ({ page }) => {
  await page.locator("input").first().click(); // by tag name
  page.locator("#inputEmail1"); // by id
  page.locator(".shape-rectangle"); // by class value
  page.locator('[placeholder="Email"]'); // by attribute
  page.locator(
    '[class="input-full-width size-medium status-basic shape-rectangle nb-transition cdk-focused cdk-mouse-focused"]'
  ); // by full class value
  page.locator('input[placeholder="Email"][nbinput]'); // chain locators
  page.locator("//*[@id='inputEmail1']"); // by Xpath (not recommended)
  page.locator(':text("Using")'); // by partial text match
  page.locator(':text-is("Using the Grid")'); // by text match
});

// Test for demonstrating user-facing locators
test("Verify user-facing locators", async ({ page }) => {
  await page.getByRole("textbox", { name: "Email" }).first().click(); // by role
  await page.getByRole("button", { name: "Sign in" }).first().click();
  await page.getByLabel("Email").first().click(); // by label
  await page.getByPlaceholder("Jane Doe").first().click(); // by placeholder
  await page.getByText("Using the Grid").click(); // by text
  await page.getByTestId("Sign in").click(); // by TestID
  await page.getByTitle("IoT Dashboard").click(); // by title
});

// Test for locating child elements using various strategies
test("Verify locating child elements", async ({ page }) => {
  await page.locator("nb-card nb-radio :text-is('Option 1')").click(); // Locate child element using text match
  await page
    .locator("nb-card")
    .locator("nb-radio")
    .locator(":text-is('Option 1')")
    .click(); // Chaining locators
  await page
    .locator("nb-card")
    .getByRole("button", { name: "Sign in" })
    .first()
    .click(); // Locate button inside a card
  await page.locator("nb-card").nth(3).getByRole("button").click(); // Locate specific child element using nth()
});

// Test for locating parent elements using various strategies
test("Verify locating parent elements", async ({ page }) => {
  await page
    .locator("nb-card", { hasText: "Using the Grid" })
    .getByRole("textbox", { name: "Email" })
    .click(); // Locate parent by text content
  await page
    .locator("nb-card", { has: page.locator("#inputEmail1") })
    .getByRole("textbox", { name: "Email" })
    .click(); // Locate parent by child element
  await page
    .locator("nb-card")
    .filter({ hasText: "Basic form" })
    .getByRole("textbox", { name: "Email" })
    .click(); // Filter parent by text content
  await page
    .locator("nb-card")
    .filter({ has: page.locator(".status-danger") })
    .getByRole("textbox", { name: "Password" })
    .click(); // Filter parent by child element
  await page
    .locator("nb-card")
    .filter({ has: page.locator("nb-checkbox") })
    .filter({ hasText: "Sign in" })
    .getByRole("textbox", { name: "Password" })
    .click(); // Filter parent by multiple child elements
  await page
    .locator(':text-is("Using the Grid")')
    .locator("..")
    .getByRole("textbox", { name: "Password" })
    .click(); // Locate parent by Xpath (not recommended)
});

// Test for reusing locators to simplify and optimize code
test("Reusing locators", async ({ page }) => {
  const basicForm = page.locator("nb-card", { hasText: "Basic form" }); // Locate the "Basic form" card
  const emailInput = basicForm.getByRole("textbox", { name: "Email" }); // Locate email input field within the card

  await emailInput.fill("test@123"); // Fill email input
  await basicForm.getByRole("textbox", { name: "Password" }).fill("Welcome123"); // Fill password input
  await basicForm.locator("nb-checkbox").click(); // Click checkbox
  await basicForm.getByRole("button", { name: "Submit" }).click(); // Click submit button
  await expect(emailInput).toHaveValue("test@123"); // Verify email input value
});
