import React from "react"
import Router from "next/router"

// nodejs library that concatenates classes
import classNames from "classnames"

// @material-ui/core components
import {
  Avatar,
  CardHeader,
  Chip,
  Divider,
  Typography,
  Card,
  Grid,
  CardContent,
} from "@material-ui/core"
import ContentLoader from "react-content-loader"

// styles
import { makeStyles } from "@material-ui/core/styles"
import styles from "../../portfolio/TradeView/TradeView.style.js"

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

const dataStub = [
  {
    title: "Call of the Wild: A Space Odyssey",
    image: <MyLoader />,
    description: `Deep in the human unconscious is a pervasive need for a
    logical universe that makes sense. But the real universe is
    always one step beyond logic.`,
    releaseDate: "2019",
    category: "indie",
    currencySymbol: "$",
    amount: 760
  },
  {
    title: "Call of the Wild: A Space Odyssey",
    image: <MyLoader />,
    description: `Deep in the human unconscious is a pervasive need for a
    logical universe that makes sense. But the real universe is
    always one step beyond logic.`,
    releaseDate: "2019",
    category: "indie",
    currencySymbol: "$",
    amount: 3360
  },
  {
    title: "Call of the Wild: A Space Odyssey",
    image: <MyLoader />,
    description: `Deep in the human unconscious is a pervasive need for a
    logical universe that makes sense. But the real universe is
    always one step beyond logic.`,
    releaseDate: "2019",
    category: "indie",
    currencySymbol: "$",
    amount: 620
  }
]

export default props => {
  const classes = useStyles()
  const { store, ...rest } = props
  const { investorTopPicks } = store.movieStore
  const truncate = input =>
    input
      .split(" ")
      .slice(0, 23)
      .join(" ") + "..."

  const { userPortfolio } = store

  // What functions do we need from the movie and user store?
  const addToWatchlist = t => {
    userPortfolio.addToWatchlist(t, findMovieByTicker)
  }
  return (
    <>
      <div className={classes.section}>
        <h2 className={classes.title} style={{ textAlign: "left" }}>
          Top Picks for You
        </h2>
        <Grid container spacing={3}>
          {investorTopPicks.map((d, i) => (
            <Grid item key={`picks_${i}`} xs={12} sm={12} md={4}>
              <Card className={classes.investmentCard}>
                <CardHeader
                  avatar={
                    <Avatar src={d.posterImg} aria-label="avatar-image" />
                  }
                  action={
                    <Chip label={d.genre[0]} className={classes.categoryChip} />
                  }
                  title={d.name}
                  subheader={d.releaseDate}
                />
                <CardContent>
                  <Typography variant="body1"  paragraph>
                    {truncate(d.shortDescription)}
                  </Typography>
                  <Divider variant="middle" />
                  <div className={classes.ctaDiv}>
                    <Chip
                      label="invest"
                      className={classes.ctaChip}
                      clickable
                      onClick={() => {
                        Router.push(`/film/${d.movieSlug}`)
                      }}
                    />
                    <Typography className={classes.earningsAmountText}>
                      <Typography
                        component="span"
                        variant="inherit"
                        className={classes.currencySymbol}
                      >
                        ${/* {d.currencySymbol} */}
                      </Typography>
                      {d.price}
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
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
