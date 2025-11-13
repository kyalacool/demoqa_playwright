import { type Page, type Locator, expect } from "@playwright/test";

export const expectedElementsPageUrls = [
  { menuItem: "Text Box", expectedURL: "/text-box" },
  { menuItem: "Check Box", expectedURL: "/checkbox" },
  { menuItem: "Radio Button", expectedURL: "/radio-button" },
  { menuItem: "Web Tables", expectedURL: "/webtables" },
  { menuItem: "Buttons", expectedURL: "/buttons" },
  { menuItem: "Links", expectedURL: "/links" },
  { menuItem: "Broken Links - Images", expectedURL: "/broken" },
  { menuItem: "Upload and Download", expectedURL: "/upload-download" },
  { menuItem: "Dynamic Properties", expectedURL: "/dynamic-properties" },
];

export class ElementsPage {
  readonly menuItems: Locator;

  constructor(public readonly page: Page) {
    this.menuItems = page.getByRole("listitem");
  }

  async verifyPageVisibility() : Promise<this>{
    await expect.soft(this.page).toHaveTitle("DEMOQA");
    await expect.soft(this.page.getByRole("contentinfo")).toContainText("ALL RIGHTS RESERVED.");
    await expect.soft(this.page).toHaveURL("/elements")
    return this
  }

  async verifySubMenuNames(){
    await expect(this.menuItems).toHaveText(expectedElementsPageUrls.map((n) => n.menuItem));
  }

  async verifySubMenuUrls(name : string, url : string){
      await this.clickOnMenu(name);
      await expect(this.page).toHaveURL(url);
  }


  async clickOnMenu(name: string) {
    const button = this.page.getByText(name, { exact: true });
    await button.click();
  }
}
