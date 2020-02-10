import React from "react"
import { inject, observer } from "mobx-react"
import { withStyles } from '@material-ui/core/styles'

import { ContentfulItems } from "../components/app"

import { container } from "../styles/esxStyles.js"

const styles = theme => ({
  container: {
    ...container,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
})

@inject("store")
@observer
class ProjectFAQ extends React.Component {
  componentDidMount() {
    const { store } = this.props
    store.contentfulStore.getContent(false)
  }

  render() {

    const { classes, store } = this.props
    const { contentfulStore } = store
    return (
      <div className={classes.container}>
        <h1 className={classes.heading}>Some common questions about the ESX project.</h1>
        <ContentfulItems classes={classes} items={contentfulStore.byTag('project')} />
      </div>
    )
  }
}

export default withStyles(styles)(ProjectFAQ)
