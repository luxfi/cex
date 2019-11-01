import React from "react"
import { inject, observer } from "mobx-react"
import { withRouter } from "next/router"
import { withStyles } from '@material-ui/core/styles'

import { container } from "../components/esxStyles.js"
import { withContentful } from "react-contentful"

import { googlePageView } from "../components/utils/generic.js"

const styles = theme => ({
  container: {
    ...container,
    display: "flex",
    flexDirection: "column",
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
          contentFulEntry => {
            const item = contentFulEntry.fields
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
    googlePageView()
  }

  render() {

    const { classes, store} = this.props
    const { items } = store.contentfulStore

    return (
      <div className={classes.container}>
        <ContentSections classes={classes} items={items} />
      </div>
    )
  }
} 

export default withContentful(withRouter(withStyles(styles)(InvestorFAQ)))
