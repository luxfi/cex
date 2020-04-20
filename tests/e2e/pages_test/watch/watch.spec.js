import {
  defaultNavigationTimeout,
  defaultSelectorTimeout,
  defaultViewport,
  defaultWaitUntil,
} from '../../utils/constants'
import {
  deleteOldContentAndType,
  login,
  waitForProperty,
} from '../../utils/helpers'

let page
const homepage = `${global.host}`
const url = `${global.host}/watch?video=terminator-dark-fate`
const movieTitle = '.MuiBox-root > a > h3'
const watchTrailerButton = '.watch-trailer-button'
const likeButton = '.likeButton'
const videoIFrame = '#trailerVideo'
const watchlistButton = '#watchlistButton'
const buyTicketsButton = '#buyTicketsButton'
const addCommentInput = '.add-comment'
const cancelCommentButton = '.cancelCommentButton'
const postCommentButton = '.postCommentButton'
const ondemandLoginCloseBtn = '.MuiDialogTitle-root > button'
const commentUnlikeButton = '.rating > .unlikeButton'
const replyCommentButton = '.single-comment:nth-of-type(2) .replyCommentButton'
const replyCommentInput = '.single-comment:nth-of-type(2) .MuiBox-root > .add-comment'
const postReplyCommentButton = '.single-comment:nth-of-type(2) .MuiBox-root > .add-comment'

describe('Watch page', () => {
  beforeAll(async () => {
    page = await global.browser.newPage()
    page.setDefaultNavigationTimeout(defaultNavigationTimeout)
    await page.setViewport(defaultViewport.desktop)
    await page.goto(homepage, defaultNavigationTimeout)
  })

  afterAll(async () => {
    await page.close()
  })

  it('should go to film page when the movie title is clicked', async () => {
    await page.waitForSelector(watchTrailerButton)
    await page.click(watchTrailerButton)
    await page.waitForSelector(movieTitle)
    await page.click(movieTitle)
    await waitForProperty(page, '.watch-trailer-button > span > span > p', 'innerText', 'Play Trailer')
  })

  it('should open the onDemand login modal when an unauthenticated user tries to comment', async () => {
    await page.goto(url, defaultWaitUntil)
    await page.waitForSelector(addCommentInput)
    await page.click(addCommentInput)
    await page.waitForSelector(ondemandLoginCloseBtn)
    await page.click(ondemandLoginCloseBtn)
  })

  it('should open the onDemand login modal when an unauthenticated user tries to like the trailer', async () => {
    await page.waitForSelector(likeButton)
    await page.click(likeButton)
    await page.waitForSelector(ondemandLoginCloseBtn)
    await page.click(ondemandLoginCloseBtn)
  })

  it('should allow aunthenticated users like movie trailer', async () => {
    await login(page)
    await page.waitForSelector(likeButton)
    await page.click(likeButton)
    await page.waitForSelector(ondemandLoginCloseBtn)
  })

  it('should allow aunthenticated users clear input for typed comments', async () => {
    await page.waitForSelector(addCommentInput)
    await page.click(addCommentInput)
    await deleteOldContentAndType(page, addCommentInput, 'This is a test comment')
    await page.waitForSelector(cancelCommentButton)
    await page.click(cancelCommentButton)
  })

  it('should allow aunthenticated users add comments to movie trailers', async () => {
    await page.waitForSelector(addCommentInput)
    await page.click(addCommentInput)
    await deleteOldContentAndType(page, addCommentInput, 'This is a test comment')
    await page.waitForSelector(postCommentButton)
    await page.click(postCommentButton)
    await waitForProperty(page, '.single-comment > single-comment-text', 'innerText', 'This is a test comment')
  })

  it('should allow aunthenticated users unlike comments', async () => {
    await page.waitForSelector(commentUnlikeButton)
    await page.click(commentUnlikeButton)
  })

  it('should allow aunthenticated users respond to comments', async () => {
    await page.waitForSelector(replyCommentButton)
    await page.click(replyCommentButton)
    await page.waitForSelector(replyCommentInput)
    await deleteOldContentAndType(page, addCommentInput, 'This is a test reply to a test comment')
    await page.waitForSelector(postReplyCommentButton)
    await page.click(postReplyCommentButton)
    await waitForProperty(page, '.single-comment:nth-of-type(2) > single-comment-text', 'innerText', 'This is a test comment')
  })

  it('should sort comments based on selected option from the sort dropdown', async () => {
    await page.waitForSelector(replyCommentButton)
    await page.click(replyCommentButton)
    await page.waitForSelector(replyCommentInput)
    await deleteOldContentAndType(page, addCommentInput, 'This is a test reply to a test comment')
    await page.waitForSelector(postReplyCommentButton)
    await page.click(postReplyCommentButton)
    await waitForProperty(page, '.single-comment:nth-of-type(2) > single-comment-text', 'innerText', 'This is a test comment')
  })

  it('should auto play movies when autoplay is on', async () => {
    await page.waitForSelector('iframe#trailerVideo')
    const elementHandle = await page.$('iframe#trailerVideo')
    const frame = await elementHandle.contentFrame()
  })
})
