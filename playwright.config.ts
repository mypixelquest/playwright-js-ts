import { defineConfig, devices } from "@playwright/test";
import type { TestOptions } from "./test-options";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, npm '.env') });

import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url"; // Import fileURLToPath

// Resolve __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from the .env file
dotenv.config({ path: path.resolve(__dirname, ".env") });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
// export default defineConfig({
export default defineConfig<TestOptions>({
  // timeout: 40000,
  // globalTimeout: 60000,
  // expect: { timeout: 20000 },
  testDir: "./tests",
  testIgnore: [
    "**/test-data/**", // Ignore the test-data folder
  ],
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  // retries: process.env.CI ? 2 : 1, // 1 retry for local
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',
    // baseURL: "http://localhost:4200/",
    uitestingplaygroundURL: "http://uitestingplayground.com/ajax",
    baseURL:
      process.env.DEV === "1"
        ? "http://localhost:4200/"
        : process.env.QA === "1"
        ? "http://localhost:4201/"
        : "http://localhost:4200/",

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
    // trace: "on",
    // actionTimeout: 5000,
    // navigationTimeout: 5000,
    extraHTTPHeaders: {
      Authorization: `Token ${process.env.ACCESS_TOKEN}`,
    },
    // video: "on",
    // Specify the video size 720p
    // video: {
    //   mode: "on",
    //   size: { width: 1280, height: 720 },
    // },
  },

  /* Configure projects for major browsers */
  projects: [
    { name: "setup", testMatch: "auth.setup.ts" },
    {
      name: "articleCleanUp",
      testMatch: "articleCleanUp.setup.ts",
    },
    {
      name: "articleSetup",
      testMatch: "newArticle.setup.ts",
      dependencies: ["setup"],
      teardown: "articleCleanUp",
    },
    {
      name: "likeCounter",
      testMatch: "likesCounter.spec.ts",
      use: { ...devices["Desktop Chrome"], storageState: ".auth/user.json" },
      dependencies: ["articleSetup"],
    },
    {
      name: "pageObjectsFullScreen",
      testMatch: "usePageObjectsFakerScreenshotVideo.spec.ts",
      use: {
        video: {
          mode: "on",
          size: { width: 1920, height: 1080 },
        },
      },
    },

    // dev and staging
    // {
    //   name: "dev",
    //   use: { ...devices["Desktop Chrome"], baseURL: "http://localhost:4201/" },
    // },
    // {
    //   name: "staging",
    //   use: {
    //     ...devices["Desktop Chrome"],
    //     baseURL: "http://localhost:4202/",
    //   },
    // },

    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"], storageState: ".auth/user.json" },
      dependencies: ["setup"],
    },

    // {
    //   name: "chromium",
    //   use: { ...devices["Desktop Chrome"] },
    // },

    // // just incase we need to run tests in parallel only on chromium
    // {
    //   name: "chromium-parellel",
    //   use: { ...devices["Desktop Chrome"] },
    //   fullyParallel: true,
    // },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"], storageState: ".auth/user.json" },
      dependencies: ["setup"],
    },

    // {
    //   name: "firefox",
    //   use: { ...devices["Desktop Firefox"] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
