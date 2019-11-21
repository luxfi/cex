import React from "react"
import { inject, observer } from "mobx-react"
import classNames from "classnames"

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
  IconButton,
  Grid,
} from "@material-ui/core"

import { CustomLink } from ".."

const EXTERNAL_LINKS = {

  facebook: "https://www.facebook.com/", // TODO
  twitter: "https://twitter.com/EntertainStock",
  instagram: "https://www.instagram.com/",  // TODO
  youtube: "https://www.youtube.com/", // TODO
  medium: "https://medium.com/entertainment-stock-x",
  reddit: "https://www.reddit.com/r/EntertainmentStockX/",

  itunes: "https://itunes.apple.com", // TODO
  android: "https://play.google.com/", // TODO
}

import { withStyles } from "@material-ui/core/styles"
import styles from "./footer.style.js"

const footerNav = [
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
    links: ["Sign In", "Sign Up", "Orders", "Portfolio"]
  }
]

const Logo = ({ classes }) => (
  <Link href="/" className={classes.logoLink}>
    <img
      className={classes.logoImg}
      src="/static/images/esx/esx-white-logo.png"
      alt="ESX"
      height="48px"
    />
  </Link>
)

const SocialIcons = ({ classes }) => (
  <div className={classes.socialIconRow}>
    <IconButton href={EXTERNAL_LINKS.facebook} className={classes.socialIcon} target="_blank">
      <FontAwesomeIcon icon={faFacebook} size="1x" />
    </IconButton>
    <IconButton href={EXTERNAL_LINKS.twitter} className={classes.socialIcon} target="_blank">
      <FontAwesomeIcon icon={faTwitter} size="1x" />
    </IconButton>
    <IconButton href={EXTERNAL_LINKS.instagram} className={classes.socialIcon} target="_blank">
      <FontAwesomeIcon icon={faInstagram} size="1x" />
    </IconButton>
    <IconButton href={EXTERNAL_LINKS.youtube} className={classes.socialIcon} target="_blank">
      <FontAwesomeIcon icon={faYoutube} size="1x" />
    </IconButton>
    <IconButton href={EXTERNAL_LINKS.medium} className={classes.socialIcon} target="_blank">
      <FontAwesomeIcon icon={faMedium} size="1x" />
    </IconButton>
    <IconButton href={EXTERNAL_LINKS.reddit} className={classes.socialIcon} target="_blank">
      <FontAwesomeIcon icon={faReddit} size="1x" />
    </IconButton>
  </div>
)

const AppDownload = ({ classes }) => (
  <div className={classes.downloadAppOuter}>
    <Typography variant="h6" className={classes.downloadTitle}>
      Download the ESX app
    </Typography>
    <div className={classes.appStoreButtons}>
      <Link target="_blank" rel="noopener noreferrer" href={EXTERNAL_LINKS.itunes}>
        <img
          height="48px"
          className={classes.appleAppStore}
          alt="Available in the App Store"
          src="/static/images/footer/app-store-badge.svg"
        />
      </Link>
      <Link target="_blank" rel="noopener noreferrer" href={EXTERNAL_LINKS.android}>
        <img
          height="48px"
          className={classes.androidAppStore}
          alt="Download from Google Play"
          src="/static/images/footer/GoogleStoreBadge.png"
        />
      </Link>
    </div>
  </div>
)

const Copyright = ({ classes }) => {

  const firstYear = 2019
  const currentYear = new Date().getFullYear()
  const yearString = (currentYear > firstYear) ? `${firstYear}-${currentYear}` : firstYear

  // TODO Create Privacy and Terms of Use pages

  return (
    <div className={classes.copyrightOuter}>
      <Typography variant="body2" color="textSecondary">
        Privacy Policy / Terms of Use
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {`© ${yearString} ESX. All rights reserved.`}
      </Typography>
    </div>
  )
}

const FooterMiddleRow = ({ classes, handlePlaceholder }) => (
  <Grid container className={classes.footerColumnsOuter}>
    <Grid sm={12} item container>
      {footerNav.map(element => (
        <Grid item xs={12} sm={6} md={3} key={element.title} className={classes.footerColumn} >
          <div className={classes.footerColumnInner}>
            <Typography variant="h6" color="textPrimary" gutterBottom>
              {element.title}
            </Typography>
            <ul>
              {element.links.map(item => {
                const activeLink = (typeof item === "object" && "link" in item)
                const title = (typeof item === "object" && "title" in item) ? item.title : item
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
                            handlePlaceholder(title)
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
      spacing="center"
    >
      <AppDownload classes={classes} />
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
    const { classes, rootClassName, handlePlaceholder } = this.props
    return (
      <footer className={classNames(rootClassName, classes.root)}>
        <Grid container className={classes.mainGrid}>
          <Grid item sm={12} md={6}>
            <Logo classes={classes} />
          </Grid>
          <Grid item sm={12} md={6}>
            <SocialIcons classes={classes} />
          </Grid>
        </Grid>
        <FooterMiddleRow handlePlaceholder={handlePlaceholder} classes={classes} />
        <Copyright classes={classes} />
      </footer>
    )
  }
}

export default withStyles(styles)(Footer)
