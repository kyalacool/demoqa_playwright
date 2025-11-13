import { test, expect} from "./fixtures/pom.fixture";
import { expectedElementsPageUrls } from "./pages/Elements/ElementsPage";
import {userData} from './pages/Elements/TextBoxPage'

test.describe("Verify Elements mainpage", () => {

  test.beforeEach(async ({ page }) => {
  await page.goto("/elements");
});

test("should the Elements page appear as expected", async ({ elementspage }) => {
  const step1 = await elementspage.verifyPageVisibility()
  await step1.verifySubMenuNames()
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