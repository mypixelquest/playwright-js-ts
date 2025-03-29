import { test, expect } from "@playwright/test";
import { PageManager } from "../page-objects/pageManager";

// Navigate to the target page and set up the test environment before each test
test.beforeEach(async ({ page }) => {
  // Go to the base URL of the application
  await page.goto("http://localhost:4200/");
});

test("navigate to form page", async ({ page }) => {
  const pm = new PageManager(page);

  await pm.navigateTo().formLayoutPage();
  await pm.navigateTo().datepickerPage();
  await pm.navigateTo().smartTablePage();
  await pm.navigateTo().toastrPage();
  await pm.navigateTo().tooltipPage();
});

test("parameterized method", async ({ page }) => {
  const pm = new PageManager(page);

  await pm.navigateTo().formLayoutPage();

  await pm
    .onFormLayoutsPage()
    .submitUsingTheGridFormWithCredentialsAndSelectOption(
      "test@test.com",
      "Welcome1",
      "Option 1"
    );
  await pm
    .onFormLayoutsPage()
    .submitInlineFormWithNameEmailAndCheckbox(
      "Jane Smith",
      "jane@gmail.com",
      true
    );
  await pm.navigateTo().datepickerPage();
  await pm.onDatepickerPage().selectCommonDatePickerDateFromToday(10);
  await pm.onDatepickerPage().selectDatepickerWithRangeFromToday(6, 10);
});
