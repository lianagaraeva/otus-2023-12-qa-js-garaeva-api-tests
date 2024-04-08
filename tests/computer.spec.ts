import { test } from '@playwright/test'
import AddComputerPage from '../pages/addComputer.page'
import ComputersPage from '../pages/computers.page'
import GetComputerPage from '../pages/getComputer.page'

test.describe('Проверка базы компьютеров', async () => {
  test('Добавление компьютера', async ({ page }) => {
    const computersPage = new ComputersPage(page)
    const addComputerPage = new AddComputerPage(page)
    await computersPage.goto()
    await addComputerPage.clickAddNewComputer()
    await addComputerPage.addNewComputer()
    await computersPage.assertNewComputerAdded()
  })

  test('Редактирование компьютера', async ({ page }) => {
    const computersPage = new ComputersPage(page)
    const getComputerPage = new GetComputerPage(page)
    await computersPage.goto()
    await getComputerPage.clickComputerASCIPurple()
    await getComputerPage.updateComputer()
    await getComputerPage.assertComputerUpdated()
  })

  test('Удаление компьютера', async ({ page }) => {
    const computersPage = new ComputersPage(page)
    const getComputerPage = new GetComputerPage(page)
    await computersPage.goto()
    await getComputerPage.clickComputerARRA()
    await getComputerPage.deleteComputer()
    await getComputerPage.assertComputerDeleted()
  })

  test('Изменение списка отображаемых компьютеров', async ({ page }) => {
    const computersPage = new ComputersPage(page)
    await computersPage.goto()
    await computersPage.checkOneToTenVisible()
    await computersPage.clickButtonNext()
    await computersPage.checkElevenToTwentyVisible()
    await computersPage.clickButtonPrevious()
    await computersPage.checkOneToTenVisible()
  })

  test('Поиск компьютера по названию', async ({ page }) => {
    const computersPage = new ComputersPage(page)
    await computersPage.goto()
    await computersPage.computerInvisible()
    await computersPage.search()
    await computersPage.computerFound()
  })
})
