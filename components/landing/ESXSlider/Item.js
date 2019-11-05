import React from "react"
import Link from "next/link"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import SliderContext from "./context"
import "./Item.css"
import {
  Card,
  CardContent,
  Button,
  CardActions,
  IconButton,
  Avatar
} from "@material-ui/core"
import PlayArrowIcon from "@material-ui/icons/PlayArrowRounded"
import { TrailerSliderModal } from "../"
const { forwardRef, useRef, useImperativeHandle } = React
import { CustomLink } from "../../app/"

const useStyles = makeStyles(theme => {
  return {
    avatar: {
      backgroundColor: "rgba(0,0,0,.5)",
      margin: 10,
      width: 100,
      height: 100
    },
    playIcon: {
      height: 80,
      width: 80,
      color: theme.palette.secondary.main
    },
    buttons: {
      display: "flex",
      justifyContent: "space-around"
    },
    button: {
      marginLeft: theme.spacing(1)
    }
  }
})

const Item = ({
  movie,
  loggedIn,
  inWatchlist,
  addToWatchlist,
  removeFromWatchlist
}) => {
  const childRef = useRef()
  const classes = useStyles()
  return (
    <SliderContext.Consumer>
      {({ onSelectSlide, currentSlide, elementRef }) => {
        const isActive = currentSlide && currentSlide.id === movie.id
        return (
          <div
            ref={elementRef}
            className="item"
            style={{
              flex: "0 0 19.7%",
              textAlign: "center",
              marginRight: "16px",
              transition: "transform 300ms ease 100ms",
              position: "relative"
            }}
          >
            <Card>
              <CardContent
                style={{
                  display: "flex",
                  position: "relative",
                  alignItems: "center",
                  justifyContent: "center",
                  maxHeight: "1200px",
                  minHeight: "487px",
                  minWidth: "337px",
                  backgroundImage: `url(${movie.posterImg})`,
                  backgroundSize: "cover"
                }}
              >
                <Avatar
                  className={classes.avatar}
                  onClick={() => childRef.current.handleOpen()}
                >
                  <IconButton aria-label="play/pause">
                    <PlayArrowIcon className={classes.playIcon} />
                  </IconButton>
                </Avatar>
                <TrailerSliderModal movie={movie} ref={childRef} />
              </CardContent>
              <CardActions
                style={{ background: "transparent" }}
                className={classes.buttons}
              >
                <Button
                  component={CustomLink}
                  href={"/film/" + movie.movieSlug}
                  size="small"
                  className={classes.button}
                >
                  Learn More
                </Button>
                <Button
                  size="small"
                  className={classes.button}
                  onClick={e => {
                    inWatchlist
                      ? removeFromWatchlist(movie.ticker)
                      : addToWatchlist(movie.ticker)
                  }}
                >
                  {inWatchlist ? "Remove from Watchlist" : "Add to WatchList"}
                </Button>
                <Button
                  component={CustomLink}
                  href={"/film/" + movie.movieSlug}
                  size="small"
                  className={classes.button}
                >
                  Invest
                </Button>
              </CardActions>
            </Card>
          </div>
        )
      }}
    </SliderContext.Consumer>
  )
}

export default Item
