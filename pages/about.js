import React from "react"
import { inject, observer } from "mobx-react"
import { withStyles } from "@material-ui/core/styles"
import { Container, Typography, Grid, Box } from "@material-ui/core"
import { NestedMenu } from "../components/app"
import * as Scroll from "react-scroll"
import { InvestNow } from "../components/app"

let Link = Scroll.Link
let Element = Scroll.Element
let Events = Scroll.Events
let scroll = Scroll.animateScroll
let scrollSpy = Scroll.scrollSpy

const styles = theme => ({})

const content = [
  {
    title: "Welcome to the Future of Hollywood",
    key: "first",
    paragraph:
      "In May 2016, the United States Securities and Exchange Commission (SEC) enacted Title III of the JOBS Act, allowing a majority of the US population to invest in completely new ways. Entertainment Stock X will for the first time in history make investing in, and true ownership of the entertainment media we all love and consume, truly accessible. \nMain street, welcome to ownership in most well known commodities you could have never touched before.\nThat’s why we built Entertainment Stock X. We’re SEC-registered and FINRA-licensed, and if you’re at all interested in movies, TV, music, and/or Broadway plays, we finally have a way for you to own portions of them. ESX is a platform built together with some of the most prolific producers and creators in the entertainment space and built to be the trusted ecosystem in which the world can finally invest in the media it loves to watch.\nWe launched our equity investing platform to provide real ownership in the projects you see on this site. The value of your ownership stock is tied directly to the performance of that media. No tricky Hollywood accounting garbage either. Investors will have access to the “ultimates” and know exactly how their holdings are performing and develop plans to maximize ROI on every stock.\nWe pledge to innovate on our mission to democratize entertainment media holdings and investing. This is truly a new future in investing in entertainment.\n"
  },
  {
    title: "Why we’ve built this platform",
    key: "second",
    paragraph:
      "Hollywood is an amazing place of dreams that has become increasingly closed off from Main Street’s input. It’s an industry insulated in a bizarrely strange way from it’s end user. The consumer (while being able to invest in the publicly traded big production studios) has never been able to voice influence in individual projects beyond their consumer power at the box office.\nFortunately, Title III opened the door for those previously excluded from media investing to fund the films, TV, music, and Broadway they believe in. This makes room for more entrepreneurs and potentially new audiences. ESX is built to not only get new ideas funded, but to provide a community of producers to help voice their power early in the production process.\n"
  },
  {
    title: "Who is Entertainment Stock X",
    key: "third",
    paragraph:
      "In May 2016, the United States Securities and Exchange Commission (SEC) enacted Title III of the JOBS Act, allowing a majority of the US population to invest in completely new ways. Entertainment Stock X will for the first time in history make investing in, and true ownership of the entertainment media we all love and consume, truly accessible. \nMain street, welcome to ownership in most well known commodities you could have never touched before.\nThat’s why we built Entertainment Stock X. We’re SEC-registered and FINRA-licensed, and if you’re at all interested in movies, TV, music, and/or Broadway plays, we finally have a way for you to own portions of them. ESX is a platform built together with some of the most prolific producers and creators in the entertainment space and built to be the trusted ecosystem in which the world can finally invest in the media it loves to watch.\nWe launched our equity investing platform to provide real ownership in the projects you see on this site. The value of your ownership stock is tied directly to the performance of that media. No tricky Hollywood accounting garbage either. Investors will have access to the “ultimates” and know exactly how their holdings are performing and develop plans to maximize ROI on every stock.\nWe pledge to innovate on our mission to democratize entertainment media holdings and investing. This is truly a new future in investing in entertainment.\n"
  }
]

const Menu = () => {
  return (
    <NestedMenu
      selectedKeys={["first"]}
      menus={[
        { key: "first", label: "Welcome to the Future of Hollywood" },
        { key: "second", label: "Why we’ve built this platform" },
        { key: "third", label: "Who is Entertainment Stock X" }
      ]}
    />
  )
}

@inject("store")
@observer
class About extends React.Component {
  state = { start: null, end: null }
  componentDidMount() {
    Events.scrollEvent.register("begin", function(to, element) {
      // console.log("begin", arguments)
    })
    let that = this
    Events.scrollEvent.register("end", function(to, element) {
      if (to === "third") {
        that.setState({ start: window.pageYOffset })
      }
    })

    // Listen for scroll events
    let end
    let distance
    let nav = document.getElementById("floating-nav")
    let top
    window.addEventListener("scroll", function(event) {
      // Calculate distance
      if (that.state.start) {
        end = window.pageYOffset
        distance = end - that.state.start
        top = distance > 0 ? 128 - distance : 128
        console.log("distance", distance)
        nav.style.top = `${top}px`
      }
    })

    scrollSpy.update()
  }
  componentWillUnmount() {
    Events.scrollEvent.remove("begin")
    Events.scrollEvent.remove("end")
    window.removeEventListener("scroll")
  }
  render() {
    const { classes, store } = this.props
    const { loggedIn } = store.userStore
    return (
      <>
        <Container component="main" maxWidth="md">
          <Box mt={8} mb={16}>
            <Grid container spacing={10}>
              <Grid item xs={4}>
                <Box
                  id="floating-nav"
                  style={{
                    position: "fixed",
                    width: "307px",
                    top: "128px"
                  }}
                >
                  <Menu />
                </Box>
              </Grid>
              <Grid item xs={8}>
                {content.map(section => (
                  <Element name={section.key} className="element">
                    <Box mb={10}>
                      <Typography gutterBottom variant="h4">
                        {section.title}
                      </Typography>
                      <Typography paragraph>{section.paragraph}</Typography>
                    </Box>
                  </Element>
                ))}
              </Grid>
            </Grid>
          </Box>
        </Container>
        <InvestNow loggedIn={loggedIn} noPadding />
      </>
    )
  }
}

export default withStyles(styles)(About)
