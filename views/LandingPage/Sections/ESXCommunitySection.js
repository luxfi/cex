import React from "react"
import { inject, observer } from "mobx-react"
import Link from "next/link"
import dynamic from "next/dynamic"
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
import ImageAvatars from "../../../components/ImageAvatars"

import styles from "../../../assets/jss/views/landingPageSections/investorTopPicksStyle.js"

const useStyles = makeStyles(styles)

// Todo: make new loader that matches avatar, image and description, and waits until all have loader to render
// const DynamicComponentWithCustomLoading = dynamic(
//   () => import('../components/hello2'),
//   { loading: () => <p>...</p> }
// )

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
    const { homePageArticles } = store.articleStore
    // let topPicks = movies.slice(0, 3)
    return (
      <GridContainer>
        {homePageArticles.map((d, i) => (
          <Link href={`article/${d.articleSlug}`}>
            <GridItem key={`picks_${i}`} xs={12} sm={12} md={3}>
              <Card plain>
                <GridItem xs={2} sm={2} md={2}>
                  <ImageAvatars alt={d.articleTitle} src={d.avatar} />
                  {/* <MyLoader /> */}
                </GridItem>
                {/* <GridItem xs={12} sm={12} md={12} className={classes.itemGrid}>
                <img src={d.heroImage} alt={d.name} className={classes.img} />
              </GridItem> */}
                <h4 className={classes.cardTitle}>{d.articleTitle}</h4>
                <CardBody>
                  <p className={classes.description}>{d.description}</p>
                </CardBody>
              </Card>
            </GridItem>
          </Link>
        ))}
      </GridContainer>
    )
  }
}
