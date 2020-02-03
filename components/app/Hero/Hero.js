import React from 'react'
import { makeStyles } from '@material-ui/core'
import classNames from 'classnames'

const useStyles = makeStyles(theme => ({
  image: {
    height: '90vh',
    maxHeight: 800,
    minHeight: 600,


      // https://www.w3schools.com/howto/howto_css_hero_image.asp
      // Position and center the image to scale nicely on all screens 
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    position: 'relative',    
  },
  content: {
    width: '100%',
    height: '100%'
  }
}))

export default (props) => {
  const classes = useStyles()

  const elementStyles = {
    backgroundImage: `url(${props.image})`
  }

  if ('styles' in props) {
    Object.assign(elementStyles, props.styles)
  }

  return (
    <div className={classNames(classes.image, props.className)} style={elementStyles}>
      <div className={classes.content}>
        {props.children}
      </div>
    </div>
  )
}