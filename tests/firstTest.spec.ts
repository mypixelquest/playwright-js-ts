import { test } from "@playwright/test";

test("first test", () => {});

test.describe("test suite 1", () => {
  test("first test", () => {});
  test("second test", () => {});
  test("third test", () => {});
});
