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

  async enterComputerForm({ name, introduced, discontinued, company }) {
    await this.nameInput.fill(name)
    await this.introducedInput.fill(introduced)
    await this.discontinuedInput.fill(discontinued)
    await this.companySelect.selectOption({ label: company })
  }
  async createComputer() {
    await this.createThisComputerButton.click()
  }
  async checkComputer({ name, introduced, company }) {
    await expect(this.nameInput).toHaveValue(name)
    await expect(this.introducedInput).toHaveValue(introduced)
    await expect(this.companySelect).toHaveText(company)
  }
  async editComputerForm({ introduced, discontinued, company }) {
    await this.introducedInput.fill(introduced)
    await this.discontinuedInput.fill(discontinued)
    await this.companySelect.selectOption({ label: company })
  }
}
