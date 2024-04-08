import { expect, type Locator, type Page } from '@playwright/test'

// Форма создания/редактирования компьютера
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
    this.createThisComputerButton = page.locator(
      'input[type=submit].btn.primary'
    )
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
  async checkComputerASCIPurple() {
    await expect(this.nameInput).toHaveValue(/ASCI Purple/)
    await expect(this.introducedInput).toHaveValue(/2005-01-01/)
    await expect(this.companySelect).toHaveText(/IBM/)
  }
  async editComputerForm() {
    await this.introducedInput.fill('2000-04-07')
    await this.discontinuedInput.fill('2004-12-30')
    await this.companySelect.selectOption({ label: 'RCA' })
  }
}
