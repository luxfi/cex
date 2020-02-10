import React, { useState } from "react"

import { Box, Typography, Avatar, Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import LikeAndUnlike from '../LikeAndUnlike';
import AddComment from './AddComment'

import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

import styles from './styles/comments.style'

const DisplayComments = ({ comments }) => {
  const useMainStyles = makeStyles(styles)
  const classes = useMainStyles()
  const [state, setState] = useState({
    replyComment: false,
    replyCommentId: null,
  })

  const handleReply = (index) => {
    setState({ ...state, replyComment: !state.replyComment, replyCommentId: index })
  }

  const onReplyCancel = () => {
    setState({ ...state, replyComment: false, replyCommentId: null })
  }
    
  return (
    <Box>
      {
        comments && comments.map((comment, index) => comment.isPublic && (
          <Box className={classes.comment} key={`comment-${comment.commentId}-${index}`}>
            <Avatar src={comment.author.authorProfileImageUrl} className={classes.commentImage} />
            <Box>
              <Typography className={classes.commentUserName}>{comment.author.authorDisplayName}</Typography>
              <Typography variant="body2">{comment.text}</Typography>
              <Box className={classes.commentActions}>
                <Box className="rating">
                  <LikeAndUnlike
                    likeCount={comment.likeCount}
                    unlikeCount={comment.unlikeCount}
                  />
                </Box>
                <Button onClick={() => handleReply(index)} size="small" variant="text">Reply</Button>
              </Box>
              {
                (state.replyCommentId === index) && (
                  <AddComment
                    numOfRows={2}
                    onCancel={onReplyCancel}
                    comment={comment}
                    type={comment.type}
                    isReply={true}
                  />)
              }
            </Box>
          </Box>
        ))
      }
    </Box>
  );
}

export default DisplayComments
