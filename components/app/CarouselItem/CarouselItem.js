import React, { useEffect, useState } from 'react'
import classname from 'classnames'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  item: {
    display: 'inline-block',
    whiteSpace: 'normal',
    verticalAlign: 'top',
    transition: '0.5s opacity ease-in',
  },
}))

const CarouselItem = ({ ...props }) => {
  const classes = useStyles()
  return (
    <li
      className={classes.item}
      style={{ width: `${props.width}px`, padding: '0 2px' }}
    >
      {props.children}
    </li>
  )
}

export default CarouselItem
