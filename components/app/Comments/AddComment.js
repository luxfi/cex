import React, { useState } from 'react'
import { inject, observer } from 'mobx-react'

import { Avatar, Box, Button, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import classNames from 'classnames'

import { withRouter } from 'next/router'

import styles from './styles/comments.style'

const AddComment = inject('store')(observer(({
  numOfRows,
  onCancel,
  identifierId,
  comment,
  store,
}) => {
  const useMainStyles = makeStyles(styles)
  const classes = useMainStyles()
  const [state, setState] = useState({
    comment: '',
    showButtons: false,
  })

  const {
    commentStore,
    userStore: { loggedIn, currentUser, id },
    uiStore,
  } = store

  const handleChange = (event) => {
    const { target: { value } } = event
    setState({ ...state, comment: value })
  }

  const handleCancel = () => {
    setState({ comment: '', showButtons: false })

    if (onCancel) {
      onCancel()
    }
  }

  const handleFocus = () => {
    if (!loggedIn) {
      uiStore.openAuthModal()
      return
    }

    setState({ ...state, showButtons: true })
  }

  const handleClick = () => {
    const commentObject = {
      text: state.comment,
      identifierId,
      parentId: comment ? comment.commentId : null,
      userId: id, // Supposed to use details from currentUser from user store
    }
    commentStore.addComment(commentObject)
    handleCancel()
  }

  return (
    <>
      <Box className={classNames('add-comment', classes.comment)}>
        <Avatar src='http://placehold.it/32x32' className={classes.commentImage} />
        <Box className={classes.commentInputArea}>
          <TextField
            value={state.comment}
            onClick={handleFocus}
            InputProps={{
              className: classNames(classes.addCommentInput, 'addCommentInput'),
            }}
            rows={numOfRows || 3}
            placeholder='add a commment'
            multiline
            fullWidth
            onChange={handleChange}
          />
          {
            (state.showButtons || comment) && (
            <Box className={classes.submitButtonContainer}>
              <Button
                className='cancelCommentButton'
                variant='outlined'
                size='small'
                onClick={handleCancel}
                style={{ marginRight: 10 }}
              >
                Cancel
              </Button>
              <Button
                variant='contained'
                disabled={!(state.comment.trim())}
                size='small'
                className={classNames(classes.commentButton, 'postCommentButton')}
                onClick={handleClick}
              >
                Post Comment
              </Button>
            </Box>)
          }
        </Box>
      </Box>
    </>
  )
}))

export default withRouter(AddComment)
