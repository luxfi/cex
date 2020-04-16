import {
  defaultNavigationTimeout,
  defaultViewport,
  defaultWaitUntil,
} from '../../utils/constants'

import {
  waitForProperty,
} from '../../utils/helpers'

let page
const url = global.host
const slideClass = '.slick-slide'
const watchTrailerButton = '.watch-trailer-button'
const movieTitleLink = '.saw-9 > div > .MuiBox-root > a'
const videoMetadata = '.video-metadata a h3'
const browseBySlider = '.slider-wrapper .item'
const movieCard = '.movie-card'

describe('Home page', () => {
  beforeAll(async () => {
    page = await global.browser.newPage()
    page.setDefaultNavigationTimeout(defaultNavigationTimeout)
    await page.setViewport(defaultViewport.desktop)
    await page.goto(url, defaultWaitUntil)
  })

  afterAll(async () => {
    await page.close()
  })

  xit('should return a 200 status code when visited', async () => {
    await page.on('response', (response) => {
      expect(response.status()).toEqual(200)
    })
  })

  it('should be titled "ESX | Entertainment Stock X"', async () => {
    await expect(page.title()).resolves.toMatch('ESX | Entertainment Stock X')
  })

  it('should contain a list of movie cards and should navigate to watch page when the play button is clicked', async () => {
    await page.waitForSelector(slideClass)
    await page.hover(slideClass)
    await page.waitForSelector(watchTrailerButton)
    await page.click(watchTrailerButton)
    await waitForProperty(page, videoMetadata, 'innerText', 'Terminator: Dark Fate')
  })

  xit('should go to film page when the movie cards title is clicked', async () => {
    await page.goto(url, defaultWaitUntil)
    await page.waitForSelector(slideClass)
    await page.hover(slideClass)
    await page.waitForSelector(movieTitleLink)
    await page.click(movieTitleLink)
    await waitForProperty(page, '.watch-trailer-button > span > span > p', 'innerText', 'Play Trailer')
  })

  it('should go to browse page when the browse by category item is clicked', async () => {
    await page.goto(url, defaultWaitUntil)
    await page.waitForSelector(browseBySlider)
    await page.click(browseBySlider)
    await page.waitForSelector(movieCard)
  })
})
