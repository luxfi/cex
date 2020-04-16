import React from 'react'
import classNames from 'classnames'

import {
  Box,
  Button,
  InputBase,
  Paper,
  Typography,
} from "@material-ui/core"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClipboard } from "@fortawesome/free-solid-svg-icons"
import { CopyToClipboard } from 'react-copy-to-clipboard'

import { ShareButtons } from '../../app'

export default (props) => {

  const { 
    rewardsURL, 
    rewardsShareMessage, 
    onCopy,
    classes 
  } = props

  return (
    <Paper className={classNames(classes.paper, classes.leftAlignedPaper)}>
      <Typography className={classes.totalTitle}>Refer a friend to ESX</Typography>
      <Box className={classes.urlCopyOuter}>
        <InputBase value={rewardsURL} className={classes.urlField} readOnly />
        <CopyToClipboard text={rewardsURL} onCopy={onCopy}>
          <Button id='copyButton' variant="outlined"><FontAwesomeIcon className={classes.clipboardIcon} icon={faClipboard} />&nbsp;Copy</Button>
        </CopyToClipboard>
      </Box>
      <ShareButtons 
        show={['Facebook', 'Twitter', 'LinkedIn', 'Email']}
        shareURL={rewardsURL} 
        message={rewardsShareMessage}
        iconSize='large'
        orientation='horizantal'
        hideLabels
      />
    </Paper>
  )
}
