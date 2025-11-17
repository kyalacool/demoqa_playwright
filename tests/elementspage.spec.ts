import { expect, test } from "./fixtures/pom.fixture";
import { expectedElementsPageUrls } from "./pages/Elements/ElementsPage";
import {listOfNames} from "./pages/Elements/CheckBoxPage"

test.describe("Verify Elements mainpage", () => {

  test.beforeEach(async ({ page }) => {
  await page.goto("/elements");
});

test("should the Elements page appear as expected", async ({ elementspage }) => {
  await elementspage.verifyPageVisibility()
  await elementspage.verifySubMenuNames()
});

for (const menu of expectedElementsPageUrls) {
  test(`should the "${menu.menuItem}" directs to the expected URL `, async ({elementspage}) => {
    await elementspage.verifySubMenuUrls(menu.menuItem, menu.expectedURL)
  });
}
})

test.describe("Verify Text-box subpage", () => {

  test.beforeEach(async({page}) => {
    await page.goto('/text-box')
  })

  test("should Text-box title appear when click on Text-box subpage", async({textboxpage}) => {
    textboxpage.verifyPageVisibility()
  })

  test("should result appear with the correct data when submit valid data", async({textboxpage}) => {
    const step1 = await textboxpage.fillAndSubmitWithValidData()
    await step1.verifyTheFilledResultBox()
  })

  test("should deficient result does appear (without name and email) when submit deficient data", async({textboxpage}) => {
    const step1 = await textboxpage.fillAndSubmitWithDeficientData()
    await step1.verifyTheDeficientResultBox()
  })

  test("should red boarder appear around email input when try to submit invalid email", async({textboxpage}) => {
    const step1 = await textboxpage.fillAndSubmitWithInvalidEmail()
    await step1.verifyEmailInputBorderColorIsRed()
  })
})

test.describe("Verify Check-box subpage", () => {

  test.beforeEach (async({page}) => {
    await page.goto('/checkbox')
  })

  test("should Check Box header appear when clicking on Check Box subpage", async({checkboxpage}) => {
    await checkboxpage.verifyPageVisibility()
  })

  test("Verify Home checkbox", async({checkboxpage}) => {
    const homePageCheckBox = await checkboxpage.getCheckBox("Home")
    await expect(homePageCheckBox).not.toBeChecked()
    await homePageCheckBox.check()
    await expect(homePageCheckBox).toBeChecked()
  })

  test ("Verify Home toogle", async({checkboxpage}) => {
    const toogle = await checkboxpage.getToogle("Home")
    await toogle.click()
    await expect(await checkboxpage.getCheckBox("Desktop")).toBeVisible()
  })

  test(`Verify all checkbox and toogle`, async({checkboxpage}) => {
    for(let i = 1; i <= listOfNames.length; i++){
        const checkBox = await checkboxpage.getCheckBox(listOfNames[i-1])
        await expect(checkBox).not.toBeChecked()
        await checkBox.check()
        await expect(checkBox).toBeChecked()
        await checkBox.uncheck()
        const toogle = await checkboxpage.getToogle(listOfNames[i-1])
        if(await toogle.isVisible()){
        await toogle.click()}
        if(i != listOfNames.length){
        await expect(await checkboxpage.getCheckBox(listOfNames[i])).toBeVisible()}
      }
  })
})