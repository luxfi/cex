import React from "react"
import { inject, observer } from "mobx-react"
import { withStyles } from '@material-ui/core/styles'

import { ContentfulItems } from "../components/app"

import { container } from "../components/esxStyles.js"

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
class Risks extends React.Component {


  static async getInitialProps({ mobxStore }) {
    return { ...mobxStore }
  }

  componentDidMount() {
    const { store } = this.props
    store.contentfulStore.getContent(false)
  }

  render() {

    const { classes, store } = this.props
    const { contentfulStore } = store
    return (
      <div className={classes.container}>
        <h1 className={classes.heading}>Some things to consider regarding the risks of investing.</h1>
        <ContentfulItems classes={classes} items={contentfulStore.byTag('risks')} />
      </div>
    )
  }
}

export default withStyles(styles)(Risks)
