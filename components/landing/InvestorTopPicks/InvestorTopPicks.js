import React from "react"
import { inject, observer } from "mobx-react"
import Router from "next/router"

// nodejs library that concatenates classes
import classNames from "classnames"

// @material-ui/core components
import Button from "@material-ui/core/Button"
import CardActions from "@material-ui/core/CardActions"
import Typography from "@material-ui/core/Typography"
import { Grid, Card, CardContent } from '@material-ui/core'

// @material-ui styles
import { makeStyles } from "@material-ui/core/styles"

// core components
import ContentLoader from "react-content-loader"

import styles from "./InvestorTopPicks.style"

const useStyles = makeStyles(styles)

const MyLoader = () => (
  <ContentLoader
    height={217}
    width={400}
    speed={2}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
  >
    {/* Only SVG shapes */}
    <rect x="0" y="0" rx="5" ry="5" width="388" height="217" />
  </ContentLoader>
)

export default props => {
  const classes = useStyles()
  const { ...rest } = props
  const imageClasses = classNames(classes.imgCardTop)
  return (
    <>
      <div className={classes.section}>
        <Typography variant="h5" className={classes.title} style={{ textAlign: "left" }}>
          Investor Top Picks
        </Typography>
        <MoviesView classes={classes} />
      </div>
      <style jsx>{`
        .hero-container {
          position: relative;
          overflow: hidden;
        }
      `}</style>
    </>
  )
}

@inject("store")
@observer
class MoviesView extends React.Component {
  render() {
    const { store, classes } = this.props
    const { investorTopPicks } = store.movieStore
    const { userPortfolio } = store

    // What functions do we need from the movie and user store?
    console.log('watchlist', userPortfolio.watchlist)
    const loggedIn = store.userStore.loggedIn
    return (
      <Grid container>
        {investorTopPicks.map((d, i) => {
          const inWatchlist = userPortfolio.watchlist.indexOf(d.ticker) > -1
          return (
            <Grid item key={`picks_${i}`} xs={12} sm={12} md={4}>
              <Card plain>
                <Grid item
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    Router.push(`/film/${d.movieSlug}`)
                  }}
                  xs={12}
                  sm={12}
                  md={12}
                  className={classes.itemGrid}
                >
                  {/* <img src={team1} alt="..." className={imageClasses} /> */}
                  <img src={d.heroImg} alt={d.name} className={classes.img} />
                </Grid>
                <h4
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    Router.push(`/film/${d.movieSlug}`)
                  }}
                  className={classes.cardTitle}
                >
                  {d.name}
                </h4>
                <CardContent
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    Router.push(`/film/${d.movieSlug}`)
                  }}
                >
                  <p className={classes.description}>{d.shortDescription}</p>
                </CardContent>
                {
                  loggedIn ?
                  <CardActions>
                    <Button
                      size="small"
                      variant="contained"
                      onClick={e => {
                        inWatchlist ?
                          userPortfolio.removeFromWatchlist(d.ticker)
                          : userPortfolio.addToWatchlist(d.ticker)
                      }}
                    >
                      {inWatchlist ? 'Remove from Watchlist'  : 'Add to WatchList'}
                    </Button>
                  </CardActions>
                  : null
                }
              </Card>
            </Grid>
          )
        })}
      </Grid>
    )
  }
}
