import { expect } from "@playwright/test";
import { PageManager } from "../page-objects/pageManager";
import { faker } from "@faker-js/faker";
import { test } from "../test-options";

// using fixtures paageManager and formsLayoutPage
test("parameterized method", async ({ pageManager, formsLayoutPage }) => {
  console.log("test started");
  const randomFullName = `${faker.person.firstName()} ${faker.person.lastName()}`;
  const randomEmail = `${randomFullName.replace(" ", "")}${faker.number.int(
    1000
  )}@test.com`;

  await pageManager
    .onFormLayoutsPage()
    .submitUsingTheGridFormWithCredentialsAndSelectOption(
      process.env.USERNAME!,
      process.env.PASSWORD!,
      "Option 1"
    );
  await pageManager
    .onFormLayoutsPage()
    .submitInlineFormWithNameEmailAndCheckbox(
      randomFullName,
      randomEmail,
      true
    );
});
