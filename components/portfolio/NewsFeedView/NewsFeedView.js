/* eslint-disable react/prop-types */
import React from "react"
import {
  makeStyles,
  Grid,
  Chip
} from "@material-ui/core"
import ContentLoader from "react-content-loader"
import moment from 'moment'
import classnames from 'classnames'

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

const Item2 = props => {
  const content = {__html: props.content}
  return (
    <Grid item xs={12} sm={4}>
      <div dangerouslySetInnerHTML={content} />
    </Grid>
  )
}

const Item = props => {

  const { classes, title, author, date, blurb, link, categories, image } = props

  return (
    <Grid item xs={12} sm={4} style={{ height: 'auto' }}>
      {/* <ImgLoader width={500} height={400} /> */}
      <h6 className={classes.itemTitle}>{title}</h6>
      {
        image ?
          <img src={image} height={225} /> : null
      }
      <p className={classes.itemCopy}>{author} - {moment(date).format('MM-DD-YYYY')}</p>
      <div className={classes.itemCategories}>
        {
          categories.slice(0, 3).map((c, i) => <a key={c._+i} className={classnames(classes.link, classes.chipLink)} href={c['$'].domain} target="_blank"><Chip clickable label={c._} /></a>)
        }
      </div>
      <p className={classes.itemCopy}>{blurb}</p>
      <p>
        <a href={link} className={classes.link} target="_blank">Read More</a>
      </p>
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
      {/* <h2 className={classes.sectionTitle}>{title}</h2> */}
      {/* <br /> */}
      <Grid container spacing={3}>
        {children}
      </Grid>
    </>
  )
}

const NewsFeedView = (props) => {

  const classes = styles()

  return (
    <div className={classes.outerMost}>
      <NewsFeedSection title='Hot Off The Wrap' classes={classes} >
        {
          props.feed.map((i, k) => 
            <Item 
              key={k} 
              classes={classes} 
              title={i.title} 
              date={i.isoDate} 
              link={i.link} 
              author={i.creator} 
              blurb={i.contentSnippet} 
              categories={i.categories} 
              image={i.image}
            />
          )
        }
      </NewsFeedSection>
    </div>
  )
}

export default NewsFeedView
