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

import withWidth, { isWidthUp, isWidthDown } from '@material-ui/core/withWidth'

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

const AppStore = ({ classes }) => (
  <div className={classes.appStoreOuter}>
    <Typography variant="h6" className={classes.appStoreTitle}>
      Download the ESX app
    </Typography>
    <div className={classes.appStoreButtonsOuter}>
      <Link target="_blank" rel="noopener noreferrer" href={EXTERNAL_LINKS.itunes}>
        <img
          height="32px"
          className={classes.appStoreApple}
          alt="Available in the App Store"
          src="/static/images/footer/app-store-badge.svg"
        />
      </Link>
      <Link target="_blank" rel="noopener noreferrer" href={EXTERNAL_LINKS.android}>
        <img
          height="32px"
          className={classes.appStoreAndroid}
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

const FooterNav = ({ classes, handlePlaceholder, centerNavTitle }) => (
  <Grid container className={classes.navGridContainer}>
  {footerNav.map(section => {
    const title = (
      <>
        <Typography variant="h6" color="textPrimary" className={classes.navSectionTitle} >
          {section.title}
        </Typography>
        <hr class={classes.navSectionHR} />
      </>
    )
    return (
      <Grid item xs={12} sm={6} md={3} key={section.title} className={classes.navSectionGridItem}>
        {centerNavTitle && title}
        <ul>
        {!centerNavTitle && title /* yeah, it's a hack... so what */}
        {section.links.map(item => {
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
      </Grid>
    )}
  )}
  </Grid>
)

@inject("store")
@observer
class Footer extends React.Component {
  static async getInitialProps({ mobxStore }) {
    return { ...mobxStore }
  }
  render() {
    const { 
      classes, 
      width,
      rootClassName, 
      handlePlaceholder 
    } = this.props
    
    const socialAndAppLinksTogether = isWidthUp('lg', width)
    const centerNavTitle = isWidthDown('xs', width)

    const socialAndAppLinks = (
      <>
      <Grid item xs={12} className={classes.socialGridItem}>
        <SocialIcons classes={classes} />
      </Grid>
      <Grid item xs={12} className={classes.appStoreGridItem} >
        <AppStore classes={classes} />
      </Grid>
      </>
    )           

    return (
      <footer className={classNames(rootClassName, classes.root)}>
        <Grid container className={classes.gridContainer}>
          <Grid item md={6} lg={12} className={classes.logoGridItem}>
            <Logo classes={classes} />
          </Grid>
          <Grid xs={12} lg={8} item className={classes.navGridItem}>
            <FooterNav centerNavTitle={centerNavTitle} handlePlaceholder={handlePlaceholder} classes={classes} />
          </Grid>
          {(socialAndAppLinksTogether) ?
            (
              <Grid lg={4} container item className={classes.socialAndAppGridItem}>
                {socialAndAppLinks}
              </Grid>
            ) : (
              socialAndAppLinks
            ) 
          }
          <Grid item xs={12} className={classes.copyrightGridItem}>
            <Copyright classes={classes} />
          </Grid>
        </Grid>
      </footer>
    )
  }
}

export default withWidth()(withStyles(styles)(Footer))
