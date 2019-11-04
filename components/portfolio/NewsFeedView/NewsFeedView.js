/* eslint-disable react/prop-types */
import React from "react"
import {
  makeStyles,
  Grid,
} from "@material-ui/core"
import ContentLoader from "react-content-loader"

import myStyles from "./NewsFeedView.style.js"

const styles = makeStyles(myStyles)

const sectionTitles = {
  investments: "Trending Investments",
  thisWeek: "This Week at the Box Office",
  indieNews: "News About Indie Producers"
}

const filmTitles = [
  "Call of the Wild: A Space Odyssey",
  "The Lone Wold Dies",
  "Runs with Wolves"
]

const lipsum = "Duis aute irure dolor in reprehenderit in \
    voluptate velit esse cillum dolore eu fugiat nulla pariatur."

    //The maximum is exclusive and the minimum is inclusive
const randomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}


const ImgLoader = (props) => {

  return (
    <ContentLoader
      width={props.width}
      height={props.height}
      speed={2}
      primaryColor="#f3f3f3"
      secondaryColor="#ecebeb"
    >
      <rect x="0" y="0" rx="5" ry="5" width={props.width} height={props.height} />
    </ContentLoader>
  )
}

const Item = props => {

  const {classes} = props

  return (
    <Grid item xs={12} sm={4}>
      <ImgLoader width={500} height={400} />
      <h6 className={classes.itemTitle} >{filmTitles[randomInt(0, 3)]}</h6>
      <p className={classes.itemCopy} >{lipsum}</p>
    </Grid>
  )
}

const NewsFeedSection = props => {
  const {
    title,
    classes,
    children
  } = props

  return (
    <>
      <h2 className={classes.sectionTitle}>{title}</h2>
      <br />
      <Grid container spacing={3}>
        {children}
      </Grid>
    </>
  )
}

const NewsFeedView = (props) => {
  const { tabIdx, index } = props
  // Not me! Don't render
  if (tabIdx !== index) return null

  const classes = styles()

  return (
    <div className={classes.outerMost}>
      <NewsFeedSection title={sectionTitles.investments} classes={classes} >
        <Item classes={classes} />
        <Item classes={classes} />
        <Item classes={classes} />
      </NewsFeedSection>
      <br />
      <NewsFeedSection title={sectionTitles.thisWeek} classes={classes} >
        <Item classes={classes} />
        <Item classes={classes} />
        <Item classes={classes} />
      </NewsFeedSection>
      <br />
      <NewsFeedSection title={sectionTitles.indieNews} classes={classes} >
        <Item classes={classes} />
        <Item classes={classes} />
        <Item classes={classes} />
      </NewsFeedSection>
      <br />
    </div>
  )
}

export default NewsFeedView
