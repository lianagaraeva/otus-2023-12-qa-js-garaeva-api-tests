import { type Locator, type Page } from '@playwright/test'
import ComputerForm from './computerForm.page'

// Добавление компьютера
export default class AddComputerPage {
  readonly page: Page
  readonly addComputerButton: Locator
  readonly computerForm: ComputerForm

  constructor(page: Page) {
    this.page = page
    this.computerForm = new ComputerForm(this.page)
    this.addComputerButton = page.locator('#add.btn.success')
  }

  async clickAddNewComputer() {
    await this.addComputerButton.click()
  }
  async addNewComputer() {
    await this.computerForm.enterComputerForm({
      name: 'MyFirstComputer',
      introduced: '1999-04-04',
      discontinued: '2002-12-31',
      company: 'Apple Inc.',
    })
    await this.computerForm.createComputer()
  }
}
