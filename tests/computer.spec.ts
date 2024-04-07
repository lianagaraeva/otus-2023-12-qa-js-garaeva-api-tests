import { test } from '@playwright/test'
import AddComputerPage from '../pages/addComputer.page'
import ComputersPage from '../pages/computers.page'
import GetComputerPage from '../pages/getComputer.page'

test.describe('Проверка базы компьютеров', async () => {
  test('Добавление компьютера', async ({ page }) => {
    const computersPage = new ComputersPage(page)
    const addComputerPage = new AddComputerPage(page)
    await computersPage.goto()
    await computersPage.clickAddNewComputer()
    await addComputerPage.addNewComputer()
    await computersPage.assertNewComputerAdded()
  })

  test('Просмотр карточки компьютера', async ({ page }) => {
    const computersPage = new ComputersPage(page)
    const getComputerPage = new GetComputerPage(page)
    await computersPage.goto()
    await getComputerPage.clickComputerASCIPurple()
    await getComputerPage.getComputerForm()
  })

  test('Редактирование карточки компьютера', async ({ page }) => {
    const computersPage = new ComputersPage(page)
    const getComputerPage = new GetComputerPage(page)
    await computersPage.goto()
    await getComputerPage.clickComputerARRA()
    await getComputerPage.enterComputerForm()
    await getComputerPage.updateComputer()
    await getComputerPage.assertComputerUpdated()
  })

  test('Изменение списка отображаемых компьютеров', async ({ page }) => {
    const computersPage = new ComputersPage(page)
    await computersPage.goto()
    await computersPage.display1()
    await computersPage.clickButtonNext()
    await computersPage.display2()
    await computersPage.clickButtonPrevious()
    await computersPage.display1()
  })

  test('Поиск компьютера по названию', async ({ page }) => {
    const computersPage = new ComputersPage(page)
    await computersPage.goto()
    await computersPage.search()
    await computersPage.clickButtonFilterByName()
    await computersPage.found()
    await computersPage.title()
  })
})
