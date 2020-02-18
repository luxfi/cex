import React, { useState } from "react"
import { inject, observer } from "mobx-react"

import { Box, Avatar, Button, TextField } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import classNames from "classnames"

import styles from "./styles/comments.style"

const AddComment = inject('store')(observer(({
  numOfRows,
  onCancel,
  identifierId,
  comment,
  store
}) => {
  const useMainStyles = makeStyles(styles)
  const classes = useMainStyles()
  const [state, setState] = useState({
    comment: '',
    showButtons: false,
  })

  const { commentStore } = store

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
    setState({ ...state, showButtons: true })
  }

  const handleClick = () => {
    const commentObject = {
      text: state.comment,
      identifierId,
      parentId: comment ? comment.parentCommentId : null,
    }
    console.log('comment: ', commentObject)
  }

  return (
    <Box className={classNames('add-comment', classes.comment)}>
      <Avatar src="http://placehold.it/32x32" className={classes.commentImage} />
      <Box className={classes.commentInputArea}>
        <TextField
          value={state.comment}
          onFocus={handleFocus}
          InputProps={{
            className: classes.addCommentInput,
          }}
          rows={numOfRows || 3}
          placeholder="add a commment"
          multiline
          fullWidth
          onChange={handleChange}
        />
        {
          (state.showButtons || comment) && (
          <Box className={classes.submitButtonContainer}>
            <Button
              variant="outlined"
              size="small"
              onClick={handleCancel}
              style={{ marginRight: 10 }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              disabled={!state.comment}
              size="small"
              className={classes.commentButton}
              onClick={handleClick}
            >
              Post Comment
            </Button>
          </Box>)
        }
      </Box>
    </Box>
  );
}))

export default AddComment
