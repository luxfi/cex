/* eslint-disable react/prop-types */
import React from "react"
import classNames from "classnames"
import { makeStyles } from "@material-ui/core/styles"
import {

} from "@material-ui/core"
import ContentLoader from "react-content-loader"

const miniReset = {
  margin: 0,
  padding: 0
}

const styles = makeStyles(theme => ({

  itemOuter: {
    padding: theme.spacing(2),
    height: "375px",
    color: theme.palette.text.primary,
    flex: "1 1 33%",

    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between"
  },
  itemTitle: {
    ...miniReset,
    fontSize: "1.2rem",
    fontWeight: 600,
    margin: theme.spacing(0, 2)
  },

  sectionTitle: {
    ...miniReset,
    fontSize: "1.5rem",
    fontWeight: 600,
    margin: theme.spacing(0, 1)
  },

  outerMost: {
    display: "flex",
    flexDirection: "column",
  },

  rowOuter: {
    flex: "0 0 100%",

    display: "flex",
    flexDirection: "row",
  },


  itemTitle: {
    ...miniReset,
    fontSize: "1.1rem",
    fontWeight: 600,
    margin: theme.spacing(0.5, 0)
  },

}))


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
    <div className={classes.itemOuter}>
      <ImgLoader width={500} height={400} />
      <h6 className={classes.itemTitle} >{filmTitles[randomInt(0, 3)]}</h6>
      <p className={classes.itemCopy} >{lipsum}</p> 
    </div>
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
      <div className={classes.rowOuter}>
        {children}
      </div>
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
      <NewsFeedSection title={sectionTitles.thisWeek} classes={classes} >
        <Item classes={classes} />
        <Item classes={classes} />
        <Item classes={classes} />
      </NewsFeedSection>
      <NewsFeedSection title={sectionTitles.indieNews} classes={classes} >
        <Item classes={classes} />
        <Item classes={classes} />
        <Item classes={classes} />
      </NewsFeedSection>
    </div>
  )
}

export default NewsFeedView
