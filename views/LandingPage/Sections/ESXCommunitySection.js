import React from "react"
import { inject, observer } from "mobx-react"
import Router from 'next/router'
import ContentLoader, { Facebook } from "react-content-loader"
// nodejs library that concatenates classes
import classNames from "classnames"
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles"

// @material-ui/icons

// core components
// import GridContainer from "../../../components/Grid/GridContainer.js"
// import GridItem from "../../../components/Grid/GridItem.js"
// import Card from "../../../components/Card/Card.js"
// import CardBody from "../../../components/Card/CardBody.js"
// import ImageAvatars from "../../../components/ImageAvatars"
import { Grid, Card, CardContent, Avatar } from '@material-ui/core'

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
      <style jsx>{`i
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
      <Grid container>
        {homePageArticles.map((d, i) => (
          <Grid item key={`picks_${i}`} xs={12} sm={12} md={3}>
            <Card elevation={0} style={{ cursor: "pointer", backgroundColor: "transparent" }} onClick={() => { Router.push(`/article/${d.articleSlug}`) }}>
              <Grid item xs={2} sm={2} md={2}>
                <Grid container justify="center" alignItems="center">
                  <Avatar alt={d.articleTitle} src={d.avatar} />
                </Grid>
              </Grid >
              <h4 className={classes.cardTitle}>{d.articleTitle}</h4>
              <CardContent>
                <p className={classes.description}>{d.description}</p>
              </CardContent>
            </Card>
          </Grid >
        ))}
      </Grid >
    )
  }
}
