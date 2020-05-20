import React, { useReducer } from "react"

import { Box, Typography, Avatar, Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import classNames from 'classnames'

import AddComment from './AddComment'
import SingleComment from './SingleComment'

import styles from './styles/comments.style'

const DisplayComments = ({ comments }) => {
  const useMainStyles = makeStyles(styles)
  const classes = useMainStyles()

  const [state, setState] = useReducer((state, newState) => ({ ...state, ...newState }), {
    replyComment: false,
    replyCommentId: null,
    showReply: {},
  })
  const handleReply = (commentId) => {
    setState({ replyComment: !state.replyComment, replyCommentId: commentId })
  }

  const onReplyCancel = () => {
    setState({ replyComment: false, replyCommentId: null })
  }

  const handleShowReplies = (commentId) => {
    const newShowReply = { ...state.showReply, [commentId]: !state.showReply[commentId] }
    setState({
      showReply: newShowReply,
    })
  }

  return (
    <Box>
      {
        comments && comments.map((comment, index) => comment.isPublic && (
          <Box key={`comment-${index}-wrapper`}>
            <SingleComment
              comment={comment}
              index={index}
              onReplyCancel={onReplyCancel}
              replyCommentId={state.replyCommentId}
              handleReply={() => handleReply(comment.commentId)}
              keyValue={`comment-${comment.commentId}-${index}`}
              showReplyButton
            />
            <Box style={{ padding: 10, margin: '0 0 10px 50px' }}>
              {
                (comment.replies.length) ? (
                  <Typography
                    onClick={() => handleShowReplies(comment.commentId)}
                    className={classNames(classes.shoHideComments, 'showHideComents')}
                  >
                    { state.showReply[comment.commentId] ? 'Hide replies' : `Show ${comment.replies.length} replies` }
                  </Typography>
                ) : null
              }
              {
                comment.replies
                && (state.showReply[comment.commentId])
                && comment.replies.map((reply, replyIndex) => (
                  <>
                    <SingleComment
                      comment={reply}
                      index={replyIndex}
                      onReplyCancel={onReplyCancel}
                      replyCommentId={state.replyCommentId}
                      handleReply={() => handleReply(reply.commentId)}
                      keyValue={`reply-${reply.commentId}-${index}`}
                      showReplyButton
                      isReply
                    />
                    { (state.replyCommentId === reply.commentId) && <AddComment
                        numOfRows={2}
                        onCancel={onReplyCancel}
                        comment={comment}
                        identifierId={comment.commentId}
                        isReply
                      />
                    }
                  </>
                ))
              }
              {
              (state.replyCommentId === comment.commentId) && (
                <AddComment
                  numOfRows={2}
                  onCancel={onReplyCancel}
                  comment={comment}
                  identifierId={comment.commentId}
                  isReply
                />)
              }
            </Box>
          </Box>
        ))
      }
    </Box>
  )
}

export default DisplayComments
