import { test, expect } from "@playwright/test";
import { PageManager } from "../page-objects/pageManager";
import { faker } from "@faker-js/faker";

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
  // const randomFullName = faker.person.fullName();
  const randomFullName = `${faker.person.firstName()} ${faker.person.lastName()}`;
  const randomEmail = `${randomFullName.replace(" ", "")}${faker.number.int(
    1000
  )}@test.com`;

  await pm.navigateTo().formLayoutPage();

  await pm
    .onFormLayoutsPage()
    .submitUsingTheGridFormWithCredentialsAndSelectOption(
      "test@test.com",
      "Welcome1",
      "Option 1"
    );

  await page.screenshot({ path: "screenshots/formLayoutPage.png" });
  // just incase you want to save the screenshot as binary data
  const buffer = await page.screenshot();
  console.log(buffer.toString("base64"));
  await pm
    .onFormLayoutsPage()
    .submitInlineFormWithNameEmailAndCheckbox(
      randomFullName,
      randomEmail,
      true
    );
  await page
    .locator("nb-card", { hasText: "Inline form" })
    .screenshot({ path: "screenshots/inlineForm.png" });
  // await pm.navigateTo().datepickerPage();
  // await pm.onDatepickerPage().selectCommonDatePickerDateFromToday(10);
  // await pm.onDatepickerPage().selectDatepickerWithRangeFromToday(6, 10);
});
