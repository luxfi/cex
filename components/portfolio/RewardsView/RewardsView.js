/* eslint-disable react/prop-types */
import React from "react"
import classNames from "classnames"
import {
  Grid,
  Paper,
  Icon,
  InputBase,
  Button,
  Snackbar,
  Fade
} from "@material-ui/core"

import { makeStyles } from "@material-ui/core/styles"
import { CopyToClipboard } from 'react-copy-to-clipboard';

import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  EmailShareButton,
} from 'react-share';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import {
  faEnvelope,
  faClipboard
} from "@fortawesome/free-solid-svg-icons"

import {
  faFacebook,
  faTwitter,
  faLinkedinIn
} from "@fortawesome/free-brands-svg-icons"

import myStyles from "./RewardsView.style.js"

const styles = makeStyles(myStyles)


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
    <Paper className={classNames(names)}>{props.children}</Paper>
  )
}

const RewardCard = props => {

  const {
    title,
    completed,
    points,
    double,
  } = props

  const classes = styles()

  const pointsString = completed ? points + " points earned" : "earn " + points + " points"
  const iconClasses = completed ? classes.cardIcon : classNames(classes.cardIcon, classes.disabledIcon)
    // This ensures that the space occupied by the absent element is maintained
  const completedStringStyle = completed ? { visibility: "visible" } : { visibility: "hidden" }

  return (
    <CardOuter disabled={!completed} classes={classes}>
      <h6 className={classes.title}>{title}</h6>
      <Icon className={iconClasses}>stars_rounded</Icon>
      <p className={classes.pointsString}>{pointsString}</p>
      <p className={classes.completedString} style={completedStringStyle}><Icon className={classes.completedIcon}>check_circle</Icon>Completed</p>
    </CardOuter>
  )
}

const TotalCard = props => {

  const { total, monthTotal } = props
  const classes = styles()
  return (
    <CardOuter classes={classes}>
      <h6 className={classes.totalTitle}>Rewards</h6>
      <p className={classes.totalOuter}>
        <Icon className={classes.totalIcon}>stars_rounded</Icon>
        <span className={classes.totalString}>{total}</span>
      </p>
      <p className={classes.monthTotalString} >{monthTotal}&nbsp;this month</p>
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
      <span className={classes.shareLabel}>Share:&nbsp;</span>
      <FacebookShareButton url={shareUrl} quote={shareQuote}>
        <FontAwesomeIcon className={classes.facebookIcon} icon={faFacebook} />
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

const ReferralCard = props => {

  const { rewardsURL, rewardsShareMessage, onCopied } = props
  const classes = styles()

  return (
    <CardOuter leftAligned classes={classes} >
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

const rewards = [
  {
    title: 'complete your profile',
    completed: true,
  },
  {
    title: 'invite a friend',
    completed: true,
  },
  {
    title: 'add a payment option',
    completed: true,
  },
  {
    title: 'make 1 investment',
    completed: true,
  },
  {
    title: 'make 2 investment',
  },
  {
    title: 'make 1 investment',
  },
  {
    title: 'make 10 investment',
  },
  {
    title: 'make 20 investment',
  },
  {
    title: 'make 50 investment',
  },
]

const RewardsView = (props) => {

  const { tabIdx, index } = props
  // Not me! Don't render
  if (tabIdx !== index) return null

  const classes = styles()

  const [shareUrlWasCopied, setShareUrlWasCopied] = React.useState(false)

  const rewardsURL = dummyRewardsURL;
  const rewardsShareMessage = "I'm supporting this project.  Check it out!"

  return (
    <>
    <Grid container spacing={3}>
      <Grid item xs={12} sm={4}>
        <TotalCard total={45} monthTotal={30} />
      </Grid>
      <Grid item xs={12} sm={8}>
        <ReferralCard
          rewardsURL={rewardsURL}
          message={rewardsShareMessage}
          onCopied={(ignore) => {setShareUrlWasCopied(true)}}
        />
      </Grid>
      {
        rewards.map(reward => (
          <Grid item xs={12} sm={4}>
            <RewardCard title={reward.title} points={5} completed={!!reward.completed}/>
          </Grid>
        ))
      }
    </Grid>
    <br />
    <UrlWasCopiedSnackbar
      open={shareUrlWasCopied}
      handleSnackbarClose={
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
