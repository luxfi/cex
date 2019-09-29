import React from "react"
import { inject, observer } from "mobx-react"

//font awesome share icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"
import {
  faFacebook,
  faTwitter,
  faGoogle,
  faPinterest
} from "@fortawesome/free-brands-svg-icons"

// core components
import Toolbar from "@material-ui/core/Toolbar"
import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"
import Link from "../link"
import Button from "../CustomButtons/Button.js"
import Modal from "../Modal.js"

import { withStyles } from "@material-ui/core/styles"

const AboutESX = ({ classes }) => {
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  return (
    <>
      <Button
        className={classes.menuButton}
        color="transparent"
        onClick={handleOpen}
      >
        About ESX
      </Button>
      <Modal handleClose={handleClose} open={open} title="What is ESX?">
        <p>ESX is a film investing platform for everyone.</p>{" "}
        <p>
          We allow regular people — not just wealthy film producers — to invest
          in promising films, with as little as $10 or as much as $100,000 per
          investment.
        </p>{" "}
        <p>
          ESX was created to democratize fundraising for film while giving
          anyone the chance to back the next greatest film.
        </p>
      </Modal>
    </>
  )
}

@inject("store")
@observer
class Footer extends React.Component {
  static async getInitialProps({ mobxStore }) {
    return { ...mobxStore }
  }
  render() {
    const { classes, store } = this.props
    const loggedIn = store.userStore.loggedIn
    return (
      <div className={classes.root}>
        <Container maxWidth="lg">
          <Toolbar className={classes.noPadding}>
            <Link href="/" className={classes.flex}>
              {" "}
              {/* get rid of inline style */}
              <img
                id="logo"
                src="/static/img/logo.png"
                alt="ESX"
                height="60px"
              />
            </Link>
            <Typography variant="subtitle2" className={classes.white}>
              Entertainment Stock Exchange
            </Typography>
            <div className={classes.grow} />
            <AboutESX classes={classes} />
            <Button className={classes.menuButton} color="transparent">
              Partnerships
            </Button>
            <Button className={classes.menuButton} color="transparent">
              Contact Us
            </Button>
            {!loggedIn && (
              <Button
                className={classes.menubutton}
                color="outlined"
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#fff"
                }}
              >
                Sign Up
              </Button>
            )}
          </Toolbar>
          <Toolbar className={classes.noPadding}>
            <div className={classes.grow} />
            <span className={classes.socialLinks}>
              <a
                href="https://www.facebook.com/sharer/sharer.php?u={PAGEURL}&t={PAGETITLE}"
                target="_blank"
                title="Share on Facebook"
                className={`${classes.anchor} fa-facebook`}
              >
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a
                href="https://twitter.com/intent/tweet?source={PAGEURL}&text={PAGETITLE}:{PAGEURL}&via={TWITTERUSERNAME}"
                target="_blank"
                title="Tweet"
                className={`${classes.anchor} fa-twitter`}
              >
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a
                href="https://plus.google.com/share?url={PAGEURL}"
                target="_blank"
                title="Share on Google+"
                className={`${classes.anchor} fa-google`}
              >
                <FontAwesomeIcon icon={faGoogle} />
              </a>
              <a
                href="http://pinterest.com/pin/create/button/?url={PAGEURL}&media={PAGEIMAGEURL}&description={PAGEDESCRIPTION}"
                target="_blank"
                title="Pin it"
                className={`${classes.anchor} fa-pinterest`}
              >
                <FontAwesomeIcon icon={faPinterest} />
              </a>
              <a
                href="mailto:?subject={PAGETITLE}&body={PAGEDESCRIPTION}:{PAGEURL}"
                target="_blank"
                title="Share via Email"
                className={`${classes.anchor} fa-envelope`}
              >
                <FontAwesomeIcon icon={faEnvelope} />
              </a>
            </span>
          </Toolbar>
        </Container>
        <Toolbar />
      </div>
    )
  }
}

const styles = theme => {
  return {
    root: {
      flexGrow: 1,
      paddingTop: "70px",
      background: "rgb(29, 38, 50)"
    },
    menuButton: {
      marginRight: theme.spacing(2),
      color: "#fff"
    },
    grow: {
      flexGrow: 1,
      display: "none",
      // [theme.breakpoints.up("sm")]: {
      //   display: "block"
      // },
      display: "block"
    },
    flex: {
      display: "flex"
    },
    transparent: {
      background: "transparent !important",
      boxShadow: "none",
      color: "#fff"
    },
    anchor: {
      margin: "3px",
      display: "inline-block",
      // color: "white",
      color: "#fff",
      padding: "7px",
      borderRadius: "2px",
      height: "18px"
    },
    socialLinks: {
      height: "38.5px"
    },
    white: {
      color: "#fff"
    }
  }
}

export default withStyles(styles)(Footer)
