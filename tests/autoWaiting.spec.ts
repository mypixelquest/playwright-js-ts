import { expect, test } from "@playwright/test";

// Navigate to the AJAX testing page before each test
// Trigger the AJAX request by clicking the button
test.beforeEach(async ({ page }, testInfo) => {
  // Go to the AJAX testing page
  await page.goto("http://uitestingplayground.com/ajax");

  // Click the button to trigger the AJAX request
  await page.getByText("Button Triggering AJAX Request").click();

  // Extend the test timeout by 2 seconds to account for AJAX delays
  testInfo.setTimeout(testInfo.timeout + 2000);
});

test("should wait for the AJAX request to complete", async ({ page }) => {
  // Locate the element that will appear after the AJAX request completes
  const successButton = page.locator(".bg-success");

  // Uncomment this if you want to manually click the success button after it appears
  // await successButton.click();

  // Uncomment this to retrieve the text content of the success button
  // const text = await successButton.textContent();

  // Uncomment this to explicitly wait for the element to be attached to the DOM
  // await successButton.waitFor({ state: "attached" });

  // Uncomment this to retrieve all text contents of the success button
  // const text = await successButton.allTextContents();

  // Assert that the success button contains the expected text, with a timeout to wait for the AJAX request to complete
  await expect(successButton).toHaveText("Data loaded with AJAX get request.", {
    timeout: 20000,
  });
});

test("alternative waits", async ({ page }) => {
  // Locate the element that will appear after the AJAX request completes
  const successButton = page.locator(".bg-success");

  // Wait for the element to appear in the DOM
  // await page.waitForSelector(".bg-success");

  // Wait for a specific network response to be received
  // await page.waitForResponse("http://uitestingplayground.com/ajaxdata");

  // Wait for all network calls to be completed (Not recommended for AJAX-heavy pages as it may lead to flaky tests)
  await page.waitForLoadState("networkidle");

  // Retrieve all text contents of the success button
  const text = await successButton.allTextContents();

  // Assert that the retrieved text contains the expected message
  expect(text).toContain("Data loaded with AJAX get request.");
});

test("timeouts", async ({ page }) => {
  // test.setTimeout(10000);
  test.slow();

  const successButton = page.locator(".bg-success");

  // await successButton.click({ timeout: 16000 });
  await successButton.click();
});
