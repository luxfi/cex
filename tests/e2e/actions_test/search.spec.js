import {
  defaultNavigationTimeout,
  defaultViewport,
  defaultWaitUntil,
} from '../utils/constants'

import {
  deleteOldContentAndType,
  getElementForSelector,
} from '../utils/helpers'

let page
const url = global.host
const searchButton = '.search-button'
const searchInput = '#react-autosuggest-simple'
const movieName = 'terminator'

describe('Search', () => {
  beforeAll(async () => {
    page = await global.browser.newPage()
    page.setDefaultNavigationTimeout(defaultNavigationTimeout)
    await page.setViewport(defaultViewport.desktop)
    await page.goto(url, defaultWaitUntil)
  })

  afterAll(async () => {
    await page.close()
  })

  it('should filter movies in browse page to show search result', async () => {
    const searchBtn = await getElementForSelector(page, searchButton)
    await searchBtn.click()
    await page.waitFor(searchInput)
    await deleteOldContentAndType(page, searchInput, movieName)
    await page.waitForSelector('.terminator-dark-fate')
    await page.waitForFunction(() => document.querySelectorAll('.movie-card').length === 1)

    await deleteOldContentAndType(page, searchInput, 'term')
    await page.waitForFunction(() => document.querySelectorAll('.movie-card').length > 3)
  })
})
