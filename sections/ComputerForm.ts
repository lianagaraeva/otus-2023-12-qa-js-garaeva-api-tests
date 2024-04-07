import { expect, type Locator, type Page } from '@playwright/test'
export default class ComputerForm {
  readonly page: Page
  readonly nameInput: Locator
  readonly introducedInput: Locator
  readonly discontinuedInput: Locator
  readonly companySelect: Locator
  readonly createThisComputerButton: Locator

  constructor(page: Page) {
    this.page = page
    this.nameInput = page.locator('#name')
    this.introducedInput = page.locator('#introduced')
    this.discontinuedInput = page.locator('#discontinued')
    this.companySelect = page.locator('#company')
    this.createThisComputerButton = page.getByText('Create this computer')
  }

  async enterComputerForm() {
    await this.nameInput.fill('MyFirstComputer')
    await this.introducedInput.fill('1999-04-04')
    await this.discontinuedInput.fill('2002-12-31')
    await this.companySelect.selectOption({ label: 'Apple Inc.' })
  }
  async createComputer() {
    await this.createThisComputerButton.click()
  }
}
