import { userProfile } from '../../testfixtures'
import {
  defaultNavigationTimeout,
  defaultSelectorTimeout,
  defaultViewport,
  defaultWaitUntil,
} from '../../utils/constants'
import {
  deleteOldContentAndType,
  login,
  selectDateFromCalender,
  selectFromDropDown,
  waitForProperty,
} from '../../utils/helpers'

let page
const url = `${global.host}/account?tab=6`
const firstName = 'input[name ="firstName"]'
const lastName = 'input[name ="lastName"]'
const phone = 'input[name ="phone"]'
const taxId = 'input[name ="taxId"]'
const gender = '#mui-component-select-gender'
const datePickerButton = '.dobButton'
const address1 = 'input[name ="address1"]'
const address2 = 'input[name ="address2"]'
const city = 'input[name ="city"]'
const state = '#state'
const postalCode = 'input[name ="postalCode"]'
const country = '#country'
const faceUpload = '.faceUpload input[type=file]'
const idFrontUpload = 'idFrontUpload input[type=file]'
const idBackUpload = '.idBackUpload input[type=file]'
const kycSubmitButton = '.kycSubmitButton'

describe('User Identity Page', () => {
  beforeAll(async () => {
    page = await global.browser.newPage()
    page.setDefaultNavigationTimeout(defaultNavigationTimeout)
    await page.setViewport(defaultViewport.desktop)
    await page.goto(url, defaultWaitUntil)
    await login(page)
  })

  afterAll(async () => {
    await page.close()
  })

  it('should successfully update Personal Details', async () => {
    await deleteOldContentAndType(page, firstName, userProfile.firstName)
    await deleteOldContentAndType(page, lastName, userProfile.lastName)
    await deleteOldContentAndType(page, phone, userProfile.phone)
    await deleteOldContentAndType(page, taxId, userProfile.taxId)
    await selectDateFromCalender(page, datePickerButton)
    await selectFromDropDown(page, gender, '.genderItem', userProfile.gender)

    await page.waitForSelector(kycSubmitButton)
    await page.click(kycSubmitButton)
    await page.waitForSelector(address1)
  })

  it('should successfully update Primary Address', async () => {
    await deleteOldContentAndType(page, address1, userProfile.address1)
    await deleteOldContentAndType(page, address2, userProfile.address2)
    await deleteOldContentAndType(page, city, userProfile.city)
    await selectFromDropDown(page, state, '', userProfile.state)
    await deleteOldContentAndType(page, postalCode, userProfile.postalCode)
    await selectFromDropDown(page, country, '', userProfile.country)

    await page.waitFor(kycSubmitButton, defaultSelectorTimeout)
    await page.click(kycSubmitButton)
    await page.waitForSelector(faceUpload)
  })

  xit('should successfully upload', async () => {
    await page.click(faceUpload)
    const faceUploadHandle = await page.$(faceUpload)
    await faceUploadHandle.uploadFile('../../files/face.png')
    await faceUploadHandle.evaluate((upload) => upload.dispatchEvent(new Event('change', { bubbles: true })))

    await page.click(idFrontUpload)
    await idFrontUpload.uploadFile('../../files/id-front.png')
    await idFrontUpload.evaluate((upload) => upload.dispatchEvent(new Event('change', { bubbles: true })))

    await page.click(idBackUpload)
    await idBackUpload.uploadFile('../../files/id-back.png')

    await page.waitFor(kycSubmitButton, defaultSelectorTimeout)
    await page.click(kycSubmitButton)
    await waitForProperty(page, '.MuiPaper-root > h6.MuiTypography-subtitle1', 'innerText', 'We are verifying your account and will send you an update when completed.')
  })
})
