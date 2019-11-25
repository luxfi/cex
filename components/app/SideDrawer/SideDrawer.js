import React from 'react'

import {
  SwipeableDrawer,
} from '@material-ui/core'

import { makeStyles } from '@material-ui/styles'

  // https://material-ui.com/components/drawers/
const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent)

const useStyles = makeStyles(
  ({transitions}) => ({
    drawerOuter: {
      overflow: 'hidden',
      display: 'flex',
      flexGrow: 1,
      flexDirection: 'column',
      transition: transitions.create(['width'], {
        easing: transitions.easing.sharp,
        duration: transitions.duration.leavingScreen,
      }),
    },
    drawerContents: {
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
    anchor,
    children,
    className
  } = props

  const classes = useStyles()

  return (
    <SwipeableDrawer 
      disableBackdropTransition={!iOS} 
      disableDiscovery={iOS} 
      disableSwipeToOpen={true}
      className={className}
      open={open}
      onOpen={(ignore) => setOpen(true)}
      onClose={(ignore) => setOpen(false)}
      variant="temporary"
      anchor={anchor}
    >
      <div className={classes.drawerOuter} style={{ width: width }}>
        <div className={classes.drawerContents} >
          {typeof children === 'function' ? children(ctx) : children}
        </div>
      </div>
    </SwipeableDrawer>
  )
}
