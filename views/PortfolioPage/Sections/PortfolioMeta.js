import React from "react"
// nodejs library that concatenates classes
import classNames from "classnames"
// @material-ui/core components
import { Chip, Divider, Typography, Icon } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

// @material-ui/icons

// core components
import GridContainer from "../../../components/Grid/GridContainer.js"
import GridItem from "../../../components/Grid/GridItem.js"
import Card from "../../../components/Card/Card.js"
import CardBody from "../../../components/Card/CardBody.js"
import ContentLoader, { Facebook } from "react-content-loader"

import styles from "../../../assets/jss/views/portfolioPageSections/portfolioMetaStyle.js"

const useStyles = makeStyles(styles)

const MyLoader = () => (
  <ContentLoader
    height={150}
    width={400}
    speed={2}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
  >
    {/* Only SVG shapes */}
    <rect x="0" y="0" rx="5" ry="5" width="388" height="217" />
  </ContentLoader>
)

// TODO Add padding helpers to work with floating values that have zeroes at the start or end
const dataStub = {
  earnings: '2878.90',
  weeklyChange: 42,
  currencySymbol: '$',
  earningsChips: [
    {
      amount: '0.9807',
      ticker: 'WOLF'
    },
    {
      amount: '0.5',
      ticker: 'INDI'
    }
  ],
  topCategories: [
    'indie', 'horror', '2019'
  ],
  rank: 607,
  percentile: '40%',
  benefits: 45,
  benefitsThisMonth: 10
}

export default props => {
  const classes = useStyles()
  // const imageClasses = classNames(classes.imgCardTop)

  return (
    <GridContainer>
      <GridItem xs={12} md={8}>
        <Card className={classes.card}>
          <CardBody>
            <GridContainer>
              <GridItem xs={6} md={3}>
                <GridContainer direction="column" justify={'space-around'} className={classNames(classes.earningsContainer, classes.fontBoost)}>
                  <Typography variant='h1' className={classes.earningsText} gutterBottom>Holdings</Typography>
                  <Typography className={classes.earningsAmountText}><Typography component='span' variant='inherit' className={classes.currencySymbol}>{dataStub.currencySymbol}</Typography>{dataStub.earnings}</Typography>
                  <Typography className={classes.earningsChangeText} gutterBottom>+{dataStub.weeklyChange} from last week</Typography>
                  <GridItem xs={6}>
                    {
                      dataStub.earningsChips.map((c, i) => <Chip key={`earningsChip_${i}`} label={`${c.amount} ${c.ticker}`} className={classes.earningsChip} />)
                    }
                  </GridItem>
                </GridContainer>
              </GridItem>
              <GridItem xs={12} sm={9}>
                <MyLoader />
              </GridItem>
            </GridContainer>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={6} md={4}>
        <Card className={classes.card} style={{ minHeight: '221px' }}>
          <CardBody>
            <GridContainer direction="column" justify={'space-around'} className={classes.earningsContainer}>
              <GridItem xs={12} className={classNames(classes.fontBoost, classes.metaFlex)}>
                <GridContainer>
                  <GridItem xs={6}>
                      <Typography variant='h1' className={classes.earningsText} gutterBottom>Rank</Typography>
                      <Typography variant='inherit' className={classes.metaHighlightNumber}><Icon color='disabled' className={classes.metaIcon}>stars_rounded</Icon> {dataStub.rank}</Typography>
                      <Typography className={classes.earningsChangeText} gutterBottom>
                        You're in the top <Typography component='span' variant='inherit' className={classes.darkSpan}>{dataStub.percentile}</Typography>
                      </Typography>
                  </GridItem>
                  <GridItem xs={6}>
                    <Typography variant='h1' className={classes.earningsText} gutterBottom>Benefits</Typography>
                    <Typography variant='inherit' className={classes.metaHighlightNumber}><Icon className={classNames(classes.codeIcon, classes.metaIcon)}>code_rounded</Icon> {dataStub.benefits}</Typography>
                    <Typography className={classes.earningsChangeText} gutterBottom>
                      <Typography component='span' variant='inherit' className={classes.darkSpan}>{dataStub.benefitsThisMonth}</Typography> in this month
                    </Typography>
                  </GridItem>
                </GridContainer>
              </GridItem>
              <Divider variant='middle' />
              <GridItem xs={12} className={classNames(classes.fontBoost, classes.metaFlex)}>
                <Typography variant='h1' gutterBottom className={classes.topCategoriesTitle}>Top Categories</Typography>
                {
                  dataStub.topCategories.map((c, i) => <Chip key={`topCategoryChip_${i}`} label={c} className={classes.topCategoriesChip} />)
                }
              </GridItem>
            </GridContainer>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  )
}
