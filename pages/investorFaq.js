import React from "react"
import { inject, observer } from "mobx-react"
import { withRouter } from "next/router"
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


  constructor(props) {
    super(props)
    this.state = {
      items: []
    }
  }

  componentDidMount() {
    const { store } = this.props
    this.setState(
      {
        items: store.contentfulStore.byTag('project')

      }
    )
  }

  render() {

    const { classes} = this.props
    //const investorItems = store.contentfulStore.byTag('project')

    return (
      <div className={classes.container}>
        <ContentSections classes={classes} items={this.state.items} />
      </div>
    )
  }
} 

export default withRouter(withStyles(styles)(InvestorFAQ))
