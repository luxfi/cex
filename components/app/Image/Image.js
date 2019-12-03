import React, { useState, useEffect } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import common from '@material-ui/core/colors/common'
import grey from '@material-ui/core/colors/grey'
import BrokenImage from '@material-ui/icons/BrokenImage'

/**
 * It will fade in like the material image loading pattern suggests.
 * @see [Image loading patterns](https://material.io/guidelines/patterns/loading-images.html)
 */
const Image = ({
  animationDuration = 3000,
  aspectRatio = 1,
  color = common.black,
  disableError = false,
  disableSpinner = false,
  disableTransition = false,
  // errorIcon = (
  //   <BrokenImage style={{ width: 48, height: 48, color: grey[300] }} />
  // ),
  // loading = <CircularProgress size={48} />,
  ...props
}) => {
  const errorIcon = (
    <BrokenImage style={{ width: 48, height: 48, color: grey[300] }} />
  )
  const loading = <CircularProgress size={48} />
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  useEffect(() => {
    setImageError(false)
    setImageLoaded(false)
  }, [props.src])

  const getStyles = () => {
    const { imageStyle, style } = props

    const imageTransition = !disableTransition && {
      opacity: imageLoaded ? 1 : 0,
      filterBrightness: imageLoaded ? 100 : 0,
      filterSaturate: imageLoaded ? 100 : 20,
      transition: `
        filterBrightness ${animationDuration *
          0.75}ms cubic-bezier(0.4, 0.0, 0.2, 1),
        filterSaturate ${animationDuration}ms cubic-bezier(0.4, 0.0, 0.2, 1),
        opacity ${animationDuration / 2}ms cubic-bezier(0.4, 0.0, 0.2, 1)`,
    }

    const styles = {
      root: {
        backgroundColor: color,
        // paddingTop: `calc(1 / ${aspectRatio} * 100%)`,
        // position: 'relative',
        ...style,
      },
      image: {
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        // position: 'absolute',
        ...imageTransition,
        ...imageStyle,
      },
    }

    return styles
  }

  const handleLoadImage = () => {
    setImageLoaded(true)
  }

  const handleImageError = () => {
    if (props.src) {
      setImageError(true)
    }
  }

  const styles = getStyles()

  const { imageStyle, onClick, ...image } = props

  return (
    // <img
    //   src={image.src}
    //   style={styles.image}
    // {...image}
    // style={styles.image}
    // onLoad={handleLoadImage}
    // onError={handleImageError}
    // />
    <div style={styles.root} onClick={onClick}>
      {image.src && (
        <img
          {...image}
          style={styles.image}
          onLoad={handleLoadImage}
          onError={handleImageError}
        />
      )}
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}
      >
        {!disableSpinner && !imageLoaded && !imageError && loading}
        {!disableError && imageError && errorIcon}
      </div>
    </div>
  )
}

export default Image
