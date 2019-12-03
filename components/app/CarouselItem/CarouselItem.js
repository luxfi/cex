import React from 'react'
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
  // TODO: figure out why
  let width = props.width || `calc(100% / ${props.slidesPerRow}`
  return (
    <li
      className={classes.item}
      style={{ width: `${width}`, padding: '0 2px' }}
    >
      {props.children}
    </li>
  )
}

export default CarouselItem
