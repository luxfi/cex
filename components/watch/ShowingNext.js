import React, { useState } from "react"
import Link from "next/link"
import { withRouter } from "next/router"

import { Button, Typography, Divider, Box, Switch } from "@material-ui/core"
import { withStyles } from "@material-ui/core/styles"

import classNames from "classnames"

import styles from "./style.js"

const ShowingNext = ({ classes }) => {
  const [state, setState] = useState({
    autoPlay: true,
  })

  const handleChecked = (event) => {
  }
  
  return (
    <Box className={classes.relatedVideos}>
      <Box className={classes.upNextTop}>
        <Typography variant="h4" className="title">Up next</Typography>
        <Box className={classes.upNextToggle}>
          <Typography component="span">Autoplay</Typography>
          <Switch
            checked={state.autoPlay}
            onChange={handleChecked}
          />
        </Box>
      </Box>
      <a href="/watch?v=6BLnOGpDk70">
        <Box className={classes.singleVideo}>
          <Box className={classes.imageWrapper}>
            <img src="https://i.ytimg.com/vi/6BLnOGpDk70/mqdefault.jpg" />
            <Box className={classes.playTime}>
              <Typography component="span">6:13</Typography>
            </Box>
          </Box>
          <Box className={classes.sidebarVideoInfo}>
            <Typography
              className={classNames(classes.sidebarMovieTitle, classes.maxTwoLines)}
            >
                The Best SUPER BOWL Movie Trailers 2020
            </Typography>
            <Box className={classes.sidebarVideoMeta}>
              <Typography className={classes.singleLine}>KinoCheck International</Typography>
              <Typography className={classes.singleLine}>313K views • a day ago</Typography>
            </Box>
          </Box>
        </Box>
      </a>
      <Divider style={{ margin: '10px 0 0 0'}} />
      {
        [...Array(10)].map((el, i) => (
          <a href="/watch?v=HLQ9DRPuYXU" key={`showing-next-${i}`}>
            <Box className={classes.singleVideo}>
              <Box className={classes.imageWrapper}>
                <img src="https://i.ytimg.com/vi/HLQ9DRPuYXU/mqdefault.jpg"/>
                <Box className={classes.playTime}>
                  <Typography component="span">3:10</Typography>
                </Box>
              </Box>
              <Box className={classes.sidebarVideoInfo}>
                <Typography
                  className={classNames(classes.sidebarMovieTitle, classes.maxTwoLines)}
                >
                  TOP GUN 2 MAVERICK Trailer #3 Official (NEW 2020) Tom Cruise Action Movie HD
                </Typography>
                <Box className={classes.sidebarVideoMeta}>
                  <Typography className={classes.singleLine}>FilmSpot Trailer</Typography>
                  <Typography className={classes.singleLine}>35K views • a day ago</Typography>
                </Box>
              </Box>
            </Box>
          </a>
        ))
      }
    </Box>
  );
}

export default withRouter(withStyles(styles)(ShowingNext))
