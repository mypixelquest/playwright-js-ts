import { test, expect, request } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.route("*/**/api/tags", async (route) => {
    const tags = {
      tags: ["tag-a", "tag-b", "tag-c", "tag-d"],
    };

    await route.fulfill({
      body: JSON.stringify(tags),
    });
  });

  await page.goto("https://conduit.bondaracademy.com/");
  //   await page.waitForTimeout(5000);
  await page.getByText("Sign in").click();
  await page
    .getByRole("textbox", { name: "Email" })
    .fill("usertest2025@gmail.com");
  await page.getByRole("textbox", { name: "Password" }).fill("user_test_2025");
  await page.getByRole("button").click();
});

test("should modify and verify article title and description in the Global Feed", async ({
  page,
}) => {
  await page.route("*/**/api/articles*", async (route) => {
    const response = await route.fetch();
    const responseBody = await response.json();
    responseBody.articles[0].title = "modified title";
    responseBody.articles[0].description = "modified description";

    await route.fulfill({
      body: JSON.stringify(responseBody),
    });
  });

  await page.getByText("Global Feed").click();
  await expect(page.locator(".navbar-brand")).toHaveText("conduit");
  await expect(page.locator("app-article-list h1").first()).toContainText(
    "modified title"
  );
  await expect(page.locator("app-article-list p").first()).toContainText(
    "modified description"
  );
});

test("should create and delete an article using API", async ({
  page,
  request,
}) => {
  const response = await request.post(
    "https://conduit-api.bondaracademy.com/api/users/login",
    {
      data: {
        user: { email: "usertest2025@gmail.com", password: "user_test_2025" },
      },
    }
  );

  const responseBody = await response.json();
  const accessToken = responseBody.user.token;

  const articleRespose = await request.post(
    "https://conduit-api.bondaracademy.com/api/articles/",
    {
      data: {
        article: {
          body: "article from api - body",
          description: "article from api - description",
          tagList: ["tag from api"],
          title: "article from api - title",
        },
      },
      headers: {
        Authorization: `Token ${accessToken}`,
      },
    }
  );
  expect(articleRespose.status()).toBe(201);

  await page.getByText("Global Feed").click();
  await page.getByText("article from api - title").click();
  await page.getByRole("button", { name: "Delete Article" }).first().click();

  await expect(page.locator("app-article-list p").first()).not.toContainText(
    "article from api"
  );
});

test("should create an article via UI and delete it using API", async ({
  page,
  request,
}) => {
  await page.getByText("New Article").click();
  await page
    .getByRole("textbox", { name: "Article Title" })
    .fill("Playwright is awesome");
  await page
    .getByRole("textbox", { name: "What's this article about?" })
    .fill("About the Playwright");
  await page
    .getByRole("textbox", { name: "Write your article (in markdown)" })
    .fill("We like to use Playwright for automation");
  await page.getByRole("button", { name: "Publish Article" }).click();

  const articleResponse = await page.waitForResponse(
    "https://conduit-api.bondaracademy.com/api/articles/"
  );
  const articleResponseBody = await articleResponse.json();
  const slugId = articleResponseBody.article.slug;
  console.log("slugId", slugId);

  await expect(page.locator(".article-page h1")).toContainText(
    "Playwright is awesome"
  );
  await page.getByText("Home").click();
  await page.getByText("Global Feed").click();

  await expect(page.locator("app-article-list h1").first()).toContainText(
    "Playwright is awesome"
  );

  const response = await request.post(
    "https://conduit-api.bondaracademy.com/api/users/login",
    {
      data: {
        user: { email: "usertest2025@gmail.com", password: "user_test_2025" },
      },
    }
  );

  const responseBody = await response.json();
  const accessToken = responseBody.user.token;

  const deleteArticleResponse = await request.delete(
    `https://conduit-api.bondaracademy.com/api/articles/${slugId}`,
    {
      headers: {
        Authorization: `Token ${accessToken}`,
      },
    }
  );

  expect(deleteArticleResponse.status()).toEqual(204);
});
