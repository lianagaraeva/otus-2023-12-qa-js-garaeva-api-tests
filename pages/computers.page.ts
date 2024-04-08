import { expect, type Locator, type Page } from '@playwright/test'

const displayingOneToTen = 'Displaying 1 to 10 of 574'
const displayingElevenToTwenty = 'Displaying 11 to 20 of 574'

// Взаимодействие с элементами на странице computers:
// поиск, переход по страницам, отображение сообщений
export default class ComputersPage {
  readonly page: Page
  readonly computerAddedLabel: Locator
  readonly buttonNext: Locator
  readonly buttonPrevious: Locator
  readonly searchBox: Locator
  readonly searchSubmit: Locator
  readonly foundComputer: Locator
  readonly titleComputerFound: Locator
  readonly displayingText: (text) => Locator

  constructor(page: Page) {
    this.page = page
    this.computerAddedLabel = page
      .locator('.alert-message.warning')
      .getByText('Computer MyFirstComputer has been created')
    this.buttonNext = page.locator('.next>a')
    this.buttonPrevious = page.locator('.prev>a')
    this.displayingText = (text) => page.locator('.current>a').getByText(text)
    this.searchBox = page.locator('#searchbox')
    this.searchSubmit = page.locator('#searchsubmit')
    this.foundComputer = page.getByText('Belle')
    this.titleComputerFound = page
      .locator('#main>h1')
      .getByText('One computer found')
  }

  async goto() {
    await this.page.goto('https://computer-database.gatling.io/computers')
  }

  async assertNewComputerAdded() {
    await expect(this.computerAddedLabel).toBeVisible()
  }
  async clickButtonNext() {
    await this.buttonNext.click()
  }
  async clickButtonPrevious() {
    await this.buttonPrevious.click()
  }
  /**
   * Проверка отображения первого по десятый компьютер
   */
  async checkOneToTenVisible() {
    await expect(this.displayingText(displayingOneToTen)).toBeVisible()
  }

  /**
   * Проверка отображения одиннадцатого по двадцатый компьютер
   */
  async checkElevenToTwentyVisible() {
    await expect(this.displayingText(displayingElevenToTwenty)).toBeVisible()
  }
  async computerInvisible() {
    await expect(this.foundComputer).not.toBeVisible()
  }
  async search() {
    await this.searchBox.fill('Belle')
    await this.searchSubmit.click()
  }
  async computerFound() {
    await expect(this.foundComputer).toBeVisible()
    await expect(this.titleComputerFound).toBeVisible()
  }
}
