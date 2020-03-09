import React, {
  useEffect,
  useRef,
  useState
} from 'react'

import hashSum from 'hash-sum'

import {
  Button,
  ClickAwayListener,
  Grow,
  Paper,
  Popper
} from '@material-ui/core'

import { Share as ShareIcon } from '@material-ui/icons'


import { ShareButtons } from '../app'

const ShareModal = ({ classes, shareUrl, message, emailToCredit }) => {
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
    if (prevOpen.current && !open) {
      anchorRef.current.focus()
    }

    prevOpen.current = open
  }, [open])


  const referralURL = `${shareUrl}?ref=${hashSum(emailToCredit)}`

  return (
    <div style={{ display: 'inline-block' }}>
      <Button
        ref={anchorRef}
        variant='contained'
        size='small'
        className={classes.shareButton}
        startIcon={<ShareIcon/>}
        onClick={handleToggle}
      >
        Share
      </Button>

      <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition>
      {({ TransitionProps, placement }) => (
        <Grow {...TransitionProps}  style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }} >
          <ClickAwayListener onClickAway={handleClose}>
            <Paper>
              <ShareButtons 
                show={['Facebook', 'Twitter', 'LinkedIn', 'Email']}
                shareURL={referralURL} 
                message={message}
                iconSize='small'
                orientation='vertical'
                onClick={handleClose}
              />
            </Paper>
          </ClickAwayListener>
        </Grow>
      )}
      </Popper>
    </div>
  )
}

export default ShareModal
