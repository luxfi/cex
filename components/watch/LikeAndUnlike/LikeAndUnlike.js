import React from "react"
import classNames from "classnames"

import { Box, Typography, Avatar, Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

import styles from "./LikeAndUnlike.style"

const LikeAndUnlike = () => {
  const useMainStyles = makeStyles(styles)
  const classes = useMainStyles()
    
  return (
    <>
      <Button
        variant="contained"
        size="small"
        className={classes.likeButton}
        startIcon={<ThumbUpAltIcon />}
      >
        12K
      </Button>
      <Button
        variant="contained"
        size="small"
        className={classes.likeButton}
        startIcon={<ThumbDownIcon />}
      >
        488
      </Button>
    </>
  );
}

export default LikeAndUnlike
