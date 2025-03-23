import { expect, test } from "@playwright/test";

// Navigate to the target page and set up the test environment before each test
test.beforeEach(async ({ page }) => {
  // Go to the base URL of the application
  await page.goto("http://localhost:4200/");

  // Navigate to the "Forms" section
  await page.getByText("Forms").click();

  // Navigate to the "Form Layouts" page
  await page.getByText("Form Layouts").click();
});

test("Extracting values", async ({ page }) => {
  // Locate the "Basic form" card
  const basicForm = page.locator("nb-card", { hasText: "Basic form" });

  // Verify the text of the button inside the "Basic form" card
  const buttonText = await basicForm.locator("button").textContent();
  expect(buttonText).toBe("Submit");

  // Verify the text content of all radio button labels
  const allRadioButtonLabels = await page.locator("nb-radio").allTextContents();
  expect(allRadioButtonLabels).toContain("Option 1");

  // Locate the email input field inside the "Basic form" card
  const emailField = basicForm.getByRole("textbox", { name: "Email" });

  // Fill the email input field with a value
  await emailField.fill("test@123");

  // Validate the value of the email input field
  const emailFieldValue = await emailField.inputValue();
  expect(emailFieldValue).toBe("test@123");

  // Validate the placeholder attribute of the email input field
  const placeholderValue = await emailField.getAttribute("placeholder");
  expect(placeholderValue).toBe("Email");
});

test("Assertions", async ({ page }) => {
  // Locate the button inside the "Basic form" card
  const basicFormButton = page
    .locator("nb-card", { hasText: "Basic form" })
    .locator("button");

  // General assertions
  const value = 5;
  expect(value).toEqual(5);

  // Verify the text content of the button
  const text = await basicFormButton.textContent();
  expect(text).toBe("Submit");

  // Locator Assertions
  await expect(basicFormButton).toHaveText("Submit");

  // Soft Assertions
  await expect.soft(basicFormButton).toHaveText("Submit");
  await basicFormButton.click(); // Click the button
});
