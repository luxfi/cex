import React from 'react'
import { inject, observer } from 'mobx-react'

import { withStyles } from '@material-ui/core'

import { ContentfulItems } from '../components/app'

const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
})
@withStyles(styles)
@inject("store")
@observer
export default class extends React.Component {

  componentDidMount() {
    const { store } = this.props
    store.contentfulStore.getContent(false)
  }

  render() {

    const { classes, store } = this.props
    const { contentfulStore } = store
    return (
      <div className={classes.container}>
        <h1 className={classes.heading}>Some of our investors have these common questions.</h1>
        <ContentfulItems classes={classes} items={contentfulStore.byTag('investor')} />
      </div>
    )
  }
}