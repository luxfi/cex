import React from "react"
import Link from "next/link"
import { inject, observer } from "mobx-react"

import classNames from "classnames"

// @material-ui/core components
import { withStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"

// core components
import Breadcrumbs from "../components/Breadcrumbs.js"
import Button from "../components/CustomButtons/Button"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'

//import ContentLoader from "react-content-loader"

import styles from "../assets/jss/views/filmPage.js"

// Sections for this page
//import InvestNowSection from "../views/LandingPage/Sections/InvestNowSection"

const ButtonLink = React.forwardRef(
  ({ className, href, hrefAs, children, prefetch }, ref) => (
    <Link ref={ref} href={href} as={hrefAs} prefetch>
      <a className={className}>{children}</a>
    </Link>
  )
)

const PageTabs = props => {
  const {
    classes,
    onTab,
    selectedTab
  } = props

  return (
    <div className={classes.pageTabsOuter} >
      <a 
        className={classNames(classes.pageTab, (selectedTab === "about") ? classes.selectedTab : '')} 
        onClick={() => onTab("about")}
      >About</a>
      <a 
        className={classNames(classes.pageTab, (selectedTab === "invest") ? classes.selectedTab : '')} 
        onClick={() => onTab("invest")}
      >Invest</a>
    </div>
  )
}

@inject("store")
@observer
class Index extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedTab: "about",
      expanded: false
    }
    this.onTab = this.onTab.bind(this)
    this.onExpand = this.onExpand.bind(this)
  }

  onTab(tab) {
    if (this.state.selectedTab !== tab) {
        // if going to a new tab, collapse the view as well.
      this.setState({
        selectedTab: tab,
        expanded: false
      })
    }
  }

  onExpand(expand) {
    if (this.state.expanded != expand) {
      this.setState({
        expanded: expand
      })
    }
  }

  renderUpperRow(classes, selectedTab, movie) {
    return (
      <div className={classNames(classes.leftAndRight, classes.breadcrumbRow)} style={ {marginTop: "20px"} }>
        <Breadcrumbs>
          {movie.name}
        </Breadcrumbs>
        <PageTabs classes={classes} selectedTab={selectedTab} onTab={this.onTab} />
      </div>
    )
  }

  renderMainArea(classes, movie) {
    return(
      <>
        <div className={classNames(classes.leftAndRight, classes.mainArea)}>
          <div className={classNames(classes.copyArea, classes.topAndBottom)} >
            <div className={classes.titleAndDescription} >
              <h1 className={classes.title} style={{ textAlign: "left" }}>{movie.name}</h1>
              <p className={classes.description}>{movie.shortDescription}</p>
            </div>
            <div className={classes.movieButtonsOuter}>
              <Button
                component={ButtonLink}
                color="link"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "black",
                  marginLeft: "20px",
                  height: "48px"
                }}
                className={classes.movieButton}
              >
                <FontAwesomeIcon icon={faPlay} style={{paddingRight: "2px"}}/>
                Watch Trailer
              </Button>
              <Button
                component={ButtonLink}
                color="link"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "black",
                  marginLeft: "20px",
                  height: "48px"
                }}
                className={classes.movieButton}
              >
                Invest
              </Button>
            </div>
          </div>
          <img className={classes.mainImage} src={movie.verticalImg} width="300" height="444" />
      </div>
      </>
    )
  }

  render() {
    const { classes, store } = this.props
    //const { loggedIn } = store.userStore
    const movie  = store.movieStore.currentMovie;
    return (
      <article className={classes.container}>
        {this.renderUpperRow(classes, this.state.selectedTab, movie)}
        {this.renderMainArea(classes, movie)}
      </article>
    )
  }
}

export default withStyles(styles)(Index)
