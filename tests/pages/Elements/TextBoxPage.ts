import {type Locator, type Page} from '@playwright/test'
import {expect} from '@playwright/test'

export const userData = {fullname: "Bence Varga", validEmail : "bence@gmail.com", invalidEmail : "aa", currentAddress: "1123 Baba utca 4", permanentAddress : "2842 Tátorján út 2"}

export class TextBoxPage{
    readonly fullnameInput : Locator
    readonly emailInput : Locator
    readonly currentAddressInput : Locator
    readonly permanentAddressInput : Locator
    readonly submitButton : Locator
    readonly nameResult : Locator
    readonly emailResult : Locator
    readonly currentAddressResult : Locator
    readonly permanentAddressResult : Locator
    readonly title : Locator   

    constructor (public readonly page: Page){
        this.fullnameInput = page.getByPlaceholder('Full Name')
        this.emailInput = page.getByPlaceholder('name@example.com')
        this.currentAddressInput = page.getByPlaceholder('Current Address')
        this.permanentAddressInput = page.locator("#permanentAddress")
        this.submitButton = page.getByRole('button', {name: "Submit"})
        this.nameResult = page.locator("#name").filter({hasText : 'Name:'})
        this.emailResult = page.locator("#email").filter({hasText : 'Email:'})
        this.currentAddressResult = page.locator("#currentAddress").filter({hasText : 'Current Address'})
        this.permanentAddressResult = page.locator("#permanentAddress").filter({hasText : 'Permananet Address'})
        this.title= page.getByRole('heading', {name: "Text Box"})
    }

    verifyPageVisibility(){
        expect(this.title).toBeVisible
    }
    
    async fillAndSubmitWithValidData() : Promise<this>{
        await this.fullnameInput.fill(userData.fullname)
        await this.emailInput.fill(userData.validEmail)
        await this.currentAddressInput.fill(userData.currentAddress)
        await this.permanentAddressInput.fill(userData.permanentAddress)
        await this.submitButton.click()
        return this
    }

    async fillAndSubmitWithInvalidEmail() : Promise<this>{
        await this.fullnameInput.fill(userData.fullname)
        await this.emailInput.fill(userData.invalidEmail)
        await this.currentAddressInput.fill(userData.currentAddress)
        await this.permanentAddressInput.fill(userData.permanentAddress)
        await this.submitButton.click()
        return this
    }

    async fillAndSubmitWithDeficientData() : Promise<this>{
        await this.currentAddressInput.fill(userData.currentAddress)
        await this.permanentAddressInput.fill(userData.permanentAddress)
        await this.submitButton.click()
        return this
    }

    async verifyTheDeficientResultBox(){
        await expect(this.nameResult).not.toBeVisible()
        await expect(this.emailResult).not.toBeVisible()
        await expect(this.currentAddressResult).toContainText(userData.currentAddress)
        await expect(this.permanentAddressResult).toContainText(userData.permanentAddress)
    }

    async verifyTheFilledResultBox(){
        await expect(this.nameResult).toContainText(userData.fullname)
        await expect(this.emailResult).toContainText(userData.validEmail)
        await expect(this.currentAddressResult).toContainText(userData.currentAddress)
        await expect(this.permanentAddressResult).toContainText(userData.permanentAddress)
    }

    async verifyEmailInputBorderColorIsRed(){
        await expect(this.emailInput).toHaveCSS('border-color', 'rgb(255, 0, 0)')
    }
}