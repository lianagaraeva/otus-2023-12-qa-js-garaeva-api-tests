import { expect, type Locator, type Page } from '@playwright/test'
import ComputerForm from './computerForm.page'

// Форма просмотра/редактирования компьютера
export default class GetComputerPage {
  readonly page: Page
  readonly saveThisComputerButton: Locator
  readonly computerUpdatedLabel: Locator
  readonly deleteThisComputerButton: Locator
  readonly computerDeletedLabel: Locator
  computerForm: ComputerForm

  constructor(page: Page) {
    this.page = page
    this.computerForm = new ComputerForm(this.page)
    this.saveThisComputerButton = page
      .locator('input[type=submit].btn.primary')
      .getByText('Save this computer')
    this.computerUpdatedLabel = page
      .locator('.alert-message.warning')
      .getByText('Computer ASCI Purple has been updated')
    this.deleteThisComputerButton = page.locator(
      'input[type=submit].btn.danger'
    )
    this.computerDeletedLabel = page
      .locator('.alert-message.warning')
      .getByText('Computer ARRA has been deleted')
  }
  async clickComputerASCIPurple() {
    await this.page.getByText('ASCI Purple').click()
  }
  async clickComputerARRA() {
    await this.page.getByText('ARRA').click()
  }

  async updateComputer() {
    await this.computerForm.checkComputerASCIPurple()
    await this.computerForm.editComputerForm()
    await this.saveThisComputerButton.click()
  }
  async assertComputerUpdated() {
    await expect(this.computerUpdatedLabel).toBeVisible()
  }
  async deleteComputer() {
    await this.deleteThisComputerButton.click()
  }
  async assertComputerDeleted() {
    await expect(this.computerDeletedLabel).toBeVisible()
  }
}
