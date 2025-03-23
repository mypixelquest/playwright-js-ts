import { test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
  await page.getByText("Forms").click();
  await page.getByText("Form Layouts").click();
});

test("Locator Syntax Rules", async ({ page }) => {
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

test("User facing locators ", async ({ page }) => {
  // by role
  await page.getByRole("textbox", { name: "Email" }).first().click();
  await page.getByRole("button", { name: "Sign in" }).first().click();

  // by label
  await page.getByLabel("Email").first().click();

  // by placeholder
  await page.getByPlaceholder("Jane Doe").first().click();

  // by text
  await page.getByText("Using the Grid").click();

  // by text TestID
  await page.getByTestId("Sign in").click();

  // by title
  await page.getByTitle("IoT Dashboard").click();
});
