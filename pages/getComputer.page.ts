import { expect, type Locator, type Page } from '@playwright/test'
import ComputerForm from '../sections/ComputerForm'

export default class GetComputerPage {
  readonly page: Page
  readonly computerASCIPurple: Locator
  readonly computerARRA: Locator
  readonly saveThisComputerButton: Locator
  readonly computerUpdatedLabel: Locator
  readonly nameInput: Locator
  readonly introducedInput: Locator
  readonly discontinuedInput: Locator
  readonly companySelect: Locator
  computerForm: ComputerForm

  constructor(page: Page) {
    this.page = page
    this.computerForm = new ComputerForm(this.page)
    this.computerASCIPurple = page.getByText('ASCI Purple')
    this.computerARRA = page.getByText('ARRA')
    this.saveThisComputerButton = page.getByText('Save this computer')
    this.computerUpdatedLabel = page.getByText(
      'Done ! Computer ARRA has been updated'
    )
    this.nameInput = page.locator('#name')
    this.introducedInput = page.locator('#introduced')
    this.discontinuedInput = page.locator('#discontinued')
    this.companySelect = page.locator('#company')
  }
  async goto() {
    await this.page.goto('https://computer-database.gatling.io./computers/384')
  }

  async getComputerForm() {
    await expect(this.nameInput).toHaveValue(/ASCI Purple/)
    await expect(this.introducedInput).toHaveValue(/2005-01-01/)
    await expect(this.companySelect).toHaveText(/IBM/)
  }
  async enterComputerForm() {
    await this.introducedInput.fill('2000-04-07')
    await this.discontinuedInput.fill('2004-12-30')
    await this.companySelect.selectOption({ label: 'RCA' })
  }
  async clickComputerASCIPurple() {
    await this.computerASCIPurple.click()
  }
  async clickComputerARRA() {
    await this.computerARRA.click()
  }
  async updateComputer() {
    await this.saveThisComputerButton.click()
  }
  async assertComputerUpdated() {
    await expect(this.computerUpdatedLabel).toBeVisible()
  }
}
