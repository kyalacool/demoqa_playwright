import {test as base} from '@playwright/test'
import {HomePage, ElementsPage, TextBoxPage} from '../pages/'

type MyFixtures = {
    homepage : HomePage
    elementspage : ElementsPage
    textboxpage : TextBoxPage
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
        }    
    })

export {expect} from '@playwright/test'