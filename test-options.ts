import { test as base } from "@playwright/test";
import { PageManager } from "../playwright-js-ts/page-objects/pageManager";

export type TestOptions = {
  uitestingplaygroundURL: string;
  formsLayoutPage: string;
  pageManager: PageManager;
};

export const test = base.extend<TestOptions>({
  uitestingplaygroundURL: ["", { option: true }],

  // formsLayoutPage: [
  //   async ({ page }, use) => {
  //     // anything you want to do before the test
  //     console.log("before test");
  //     await page.goto("/");
  //     await page.getByText("Forms").click();
  //     await page.getByText("Form Layouts").click();
  //     await use("");
  //     // anything you want to do after the test
  //     console.log("after test");
  //   },
  //   { option: true, auto: true }, // auto: true means it will be called before each test
  // ],

  formsLayoutPage: async ({ page }, use) => {
    // anything you want to do before the test
    console.log("before test");
    await page.goto("/");
    await page.getByText("Forms").click();
    await page.getByText("Form Layouts").click();
    await use("");
    // anything you want to do after the test
    console.log("after test");
  },

  // pageManager: async ({ page }, use) => {
  //   const pm = new PageManager(page);
  //   await use(pm);
  // },

  pageManager: async ({ page, formsLayoutPage }, use) => {
    // fixture depends on another fixture e.g formsLayoutPage
    const pm = new PageManager(page);
    await use(pm);
  },
});
