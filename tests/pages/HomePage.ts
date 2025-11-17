import {type Page, type Locator, expect} from "@playwright/test"

export const expectedHomePageUrls = [
  { menuItem: "Elements", expectedURL: "/elements" },
  { menuItem: "Forms", expectedURL: "/forms" },
  { menuItem: "Alerts, Frame & Windows", expectedURL: "/alertsWindows" },
  { menuItem: "Widgets", expectedURL: "/widgets" },
  { menuItem: "Interactions", expectedURL: "/interaction" },
  { menuItem: "Book Store Application", expectedURL: "/books" },
];

export class HomePage{
    readonly menuItem : Locator

    constructor(public readonly page:Page){
        this.menuItem = page.getByRole("heading", {level:5})
        }

    async verifyPageVisibility(){
      await expect.soft(this.page).toHaveTitle("DEMOQA");
      await expect.soft(this.page.getByRole("contentinfo")).toContainText("ALL RIGHTS RESERVED.");
      await expect.soft(this.page).toHaveURL("/")
    }    

    async verifyMenuNames(){
      await expect(this.menuItem).toHaveText(expectedHomePageUrls.map(n => n.menuItem));
    }

    async clickOnMenu(name : string){
        const button = this.page.getByRole("heading", {name: name})
        await button.click()
        }
    }