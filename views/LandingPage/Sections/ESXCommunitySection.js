import React from "react"
import { inject, observer } from "mobx-react"
// nodejs library that concatenates classes
import classNames from "classnames"
// @material-ui/core components
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
    height={70}
    width={60}
    speed={2}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
  >
    {/* Only SVG shapes */}
    <circle cx="30" cy="30" r="30" />
  </ContentLoader>
)

export default props => {
  const classes = useStyles()
  const { ...rest } = props
  const imageClasses = classNames(classes.imgCardTop)
  return (
    <>
      <div className={classes.section}>
        <h2 className={classes.title} style={{ textAlign: "left" }}>
          ESX Community Backed Films in the News
        </h2>
        <ArticleView classes={classes} />
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
class ArticleView extends React.Component {
  render() {
    const { store, classes } = this.props
    const { investorTopPicks } = store.articleStore
    // let topPicks = movies.slice(0, 3)
    return (
      <GridContainer>
        {investorTopPicks.map((d, i) => (
          <GridItem key={`picks_${i}`} xs={12} sm={12} md={3}>
            <Card plain>
              <GridItem xs={12} sm={12} md={12} className={classes.itemGrid}>
                {/* <img src={team1} alt="..." className={imageClasses} /> */}
                <img src={d.heroImg} alt={d.name} className={classes.img} />
              </GridItem>
              <h4 className={classes.cardTitle}>{d.name}</h4>
              <CardBody>
                <p className={classes.description}>{d.shortDescription}</p>
              </CardBody>
            </Card>
          </GridItem>
        ))}
      </GridContainer>
    )
  }
}
