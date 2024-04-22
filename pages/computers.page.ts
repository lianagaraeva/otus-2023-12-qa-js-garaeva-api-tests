import { expect, type Locator, type Page } from '@playwright/test'

// Взаимодействие с элементами на странице computers:
// поиск, переход по страницам, отображение сообщений
export default class ComputersPage {
  readonly page: Page
  readonly computerAddedLabel: Locator
  readonly buttonNext: Locator
  readonly buttonPrevious: Locator
  readonly searchBox: Locator
  readonly searchSubmit: Locator
  readonly titleComputerFound: Locator

  constructor(page: Page) {
    this.page = page
    this.computerAddedLabel = page
      .locator('.alert-message.warning')
      .getByText('Computer MyFirstComputer has been created')
    this.buttonNext = page.locator('.next>a')
    this.buttonPrevious = page.locator('.prev>a')
    this.searchBox = page.locator('#searchbox')
    this.searchSubmit = page.locator('#searchsubmit')

    this.titleComputerFound = page
      .locator('#main > h1')
      .getByText('One computer found')
  }

  async goto() {
    await this.page.goto('https://computer-database.gatling.io/computers')
  }

  async assertNewComputerAdded(text) {
    await expect(this.computerAddedLabel).toBeVisible()
  }
  async clickButtonNext() {
    await this.buttonNext.click()
  }
  async clickButtonPrevious() {
    await this.buttonPrevious.click()
  }
  #displayingText = (text) => this.page.locator('.current>a').getByText(text)

  /**
   * Проверка отображения текста пагинации
   */
  async checkPaginationTextVisible(text) {
    await expect(this.#displayingText(text)).toBeVisible()
  }

  async computerInvisible(computerName) {
    await expect(this.page.getByText(computerName)).not.toBeVisible()
  }
  async search(computerName) {
    await this.searchBox.fill(computerName)
    await this.searchSubmit.click()
  }
  async computerFound(computerName) {
    await expect(this.page.getByText(computerName)).toBeVisible()
    await expect(this.titleComputerFound).toBeVisible()
  }
}
