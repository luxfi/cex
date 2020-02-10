import React from 'react'
import { inject, observer } from 'mobx-react'
import classNames from 'classnames'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faYoutube,
  faMedium,
  faReddit
} from '@fortawesome/free-brands-svg-icons'

import {
  Typography,
  Link,
  IconButton,
  Grid,
} from '@material-ui/core'

import { CustomLink } from '..'

import FinePrint from './FinePrint.js'

const EXTERNAL_LINKS = {

  facebook: 'https://www.facebook.com/EntertainmetnStockX',
  twitter: 'https://twitter.com/EntertainStockX',
  instagram: 'https://www.instagram.com/entertainmentstockx',
  youtube: 'https://www.youtube.com/', // TODO
  medium: 'https://medium.com/entertainmentstockx',
  reddit: 'https://www.reddit.com/r/EntertainmentStockX/',

  itunes: 'https://itunes.apple.com', // TODO
  android: 'https://play.google.com/', // TODO
}

const BYLINE = 'Own your entertainment'

import { withStyles } from '@material-ui/core/styles'
import styles from './footer.style.js'

const footerNav = [
  {
    title: 'Company',
    links: [
      { title: 'About', link: '/about' },
      'Careers',
      'Press',
      { title: 'Blog', link: EXTERNAL_LINKS.medium, external: true },
    ],
  },
  {
    title: 'Projects',
    links: ['Movies', 'TV Series', 'Music', 'Gaming'],
  },
  {
    title: 'Support',
    links: [
      {
        title: 'Investor FAQ',
        link: '/investorFaq',
      },
      {
        title: 'Project FAQ',
        link: '/projectFaq',
      },
      {
        title: 'Risks',
        link: '/risks',
      },
      {
        title: 'Contact Us',
        link: '/contact',
      },
    ],
  },
]

const LogoAndByline = ({ classes }) => (
  <>
  <Link href='/' className={classes.logoLink}>
    <img
      className={classes.logoImg}
      src='/static/images/esx/esx-white-logo.png'
      alt='ESX'
      height='32px'
    />
  </Link>
  <Typography variant='body1' color='textPrimary' className={classes.byline}>
    {BYLINE}
  </Typography>
  </>
)

const SocialIcons = ({ classes }) => (
  <div className={classes.socialIconRow}>
    <IconButton href={EXTERNAL_LINKS.facebook} className={classes.socialIcon} target='_blank'>
      <FontAwesomeIcon icon={faFacebook} size='1x' />
    </IconButton>
    <IconButton href={EXTERNAL_LINKS.twitter} className={classes.socialIcon} target='_blank'>
      <FontAwesomeIcon icon={faTwitter} size='1x' />
    </IconButton>
    <IconButton href={EXTERNAL_LINKS.instagram} className={classes.socialIcon} target='_blank'>
      <FontAwesomeIcon icon={faInstagram} size='1x' />
    </IconButton>
    <IconButton href={EXTERNAL_LINKS.youtube} className={classes.socialIcon} target='_blank'>
      <FontAwesomeIcon icon={faYoutube} size='1x' />
    </IconButton>
    <IconButton href={EXTERNAL_LINKS.medium} className={classes.socialIcon} target='_blank'>
      <FontAwesomeIcon icon={faMedium} size='1x' />
    </IconButton>
    <IconButton href={EXTERNAL_LINKS.reddit} className={classes.socialIcon} target='_blank'>
      <FontAwesomeIcon icon={faReddit} size='1x' />
    </IconButton>
  </div>
)

const FooterNav = ({ classes, nav }) => (
  <Grid container className={classes.navGridContainer}>
    {nav.map((section) => (
      <Grid
        item
        xs={6}
        md={3}
        key={section.title}
        className={classes.navSectionGridItem}
      >
        <Typography variant='h6' color='textPrimary' className={classes.navSectionTitle} >
          {section.title}
        </Typography>
        <hr className={classes.navSectionHR} />
        <ul>
        {section.links.map((item) => {
          const activeLink = (typeof item === 'object' && 'link' in item)
          const title = (typeof item === 'object' && 'title' in item) ? item.title : item
          const href = (activeLink) ? item.link : { pathname: '/placeholder', query: { title } }
          // cannot use external links with NextLinks
          const component = (activeLink && 'external' in item) ? 'a' : CustomLink

          return (
            <li key={title}>
              <Link
                href={href}
                variant='subtitle1'
                color='textPrimary'
                className={classes.footerNavLink}
                component={component}
                onClick={item.handler}
              >
                {title}
              </Link>
            </li>
          )
        })}
        </ul>
      </Grid>
    ))}
  </Grid>
)

const AppStore = ({ classes }) => (
  <div className={classes.appStoreOuter}>
    <Typography variant='body1' className={classes.appStoreTitle}>
      Download the ESX app
    </Typography>
    <div className={classes.appStoreButtonsOuter}>
      <Link target='_blank' rel='noopener noreferrer' href={EXTERNAL_LINKS.itunes}>
        <img
          height='32px'
          className={classes.appStoreApple}
          alt='Available in the App Store'
          src='/static/images/footer/app-store-badge.svg'
        />
      </Link>
      <Link target='_blank' rel='noopener noreferrer' href={EXTERNAL_LINKS.android}>
        <img
          height='32px'
          className={classes.appStoreAndroid}
          alt='Download from Google Play'
          src='/static/images/footer/GoogleStoreBadge.png'
        />
      </Link>
    </div>
  </div>
)

const Copyright = ({ classes }) => {
  const currentYear = new Date().getFullYear()

  // TODO Create Privacy and Terms of Use pages
  return (
    <div className={classes.copyrightOuter}>
      <Typography variant='body2' color='textSecondary'>
        <a href='/privacy'>Privacy Policy</a> / <a href='/terms'>Terms of Use</a>
      </Typography>
      <Typography variant='body2' color='textSecondary'>
        {`© ${currentYear} Entertainment Stock X LLC. All rights reserved.`}
      </Typography>
    </div>
  )
}

@inject('store')
@observer
class Footer extends React.Component {
  render() {
    const {
      classes,
      rootClassName,
      isLoggedIn,
      handleLogout,
    } = this.props


    const nav = footerNav.slice(0)

    nav.push({
      title: 'Account',
      links: isLoggedIn ? ([
        {
          title: 'My Account',
          link: '/account',
        },
        {
          title: 'Portfolio',
          link: '/portfolio',
        },
        {
          title: 'Logout',
          handler: handleLogout,
        },
      ]) : ([
        {
          title: 'Sign Up',
          link: '/signup',
        },
        {
          title: 'Login',
          link: '/login',
        },
      ]),
    })

    return (
      <footer className={classNames(rootClassName, classes.root)}>
        <Grid container className={classes.gridContainer}>
          <Grid item lg={3} className={classes.logoAreaGridItem}>
            <LogoAndByline classes={classes} />
            <SocialIcons classes={classes} />
          </Grid>
          <Grid item xs={12} lg={9} className={classes.navGridItem}>
            <FooterNav nav={nav} classes={classes} />
          </Grid>
          <Grid item xs={12} className={classes.copyrightGridItem}>
            <hr className={classes.appStoreSectionHR} />
            <AppStore classes={classes} />
            <Copyright classes={classes} />
            <hr className={classes.appStoreSectionHR} />
          </Grid>
        </Grid>
        <Typography variant='body2' color='textSecondary' component='span'>
          <FinePrint className={classes.finePrint} />
        </Typography>
      </footer>
    )
  }
}

export default withStyles(styles)(Footer)
