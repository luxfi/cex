import React from "react"
import { Parallax, Background } from 'react-parallax'

import { makeStyles } from "@material-ui/core/styles"

const strength = 300

const useStyles = makeStyles((theme) => {
  return {
    heroImageContainer: {
      overflow: 'hidden',
      backgroundColor: theme.palette.common.black,
      height: '100%',
      minHeight: props => props.minHeight,
      margin: 0,
      padding: 0,
      border: 0,
      display: 'flex',
      alignItems: 'center',
      '& .react-parallax': {
        height: '100%',
        width: '100%',
      },
      '& .react-parallax-content': {
        height: '100%',
      },
    },
    heroImage: {
      backgroundColor: '#000',
      '& img': {
        minHeight: props => props.minHeight,
        maxHeight: props => props.maxHeight,
        height: `calc(100%)`,
        width: 'auto !important',
      }
    },
    heroImageContent: {
      width: '100%',
      height: '100%',
    },
  }
})

export default props => {
  const { children, img } = props

  const classes = useStyles(props)

  return (
    <>
      <div className={classes.heroImageContainer}>
        <Parallax>
          <Background>
            <div className={classes.heroImage}>
              { img }
            </div>
          </Background>
          <div className={classes.heroImageContent}>
            {children}
          </div>
        </Parallax>
      </div>
      <style jsx>{`
      `}</style>
    </>
  )
}
