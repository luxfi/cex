import { useState, useRef, useEffect, useCallback } from 'react'
import { Fab } from '@material-ui/core'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import { CarouselItem } from '../'
import { useEventListener } from '../../../util/customHooks'
import useStyles from './Carousel.style'

export const Carousel = ({ animationSpeed = 500, ...props }) => {
  const carouselRef = useRef()
  const listRef = useRef()

  /**
   * Default props
   */
  const slidesPerScroll = props.slidesPerScroll || props.slidesPerRow || 1
  // const clickDragThreshold = props.clickDragThreshold || 10

  const getChildren = () => {
    if (!props.children) {
      if (prop.slides) {
        return prop.slides
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
  const [carouselItemWidth, setCarouselItemWidth] = useState(0)
  const [transformOffset, setTransformOffest] = useState(0)

  /**
   * Handlers
   */

  const transitionHandler = () => {
    // remove transition when animation finished
    setTransitionEnabled(false)
  }

  /**
   * Calculates width of a single slide in a carousel
   * @return {number} width of a slide in px
   */

  useEffect(() => {
    setTransitionEnabled(true)
    console.count('-----------')
    console.log(
      'setCarouselItemWidth(carouselWidth / props.slidesPerRow)',
      carouselWidth / props.slidesPerRow,
    )
    setCarouselItemWidth(carouselWidth / props.slidesPerRow)
  }, [carouselWidth, props.slidesPerRow])

  /**
   * Calculates offset in pixels to be move track when dragging
   */
  useEffect(() => {
    setTransitionEnabled(true)
    const elementWidthWithOffset = carouselItemWidth
    setTransformOffest(0 - slideIndex * elementWidthWithOffset)
  }, [slideIndex])

  // Add event listener using our hook
  useEventListener('transitionend', transitionHandler, listRef.current)
  // Add custom event listener for resizing of carousel width
  useEffect(() => {
    const element = carouselRef.current
    if (!(element instanceof Element)) {
      return
    }

    const observer = new ResizeObserver(entries => {
      if (!Array.isArray(entries)) {
        return
      }
      if (!entries.length) {
        return
      }
      const entry = entries[0]
      const newWidth = entry.target.offsetWidth
      //todo throttle setting of width
      if (carouselWidth !== newWidth) {
        setCarouselWidth(newWidth)
      }
    })

    observer.observe(element)
    return () => observer.unobserve(element)
  }, [carouselRef])

  // useEffect(() => {
  //   console.log('useEffect transformOffset', transformOffset)
  // }, [transformOffset])

  /**
   * Limit number between 0 and last slide index - amount of slides
   * @param {number} index to be limited
   * @return {number} new index
   */
  const Limit = index => {
    const maxIndex = children.length - props.slidesPerRow
    if (index > maxIndex) {
      return maxIndex
    }
    if (index < 0) {
      return 0
    }
    return index
  }
  /**
   * Limit provided index and trigger setSlideIndex
   * @param {number} index desired index to change current index to
   */
  const changeSlide = index => setSlideIndex(Limit(index))
  const nextSlide = () => changeSlide(slideIndex + slidesPerScroll)
  const prevSlide = () => changeSlide(slideIndex - slidesPerScroll)

  const classes = useStyles()
  return (
    <div className={classes.container} ref={carouselRef}>
      <div className={`${classes.sliderButton} ${classes.prevButton}`}>
        <Fab
          size="small"
          className={classes.fab}
          aria-label="add"
          onClick={prevSlide}
        >
          <ChevronLeftIcon />
        </Fab>
      </div>
      <div className={`${classes.sliderButton} ${classes.nextButton}`}>
        <Fab
          size="small"
          className={classes.fab}
          aria-label="add"
          onClick={nextSlide}
        >
          <ChevronRightIcon />
        </Fab>
      </div>
      <div className={classes.sliderWrapper}>
        <ul
          className={classes.list}
          ref={listRef}
          style={{
            width: `${carouselWidth * props.slidesPerRow}px`,
            transform: `translateX(${transformOffset}px)`,
            transitionDuration: `${animationSpeed}ms, ${animationSpeed}ms`,
          }}
        >
          {children.map((carouselItem, index) => (
            <CarouselItem
              key={index}
              currentSlideIndex={slideIndex}
              index={index}
              slidesPerRow={props.slidesPerRow}
              width={carouselItemWidth}
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
