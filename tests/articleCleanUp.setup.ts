import { test as setup, expect } from "@playwright/test";

setup("delete article", async ({ request }) => {
  const slugId = process.env["SLUGID"];
  const deleteResponse = await request.delete(
    `https://conduit-api.bondaracademy.com/api/articles/${slugId}`
  );

  expect(deleteResponse.status()).toEqual(204);
});
