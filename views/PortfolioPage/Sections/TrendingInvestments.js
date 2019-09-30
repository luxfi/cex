import React from "react"
// nodejs library that concatenates classes
import classNames from "classnames"
import ContentLoader from "react-content-loader"
// @material-ui/core components
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
  // const imageClasses = classNames(classes.imgCardTop)

  return (
    <>
      <h2 className={classes.title} style={{ textAlign: "left" }}>
        Trending Investments
      </h2>
      <List>
        {
          dataStub.map((trendingItem, i) =>
            (<div key={`listKey_${i}`}>
              <ListItem>
                <GridContainer style={{ width: '100%' }} alignItems='center' >
                  <GridItem xs={2}>
                    {trendingItem.ticker}
                  </GridItem>
                  <GridItem xs={6}>
                    <div style={{ width: '200px', height: '100px' }}>
                      {trendingItem.chart}
                    </div>
                  </GridItem>
                  <GridItem xs={4} style={{ textAlign: 'right' }}>
                    ${trendingItem.price}
                  </GridItem>
                </GridContainer>
              </ListItem>
              {
                i === dataStub.length - 1 ?
                null : <Divider />
              }
            </div>)
          )
        }
      </List>
    </>
  )
}
