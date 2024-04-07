import { expect, type Locator, type Page } from '@playwright/test'
export default class ComputersPage {
  readonly page: Page
  readonly addComputerButton: Locator
  readonly computerAddedLabel: Locator
  readonly buttonNext: Locator
  readonly buttonPrevious: Locator
  readonly displayingOneToTen: Locator
  readonly displayingElevenToTwenty: Locator
  readonly searchBox: Locator
  readonly searchSubmit: Locator
  readonly foundСomputer: Locator
  readonly titleСomputerFound: Locator

  constructor(page: Page) {
    this.page = page
    this.addComputerButton = page.getByText('Add a new computer')
    this.computerAddedLabel = page.getByText(
      'Done ! Computer MyFirstComputer has been created'
    )
    this.buttonNext = page.getByText('Next')
    this.buttonPrevious = page.getByText('Previous')
    this.displayingOneToTen = page.getByText('Displaying 1 to 10 of 574')
    this.displayingElevenToTwenty = page.getByText('Displaying 11 to 20 of 574')
    this.searchBox = page.locator('#searchBox')
    this.searchSubmit = page.locator('#searchsubmit')
    this.foundСomputer = page.getByText('Belle')
    this.titleСomputerFound = page.getByText('One computer found')
  }

  async goto() {
    await this.page.goto('https://computer-database.gatling.io/computers')
  }

  // Actions
  async clickAddNewComputer() {
    await this.addComputerButton.click()
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
  async display1() {
    await expect(this.displayingOneToTen).toBeVisible()
  }
  async display2() {
    await expect(this.displayingElevenToTwenty).toBeVisible()
  }
  async search() {
    await this.searchBox.fill('Belle')
  }
  async clickButtonFilterByName() {
    await this.searchSubmit.click()
  }
  async found() {
    await expect(this.foundСomputer).toBeVisible()
  }
  async title() {
    await expect(this.titleСomputerFound).toBeVisible()
  }
}
