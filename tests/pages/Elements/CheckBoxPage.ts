import { Page, Locator, expect } from "@playwright/test";

export const listOfNames : string[] = ["Home", "Desktop", "Notes", "Commands", "Documents", "WorkSpace", "React", "Angular", "Veu", "Office",  "Downloads", "Word File", "Excel File"]

export class CheckBoxPage {

    constructor(public readonly page: Page) {
    }

    async verifyPageVisibility(){
        await expect(this.page.locator('#app').getByRole('heading', {level: 1})).toContainText("Check Box")
    }
    async getCheckBox(name:string): Promise<Locator>{
        return this.page.locator(".rct-title").filter({hasText:name})
    }

    async getToogle(name:string): Promise<Locator>{
        return this.page.locator(`label:has-text("${name}")`).locator("..").locator(`button[title="Toggle"]`)
    }
}