import React from "react"

// nodejs library that concatenates classes
import classNames from "classnames"

// @material-ui/core components
import { Grid, Box, Paper, Typography } from '@material-ui/core'

// core components
import ContentLoader from "react-content-loader"

// icons
import Paramount from '../../../assets/svg/Paramount.svg'
import Disney from '../../../assets/svg/Disney.svg'
import Lionsgate from '../../../assets/svg/Lionsgate.svg'
import Warner_Bros from '../../../assets/svg/Warner_Bros.svg'
import Sony from '../../../assets/svg/Sony.svg'

// styles
import { makeStyles } from "@material-ui/core/styles"
import styles from "./OurPartners.style.js"
const useStyles = makeStyles(styles)

const MyLoader = () => (
  <ContentLoader
    height={50}
    width={150}
    speed={2}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
  >
    <rect x="0" y="0" rx="5" ry="5" width="150" height="50" />
  </ContentLoader>
)

const partners = [ Paramount, Disney, Lionsgate, Warner_Bros, Sony ]
// const partners = [<Paramount />, <Disney />, <Lionsgate />, <Warner_Bros />, <Sony />]

export default props => {
  const classes = useStyles()

  return (
    <div style={{ padding: "48px 0px" }}>
      <Typography variant="h5">
        <Box fontWeight={100} fontSize={20}>
          OUR PARTNERS
        </Box>
      </Typography>
      <br />
      <Box clone pt={2} pr={1} pb={1} pl={2}>
        <Paper elevation={0}>
          <Grid container justify="space-around" style={{ paddingTop: "52px", paddingBottom: "52px" }}>
            {partners.map((SVGComponent, i) => (
              <Grid container item
                xs={2}
                key={i}
                alignItems="center"
                justify="center"
              >
                <SVGComponent className={classes.svg} style={{
                  width: "60%",
                  height: "60%"
                }}/>
              </Grid>
            ))}
          </Grid>
        </Paper >
      </Box>
      <style jsx>{`
        // svg {
        //   fill: white;
        // }
      `}</style>
    </div>
  )
}


