import { type Page } from "@playwright/test";
import { NavigationPage } from "../page-objects/navigationPage";
import { FormLayoutPage } from "../page-objects/formLayoutPage";
import { DatepickerPage } from "../page-objects/datePickerPAge";

export class PageManager {
  private readonly page: Page;

  private readonly navigationPage: NavigationPage;
  private readonly formLayoutPage: FormLayoutPage;
  private readonly datepickerPage: DatepickerPage;
  constructor(page: Page) {
    this.page = page;
    this.navigationPage = new NavigationPage(this.page);
    this.formLayoutPage = new FormLayoutPage(this.page);
    this.datepickerPage = new DatepickerPage(this.page);
  }

  navigateTo() {
    return this.navigationPage;
  }
  onFormLayoutsPage() {
    return this.formLayoutPage;
  }
  onDatepickerPage() {
    return this.datepickerPage;
  }
}
