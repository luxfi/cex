import React from "react"
import { withStyles } from '@material-ui/core/styles'

import { ContactForm } from "../components/contact"
import { container } from "../components/esxStyles.js"

import { googlePageView } from '../components/utils/generic'

const styles = theme => ({
  container: {
    ...container,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
})

class Contact extends React.Component {
  componentDidMount() {
    googlePageView()
  }
  

  render() {
    const { classes } = props

    return (
      <div className={classes.container}>
        <ContactForm/>
      </div>
    )
  }
}

export default withStyles(styles)(Contact)
