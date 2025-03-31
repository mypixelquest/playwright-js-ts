import { test as base } from "@playwright/test";

export type TestOptions = {
  uitestingplaygroundURL: string;
};

export const test = base.extend<TestOptions>({
  uitestingplaygroundURL: ["", { option: true }],
});
