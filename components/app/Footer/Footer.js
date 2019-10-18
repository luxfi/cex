import React from "react"
import { inject, observer } from "mobx-react"

//font awesome share icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebook, faTwitter, faPinterest, faInstagram, faYoutube, faMedium } from "@fortawesome/free-brands-svg-icons"

// material components
import {
  Toolbar,
  Container,
  Typography,
  Link,
  Button,
  Grid,
  Box
} from "@material-ui/core"


// core components
import { CustomLink, CustomModal } from "../"

// styles
import { withStyles } from "@material-ui/core/styles"

const AboutESX = ({ classes, openModal }) => {
  const body = (<>
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
  </>)
  const title = "What is ESX?"
  return (
    <Button className={classes.menuButton} onClick={() => {
      openModal(title, body)
    }}>
      About ESX
      </Button>
  )
}

const Partnerships = ({ classes, openModal }) => {
  const body = (<>
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
  </>)
  const title = "Partnerships"
  return (
    <Button className={classes.menuButton} onClick={() => {
      openModal(title, body)
    }}>
      Partnerships
      </Button>
  )
}

const ContactUs = ({ classes, openModal }) => {
  const body = (<>
    <p>Put Contact Infomation Here</p>{" "}
  </>)
  const title = "Contact Us"
  return (
    <Button className={classes.menuButton} onClick={() => {
      openModal(title, body)
    }}>
      Contact Us
      </Button>
  )
}

const Copyright = () => {
  return (
    <Box mt={5}>
      <Typography variant="body2" color="textSecondary" align="left">
        {'Privacy Policy / Terms of Use'}
      </Typography>
      <Typography variant="body2" color="textSecondary" align="left">
        {'Copyright © 2019 ESX. All rights reserved.'}
      </Typography>
    </ Box>
  )
}

const footers = [
  {
    title: 'Company',
    description: ['About', 'Careers', 'Press', 'Blog'],
  },
  {
    title: 'Projects',
    description: ['Movies', 'TV Series', 'Music', 'Gaming'],
  },
  {
    title: 'Support',
    description: ['Investory FAQ', 'Project FAQ', 'Risks', 'Contact'],
  },
  {
    title: 'Account',
    description: ['Sign In', 'Create Account', 'Orders', 'Portfolio'],
  },
];

const FooterTopRow = ({classes}) => (
  <Box mb={5}>
    <Grid container>
      <Link href="/" className={classes.flex}>
        {" "}
        {/* get rid of inline style */}
        <img
          id="logo"
          src="/static/images/esx/esx-white-logo.png"
          alt="ESX"
          style={{ marginTop: "-22px" }}
          height="52px"
        />
      </Link>
      <div className={classes.grow} />

      <Button
        href="https://twitter.com/"
        target="_blank"
        title="Tweet"
      >
        <FontAwesomeIcon icon={faTwitter} size="2x" />
      </Button>
      <Button
        href="https://www.facebook.com/"
        target="_blank"
      >
        <FontAwesomeIcon icon={faFacebook} size="2x" />
      </Button>
      <Button
        href="https://www.pinterest.com/"
        target="_blank"
      >
        <FontAwesomeIcon icon={faPinterest} size="2x" />
      </Button>
      <Button
        href="https://www.instagram.com/"
        target="_blank"
      >
        <FontAwesomeIcon icon={faInstagram} size="2x" />
      </Button>
      <Button
        href="https://www.youtube.com/"
        target="_blank"
      >
        <FontAwesomeIcon icon={faYoutube} size="2x" />
      </Button>
      <Button
        href="https://www.medium.com/"
        target="_blank"
      >
        <FontAwesomeIcon icon={faMedium} size="2x" />
      </Button>
    </Grid>
  </Box>
)

const FooterMiddleRow = ( {classes, openModal} ) => (
  <Grid container direction="row">
    <Grid xs={8} item container justify="space-evenly">
      {footers.map(footer => (
        <Grid item xs={6} sm={3} key={footer.title}>
          <Typography variant="h6" color="textPrimary" gutterBottom>
            {footer.title}
          </Typography>
          <ul>
            {footer.description.map(item => (
              <li key={item}>
               
                <Link 
                  href="#" 
                  variant="subtitle1" 
                  color="textSecondary"
                  onClick={() => {
                    openModal(item)
                  }}
                  >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </Grid>
      ))}
    </Grid>
    <Grid 
      xs={4} 
      item 
      container 
      justify="center"
      alignItems="center"
      direction="column"
    >  
      <Grid item>
        <Typography variant="h6" align="center">
          {'Download the ESX app'}
        </Typography>
      </Grid>
      <Grid item container justify="center">
        <Grid item>
          <Link target="_blank" rel="noopener noreferrer" href="https://itunes.apple.com">
            <img style={{ height: '60px', padding: "10px 0px" }} alt="Available on the App Store" src="images/footer/app-store-badge.svg" />
          </Link>
        </Grid>
        <Grid item>
          <Link target="_blank" rel="noopener noreferrer" href="https://play.google.com/">
            <img style={{ height: '60px', paddingLeft: "8px" }} alt="Download on Google Play" src="images/footer/GoogleStoreBadge.png" />
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
        <Container maxWidth="lg" component="footer" className={classes.footer}>
          <FooterTopRow classes={classes}/>
          <FooterMiddleRow openModal={openModal}/>
          <Box mt={5}>
            <Copyright />
          </Box>
        </Container>
      </div>
    )
  }
}

const styles = theme => {
  return {
    '@global': {
      ul: {
        margin: 0,
        padding: 0,
      },
      li: {
        listStyle: 'none',
      },
    },
    root: {
      flexGrow: 1,
      padding: "32px 0px",
      background: "#000",
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    grow: {
      flexGrow: 1,
      display: "none",
      display: "block"
    },
    footer: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
      [theme.breakpoints.up('sm')]: {
        paddingTop: theme.spacing(6),
        paddingBottom: theme.spacing(6),
      },
    },
  }
}

export default withStyles(styles)(Footer)
