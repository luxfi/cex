import React from "react"
import classNames from "classnames"

import { Box, Typography, Avatar, Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import ThumbDownIcon from '@material-ui/icons/ThumbDown'

import styles from "./LikeAndUnlike.style"

const LikeAndUnlike = ({
  likeCount,
  unlikeCount,
  hideUnlike,
  handleLikeClick,
  handleUnlikeClick,
}) => {
  const useMainStyles = makeStyles(styles)
  const classes = useMainStyles()

  return (
    <>
      <Button
        variant='contained'
        size='small'
        className={classes.likeButton}
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
            className={classes.likeButton}
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
