import React, { useState } from "react"
import { inject, observer } from "mobx-react"

import { Box, Avatar, Button, TextField } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import classNames from "classnames"

import styles from "./styles/comments.style"

const AddComment = inject('store')(observer(({
  numOfRows,
  onCancel,
  type,
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
      type,
      parentId: comment ? comment.parentCommentId : null,
    }
    console.log('comment: ', commentObject)
  }

  return (
    <Box className={classNames('add-comment', classes.comment)}>
      <Avatar src="https://yt3.ggpht.com/a/AGF-l7-p9SFzNRQ3p9NhtvFXwgFTTsZ9bH0XamJ2vw=s48-c-k-c0xffffffff-no-rj-mo" className={classes.commentImage} />
      <Box className={classes.commentInputArea}>
        <TextField
          value={state.comment}
          onFocus={handleFocus}
          InputProps={{
            className: classes.addCommentInput
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
