import React from 'react'
import PropTypes from 'prop-types'

import {
  Box,
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
    toggleButton: {
      backgroundColor: palette.grey[50],
      textAlign: 'center',
      borderRadius: 0,
      borderTop: '1px solid',
      borderColor: 'rgba(0,0,0,0.12)',
      [breakpoints.up('sm')]: {
        minHeight: 40,
      },
    },
    closeButton: {
      position: 'absolute',
      bottom: spacing(2),
      zIndex: zIndex.modal + 1,
      background: palette.common.white,
      boxShadow: shadows[2],
      '@media (hover: none)': {
        backgroundColor: palette.grey[300],
      },
      '&:hover': {
        backgroundColor: '#e5e5e5',
      },
    },
  }),
);

const MobileRightMenu = ({
  opened,
  setOpened,
  width,
  children,
  className,
  //...props
}) => {
  const height = "100vh"
  const classes = useStyles()

  console.log("OPENED: " + opened)

  return (
    <SwipeableDrawer 
        disableBackdropTransition={!iOS} 
        disableDiscovery={iOS} 
        className={`${className} ${classes.root}`}
        open={opened}
        onClose={() => setOpened(false)}
        anchor="right"
      >
        <div className={classes.container} style={{ width: width }}>
          <Box className={classes.heightAdjustment} height={`${height}px`} />
          <div className={classes.content}>
            {typeof children === 'function' ? children(ctx) : children}
          </div>
        </div>
    </SwipeableDrawer>
  )
}

export default MobileRightMenu
