import React from "react"
import { withStyles } from '@material-ui/core/styles'

import { ContactForm } from "../components/contact"
import { container } from "../styles/esxStyles.js"



const styles = theme => ({
  container: {
    ...container,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
})

const Contact = (props) => {
  const { classes } = props

  return (
    <div className={classes.container}>
      <ContactForm/>
    </div>
  )
}

export default withStyles(styles)(Contact)
