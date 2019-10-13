import React from "react"

// nodejs library that concatenates classes
import classNames from "classnames"

// @material-ui/core components
import { Grid, Box, Paper, Typography } from '@material-ui/core'

// core components
import ContentLoader from "react-content-loader"

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

const partners = [
  "https://upload.wikimedia.org/wikipedia/en/4/4d/Paramount_Pictures_2010.svg",
  "https://upload.wikimedia.org/wikipedia/commons/6/65/TWDC_Logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/6/65/Lionsgate_Logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/6/64/Warner_Bros_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg"
]

export default props => {
  const classes = useStyles()

  return (
    <div style={{ marginTop: "72px" }}>
      <Typography variant="h5">
        <Box fontWeight={100} fontSize={20}>
          OUR PARTNERS
        </Box>
      </Typography>
      <br />
      <Box clone pt={2} pr={1} pb={1} pl={2}>
        <Paper elevation={0}>
          <Grid container justify="center" style={{ paddingTop: "52px", paddingBottom: "52px" }}>
            {partners.map((imgSrc, i) => (
              <Grid container item
                xs={2}
                key={i}
                alignItems="center"
              // style={{ display: "flex", justifyContent: "center" }}
              >
                <img
                  src={imgSrc}
                  alt=""
                  style={{
                    margin: 'auto',
                    display: 'block',
                    maxWidth: '60%',
                    maxHeight: '60%',
                  }}
                />
                {/* style={{ width: "75%", maxHeight: "104px", background: "white", padding: "16px 16px", borderRadius: "4px" }} */}
              </Grid>
            ))}
          </Grid>
        </Paper >
      </Box>
    </div>
  )
}


