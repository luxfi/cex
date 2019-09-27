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
import GridContainer from "../Grid/GridContainer.js"
import GridItem from "../Grid/GridItem.js"
import Button from "../CustomButtons/Button.js"

import { withStyles } from "@material-ui/core/styles"

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
            <Typography variant="subtitle2">
              Entertainment Stock Exchange
            </Typography>
            <div className={classes.grow} />
            <Button className={classes.menuButton} color="transparent">
              About ESX
            </Button>
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
                  color: "black"
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

// import ESXLogo from "../../assets/images/esx/u1.png"
// import "../../assets/styles/base.css"
// import "react-multi-carousel/lib/styles.css"
// import Link from "../link"
// import Typography from "@material-ui/core/Typography"
// import { withStyles } from "@material-ui/core/styles"
// import Container from "@material-ui/core/Container"

// const Footer = props => {
//   const { classes } = props
//   return (
//     <div className="footer-container">
//       {/* <Container maxWidth="lg"> */}
//       <div className="footer-gutter" />
//       {/* <Link href="/" className={classes.flex}>
//           <img id="logo" src="/static/img/logo.png" alt="ESX" height="60px" />
//         </Link> */}
//       <div className="footer-column">
//         <img
//           src={ESXLogo}
//           alt="ESX"
//           height="60px"
//           style={{ margin: `-16px` }}
//           className={classes.flex}
//         />
//         <p className="element">2018 © ESX, Co</p>
//       </div>
//       <div className="footer-column">
//         <h2 className="title">Company</h2>
//         <p className="element">
//           <a href="#">About</a>
//         </p>
//         <p className="element">
//           <a href="#">Legal & Privacy</a>
//         </p>
//         <p className="element">
//           <a href="#">Support</a>
//         </p>
//       </div>
//       <div className="column-pad" />
//       <div className="footer-column">
//         <h2 className="title">Learn</h2>
//         <p className="element">
//           <a href="#">How to trade</a>
//         </p>
//         <p className="element">
//           <a href="#">Technology</a>
//         </p>
//         <p className="element">
//           <a href="#">Supported Platforms</a>
//         </p>
//       </div>
//       <div className="column-pad" />
//       <div className="footer-column">
//         <h2 className="title">Social</h2>
//         <p className="element">
//           <a href="#">Blog</a>
//         </p>
//         <p className="element">
//           <a href="#">Twitter</a>
//         </p>
//         <p className="element">
//           <a href="#">Facebook</a>
//         </p>
//       </div>
//       <div className="column-pad" />
//       <div className="footer-column">
//         <h2 className="title">Media</h2>
//         <p className="element">
//           <a href="#">Brand</a>
//         </p>
//         <p className="element">
//           <a href="#">Press</a>
//         </p>
//         <p className="element">
//           <a href="#">Clients & Partners</a>
//         </p>
//       </div>
//       <div className="column-pad" />
//       <div className="footer-gutter" />
//       {/* </Container> */}
//       <style jsx>{`
//         a {
//           color: gray;
//           text-decoration: none;
//         }

//         .footer-container {
//           display: flex;
//           margin: auto;
//           background: rgb(29, 39, 50);
//           color: white;
//           z-index: 1;
//           width: 100%;
//           height: 156px;
//           column-gap: 40px;
//         }

//         .footer-gutter {
//           width: 18%;
//         }

//         .column-pad {
//           width: 8%;
//         }

//         .element {
//           font-size: 11px;
//           color: gray;
//           margin: 0px 0px 1px 0px;
//         }

//         .title {
//           font-size: 12px;
//           margin: 0px 0px 3px 0px;
//         }

//         .footer-column {
//           display: flex;
//           flex-direction: column;
//           line-height: 25px;
//           justify-content: center;
//         }
//       `}</style>
//     </div>
//   )
// }

const styles = theme => {
  return {
    root: {
      flexGrow: 1,
      paddingTop: "70px"
    },
    menuButton: {
      marginRight: theme.spacing(2),
      color: "black"
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
      color: "#FFFFFF"
    },
    anchor: {
      margin: "3px",
      display: "inline-block",
      // color: "white",
      color: "black",
      padding: "7px",
      borderRadius: "2px",
      height: "18px"
    },
    socialLinks: {
      height: "38.5px"
    }
  }
}

export default withStyles(styles)(Footer)
