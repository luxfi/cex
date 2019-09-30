import React from "react"
// nodejs library that concatenates classes
import classNames from "classnames"
// @material-ui/core components
import { Avatar, CardHeader, Chip, Divider, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

// @material-ui/icons
import MoreVertIcon from "@material-ui/icons/MoreVert"

// core components
import GridContainer from "../../../components/Grid/GridContainer.js"
import GridItem from "../../../components/Grid/GridItem.js"
import Card from "../../../components/Card/Card.js"
import CardBody from "../../../components/Card/CardBody.js"
import ContentLoader, { Facebook } from "react-content-loader"

import styles from "../../../assets/jss/views/portfolioPageSections/portfolioTradeStyle.js"

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
    title: 'Call of the Wild: A Space Odyssey',
    image: <MyLoader />,
    description: `Deep in the human unconscious is a pervasive need for a
    logical universe that makes sense. But the real universe is
    always one step beyond logic.`,
    releaseDate: '2019',
    category: 'indie',
    currencySymbol: '$',
    amount: 760
  },
  {
    title: 'Call of the Wild: A Space Odyssey',
    image: <MyLoader />,
    description: `Deep in the human unconscious is a pervasive need for a
    logical universe that makes sense. But the real universe is
    always one step beyond logic.`,
    releaseDate: '2019',
    category: 'indie',
    currencySymbol: '$',
    amount: 3360
  },
  {
    title: 'Call of the Wild: A Space Odyssey',
    image: <MyLoader />,
    description: `Deep in the human unconscious is a pervasive need for a
    logical universe that makes sense. But the real universe is
    always one step beyond logic.`,
    releaseDate: '2019',
    category: 'indie',
    currencySymbol: '$',
    amount: 620
  }
]

export default props => {
  const classes = useStyles()
  const { ...rest } = props

  return (
    <>
      <div className={classes.section}>
        <h2 className={classes.title} style={{ textAlign: "left" }}>
          Top Picks for You
        </h2>
        <GridContainer>
          {
            dataStub.map((d, i) => 
              <GridItem key={`picks_${i}`} xs={12} sm={12} md={4}>
                <Card className={classes.investmentCard}>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="avatar-image">
                        {d.title[0]}
                      </Avatar>
                    }
                    action={
                      <Chip label={d.category} className={classes.categoryChip} />
                    }
                    title={d.title}
                    subheader={d.releaseDate}
                  />
                  <CardBody>
                    <p className={classes.description}>
                      {d.description}
                    </p>
                    <Divider variant='middle' />
                    <div className={classes.ctaDiv}>
                      <Chip label="invest" className={classes.ctaChip} clickable />
                      <Typography className={classes.earningsAmountText}>
                        <Typography component='span' variant='inherit' className={classes.currencySymbol}>{d.currencySymbol}</Typography>{d.amount}
                      </Typography>
                    </div>
                  </CardBody>
                </Card>
              </GridItem>
            )
          }
        </GridContainer>
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
