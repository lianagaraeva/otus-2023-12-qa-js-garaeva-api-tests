import { expect, type Locator, type Page } from '@playwright/test'
import ComputerForm from '../sections/ComputerForm'

export default class AddComputerPage {
  readonly page: Page
  readonly addComputerButton: Locator
  computerForm: ComputerForm

  constructor(page: Page) {
    this.page = page
    this.computerForm = new ComputerForm(this.page)
    this.addComputerButton = page.getByText('Add a new computer')
  }

  async goto() {
    await this.page.goto('https://computer-database.gatling.io/computers')
  }

  async clickAddNewComputer() {
    await this.addComputerButton.click()
  }
  async addNewComputer() {
    await this.computerForm.enterComputerForm()
    await this.computerForm.createComputer()
  }
}
