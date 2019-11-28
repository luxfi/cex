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
  // const onMouseDown = event => {
  //   props.onMouseDown(event, props.index)
  // }

  // const onTouchStart = event => {
  //   props.onTouchStart(event, props.index)
  // }

  const classes = useStyles()
  let width = props.width || `calc(100% / ${5}`
  return (
    <li
      className={classes.item}
      style={{ width: `${width}` }}
      // className={classname('CarouselItem', {
      // 'CarouselItem--clickable': props.clickable,
      // 'CarouselItem--active': props.index === props.currentSlideIndex,
      // })}
      // onMouseDown={onMouseDown}
      // onTouchStart={onTouchStart}
    >
      {props.children}
    </li>
  )
}

export default CarouselItem
