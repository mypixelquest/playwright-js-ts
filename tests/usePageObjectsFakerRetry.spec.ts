import { test, expect } from "@playwright/test";
import { PageManager } from "../page-objects/pageManager";
import { faker } from "@faker-js/faker";

// test.describe.configure({ mode: "parallel" }); // Run tests in parallel

test.describe.only("Page Object Model with Faker", () => {
  // Override the retries for this test suite irrespective of the global config
  // This will retry each test in this suite 3 times if it fails
  test.describe.configure({ retries: 3 });
  // test.describe.configure({ mode: "serial" }); // Run tests in serial

  // Navigate to the target page and set up the test environment before each test
  test.beforeEach(async ({ page }) => {
    // Go to the base URL of the application
    await page.goto("http://localhost:4200/");
  });

  test("navigate to form page", async ({ page }, testInfo) => {
    if (testInfo.retry) {
      // Do something before retry: e.g. clean up data, log info, etc.
      console.log("Activity before retry will be done here");
    }
    const pm = new PageManager(page);

    await pm.navigateTo().formLayoutPage();
    await pm.navigateTo().datepickerPage();
    await pm.navigateTo().smartTablePage();
    await pm.navigateTo().toastrPage();
    await pm.navigateTo().tooltipPage();

    // Deliberately failing assertion for testing retries
    await expect(page.locator("non-existent-selector")).toHaveText(
      "This will fail"
    );
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
    await pm
      .onFormLayoutsPage()
      .submitInlineFormWithNameEmailAndCheckbox(
        randomFullName,
        randomEmail,
        true
      );
    // await pm.navigateTo().datepickerPage();
    // await pm.onDatepickerPage().selectCommonDatePickerDateFromToday(10);
    // await pm.onDatepickerPage().selectDatepickerWithRangeFromToday(6, 10);
  });
});
