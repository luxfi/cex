import React, { useState, useEffect } from "react"
import Link from "next/link"
import { withRouter } from "next/router"
import { inject, observer } from "mobx-react"

import { Button, Typography, Divider, Box, Switch } from "@material-ui/core"
import { withStyles } from "@material-ui/core/styles"

import classNames from "classnames"

import styles from "./style.js"

const ShowingNext = inject('store')(observer((props) => {
  const {
    classes,
    onClick,
    store: {
      trailerStore: { relatedMovies, autoplayMovies, autoPlay },
      trailerStore,
    }
  } = props
  
  const [state, setState] = useState({
    autoPlay: autoPlay,
  })

  useEffect(() => {
    setState({ ...state, autoPlay })
    trailerStore.setAutoplay(state.autoPlay)
  }, [autoPlay])

  const handleChecked = (event) => {
    setState({ ...state, autoPlay: event.target.checked })
    trailerStore.setAutoplay(event.target.checked)
  }

  const changeHeader = autoplayMovies.length
  const nextVideo = autoplayMovies[0] || {}

  return (
    <Box className={classes.relatedVideos}>
      <Box className={classes.upNextTop}>
        <Typography variant="h4" className="title">{ changeHeader ? 'Up next' : 'Related Movies' }</Typography>
        <Box className={classes.upNextToggle}>
          <Typography component="span">Autoplay</Typography>
          <Switch
            checked={state.autoPlay}
            onChange={handleChecked}
          />
        </Box>
      </Box>
      {
        autoplayMovies.length ? (
          <>
            <Link
              href={`watch?video=${autoplayMovies[0].movieSlug}`} key={`showingNext-${autoplayMovies[0].id}`}>
              <a onClick={() => onClick(autoplayMovies[0].movieSlug)}>
                  <Box className={classes.singleVideo}>
                    <Box className={classes.imageWrapper}>
                      <img src={autoplayMovies[0].heroImg} />
                      <Box className={classes.playTime}>
                        <Typography component="span">6:13</Typography>
                      </Box>
                    </Box>
                    <Box className={classes.sidebarVideoInfo}>
                      <Typography
                        className={classNames(classes.sidebarMovieTitle, classes.maxTwoLines)}
                      >
                        {autoplayMovies[0].name}
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
          </>
        ): ('')
      }
      {
        relatedMovies.length && relatedMovies.map(movie => nextVideo.id == movie.id ? null : (
          <Link href={`watch?video=${movie.movieSlug}`} key={`showingNext-${movie.id}`}>
            <a onClick={() => onClick(movie.movieSlug)}>
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
}))

export default withRouter(withStyles(styles)(ShowingNext))
