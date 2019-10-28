import React from "react"
import { inject, observer } from "mobx-react"
import { withRouter } from "next/router"
import { withStyles } from '@material-ui/core/styles'

import { container } from "../components/esxStyles.js"
import { withContentful } from "react-contentful"

const styles = theme => ({
  container: {
    ...container,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
})

const ContentSections = (props) => {
  const {items, classes} = props;
  return (
    <>
      {
        items && Array.isArray(items) &&
        items.map(
          section => {
            return (
              <section className={classes.contentSection} key={section.key}>
                <h3 className={classes.contentSectionTitle}>{section.title}</h3>
                <p className={classes.contentSectionBody}>{section.body}</p>
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

  render() {

    const { classes, store} = this.props
    const { content } = store.contentfulStore

    return (
      <div className={classes.container}>
        <ContentSections classes={classes} items={content.items} />
      </div>
    )
  }
} 

export default withContentful(withRouter(withStyles(styles)(InvestorFAQ)))
