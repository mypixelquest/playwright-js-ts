import { expect, test } from "@playwright/test";

import { NavigationPage } from "../page-objects/navigationPage";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
});

test("Extracting values", async ({ page }) => {
  await page.getByText("Forms").click();
  await page.getByText("Form Layouts").click();
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
