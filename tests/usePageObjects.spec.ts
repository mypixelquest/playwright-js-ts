import { test, expect } from "@playwright/test";
import { NavigationPage } from "../page-objects/navigationPage";
import { FormLayoutPage } from "../page-objects/formLayoutPage";
import { DatepickerPage } from "../page-objects/datePickerPAge";

// Navigate to the target page and set up the test environment before each test
test.beforeEach(async ({ page }) => {
  // Go to the base URL of the application
  await page.goto("http://localhost:4200/");
});

test("navigate to form page", async ({ page }) => {
  const navigateTo = new NavigationPage(page);
  await navigateTo.formLayoutPage();
  await navigateTo.datepickerPage();
  await navigateTo.smartTablePage();
  await navigateTo.toastrPage();
  await navigateTo.tooltipPage();
});

test("parameterized method", async ({ page }) => {
  const navigateTo = new NavigationPage(page);
  const onFormLayoutsPage = new FormLayoutPage(page);
  const onDatepickerPage = new DatepickerPage(page);

  await navigateTo.formLayoutPage();

  await onFormLayoutsPage.submitUsingTheGridFormWithCredentialsAndSelectOption(
    "test@test.com",
    "Welcome1",
    "Option 1"
  );
  await onFormLayoutsPage.submitInlineFormWithNameEmailAndCheckbox(
    "Jane Smith",
    "jane@gmail.com",
    true
  );

  await navigateTo.datepickerPage();
  await onDatepickerPage.selectCommonDatePickerDateFromToday(10);
});
