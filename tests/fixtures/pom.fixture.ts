import {test as base} from '@playwright/test'
import {HomePage, ElementsPage, TextBoxPage, CheckBoxPage} from '../pages/' 

type MyFixtures = {
    homepage : HomePage
    elementspage : ElementsPage
    textboxpage : TextBoxPage
    checkboxpage : CheckBoxPage
    }

export const test = base.extend<MyFixtures>({
        homepage : async ({page}, use) => {
            await use(new HomePage(page))
            },
        elementspage : async ({page}, use) => {
            await use(new ElementsPage(page))
            },
        textboxpage : async ({page}, use) => {
            await use(new TextBoxPage(page))
            },    
        checkboxpage : async ({page}, use) => {
            await use(new CheckBoxPage(page))
        }
    })

export {expect} from '@playwright/test'