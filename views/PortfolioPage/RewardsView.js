/* eslint-disable react/prop-types */
import React, { useState } from "react"
import classNames from "classnames"
import { 
  Grid, 
  Paper, 
  Icon, 
  InputBase, 
  Button,
  Snackbar,
  Slide,
  Fade 
} from "@material-ui/core"

import { makeStyles } from "@material-ui/core/styles"
import { green, red } from '@material-ui/core/colors'
import { CopyToClipboard } from 'react-copy-to-clipboard';

import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  EmailShareButton,

} from 'react-share';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope, faClipboard } from "@fortawesome/free-solid-svg-icons"
import {
  faFacebookF,
  faTwitter,
  faLinkedinIn
} from "@fortawesome/free-brands-svg-icons"

const miniReset = {
  margin: 0,
  padding: 0
}

const generalStyles = makeStyles(theme => ({
  root: {
    margin: "0 25px",
  }
}))

const cardStyles = makeStyles(theme => ({

  paper: {
    padding: theme.spacing(2),
    height: "216px",
    color: theme.palette.text.primary,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between"
  },
  disabledPaper: {
    color: theme.palette.text.secondary + " !important",
  },
  leftAlignedPaper: {
    alignItems: "flex-start !important",
    paddingLeft: "24px"
  },

  title: {
    ...miniReset,
    textTransform: "uppercase",
    fontSize: "1rem",
    fontWeight: 200,
    marginBottom: "12px"
  },

  cardIcon: {
    display: "block",
    fontSize: '5.5rem',
    color: green[500],
    marginBottom: "6px"
  },
  disabledIcon: {
    color: theme.palette.grey[300] + " !important",
  },

  pointsString: {
    ...miniReset,
    marginBottom: "0.4rem",
  },
  completedIcon: {
    fontSize: '0.8rem',
    color: green[500],
    marginBottom: "-0.2rem",
    marginRight: "0.1rem"
  },
  completedString: {
    ...miniReset,
    fontSize: '0.7rem',
  },

  totalTitle: {
    ...miniReset,
    textTransform: "uppercase",
    fontSize: "1.2rem",
    fontWeight: 300,
    marginBottom: "12px",
    textAlign: "baseline"
  },
  heartIcon: {
    display: "inline",
    fontSize: '2.5rem',
    color: red[800],
    paddingRight: "0.2rem",
  },
  totalString: {
    ...miniReset,
    fontSize: "2.3rem",
    fontWeight: 300,
    marginBottom: "12px"
  },

  
  urlCopyOuter: {
    height: "2.2rem",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "stretch"
  },
  urlField: {
    border: "1px " + theme.palette.text.secondary + " solid",
    borderRadius: "3px",
    marginRight: "12px",
    padding: "6px 24px 6px 10px",
  },

  socialOuter : {
    display: "flex",
    flexDirection: "row",
    marginBottom: "12px",

    "& svg": {
      display: "block",
      width: "1.6rem !important",
      height: "1.6rem !important",
      cursor: "pointer",
      marginRight: "10px"
    }
  },

  facebookIcon: {
    color: "#3b5998",
    marginLeft: "-4px"
  },
  twitterIcon: {
    color: "#00acee"
  },
  linkedinIcon: {
    color: "#0e76a8"
  },
  emailIcon: {
    // color: "#c71610" gmail red
    color: red[900]
  }
}))

const dummyRewardsURL = "esx.com/rewards/invite/zachk"

const CardOuter = props => {

  const {
    classes,
    disabled,
    leftAligned
  } = props

  let names = []
  names.push(classes.paper)
  if (!!disabled) {
    names.push(classes.disabledPaper)
  }
  if (!!leftAligned) {
    names.push(classes.leftAlignedPaper)
  }

  return (
    <Grid item xs={(props.double) ? 8 : 4}>
      <Paper className={classNames(names)}>{props.children}</Paper>
    </Grid>
  )
}

const RewardCard = props => {

  const {
    title,
    completed,
    points,
    double,
  } = props

  const classes = cardStyles()

  const pointsString = completed ? points + " points earned" : "earn " + points + " points"
  const iconClasses = completed ? classes.cardIcon : classNames(classes.cardIcon, classes.disabledIcon)
    // This ensures that the space occupied by the absent element is maintained
  const completedStringStyle = completed ? { visibility: "visible" } : { visibility: "hidden" }

  return (
    <CardOuter double={!!double} disabled={!completed} classes={classes}>
      <h6 className={classes.title}>{title}</h6>
      <Icon className={iconClasses}>stars_rounded</Icon>
      <p className={classes.pointsString}>{pointsString}</p>
      <p className={classes.completedString} style={completedStringStyle}><Icon className={classes.completedIcon}>check_circle</Icon>Completed</p>
    </CardOuter>  
  )
}

const TotalCard = props => {

  const { total, monthTotal } = props
  const classes = cardStyles()
  return (
    <CardOuter classes={classes}>
      <h6 className={classes.totalTitle}>Rewards</h6>
      <p className={classes.totalString}><Icon className={classes.heartIcon}>favorite</Icon>{total}</p>
      <p className={classes.monthTotal} >{monthTotal}&nbsp;this month</p>
    </CardOuter>
  )
}


const SocialIcons = props => {
  const {
    classes,
    shareUrl,
    shareQuote
  } = props
  return (
    <div className={classes.socialOuter} >
      <FacebookShareButton url={shareUrl} quote={shareQuote}>
        <FontAwesomeIcon className={classes.facebookIcon} icon={faFacebookF} />
      </FacebookShareButton>
      <TwitterShareButton url={shareUrl} quote={shareQuote}>
        <FontAwesomeIcon className={classes.twitterIcon} icon={faTwitter} />
      </TwitterShareButton>
      <LinkedinShareButton url={shareUrl} quote={shareQuote}>
        <FontAwesomeIcon className={classes.linkedinIcon} icon={faLinkedinIn} />
      </LinkedinShareButton>
      <EmailShareButton url={shareUrl} quote={shareQuote}>
        <FontAwesomeIcon className={classes.emailIcon} icon={faEnvelope} />
      </EmailShareButton>
    </div>
  )
}

const ReferalCard = props => {

  const { rewardsURL, rewardsShareMessage, onCopied } = props
  const classes = cardStyles()

  return (
    <CardOuter double leftAligned classes={classes} >
      <h6 className={classes.totalTitle}>Earn 15 points for each friend you invite</h6>
      <div className={classes.urlCopyOuter}>
        <InputBase
          value={rewardsURL}
          className={classes.urlField}
          readOnly
        />
        <CopyToClipboard text={rewardsURL} onCopy={onCopied}>
          <Button variant="outlined" color="inherit">
            <FontAwesomeIcon className={classes.clipboardIcon} icon={faClipboard} />&nbsp;Copy
          </Button>
        </CopyToClipboard>
      </div>
      <SocialIcons classes={classes} shareUrl={rewardsURL} shareQuote={rewardsShareMessage}/>
    </CardOuter>
  )
}

const UrlWasCopiedSnackbar = props => {

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      open={props.open}
      autoHideDuration={1000}
      TransitionComponent={Fade}
      message={<span>copied</span>}
      onClose={props.handleSnackbarClose} // this must be supplied, or the autohide won't work.
    />
  )
}

const RewardsView = (props) => {
  
  const { tabIdx, index } = props
  // Not me! Don't render
  if (tabIdx !== index) return null

  const classes = generalStyles()

  const [shareUrlWasCopied, setShareUrlWasCopied] = React.useState(false)

  const rewardsURL = dummyRewardsURL;
  const rewardsShareMessage = "I'm supporting this project.  Check it out!"

  return (
    <>
    <Grid container spacing={3} className={classes.root}>
      <TotalCard total={45} monthTotal={30} />
      <ReferalCard 
        rewardsURL={rewardsURL} 
        message={rewardsShareMessage} 
        onCopied={(ignore) => {setShareUrlWasCopied(true)}}
      />
      <RewardCard title={"complete your profile"} points={5} completed/>
      <RewardCard title={"invite a friend"} completed points={15} completed />
      <RewardCard title={"add a payment option"} points={10} completed />
      <RewardCard title={"make 1 investment"} points={15} completed />
      <RewardCard title={"make 2 investments"} points={10} />
      <RewardCard title={"make 5 investments"} points={10} />
      <RewardCard title={"make 10 investments"} points={10} />
      <RewardCard title={"make 20 investments"} points={10} />
      <RewardCard title={"make 30 investments"} points={10} />
    </Grid>
      <UrlWasCopiedSnackbar open={shareUrlWasCopied} handleSnackbarClose={
        (evt, reason) => {
          if (reason === 'clickaway') {
            return
          }
          setShareUrlWasCopied(false)
        }
      }
      />
    </>
  )
}

export default RewardsView