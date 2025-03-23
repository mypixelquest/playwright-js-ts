import { expect, test } from "@playwright/test";

// Navigate to the target page and set up the test environment before each test
test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
  await page.getByText("Forms").click();
  await page.getByText("Form Layouts").click();
});

test("Extracting values", async ({ page }) => {
  // Verify the text of a button inside the "Basic form" card
  const basicForm = page.locator("nb-card", { hasText: "Basic form" });
  const buttonText = await basicForm.locator("button").textContent();
  expect(buttonText).toBe("Submit");

  // Verify the text content of all radio button labels
  const allRadioButtonLabels = await page.locator("nb-radio").allTextContents();
  expect(allRadioButtonLabels).toContain("Option 1");

  // Fill the email input field and validate its value and placeholder
  const emailField = basicForm.getByRole("textbox", { name: "Email" });
  await emailField.fill("test@123");
  const emailFieldValue = await emailField.inputValue();
  expect(emailFieldValue).toBe("test@123");

  const placeholderValue = await emailField.getAttribute("placeholder");
  expect(placeholderValue).toBe("Email");
});
