import { expect, type Locator, type Page } from '@playwright/test'
import ComputerForm from './computerForm.page'
import { text } from 'stream/consumers'

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
    this.computerUpdatedLabel = page.locator('.alert-message.warning')
    this.deleteThisComputerButton = page.locator(
      'input[type=submit].btn.danger'
    )
    this.computerDeletedLabel = page.locator('.alert-message.warning')
  }
  async clickComputer(computer) {
    await this.page.getByText(computer).click()
  }

  async updateComputer() {
    await this.computerForm.checkComputer({
      name: /ASCI Purple/,
      introduced: /2005-01-01/,
      company: /IBM/,
    })
    await this.computerForm.editComputerForm({
      introduced: '2000-04-07',
      discontinued: '2004-12-30',
      company: 'RCA',
    })
    await this.saveThisComputerButton.click()
  }
  async assertComputerUpdated(text) {
    await expect(this.computerUpdatedLabel).toBeVisible()
  }
  async deleteComputer() {
    await this.deleteThisComputerButton.click()
  }
  async assertComputerDeleted(text) {
    await expect(this.computerDeletedLabel).toBeVisible()
  }
}
