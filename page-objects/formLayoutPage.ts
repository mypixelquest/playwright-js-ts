import { type Page } from "@playwright/test";

// This class represents the page object for the Form Layout Page
export class FormLayoutPage {
  private readonly page: Page;

  // Constructor to initialize the page object
  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Submits the "Using the Grid" form with the provided credentials and selects a radio option.
   * @param email - The email to fill in the form.
   * @param password - The password to fill in the form.
   * @param optionText - The text of the radio option to select.
   */
  async submitUsingTheGridFormWithCredentialsAndSelectOption(
    email: string,
    password: string,
    optionText: string
  ) {
    // Locate the "Using the Grid" form card
    const usingTheGridForm = this.page.locator("nb-card", {
      hasText: "Using the Grid",
    });

    // Fill in the email field
    await usingTheGridForm.getByRole("textbox", { name: "Email" }).fill(email);

    // Fill in the password field
    await usingTheGridForm
      .getByRole("textbox", { name: "Password" })
      .fill(password);

    // Select the radio option with the specified text
    await usingTheGridForm
      .getByRole("radio", { name: optionText })
      .check({ force: true });

    // Click the submit button
    await usingTheGridForm.getByRole("button").click();
  }

  /**
   * Submits the "Inline form" with the provided name, email, and checkbox state.
   * @param name - The name to fill in the form.
   * @param email - The email to fill in the form.
   * @param rememberMe - Whether to check the "Remember Me" checkbox.
   */
  async submitInlineFormWithNameEmailAndCheckbox(
    name: string,
    email: string,
    rememberMe: boolean
  ) {
    // Locate the "Inline form" card
    const inlineForm = this.page.locator("nb-card", { hasText: "Inline form" });

    // Fill in the name field
    await inlineForm.getByRole("textbox", { name: "Jane Doe" }).fill(name);

    // Fill in the email field
    await inlineForm.getByRole("textbox", { name: "Email" }).fill(email);

    // Check the "Remember Me" checkbox if specified
    if (rememberMe)
      await inlineForm.getByRole("checkbox").check({ force: true });

    // Click the submit button
    await inlineForm.getByRole("button").click();
  }
}
