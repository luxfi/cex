import React, { useState } from "react"
import Link from "next/link"
import { withRouter } from "next/router"

import { Button, Typography, Divider, Box, Switch } from "@material-ui/core"
import { withStyles } from "@material-ui/core/styles"

import classNames from "classnames"

import styles from "./style.js"

const ShowingNext = ({ classes, relatedMovies }) => {
  const [state, setState] = useState({
    autoPlay: true,
  })

  const handleChecked = (event) => {
    setState({ ...state, autoplay: !state.autoplay })
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
      <Link href={`watch?video=${relatedMovies[0].movieSlug}`} key={`showingNext-${relatedMovies[0].id}`}>
        <a>
            <Box className={classes.singleVideo}>
              <Box className={classes.imageWrapper}>
                <img src={relatedMovies[0].heroImg} />
                <Box className={classes.playTime}>
                  <Typography component="span">6:13</Typography>
                </Box>
              </Box>
              <Box className={classes.sidebarVideoInfo}>
                <Typography
                  className={classNames(classes.sidebarMovieTitle, classes.maxTwoLines)}
                >
                  {relatedMovies[0].name}
                </Typography>
                <Box className={classes.sidebarVideoMeta}>
                  <Typography className={classes.singleLine}>KinoCheck International</Typography>
                  <Typography className={classes.singleLine}>313K views • a day ago</Typography>
                </Box>
              </Box>
            </Box>
          </a>
      </Link>
      <Divider style={{ margin: '10px 0 0 0'}} />
      {
        relatedMovies.slice(1).map(movie => (
          <Link href={`watch?video=${movie.movieSlug}`} key={`showingNext-${movie.id}`}>
            <a>
              <Box className={classes.singleVideo}>
                <Box className={classes.imageWrapper}>
                  <img src={movie.heroImg} />
                  <Box className={classes.playTime}>
                    <Typography component="span">3:10</Typography>
                  </Box>
                </Box>
                <Box className={classes.sidebarVideoInfo}>
                  <Typography
                    className={classNames(classes.sidebarMovieTitle, classes.maxTwoLines)}
                  >
                    {movie.name}
                  </Typography>
                  <Box className={classes.sidebarVideoMeta}>
                    <Typography className={classes.singleLine}>FilmSpot Trailer</Typography>
                    <Typography className={classes.singleLine}>35K views • a day ago</Typography>
                  </Box>
                </Box>
              </Box>
            </a>
          </Link>
        ))
      }
    </Box>
  );
}

export default withRouter(withStyles(styles)(ShowingNext))
