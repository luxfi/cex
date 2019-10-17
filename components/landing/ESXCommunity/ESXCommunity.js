import React from "react"
import { inject, observer } from "mobx-react"
import Router from 'next/router'

// nodejs library that concatenates classes
import classNames from "classnames"

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles"
import { Grid, Card, CardContent, Avatar, Box, Typography, CardHeader } from '@material-ui/core'

// core components
import ContentLoader from "react-content-loader"

//styles
import styles from "../InvestorTopPicks/InvestorTopPicks.style.js"
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
    <div id="esx-community" style={{ padding: "48px 0px" }}>
      <Typography variant="h5" style={{ marginLeft: "56px" }} gutterBottom>
        <Box fontWeight={100} fontSize={20}>
          COMMUNITY BACKED FILMS IN THE NEWS
        </Box>
      </Typography>
      <br />
      <ArticleView classes={classes} />
    </div>
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
      <Grid container spacing={2}>
        {homePageArticles.map((d, i) => (
          <Grid item key={`picks_${i}`} xs={3} sm={12} md={3}>
            <Card elevation={0} style={{ cursor: "pointer", backgroundColor: "transparent" }} onClick={() => { Router.push(`/article/${d.articleSlug}`) }}>
              <CardHeader
                avatar={
                  <Avatar alt={d.articleTitle} src={d.avatar} />
                }
              />
              <CardContent>
                <Typography variant="h6" component="h2" noWrap>
                  {d.articleTitle}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {d.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid >
        ))}
      </Grid >
    )
  }
}
