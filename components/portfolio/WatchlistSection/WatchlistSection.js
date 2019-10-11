import React from "react"
import Router from 'next/router'

// @material-ui/core components
import { Typography, Link } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

// @material-ui/icons
import Button from "@material-ui/core/Button"
import CardActions from '@material-ui/core/CardActions'
import { Grid, Card, CardContent } from '@material-ui/core'

// core components
// import GridContainer from "./Grid/GridContainer.js"
// import GridItem from "./Grid/GridItem.js"
// import Card from "./Card/Card.js"
// import CardBody from "./Card/CardBody.js"
import ContentLoader from "react-content-loader"

import styles from "../../landing/InvestorTopPicks/InvestorTopPicks.style.js"

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

  const {
    watchlist,
    remove,
    findMovie
  } = props
  const watchlistMovies = watchlist.map((t) => findMovie(t))

  return (
    <>
      <div className={classes.section}>
        <h2 className={classes.title} style={{ textAlign: "left" }}>
          Your Watchlist
        </h2>
        <Grid container justify={'center'}>
          {
            watchlistMovies.length > 0 ?
            watchlistMovies.map((d, i) => 
              <Grid item key={i} xs={12} sm={12} md={4}>
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
                  <CardActions>
                    <Button
                      size="small"
                      variant="contained"
                      onClick={e => {
                        remove(d.ticker)
                      }}
                    >
                      Remove from Watchlist
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            )
            : <Typography>You aren't watching any movies yet! Try adding some from the <Link href="/">home page</Link>.</Typography>
          }
        </Grid>
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
