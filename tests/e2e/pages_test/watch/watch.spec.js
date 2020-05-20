import { testUser } from '../../testfixtures'

import {
  defaultNavigationTimeout,
  defaultSelectorTimeout,
  defaultViewport,
  defaultWaitUntil,
} from '../../utils/constants'
import {
  deleteOldContentAndType,
  getElementForSelector,
  login,
  selectFromDropDown,
  waitForProperty,
} from '../../utils/helpers'
import { ContextConsumer } from '@hanzo/react'

let page
const homepage = `${global.host}`
const url = `${global.host}/watch?video=shazam-2019&trailerId=go6GEIrcvFY`
const movieTitle = '.MuiBox-root > a > h3'
const watchTrailerButton = '.watch-trailer-button'
const videoLikeButton = '.video-metadata .likeButton'
const likeButton = '.likeButton'
const videoIFrame = '#trailerVideo'
const addCommentInput = '.add-comment'
const cancelCommentButton = '.cancelCommentButton'
const postCommentButton = '.postCommentButton'
const ondemandLoginCloseBtn = '.MuiDialogTitle-root > button'
const commentUnlikeButton = '.rating .unlikeButton'
const replyCommentInput = '.add-comment textarea'
const sortCommentButton = '#sortCommentButton'

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
    await waitForProperty(page, '.watch-trailer-button > span > p', 'innerText', 'PLAY TRAILER')
    await page.click(watchTrailerButton)
  })

  it('should open the onDemand login modal when an unauthenticated user tries to comment', async () => {
    await page.waitForSelector(addCommentInput)
    await page.click(addCommentInput)
    await page.waitForSelector(ondemandLoginCloseBtn)
    await page.click(ondemandLoginCloseBtn)
  })

  it('should open the onDemand login modal when an unauthenticated user tries to like the trailer', async () => {
    await page.waitForSelector(likeButton)
    await page.click(likeButton)
    await page.waitForSelector(ondemandLoginCloseBtn)
  })

  it('should allow aunthenticated users like movie trailer', async () => {
    await login(page)
    await page.waitForSelector(videoLikeButton)
    await page.click(videoLikeButton)
    await page.waitForSelector(ondemandLoginCloseBtn)
  })

  it('should allow aunthenticated users clear input for typed comments', async () => {
    await page.waitForSelector(addCommentInput)
    await page.click(addCommentInput)
    await deleteOldContentAndType(page, addCommentInput, 'This is a test comment to be cancelled')
    await page.waitForSelector(cancelCommentButton)
    await page.click(cancelCommentButton)
  })

  it('should allow aunthenticated users add comments to movie trailers', async () => {
    await page.waitForSelector(addCommentInput)
    await page.click(addCommentInput)
    await deleteOldContentAndType(page, addCommentInput, 'This is a test comment')
    await page.waitForSelector(postCommentButton)
    await page.click(postCommentButton)
    await waitForProperty(page, '.single-comment > .single-comment-text', 'innerText', 'This is a test comment')
  })

  it('should allow aunthenticated users unlike comments', async () => {
    await page.waitForSelector(commentUnlikeButton)
    await page.click(commentUnlikeButton)
  })

  it('should allow aunthenticated users respond to comments', async () => {
    const reply = await page.evaluateHandle((replyTextarea) => {
      const replyButton = document.querySelectorAll('.replyCommentButton')[1]
      replyButton.click()

      const replyInput = document.querySelectorAll(replyTextarea)[1]
      return replyInput
    }, replyCommentInput)

    await reply.type('This is a test reply to a test comment')

    await page.waitForSelector(postCommentButton)
    await page.click(postCommentButton)

    await page.evaluate(() => {
      let result = false
      const comments = document.querySelectorAll('.single-comment > .single-comment-text')
      for (let i = 0; i < comments.length; i++) {
        if (comments[i].innerText === 'This is a test reply to a test comment') {
          result = true
        }
      }
      return result
    })
  })

  it('should sort comments based on selected option from the sort dropdown', async () => {
    await page.waitForSelector(sortCommentButton)

    await selectFromDropDown(page, sortCommentButton, '.sortCommentItem', 'Top comments')
    await waitForProperty(page, '.single-comment > p:first-child', 'innerText', 'Christian Brock')
  })
})
