import React from "react"
import { inject, observer } from "mobx-react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import {
  faFacebook,
  faTwitter,
  faInstagram,
  faYoutube,
  faMedium,
  faReddit
} from "@fortawesome/free-brands-svg-icons"

import {
  Typography,
  Link,
  Button,
  IconButton,
  Grid,
  Box
} from "@material-ui/core"

import { CustomLink } from ".."

const EXTERNAL_LINKS = {
  medium: "https://medium.com/entertainment-stock-x",
  reddit: "https://www.reddit.com/r/EntertainmentStockX/",
  twitter: "https://twitter.com/EntertainStock"
}

import { withStyles } from "@material-ui/core/styles"

const Partnerships = ({ classes, openModal }) => {
  const body = (
    <>
      <p>
        Proxicoin - $750 million in capacity 8-10 films per year at scale 1-4
        television properties per year
      </p>{" "}
      <p>
        Twisted Pictures - Horror / Urban production company led by Mark Burg,
        producer of the Saw franchise
      </p>{" "}
      <p>
        Centauri Media - $250mm film production fund with potential of up to 5
        studio released films a year
      </p>
    </>
  )
  const title = "Partnerships"
  return (
    <Button
      className={classes.menuButton}
      onClick={() => {
        openModal(title, body)
      }}
    >
      Partnerships
    </Button>
  )
}

const ContactUs = ({ classes, openModal }) => {
  const body = (
    <>
      <p>Put Contact Infomation Here</p>{" "}
    </>
  )
  const title = "Contact Us"
  return (
    <Button
      className={classes.menuButton}
      onClick={() => {
        openModal(title, body)
      }}
    >
      Contact Us
    </Button>
  )
}

const Copyright = (props) => {
  return (
    <div className={props.classes.copyrightOuter}>
      <Typography variant="body2" color="textSecondary">
        {"Privacy Policy / Terms of Use"}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {"Copyright © 2019 ESX. All rights reserved."}
      </Typography>
    </div>
  )
}

const footers = [
  {
    title: "Company",
    links: [
      { title: "About", link: "/about" },
      "Careers",
      "Press",
      { title: "Blog", link: EXTERNAL_LINKS.medium, external: true }
    ]
  },
  {
    title: "Projects",
    links: ["Movies", "TV Series", "Music", "Gaming"]
  },
  {
    title: "Support",
    links: [
      {
        title: "Investor FAQ",
        link: "investorFaq"
      },
      {
        title: "Project FAQ",
        link: "projectFaq"
      },
      {
        title: "Risks",
        link: "risks"
      },
      {
        title: "Contact Us",
        link: "contact"
      }
    ]
  },
  {
    title: "Account",
    links: ["Sign In", "Create Account", "Orders", "Portfolio"]
  }
]

const FooterTopRow = ({ classes }) => (
  <div className={classes.topRow}>
    <Grid container justify="center" alignItems="center">
      <Grid item xs='auto' md={8}>
        <Link href="/" className={classes.logoLink}>
          <img
            className={classes.logoImg}
            src="/static/images/esx/esx-white-logo.png"
            alt="ESX"
            height="52px"
          />
        </Link>
      </Grid>
      <Grid item xs={12} sm={12} md={4} className={classes.socialIconRow}>
        <IconButton href="https://www.facebook.com/" className={classes.socialIcon} target="_blank">
          <FontAwesomeIcon icon={faFacebook} size="1x" />
        </IconButton>
        <IconButton href={EXTERNAL_LINKS.twitter} className={classes.socialIcon} target="_blank" title="Tweet">
          <FontAwesomeIcon icon={faTwitter} size="1x" />
        </IconButton>
        <IconButton href="https://www.instagram.com/" className={classes.socialIcon} target="_blank">
          <FontAwesomeIcon icon={faInstagram} size="1x" />
        </IconButton>
        <IconButton href="https://www.youtube.com/" className={classes.socialIcon} target="_blank">
          <FontAwesomeIcon icon={faYoutube} size="1x" />
        </IconButton>
        <IconButton href={EXTERNAL_LINKS.medium} className={classes.socialIcon} target="_blank">
          <FontAwesomeIcon icon={faMedium} size="1x" />
        </IconButton>
        <IconButton href={EXTERNAL_LINKS.reddit} className={classes.socialIcon} target="_blank">
          <FontAwesomeIcon icon={faReddit} size="1x" />
        </IconButton>
      </Grid>
    </Grid>
  </div>
)

const FooterMiddleRow = ({ classes, openModal }) => (
  <Grid container className={classes.footerColumnsOuter}>
    <Grid sm={12} item container>
      {footers.map(footer => (
        <Grid item xs={12} sm={6} md={3} key={footer.title} className={classes.footerColumn} >
          <div className={classes.footerColumnInner}>
          <Typography variant="h6" color="textPrimary" gutterBottom>
            {footer.title}
          </Typography>
          <ul>
            {footer.links.map(item => {
              const activeLink = item.hasOwnProperty("link")
              const title = item.hasOwnProperty("title") ? item.title : item
              const link = activeLink ? item.link : `/#`
              const key = activeLink ? item.link : title
              const nextLink = item.external ? Link : CustomLink
              return (
                <li key={key}>
                  <Link
                    href={link}
                    variant="subtitle1"
                    color="textSecondary"
                    onClick={
                      activeLink
                        ? null
                        : () => {
                            openModal(title)
                          }
                    }
                    component={nextLink}
                  >
                    {title}
                  </Link>
                </li>
              )
            })}
          </ul>
          </div>
        </Grid>
      ))}
    </Grid>
    <Grid
      xs={12}
      item
      container
      className={classes.appArea}
    >
      <Grid item sm={12} xs={12}>
        <Typography variant="h6" align="center">
          {"Download the ESX app"}
        </Typography>
      </Grid>
      <Grid item container justify="center" className={classes.appStoreButtons}>
        <Grid item  justify="center">
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://itunes.apple.com"
          >
            <img
              height= "48px"
              className={classes.appleAppStore}
              alt="Available on the App Store"
              src="/static/images/footer/app-store-badge.svg"
            />
          </Link>
        </Grid>
        <Grid item justify="center">
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://play.google.com/"
          >
            <img
              height="48px"
              className={classes.androidAppStore}
              alt="Download on Google Play"
              src="/static/images/footer/GoogleStoreBadge.png"
            />
          </Link>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
)

@inject("store")
@observer
class Footer extends React.Component {
  static async getInitialProps({ mobxStore }) {
    return { ...mobxStore }
  }
  render() {
    const { classes, store, openModal } = this.props
    const loggedIn = store.userStore.loggedIn
    return (
      <div className={classes.root}>
        <FooterTopRow classes={classes} />
        <FooterMiddleRow openModal={openModal} classes={classes} />
        <Copyright classes={classes}/>
      </div>
    )
  }
}

const styles = theme => {
  return {
    "@global": {
      ul: {
        margin: 0,
        padding: 0
      },
      li: {
        listStyle: "none"
      }
    },
    topRow : {
      marginBottom: theme.spacing(3)
    },
    socialIconRow: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      [theme.breakpoints.down("sm")]: {
        marginTop: theme.spacing(2),
      }
    },
    socialIcon: {
      display: "block",
      padding: 0,
      paddingRight: theme.spacing(2)
    },
    root: {
      flexGrow: 1,
      padding: theme.spacing(4)
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    footerColumnsOuter: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      paddingRight: theme.spacing(6),
      paddingLeft: theme.spacing(6),
      marginBottom: theme.spacing(3),
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column-reverse",
        marginBottom: theme.spacing(1),
      }
    },
    footerColumn: {
      display: "flex",
      flexDirection: "column",
      alignItems: "align-left",
      [theme.breakpoints.down("xs")]: {
        alignItems: "center",
      }
    },
    footerColumnInner: {
      display: "flex",
      flexDirection: "column",
      alignItems: "align-left",
      marginBottom: theme.spacing(2),
      [theme.breakpoints.down("xs")]: {
        alignItems: "center",
      }
    },
    logoImg: {
      display: "block",
      position: "relative",
      top: "-15px"
    },
    logoLink: {
      display: "block",
      width: "auto",
      marginLeft: theme.spacing(8),
      [theme.breakpoints.down("sm")]: {
        marginLeft: 0
      }
    },
    appArea: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      [theme.breakpoints.down("sm")]: {
        marginBottom: theme.spacing(3)
      }
    },
    appStoreButtons: {

    },
    appleAppStore: {
      width: "100px",
    },
    androidAppStore: {
      width: "120px",
    },


    root: {
      margin: "0 auto",
      [theme.breakpoints.down("xs")]: {
        width: "98%",
      },
      [theme.breakpoints.down("sm")]: {
        width: "90%",
      },
      [theme.breakpoints.down("md")]: {
        width: "80%",
      },
      [theme.breakpoints.down("xl")]: {
        width: "65%",
      }
    },
    copyrightOuter: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      "& p": {
        marginRight: theme.spacing(1)
      }
    }
  }
}

export default withStyles(styles)(Footer)
