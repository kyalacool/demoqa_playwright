import { expect, test} from "./fixtures/pom.fixture";
import {expectedHomePageUrls} from './pages/HomePage'

test.describe("Verify the Homepage", () => {

  test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("should the Homepage appear as expected", async ({ homepage }) => {
  const step1 = await homepage.verifyPageVisibility()
  await step1.verifyMenuNames()
});

for (const menu of expectedHomePageUrls) {
  test(`should the "${menu.menuItem}" open the expected URL`, async ({homepage}) => {
    await homepage.clickOnMenu(menu.menuItem);
    await expect(homepage.page).toHaveURL(menu.expectedURL);
  });
}
})