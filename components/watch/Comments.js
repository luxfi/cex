import React from "react"

import { Box, Typography, Avatar, Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import LikeAndUnlike from './LikeAndUnlike';

import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

// import classNames from "classnames"

import styles from "./style.js"

const Comments = () => {
  const useMainStyles = makeStyles(styles)
  const classes = useMainStyles()
    
  return (
    <Box>
      {
        [...Array(6)].map(() => (
          <Box className={classes.comment}>
            <Avatar src="https://yt3.ggpht.com/a/AGF-l7-p9SFzNRQ3p9NhtvFXwgFTTsZ9bH0XamJ2vw=s48-c-k-c0xffffffff-no-rj-mo" className={classes.commentImage} />
            <Box>
              <Typography className={classes.commentUserName}>John Doe</Typography>
              <Typography variant="body2">My bro if ur gonna hate on the movie just don’t watch the previews</Typography>
              <Box className={classes.commentActions}>
                <Box className="rating">
                  <LikeAndUnlike />
                </Box>
                <Button size="small" variant="text">Reply</Button>
              </Box>
            </Box>
          </Box>
        ))
      }
    </Box>
  );
}

export default Comments
