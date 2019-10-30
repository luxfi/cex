import React from "react"
import { inject, observer } from "mobx-react"
import { withStyles } from '@material-ui/core/styles'

import { container } from "../components/esxStyles.js"

const styles = theme => ({
  container: {
    ...container,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
})

const ContentSections = (props) => {
  const { items, classes } = props;
  return (
    <>
      {
        items && Array.isArray(items) &&
        items.map(
          contentFulEntry => {
            const item = contentFulEntry.fields
            console.log('item', item)
            return (
              <section className={classes.contentSection} key={item.key}>
                <h3 className={classes.contentSectionTitle}>{item.title}</h3>
                <p className={classes.contentSectionBody}>{item.body}</p>
              </section>
            )
          }
        )
      }
    </>
  )
}

@inject("store")
@observer
class InvestorFAQ extends React.Component {


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
        <h1 className={classes.heading}>Some of our investors have these common questions.</h1>
        <ContentSections classes={classes} items={contentfulStore.byTag('investor')} />
      </div>
    )
  }
} 

export default withStyles(styles)(InvestorFAQ)
