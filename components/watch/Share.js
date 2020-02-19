import React, { useEffect, useRef, useState } from 'react'

import { Button } from '@material-ui/core'

import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Grow from '@material-ui/core/Grow'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'

import EmailIcon from '@material-ui/icons/Email'
import FacebookIcon from '@material-ui/icons/Facebook'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import ShareIcon from '@material-ui/icons/Share'
import TwitterIcon from '@material-ui/icons/Twitter';

import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from 'react-share'

const ShareModal = ({ classes, shareUrl, message }) => {
  const [open, setOpen] = useState(false)
  const anchorRef = useRef(null)

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }
    setOpen(false)
  }

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpen(false)
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open)
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus()
    }

    prevOpen.current = open
  }, [open])

  return (
    <div style={{ display: 'inline-block' }}>
      <Button
        ref={anchorRef}
        variant='contained'
        size='small'
        className={classes.shareButton}
        startIcon={<ShareIcon />}
        onClick={handleToggle}
      >
        Share
      </Button>

      <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id='menu-list-grow' onKeyDown={handleListKeyDown}>
                    <MenuItem onClick={handleClose}>
                        <FacebookShareButton url={shareUrl} quote={message}>
                            <FacebookIcon />
                        </FacebookShareButton>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <TwitterShareButton url={shareUrl} quote={message}>
                            <TwitterIcon />
                        </TwitterShareButton>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <LinkedinShareButton url={shareUrl} quote={message}>
                            <LinkedInIcon />
                        </LinkedinShareButton>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <EmailShareButton url={shareUrl} quote={message}>
                            <EmailIcon />
                        </EmailShareButton>
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
    </div>
  )
}

export default ShareModal
