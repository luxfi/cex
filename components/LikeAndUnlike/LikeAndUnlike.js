import React, { useEffect } from 'react'
import classNames from 'classnames'

import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import ThumbDownIcon from '@material-ui/icons/ThumbDown'

import styles from './LikeAndUnlike.style'

const LikeAndUnlike = ({
  likeCount,
  unlikeCount,
  hideUnlike,
  handleLikeClick,
  handleUnlikeClick,
  hasReaction,
  reactionType,
}) => {
  const useMainStyles = makeStyles(styles)
  const classes = useMainStyles()

  const likeButton = classNames(
    classes.likeButton,
    { [classes.reacted]: hasReaction && reactionType === 'like' },
  )

  const unLikeButton = classNames(
    classes.likeButton,
    { [classes.reacted]: hasReaction && reactionType === 'unlike' },
  )

  useEffect(() => {

  }, [likeCount, unlikeCount])

  return (
    <>
      <Button
        variant='contained'
        size='small'
        className={likeButton}
        startIcon={<ThumbUpAltIcon />}
        onClick={handleLikeClick}
      >
        {likeCount}
      </Button>
      {
        !hideUnlike && (
          <Button
            variant='contained'
            size='small'
            className={unLikeButton}
            startIcon={<ThumbDownIcon />}
            onClick={handleUnlikeClick}
          >
            {unlikeCount}
          </Button>
        )
      }
    </>
  )
}

export default LikeAndUnlike
