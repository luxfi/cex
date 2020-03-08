import React from 'react'
import classNames from 'classnames'

import { CopyToClipboard } from 'react-copy-to-clipboard'

import {
  List,
  ListItem,
  Tooltip,
  Typography,
  makeStyles,
} from '@material-ui/core'

import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
  Link as LinkIcon,
  Email as EmailIcon,
} from '@material-ui/icons'


import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from 'react-share'

import styles from './ShareButtons.style.js'
const useStyles = makeStyles(styles)


export default (props) => {

    // 'show' is an array of strings specifying which share buttons are
    // desired and in what order.
    // For example, show={['Facebook', 'Twitter', 'LinkedIn', 'CopyURL']}
  const {
    show,
    shareURL,
    message,
    onCopy,
    iconSize,
    orientation,
  } = props

  const classes = useStyles()  

  const textClass = ('hideLabels' in props) ? classes.hiddenText : '' 
  const listDirectionClass = (orientation === 'vertical') ? classes.verticalList : classes.horizantalList
  const labelDirectionClass = (orientation === 'vertical') ? classes.horizantalButtonLayout : classes.verticalButtonLayout

  return (
    <List className={classNames(classes.shareList, listDirectionClass)}>
    {show.map((name) => {
      switch (name) {
        case 'Facebook':
          return (
            <ListItem className={classes.shareListItem} >
              <FacebookShareButton className={classNames(classes.facebookShareButton, classes.shareButton, labelDirectionClass)} url={shareURL} quote={message}>
                <FacebookIcon className={classes.shareIcon} fontSize={iconSize} />
                <Typography className={classNames(classes.shareLabel, textClass)}>Facebook</Typography>
              </FacebookShareButton>
            </ListItem>
          )
        case 'Twitter':
          return (
            <ListItem className={classes.shareListItem}>
              <TwitterShareButton className={classNames(classes.twitterShareButton, classes.shareButton, labelDirectionClass)} url={shareURL} title={message}>
                <TwitterIcon className={classes.shareIcon} fontSize={iconSize} />
                <Typography className={classNames(classes.shareLabel, textClass)}>Twitter</Typography>
              </TwitterShareButton>
            </ListItem>
          )
        case 'LinkedIn':
          return (
            <ListItem className={classes.shareListItem}>
              <LinkedinShareButton className={classNames(classes.linkedInShareButton, classes.shareButton, labelDirectionClass)} url={shareURL} title={message}>
                <LinkedInIcon className={classes.shareIcon} fontSize={iconSize} />
                <Typography className={classNames(classes.shareLabel, textClass)}>LinkedIn</Typography>
              </LinkedinShareButton>
            </ListItem>
          )
        case 'Email':
          return (
            <ListItem className={classes.shareListItem}>
              <Tooltip title={('hideLabels' in props) ? 'Send the share link by email' : ''} placement='bottom' >
                <div>
                  <EmailShareButton className={classNames(classes.emailShareButton, classes.shareButton)} url={shareURL} title={message}>
                    <EmailIcon className={classes.shareIcon} fontSize={iconSize} />
                    <Typography className={classNames(classes.shareLabel, textClass)}>Email</Typography>
                  </EmailShareButton>
                </div>
              </Tooltip>
            </ListItem>
          )
        case 'CopyURL':
          return (
            <ListItem className={classes.shareListItem}>
              <Tooltip title={('hideLabels' in props) ? 'Copy the share link to the clipboard' : ''} placement='bottom' >
              <CopyToClipboard className={classes.clipboardShareOuter} text={shareURL} onCopy={onCopy}>
                <div class={classNames(classes.copyURLShareButton, classes.shareButton)} >
                  <LinkIcon className={classes.shareIcon} fontSize={iconSize} />
                  <Typography className={classNames(classes.shareLabel, textClass)}>Copy URL</Typography>
                </div>
              </CopyToClipboard>
              </Tooltip>
            </ListItem>
          )
        default:
          return ''
      }
    })}
    </List>
  )
}

