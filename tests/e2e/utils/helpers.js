import path from 'path'
import url from 'url'

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
  await page.waitForFunction((sel, att, con) => console.log(sel, att, con, '------------') || document.querySelector(sel)[att] === con, selector, attribute, content)
}

export const deleteAllInputContent = async (page, inputElement) => {
  const input = await page.$(inputElement)
  await input.click({ clickCount: 3 })
  await page.keyboard.press('Backspace')
}
