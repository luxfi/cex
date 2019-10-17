// FOR DELETE
import React from "react"
// nodejs library that concatenates classes
import classNames from "classnames"
// @material-ui/core components
import { Chip, Divider, Typography, Icon, Grid, Card, CardContent } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

// core components
import ContentLoader from "react-content-loader"

import styles from "./PortfolioMeta.style"

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
  earnings: "2878.90",
  weeklyChange: 42,
  currencySymbol: "$",
  earningsChips: [
    {
      amount: "0.9807",
      ticker: "WOLF"
    },
    {
      amount: "0.5",
      ticker: "INDI"
    }
  ],
  topCategories: ["indie", "horror", "2019"],
  rank: 607,
  percentile: "40%",
  benefits: 45,
  benefitsThisMonth: 10
}

export default props => {
  const classes = useStyles()
  const {
    holdings,
    weeklyChange,
    rank,
    rankPercent,
    benefits,
    benefitsMonthly,
    topCategories
  } = props
  // const imageClasses = classNames(classes.imgCardTop)

  return (
    <Grid container>
      <Grid item xs={12} md={8}>
        <Card className={classes.card}>
          <CardContent>
            <Grid container>
              <Grid item xs={6} md={3}>
                <Grid container
                  direction="column"
                  justify={"space-around"}
                  className={classNames(
                    classes.earningsContainer,
                    classes.fontBoost
                  )}
                >
                  <Typography
                    variant="h1"
                    className={classes.earningsText}
                    gutterBottom
                  >
                    Holdings
                  </Typography>
                  <Typography className={classes.earningsAmountText}>
                    <Typography
                      component="span"
                      variant="inherit"
                      className={classes.currencySymbol}
                    >
                      {dataStub.currencySymbol}
                    </Typography>
                    {holdings}
                  </Typography>
                  <Typography
                    className={classes.earningsChangeText}
                    gutterBottom
                  >
                    {weeklyChange} from last week
                  </Typography>
                  <Grid item xs={6}>
                    {dataStub.earningsChips.map((c, i) => (
                      <Chip
                        key={`earningsChip_${i}`}
                        label={`${c.amount} ${c.ticker}`}
                        className={classes.earningsChip}
                      />
                    ))}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={9}>
                <img
                  src="/static/img/portfolio/portfolioChartTmp.png"
                  alt="USER EARNINGS CHART"
                  width="400"
                  height="200"
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6} md={4}>
        <Card className={classes.card} style={{ minHeight: "221px" }}>
          <CardContent>
            <Grid container
              direction="column"
              justify={"space-around"}
              className={classes.earningsContainer}
            >
              <Grid item
                xs={12}
                className={classNames(classes.fontBoost, classes.metaFlex)}
              >
                <Grid container>
                  <Grid item xs={6}>
                    <Typography
                      variant="h1"
                      className={classes.earningsText}
                      gutterBottom
                    >
                      Rank
                    </Typography>
                    <Typography
                      variant="inherit"
                      className={classes.metaHighlightNumber}
                    >
                      <Icon color="disabled" className={classes.metaIcon}>
                        stars_rounded
                      </Icon>{" "}
                      {rank}
                    </Typography>
                    <Typography
                      className={classes.earningsChangeText}
                      gutterBottom
                    >
                      You are in the top{" "}
                      <Typography
                        component="span"
                        variant="inherit"
                        className={classes.darkSpan}
                      >
                        {rankPercent.toFixed(2)}%
                      </Typography>
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography
                      variant="h1"
                      className={classes.earningsText}
                      gutterBottom
                    >
                      Rewards
                    </Typography>
                    <Typography
                      variant="inherit"
                      className={classes.metaHighlightNumber}
                    >
                      <Icon
                        className={classNames(
                          classes.codeIcon,
                          classes.metaIcon
                        )}
                      >
                        code_rounded
                      </Icon>{" "}
                      {benefits}
                    </Typography>
                    <Typography
                      className={classes.earningsChangeText}
                      gutterBottom
                    >
                      <Typography
                        component="span"
                        variant="inherit"
                        className={classes.darkSpan}
                      >
                        {benefitsMonthly}
                      </Typography>{" "}
                      in this month
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Divider variant="middle" />
              <Grid item
                xs={12}
                className={classNames(classes.fontBoost, classes.metaFlex)}
              >
                <Typography
                  variant="h1"
                  gutterBottom
                  className={classes.topCategoriesTitle}
                >
                  Top Categories
                </Typography>
                {topCategories.length > 0 ? (
                  topCategories.map((c, i) => (
                    <Chip
                      key={`topCategoryChip_${i}`}
                      label={c.key}
                      className={classes.topCategoriesChip}
                    />
                  ))
                ) : (
                  <Typography
                    className={classes.earningsChangeText}
                    gutterBottom
                  >
                    Start investing to see your top categories!
                  </Typography>
                )}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
