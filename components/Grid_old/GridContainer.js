import React from "react"

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"

const styles = theme => ({
  grid: {
    // width: "auto"
    margin: "0 -15px !important",
    width: "unset",
    [theme.breakpoints.down("sm")]: {
      margin: "0px !important",
      padding: "7px"
    }
  }
})

const useStyles = makeStyles(styles)

export default function GridContainer(props) {
  const classes = useStyles()
  const { children, className, ...rest } = props
  return (
    <Grid container {...rest} className={classes.grid + " " + className}>
      {children}
    </Grid>
  )
}
