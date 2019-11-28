import {
  useState,
  useRef,
  useEffect,
  useCallback,
  useLayoutEffect,
} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Fab } from '@material-ui/core'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import { CarouselItem } from '../'
import throttle from 'lodash/throttle'

// CustomHook - https://usehooks.com/useEventListener/
function useEventListener(eventName, handler, element = window) {
  // Create a ref that stores handler
  const savedHandler = useRef()

  // Update ref.current value if handler changes.
  // This allows our effect below to always get latest handler ...
  // ... without us needing to pass it in effect deps array ...
  // ... and potentially cause effect to re-run every render.
  useEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(
    () => {
      // Make sure element supports addEventListener
      // On
      const isSupported = element && element.addEventListener
      if (!isSupported) return

      // Create event listener that calls handler function stored in ref
      const eventListener = event => savedHandler.current(event)

      // Add event listener
      element.addEventListener(eventName, eventListener)

      // Remove event listener on cleanup
      return () => {
        element.removeEventListener(eventName, eventListener)
      }
    },
    [eventName, element], // Re-run if eventName or element changes
  )
}

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    height: '110px',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    position: 'relative',
  },
  prevButton: {
    left: 0,
    '& > *': { transform: 'translateX(-50%)' },
  },
  nextButton: {
    right: 0,
    '& > *': { transform: 'translateX(50%)' },
  },
  sliderButton: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 4,
  },
  sliderWrapper: {
    overflow: 'hidden',
  },
  list: {
    whiteSpace: 'nowrap',
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
}))

export const Carousel = ({ slides, ...props }) => {
  const carouselRef = useRef()
  const listRef = useRef()

  const getChildren = () => {
    if (!props.children) {
      if (slides) {
        return slides
      }
      return []
    }
    if (Array.isArray(props.children)) {
      return props.children
    }
    return [props.children]
  }

  const children = getChildren()

  /**
   * State
   */
  const [transitionEnabled, setTransitionEnabled] = useState(false)
  const [slideIndex, setSlideIndex] = useState(0)
  const [carouselWidth, setCarouselWidth] = useState(0)
  useLayoutEffect(() => {
    if (carouselRef.current) {
      setCarouselWidth(carouselRef.current.offsetWidth)
      setResizedCarousel(carouselRef.current.offsetWidth)
    }
  }, [])
  const [resizedCarousel, setResizedCarousel] = useState(0)
  const throttledWidth = useRef(throttle(width => setCarouselWidth(width), 300))

  useEffect(() => throttledWidth.current(resizedCarousel), [resizedCarousel])
  // const [dragStart, setDragStart] = useState(null)

  /**
   * Handlers and Initial Setup
   */
  // adding listener to remove transition when animation finished
  // Event handler utilizing useCallback ...
  // ... so that reference never changes.
  const transitionHandler = useCallback(() => {
    // remove transition when animation finished
    setTransitionEnabled(false)
  }, [setTransitionEnabled])

  const resizeHandler = useCallback(() => {
    setResizedCarousel(carouselRef.offsetWidth)
  }, [setResizedCarousel])

  // Add event listener using our hook
  useEventListener('transitionend', transitionHandler, listRef)
  useEventListener('resize', resizeHandler, carouselRef)

  /**
   * Default props
   */
  const slidesPerScroll = props.slidesPerScroll || props.slidesPerRow
  const animationSpeed = props.animationSpeed || 500

  /* ========== tools ========== */

  /* ========== control ========== */

  /**
   * Limit number between 0 and last slide index.
   * @param {number} value to be limited
   * @return {number} new value
   */
  const Limit = value => {
    const maxValue = children.length - 1
    if (value > maxValue) {
      return maxValue
    }
    if (value < 0) {
      return 0
    }
    return value
  }
  /**
   * Limit provided value and trigger setSlideIndex
   * @param {number} index desired index to change current index to
   */
  const changeSlide = index => setSlideIndex(Limit(index))
  const nextSlide = () => changeSlide(slideIndex + slidesPerScroll)
  const prevSlide = () => changeSlide(slideIndex - slidesPerScroll)

  /* ========== positioning ========== */
  /**
   * Calculates width of a single slide in a carousel
   * @return {number} width of a slide in px
   */
  const getCarouselElementWidth = () => {
    return carouselWidth / props.slidesPerRow
  }

  /**
   * Calculates offset in pixels to be applied to Track element in order to show current slide correctly (centered or aligned to the left)
   * @return {number} offset in px
   */
  const [transformOffset, setTransformOffest] = useState(0)
  useEffect(() => {
    setTransitionEnabled(true)
    const elementWidthWithOffset = getCarouselElementWidth()
    setTransformOffest(0 - slideIndex * elementWidthWithOffset)
  }, [slideIndex])

  /* ========== rendering ========== */
  const trackStyles = {
    transform: `translateX(${transformOffset}px)`,
    transitionDuration: transitionEnabled
      ? `${animationSpeed}ms, ${animationSpeed}ms`
      : null,
  }

  const classes = useStyles()
  return (
    <div className={classes.container} ref={carouselRef}>
      <div
        className={`${classes.sliderButton} ${classes.prevButton}`}
        onClick={prevSlide}
      >
        <Fab size="small" color="white" aria-label="add">
          <ChevronLeftIcon />
        </Fab>
      </div>
      <div
        className={`${classes.sliderButton} ${classes.nextButton}`}
        onClick={nextSlide}
      >
        <Fab size="small" color="white" aria-label="add">
          <ChevronRightIcon />
        </Fab>
      </div>
      <div className={classes.sliderWrapper}>
        <ul className={classes.list} ref={listRef} style={trackStyles}>
          {children.map((carouselItem, index) => (
            <CarouselItem
              key={index}
              // currentSlideIndex={getActiveSlideIndex()}
              index={index}
              slidesPerRow={props.slidesPerRow}
              // onMouseDown={onMouseDown}
              // onTouchStart={onTouchStart}
            >
              {carouselItem}
            </CarouselItem>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Carousel
