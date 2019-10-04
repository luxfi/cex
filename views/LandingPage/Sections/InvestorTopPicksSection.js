import React from "react"
import { inject, observer } from "mobx-react"
import Router from "next/router"

// nodejs library that concatenates classes
import classNames from "classnames"

// @material-ui/core components
import Button from "@material-ui/core/Button"
import CardActions from "@material-ui/core/CardActions"

// @material-ui styles
import { makeStyles } from "@material-ui/core/styles"

// @material-ui/icons

// core components
import GridContainer from "../../../components/Grid/GridContainer.js"
import GridItem from "../../../components/Grid/GridItem.js"
import Card from "../../../components/Card/Card.js"
import CardBody from "../../../components/Card/CardBody.js"
import ContentLoader, { Facebook } from "react-content-loader"

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
    title: "Call of the Wild: A Space Odyssey",
    image: <MyLoader />,
    description: `Deep in the human unconscious is a pervasive need for a
    logical universe that makes sense. But the real universe is
    always one step beyond logic.`
  },
  {
    title: "Call of the Wild: A Space Odyssey",
    image: <MyLoader />,
    description: `Deep in the human unconscious is a pervasive need for a
    logical universe that makes sense. But the real universe is
    always one step beyond logic.`
  },
  {
    title: "Call of the Wild: A Space Odyssey",
    image: <MyLoader />,
    description: `Deep in the human unconscious is a pervasive need for a
    logical universe that makes sense. But the real universe is
    always one step beyond logic.`
  }
]

export default props => {
  const classes = useStyles()
  const { ...rest } = props
  const imageClasses = classNames(classes.imgCardTop)
  return (
    <>
      <div className={classes.section}>
        <h2 className={classes.title} style={{ textAlign: "left" }}>
          Investor Top Picks
        </h2>
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
    // let topPicks = movies.slice(0, 3)
    return (
      <GridContainer>
        {investorTopPicks.map((d, i) => (
          <GridItem key={`picks_${i}`} xs={12} sm={12} md={4}>
            <Card plain>
              <CardActions>
                <Button
                  size="small"
                  onClick={e => {
                    e.preventDefault()
                  }}
                >
                  Add to WatchList
                </Button>
              </CardActions>
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
        ))}
      </GridContainer>
    )
  }
}
