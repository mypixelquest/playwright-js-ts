import { type Page, expect } from "@playwright/test";

// This class represents the page object for interacting with a date picker component.
export class DatepickerPage {
  private readonly page: Page;

  // Constructor to initialize the page object with the Playwright Page instance.
  constructor(page: Page) {
    this.page = page;
  }

  // Method to select a date from the "Common Date Picker" input field based on the number of days from today.
  async selectCommonDatePickerDateFromToday(numberOfDaysFromToday: number) {
    const calendarInputField = this.page.getByPlaceholder("Form Picker"); // Locate the input field by its placeholder.
    await calendarInputField.click(); // Open the date picker.
    const dateToAssert = await this.selectDateInTheCalendar(
      numberOfDaysFromToday
    ); // Select the desired date in the calendar.

    await expect(calendarInputField).toHaveValue(dateToAssert); // Assert that the input field has the correct value.
  }

  // Method to select a date range from the "Range Picker" input field based on start and end days from today.
  async selectDatepickerWithRangeFromToday(
    startDayFromToday: number,
    endDayFromToday: number
  ) {
    const calendarInputField = this.page.getByPlaceholder("Range Picker"); // Locate the input field by its placeholder.
    await calendarInputField.click(); // Open the date picker.

    const dateToAssertStart = await this.selectDateInTheCalendar(
      startDayFromToday
    ); // Select the start date in the calendar.
    const dateToAssertEnd = await this.selectDateInTheCalendar(endDayFromToday); // Select the end date in the calendar.
    const dateToAssert = `${dateToAssertStart} - ${dateToAssertEnd}`; // Format the date range.

    await expect(calendarInputField).toHaveValue(dateToAssert); // Assert that the input field has the correct value.
  }

  // Private helper method to select a specific date in the calendar based on the number of days from today.
  private async selectDateInTheCalendar(numberOfDaysFromToday: number) {
    let date = new Date();
    date.setDate(date.getDate() + numberOfDaysFromToday); // Calculate the target date.
    const expectedDate = date.getDate().toString(); // Extract the day of the month.
    const expectedMonthShot = date.toLocaleString("En-US", {
      month: "short",
    }); // Get the short month name.
    const expectedMonthLong = date.toLocaleString("En-US", {
      month: "long",
    }); // Get the full month name.
    const expectedYear = date.getFullYear(); // Get the year.
    const dateToAssert = `${expectedMonthShot} ${expectedDate}, ${expectedYear}`; // Format the date for assertion.

    let calendarMonthAndYear = await this.page
      .locator("nb-calendar-view-mode")
      .textContent(); // Get the current month and year displayed in the calendar.
    const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}`; // Format the expected month and year.

    // Navigate the calendar until the correct month and year are displayed.
    while (!calendarMonthAndYear?.includes(expectedMonthAndYear)) {
      await this.page
        .locator("nb-calendar-pageable-navigation [data-name='chevron-right']")
        .click(); // Click the "next" button to navigate the calendar.
      calendarMonthAndYear = await this.page
        .locator("nb-calendar-view-mode")
        .textContent(); // Update the displayed month and year.
    }

    // Select the desired day in the calendar.
    await this.page
      .locator(".day-cell.ng-star-inserted")
      .getByText(expectedDate, { exact: true })
      .click();

    return dateToAssert; // Return the formatted date for assertion.
  }
}
