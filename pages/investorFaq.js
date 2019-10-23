import React from "react"
import { inject, observer } from "mobx-react"
import { withRouter } from "next/router"
import { withStyles } from '@material-ui/core/styles'

import { container } from "../components/esxStyles.js"

const styles = theme => ({
  container: {
    ...container,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
})

const ContentSections = (props) => {
  const {sections, classes} = props;
  return (
    <>
      {
        sections && Array.isArray(sections) &&
        sections.map(
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

  render() {
    const { classes, store } = this.props
    const { content } = store.cmsStore

    return (
      <div className={classes.container}>
        <ContentSections classes={classes} sections={content} />
      </div>
    )
  }
} 

export default withRouter(withStyles(styles)(InvestorFAQ))
