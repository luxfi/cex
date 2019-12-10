import React, { useEffect, useState } from 'react'
import classname from 'classnames'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  item: {
    display: 'inline-block',
    whiteSpace: 'normal',
    verticalAlign: 'top',
    transition: '0.5s opacity ease-in',
    transition: 'transform 300ms ease 100ms',
    zIndex: 1,
    // '&:hover': {
    //   transform: 'scale(1.2) !important',
    //   zIndex: 10000,
    // },
  },
}))

const CarouselItem = ({ ...props }) => {
  const classes = useStyles()
  return (
    <li
      className={classes.item}
      style={{ width: `calc(100% /${props.slidesPerRow})`, padding: '0 2px' }}
    >
      {props.children}
    </li>
  )
}

export default CarouselItem
