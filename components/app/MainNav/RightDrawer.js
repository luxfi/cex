import React from 'react'

import {
  SwipeableDrawer,
} from '@material-ui/core'

import { makeStyles } from '@material-ui/styles'

  // https://material-ui.com/components/drawers/
const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent)

const useStyles = makeStyles(
  ({ breakpoints, transitions, palette, spacing, zIndex, shadows }) => ({
    root: {},
    heightAdjustment: {
      flexShrink: 0,
      transition: transitions.create(),
    },
    container: {
      overflow: 'hidden',
      display: 'flex',
      flexGrow: 1,
      flexDirection: 'column',
      transition: transitions.create(['width'], {
        easing: transitions.easing.sharp,
        duration: transitions.duration.leavingScreen,
      }),
    },
    content: {
      flexGrow: 1,
      overflow: 'auto',
    },
  }),
);

export default (props) => {

  const {
    open,
    setOpen,
    width,
    children,
    className
  } = props

  const classes = useStyles()

  return (
    <SwipeableDrawer 
      disableBackdropTransition={!iOS} 
      disableDiscovery={iOS} 
      className={className}
      open={open}
      onOpen={(ignore) => setOpen(true)}
      onClose={(ignore) => setOpen(false)}
      variant="temporary"
      anchor="right"
    >
      <div className={classes.container} style={{ width: width }}>
        <div className={classes.content}>
          {typeof children === 'function' ? children(ctx) : children}
        </div>
      </div>
    </SwipeableDrawer>
  )
}
