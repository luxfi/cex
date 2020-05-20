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
const browseByCategorySlider = '#category-slider .category-item'
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

  it('should contain a list of movie cards and should navigate to watch page when the play button is clicked', async () => {
    await page.waitForSelector(slideClass)
    await page.hover(slideClass)
    await page.waitForSelector(watchTrailerButton)
    await page.click(watchTrailerButton)
    await waitForProperty(page, videoMetadata, 'innerText', 'Terminator: Dark Fate')
  })

  it('should go to film page when the movie cards title is clicked', async () => {
    await page.goto(url, defaultWaitUntil)
    await page.waitForSelector(slideClass)
    await page.hover(slideClass)
    await page.waitForSelector(movieTitleLink)
    await page.click(movieTitleLink)
    await waitForProperty(page, '.watch-trailer-button > span > p', 'innerText', 'PLAY TRAILER')
  })

  it('should go to browse page when the browse by category item is clicked', async () => {
    await page.goto(url, defaultWaitUntil)
    await page.waitForSelector(browseByCategorySlider)
    await page.click(browseByCategorySlider)
    await page.waitForSelector(movieCard)
  })
})
