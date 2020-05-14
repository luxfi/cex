import path from 'path'
import url from 'url'
import { testUser } from '../testfixtures'
import { defaultWaitUntil } from './constants'

export const getStaticSitePath = (urlPath) => {
  if (!urlPath) {
    throw Error('expected a sting urlPath')
  }

  const filePath = path.join(path.resolve(__dirname, '../../../out'), `${urlPath}.html`)
  const urlObj = url.pathToFileURL(filePath)
  return urlObj.href
}

export const waitForProperty = async (page, selector, attribute, content) => {
  await page.waitForSelector(selector)
  await page.waitForFunction((obj) => document.querySelector(obj[0])[obj[1]] === obj[2], {}, [selector, attribute, content])
}

export const deleteAllInputContent = async (page, inputElement) => {
  await page.waitForSelector(inputElement, { visible: true })
  const input = await page.$(inputElement)
  await input.click({ clickCount: 3 })
  await page.keyboard.press('Backspace')
}

export const deleteOldContentAndType = async (page, inputElement, value) => {
  await page.waitForSelector(inputElement)
  await deleteAllInputContent(page, inputElement)
  await page.type(inputElement, value)
}

// TODO: change iplementation
export const login = async (page) => {
  const emailInput = 'input[name ="email"]'
  const passwordInput = 'input[name ="password"]'
  const signinButtonElement = await page.waitFor('#login-submit-button', defaultWaitUntil)
  await deleteOldContentAndType(page, emailInput, testUser.email)
  await deleteOldContentAndType(page, passwordInput, testUser.password)
  await signinButtonElement.click()
  await waitForProperty(page, '#accountMenu > span', 'className', 'MuiIconButton-label')
}

export const selectFromDropDown = async (page, selectElement, selector, value) => {
  const dropdownInput = await page.waitForSelector(selectElement)
  await dropdownInput.click()

  const sel = selector ? `li${selector}` : 'li'
  await page.waitForSelector(sel)

  const dropdownItem = await page
    .evaluateHandle((selEl, val) => {
      const listItem = document.querySelectorAll(selEl)
      for (let i = 0; i < listItem.length; i++) {
        if (listItem[i].dataset.value === val || listItem[i].innerText === val) {
          return listItem[i]
        }
      }
    }, sel, value)

  await dropdownItem.click()
}

export const selectRadioGroupOption = async (page, selector) => {
  await page.evaluate(async (sel) => {
    const radioGroupInputs = document.querySelectorAll(sel)
    const unCheckedRadioButton = [...radioGroupInputs].find((item) => !item.checked)
    unCheckedRadioButton.click()
  }, selector)
}

export const selectDateFromCalender = async (page, selector) => {
  await page.waitForSelector(selector)
  await page.click(selector)
  await page.waitForSelector('.MuiPickersModal-dialog')

  const dateButtonsSelector = '.MuiButton-text.MuiPickersToolbarButton-toolbarBtn'
  await page.waitForSelector(dateButtonsSelector)
  const monthYearButtons = await page.evaluateHandle((dateButtonsSel) => document.querySelectorAll(dateButtonsSel)[1], dateButtonsSelector)
  await monthYearButtons.click()

  const daySelector = 'button.MuiPickersDay-day:not(.MuiPickersDay-dayDisabled):not(.MuiPickersDay-hidden)'
  await page.waitForSelector('.MuiPickersDay-day')
  const day = await page.evaluateHandle((daySel) => document.querySelectorAll(daySel)[0], daySelector)
  await day.click()

  const okButton = '.MuiPickersModal-withAdditionalAction > button:nth-of-type(3)'
  await page.waitForSelector(okButton)
  await page.click(okButton)
}

export const getElementForSelector = async (page, selector) => {
  await page.waitForSelector(selector)
  return await page.$(selector) || undefined
}

export const waitForElementToHide = async (page, selector) => {
  await page.waitForFunction((sel) => document.querySelector(sel), {}, selector)
}
