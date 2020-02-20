import React, { useState } from "react"

import { Box, Typography, Avatar, Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import LikeAndUnlike from '../LikeAndUnlike'

import styles from './styles/comments.style'

const DisplayComments = ({
  comment,
  handleReply,
  showReplyButton,
  keyValue,
  isReply,
}) => {
  const useMainStyles = makeStyles(styles)
  const classes = useMainStyles()
  const imageClassName = isReply ? classes.commentImageReply : classes.commentImage

  return (
    <Box className={classes.comment} key={keyValue}>
      <Avatar src={comment.author.authorProfileImageUrl} className={imageClassName} />
      <Box>
        <Typography className={classes.commentUserName}>{comment.author.authorDisplayName}</Typography>
        <Typography variant='body2'>{comment.text}</Typography>
        <Box className={classes.commentActions}>
        <Box className='rating'>
          <LikeAndUnlike
            likeCount={comment.likeCount}
            unlikeCount={comment.unlikeCount}
          />
        </Box>
        {showReplyButton && <Button onClick={() => handleReply(comment.commentId)} size='small' variant='text'>Reply</Button>}
        </Box>
      </Box>
    </Box>
  )
}

export default DisplayComments
