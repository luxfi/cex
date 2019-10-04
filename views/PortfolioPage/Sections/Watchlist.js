import React from "react"
// nodejs library that concatenates classes
import classNames from "classnames"
// @material-ui/core components
import { Typography, Link } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

// @material-ui/icons

// core components
import GridContainer from "../../../components/Grid/GridContainer.js"
import GridItem from "../../../components/Grid/GridItem.js"
import Card from "../../../components/Card/Card.js"
import CardBody from "../../../components/Card/CardBody.js"
import ContentLoader, { Facebook } from "react-content-loader"
import Button from "@material-ui/core/Button"

import styles from "../../../assets/jss/views/landingPageSections/investorTopPicksStyle.js"

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
    title: `Call of the Wild: A Space Odyssey`,
    body: `Deep in the human unconscious is a pervasive need for a logical universe that makes sense. But the real universe is always one step beyond logic.`,
    image: (<MyLoader />)
  },
  {
    title: `Call of the Wild: A Space Odyssey`,
    body: `Deep in the human unconscious is a pervasive need for a logical universe that makes sense. But the real universe is always one step beyond logic.`,
    image: (<MyLoader />)
  },
  {
    title: `Call of the Wild: A Space Odyssey`,
    body: `Deep in the human unconscious is a pervasive need for a logical universe that makes sense. But the real universe is always one step beyond logic.`,
    image: (<MyLoader />)
  }
]

export default props => {
  const classes = useStyles()
  // const imageClasses = classNames(classes.imgCardTop)
  const {
    watchlist,
    remove,
    findMovie
  } = props
  const watchlistMovies = watchlist.map((t) => findMovie(t))
  remove
  return (
    <>
      <div className={classes.section}>
        <h2 className={classes.title} style={{ textAlign: "left" }}>
          Your Watchlist
        </h2>
        <GridContainer justify={'center'}>
          {
            watchlistMovies.length > 0 ?
            watchlistMovies.map((d, i) => 
              <GridItem key={i} xs={12} sm={12} md={4}>
                <Card plain>
                  <Button
                    size="small"
                    onClick={e => {
                        remove(d.ticker)
                    }}
                  >Remove from Watchlist</Button>
                  <GridItem
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
                  </GridItem>
                  <h4
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      Router.push(`/film/${d.movieSlug}`)
                    }}
                    className={classes.cardTitle}
                  >
                    {d.name}
                  </h4>
                  <CardBody
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      Router.push(`/film/${d.movieSlug}`)
                    }}
                  >
                    <p className={classes.description}>{d.shortDescription}</p>
                  </CardBody>
                </Card>
              </GridItem>
            )
            : <Typography>You aren't watching any movies yet! Try adding some from the <Link href="/">home page</Link>.</Typography>
          }
        </GridContainer>
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
