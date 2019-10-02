import React from "react"
import Link from "next/link"
import { inject, observer } from "mobx-react"
import { withRouter } from "next/router"

import classNames from "classnames"

// orderbook
import { formatTakeResults } from "../components/utils/formatOrderBookDataForChart"

// @material-ui/core components
import { withStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"

// core components
import Breadcrumbs from "../components/Breadcrumbs.js"
import Button from "../components/CustomButtons/Button"
import Chart from "../components/generic/Chart"

// section
import InvestNowSection from "../views/LandingPage/Sections/InvestNowSection"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// the nice looking double chevrons are part of the "pro" package that costs money
import {
  faPlay,
  faChevronUp,
  faChevronDown
} from "@fortawesome/free-solid-svg-icons"

//import ContentLoader from "react-content-loader"

import styles from "../assets/jss/views/filmPage.js"

import dummyFilmGraph from "../static/img/film-graph--dummy-600x383.png"
import { isObservableArray } from "mobx"

// Sections for this page
//import InvestNowSection from "../views/LandingPage/Sections/InvestNowSection"

const ButtonLink = React.forwardRef(
  ({ className, href, hrefAs, children, prefetch }, ref) => (
    <Link ref={ref} href={href} as={hrefAs} prefetch>
      <a className={className}>{children}</a>
    </Link>
  )
)

const dummyFinancialStats = {
  name: "TERMINATOR",
  description: "Term Inc. - Class C Capital Stock",

  value: 616.16,
  valueDelta: 106.11,
  percentDelta: 20.43,
  deltaInterval: "Past Month"
}

const PageTabs = props => {
  const { classes, onTab, selectedTab } = props

  return (
    <div className={classes.pageTabsOuter}>
      <a
        className={classNames(
          classes.pageTab,
          selectedTab === "about" ? classes.selectedTab : ""
        )}
        onClick={() => onTab("about")}
      >
        About
      </a>
      <a
        className={classNames(
          classes.pageTab,
          selectedTab === "invest" ? classes.selectedTab : ""
        )}
        onClick={() => onTab("invest")}
      >
        Invest
      </a>
    </div>
  )
}

const SeeMoreButton = props => {
  const { classes, onToggle, expanded } = props

  return (
    <div className={classes.seeMoreOuter}>
      <a className={classes.seeMoreButton} onClick={() => onToggle()}>
        {!expanded && <span className={classes.seeMoreCopy}>see more</span>}
        <FontAwesomeIcon
          icon={expanded ? faChevronUp : faChevronDown}
          style={{ display: "block", width: "14px", color: "#ddd" }}
        />
        {expanded && <span className={classes.seeMoreCopy}>see less</span>}
      </a>
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
    this.toggleExpanded = this.toggleExpanded.bind(this)
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

  toggleExpanded() {
    this.setState({
      expanded: !this.state.expanded
    })
  }

  renderInvestButton(className, movie, text) {
    return (
      <Button
        component={ButtonLink}
        color="link"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: "black",
          height: "48px"
        }}
        className={className}
      >
        {text}
      </Button>
    )
  }

  renderUpperRow(classes, selectedTab, movie) {
    return (
      <div
        className={classNames(classes.leftAndRight, classes.breadcrumbRow)}
        style={{ marginTop: "20px" }}
      >
        <Breadcrumbs className={classes.breadcrumbs}>{movie.name}</Breadcrumbs>
        <PageTabs
          classes={classes}
          selectedTab={selectedTab}
          onTab={this.onTab}
        />
      </div>
    )
  }

  renderAboutMain(classes, movie) {
    return (
      <div className={classNames(classes.leftAndRight, classes.mainArea)}>
        <div className={classNames(classes.copyArea, classes.topAndBottom)}>
          <div className={classes.titleAndDescription}>
            <h1 className={classes.title} style={{ textAlign: "left" }}>
              {movie.name}
            </h1>
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
              <FontAwesomeIcon icon={faPlay} style={{ paddingRight: "2px" }} />
              Watch Trailer
            </Button>
            {this.renderInvestButton(classes.movieButton, movie, "Invest")}
          </div>
        </div>
        <img
          className={classes.mainImage}
          src={movie.posterImg}
          width="301"
          height="444"
        />
      </div>
    )
  }

  renderTableRow(field, label, movie) {
    // note that Array.isArray() will return false
    const content = isObservableArray(movie[field])
      ? movie[field].join(", ")
      : movie[field]

    return (
      <tr style={{ marginBottom: "12px" }}>
        <td valign="top">{label}</td>
        <td valign="top">{content}</td>
      </tr>
    )
  }

  renderAboutMore(classes, movie) {
    return (
      <>
        <div className={classes.aboutMoreTitleArea}>
          <h1 className={classes.sectionTitle}>About</h1>
          <h2 className={classes.sectionByline}>More about the film</h2>
          {this.renderInvestButton(
            classes.movieButton,
            movie,
            "Invest in this film"
          )}
        </div>
        <div className={classes.aboutMoreCopyArea}>
          <div className={classes.aboutMoreStats}>
            <table className={classes.aboutMoreStatsTable}>
              {this.renderTableRow("director", "Director", movie)}
              {this.renderTableRow("actors", "Starring", movie)}
              {this.renderTableRow("writer", "Writers", movie)}
              {this.renderTableRow("genre", "Genres", movie)}
              {this.renderTableRow("rated", "Rating", movie)}
            </table>
          </div>
          <div className={classes.aboutMoreText}>
            <p>
              Ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
              voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
      </>
    )
  }

  renderInvestMain(
    classes,
    movie,
    data,
    yDomain,
    updatePrintInterval,
    printInterval,
    buyOrders,
    sellOrders,
    orderBook
  ) {
    const stats = dummyFinancialStats

    const dollars = Math.floor(stats.value)
    const value = {
      dollars: dollars,
      cents: Math.round((stats.value - dollars) * 100)
    }

    const deltaString =
      (stats.valueDelta > 0 ? "+ " : "- ") +
      stats.valueDelta +
      " (" +
      stats.percentDelta +
      "%) " +
      " PAST MONTH"

    return (
      <div className={classNames(classes.flexCenteredColumn, classes.mainArea)}>
        <h1 className={classes.investCompanyName}>{stats.name}</h1>
        <h3 className={classes.investCompanyDescription}>
          {stats.description}
        </h3>
        <div className={classes.investPrice}>
          <span className={classes.dollarSign}>$</span>
          <span className={classes.dollarValue}>{value.dollars}</span>
          <span className={classes.centsValue}>.{value.cents}</span>
        </div>
        <div className={classes.deltaRow}>{deltaString}</div>
        {this.renderInvestButton(
          classNames(classes.movieButton, classes.statsButton),
          movie,
          "Invest Now"
        )}
        {/* <img
          className={classes.graphImage}
          src={dummyFilmGraph}
          width="600"
          height="383"
        /> */}
        <div>
          <Chart
            data={data}
            yDomain={yDomain}
            updatePrintInterval={updatePrintInterval}
            printInterval={printInterval}
            buyOrders={buyOrders}
            sellOrders={sellOrders}
            orderBook={orderBook}
          />
        </div>
      </div>
    )
  }

  renderInvestMore(classes, movie) {
    return (
      <div className={classes.investMoreOuter}>
        <table className={classes.investMoreTable}>
          <tr>
            <td>OPEN</td>
            <td>631.45</td>
          </tr>
          <tr>
            <td>OPEN</td>
            <td>631.45</td>
          </tr>
          <tr>
            <td>OPEN</td>
            <td>631.45</td>
          </tr>
          <tr>
            <td>OPEN</td>
            <td>631.45</td>
          </tr>
          <tr>
            <td>OPEN</td>
            <td>631.45</td>
          </tr>
        </table>
        <table className={classes.investMoreTable}>
          <tr>
            <td>OPEN</td>
            <td>631.45</td>
          </tr>
          <tr>
            <td>OPEN</td>
            <td>631.45</td>
          </tr>
          <tr>
            <td>OPEN</td>
            <td>631.45</td>
          </tr>
          <tr>
            <td>OPEN</td>
            <td>631.45</td>
          </tr>
          <tr>
            <td>OPEN</td>
            <td>631.45</td>
          </tr>
        </table>
      </div>
    )
  }

  render() {
    const { classes, store } = this.props
    // const movie = store.movieStore.currentMovie

    // get router slug and find article
    const { router } = this.props
    const { slug } =
      router.query || "edward-furlong-edward-furlong-terminator-dark-fate" // remove this when safe
    const movie = store.movieStore.getMovieBySlug(slug)

    // orderBook stuff
    const { movieStore, orderBook } = this.props.store
    let takeResultsArray = orderBook.takeResults.slice(0)
    const { printInterval, buyOrders, sellOrders } = orderBook
    const data = formatTakeResults(takeResultsArray, printInterval)
    const yDomain = [orderBook.low * 0.94, orderBook.high * 1.06]
    const updatePrintInterval = time => {
      orderBook.updatePrintInterval(time)
    }

    return (
      <>
        <article className={classNames(classes.container, classes.outermost)}>
          {this.renderUpperRow(classes, this.state.selectedTab, movie)}
          {this.state.selectedTab === "about"
            ? this.renderAboutMain(classes, movie)
            : this.renderInvestMain(
                classes,
                movie,
                data,
                yDomain,
                updatePrintInterval,
                printInterval,
                buyOrders,
                sellOrders,
                orderBook
              )}
          <SeeMoreButton
            classes={classes}
            onToggle={this.toggleExpanded}
            expanded={this.state.expanded}
          />
          {this.state.expanded &&
            (this.state.selectedTab === "about"
              ? this.renderAboutMore(classes, movie)
              : this.renderInvestMore(classes, movie))}
        </article>
        <div
          className={classNames(classes.container)}
          style={{ paddingLeft: "0px", paddingRight: "0px" }}
        >
          {this.state.expanded ? <InvestNowSection /> : ""}
        </div>
      </>
    )
  }
}

export default withRouter(withStyles(styles)(Index))
