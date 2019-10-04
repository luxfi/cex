import React from "react"
import Link from 'next/link'
// nodejs library that concatenates classes
import classNames from "classnames"
import ContentLoader from "react-content-loader"
// @material-ui/core components
import { Typography } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles"

// @material-ui/icons

// core components
import GridContainer from "../../../components/Grid/GridContainer.js"
import GridItem from "../../../components/Grid/GridItem.js"

import styles from "../../../assets/jss/views/landingPageSections/investorTopPicksStyle.js"
import { List, ListItem, Divider } from "@material-ui/core"

const useStyles = makeStyles(styles)

const MyLoader = (props) => {
  return (
    <ContentLoader
      height={props.h}
      width={props.w}
      speed={2}
      primaryColor="#f3f3f3"
      secondaryColor="#ecebeb"
    >
      {/* Only SVG shapes */}
      <rect x="0" y="0" rx="3" ry="3" width={props.w} height={props.h} />
    </ContentLoader>
  )
}

const dataStub = [
  {
    ticker: 'SAWX',
    chart: <MyLoader w={200} h={100} />,
    price: '625.61'
  },
  {
    ticker: 'WOLF',
    chart: <MyLoader w={200} h={100} />,
    price: '121.30'
  },
  {
    ticker: 'NESA',
    chart: <MyLoader w={200} h={100} />,
    price: '114.31'
  },
  {
    ticker: 'OSOO',
    chart: <MyLoader w={200} h={100} />,
    price: '78.34'
  },
]

export default props => {
  const classes = useStyles()
  const { investments, findMovieByTicker } = props
  // const imageClasses = classNames(classes.imgCardTop)

  return (
    <>
      <h2 className={classes.title} style={{ textAlign: "left" }}>
        Your Investments
      </h2>
      <List>
        <ListItem>
          <GridContainer style={{ width: '100%' }} alignItems='center' >
            <GridItem xs={2}>
              <Typography>Movie Ticker</Typography>
            </GridItem>
            <GridItem xs={4}>
              <Typography style={{ marginLeft: '82px' }}>Chart</Typography>
            </GridItem>
            <GridItem xs={2} style={{ textAlign: 'right' }}>
              <Typography>Shares Owned</Typography>
            </GridItem>
            <GridItem xs={4} style={{ textAlign: 'right' }}>
              <Typography>Total Value</Typography>
            </GridItem>
          </GridContainer>
        </ListItem>
        {
          investments && investments.length > 0 ?
          investments.map((trendingItem, i) => {
            const movie = findMovieByTicker(trendingItem.ticker)
            return (
              <div key={`listKey_${i}`}>
                <ListItem>
                  <GridContainer style={{ width: '100%' }} alignItems='center' >
                    <GridItem xs={2}>
                      <Link href={`/film/${movie.movieSlug}`}>{trendingItem.ticker}</Link>
                    </GridItem>
                    <GridItem xs={4}>
                      <div style={{ width: '200px', height: '100px' }}>
                        {trendingItem.chart || <MyLoader w={200} h={100} />}
                      </div>
                    </GridItem>
                    <GridItem xs={2} style={{ textAlign: 'right' }}>
                      {trendingItem.amount}
                    </GridItem>
                    <GridItem xs={4} style={{ textAlign: 'right' }}>
                      ${trendingItem.amount * parseFloat(trendingItem.price).toFixed(2)}
                    </GridItem>
                  </GridContainer>
                </ListItem>
                {
                  i === investments.length - 1 ?
                  null : <Divider />
                }
              </div>
            )
          }
          ) : <Typography style={{ textAlign: 'center' }}>You don't have any investments yet! Go to the <Link href="/">home page</Link> to start investing.</Typography>
        }
      </List>
    </>
  )
}
