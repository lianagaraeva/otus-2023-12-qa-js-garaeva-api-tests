import { test } from '@playwright/test'
import AddComputerPage from '../pages/addComputer.page'
import ComputersPage from '../pages/computers.page'
import GetComputerPage from '../pages/getComputer.page'
const computerName = 'Belle'
const displayingOneToTen = 'Displaying 1 to 10 of 574'
const displayingElevenToTwenty = 'Displaying 11 to 20 of 574'

test.describe('Проверка базы компьютеров', async () => {
  test('Добавление компьютера', async ({ page }) => {
    const computersPage = new ComputersPage(page)
    const addComputerPage = new AddComputerPage(page)
    await computersPage.goto()
    await addComputerPage.clickAddNewComputer()
    await addComputerPage.addNewComputer()
    await computersPage.assertNewComputerAdded(
      'Computer MyFirstComputer has been created'
    )
  })

  test('Редактирование компьютера', async ({ page }) => {
    const computersPage = new ComputersPage(page)
    const getComputerPage = new GetComputerPage(page)
    await computersPage.goto()
    await getComputerPage.clickComputer('ASCI Purple')
    await getComputerPage.updateComputer()
    await getComputerPage.assertComputerUpdated(
      'Computer ASCI Purple has been updated'
    )
  })

  test('Удаление компьютера', async ({ page }) => {
    const computersPage = new ComputersPage(page)
    const getComputerPage = new GetComputerPage(page)
    await computersPage.goto()
    await getComputerPage.clickComputer('ARRA')
    await getComputerPage.deleteComputer()
    await getComputerPage.assertComputerDeleted(
      'Computer ARRA has been deleted'
    )
  })

  test('Изменение списка отображаемых компьютеров', async ({ page }) => {
    const computersPage = new ComputersPage(page)
    await computersPage.goto()
    await computersPage.checkPaginationTextVisible(displayingOneToTen)
    await computersPage.clickButtonNext()
    await computersPage.checkPaginationTextVisible(displayingElevenToTwenty)
    await computersPage.clickButtonPrevious()
    await computersPage.checkPaginationTextVisible(displayingOneToTen)
  })

  test('Поиск компьютера по названию', async ({ page }) => {
    const computersPage = new ComputersPage(page)
    await computersPage.goto()
    await computersPage.computerInvisible(computerName)
    await computersPage.search(computerName)
    await computersPage.computerFound(computerName)
  })
})
