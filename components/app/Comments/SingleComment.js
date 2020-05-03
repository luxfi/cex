import React from 'react'
import { useRouter } from 'next/router'
import { inject, observer } from 'mobx-react'

import { 
  Avatar, 
  Button, 
  Box, 
  makeStyles, 
  Typography 
} from '@material-ui/core'

import LikeAndUnlike from '../../LikeAndUnlike'
import { isAuthenticated } from '../../../util/helpers' // refactor... only used once :aa

import styles from './styles/comments.style.js'

export default inject('store')(observer(({
    comment,
    handleReply,
    showReplyButton,
    keyValue,
    isReply,
    store: {
      commentStore,
      userStore: { loggedIn, currentUser, id },
    },
  }
) => {
  const router = useRouter()
  const { video: movieSlug, trailerId } = router
  const useMainStyles = makeStyles(styles)
  const classes = useMainStyles()
  const imageClassName = isReply ? classes.commentImageReply : classes.commentImage

  const handleClick = (comment, userId, type) => {
    if (isAuthenticated(loggedIn, `/watch?video=${movieSlug}&trailerId=${trailerId}`, router)) {
      commentStore.addCommentReaction(comment, userId, type)
    }
  }

  return (
    <Box className={classes.comment} key={keyValue}>
      <Avatar src={comment.author.authorProfileImageUrl} className={imageClassName} />
      <Box>
        <Typography className={classes.commentUserName}>{comment.author.authorDisplayName}</Typography>
        <Typography variant='body2'>{comment.text}</Typography>
        <Box className={classes.commentActions}>
        <Box className='rating'>
          <LikeAndUnlike
            likeCount={comment.reaction.likeCount}
            unlikeCount={comment.reaction.unlikeCount}
            hasReaction={comment.reaction.hasReaction}
            reactionType={comment.reaction.reactionType}
            handleLikeClick={() => handleClick(comment, id, 'like')}
            handleUnlikeClick={() => handleClick(comment, id, 'unlike')}
          />
        </Box>
        {showReplyButton && <Button onClick={() => handleReply(comment.commentId)} size='small' variant='text'>Reply</Button>}
        </Box>
      </Box>
    </Box>
  )
}))