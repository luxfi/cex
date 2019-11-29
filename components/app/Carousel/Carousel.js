import { useState, useRef, useEffect, useCallback } from 'react'
import { Fab } from '@material-ui/core'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import { CarouselItem } from '../'
import { useEventListener } from '../../../util/customHooks'
import useStyles from './Carousel.style'

export const Carousel = ({ slides, ...props }) => {
  const carouselRef = useRef()
  const listRef = useRef()

  /**
   * Default props
   */
  const slidesPerScroll = props.slidesPerScroll || props.slidesPerRow
  const animationSpeed = props.animationSpeed || 500
  // const clickDragThreshold = props.animationSpeed || 10

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
  const [carouselItemWidth, setCarouselItemWidth] = useState(0)
  const [transformOffset, setTransformOffest] = useState(0)
  // const [dragStart, setDragStart] = useState(null)
  // const [dragOffset, setDragOffset] = useState(0)
  // const [clickedIndex, setClickedIndex] = useState(null)

  /**
   * Handlers
   */
  /**
   * Function handling beginning of mouse drag by setting index of clicked item and coordinates of click in the state
   * @param {event} e event
   * @param {number} index of the element drag started on
   */
  // const onMouseDown = (e, index) => {
  //   e.preventDefault()
  //   e.stopPropagation()
  //   const { pageX } = e
  //   setDragStart(pageX)
  //   setClickedIndex(index)
  // }

  /**
   * Function handling mouse move if drag has started. Sets dragOffset in the state.
   * @param {event} e event
   */
  // const onMouseMove = e => {
  //   const { pageX } = e
  //   if (dragStart !== null) {
  //     setDragOffset(pageX - dragStart)
  //   }
  // }

  /**
   * Function handling beginning of touch drag by setting index of touched item and coordinates of touch in the state
   * @param {event} e event
   * @param {number} index of the element drag started on
   */
  // const onTouchStart = (e, index) => {
  //   const { changedTouches } = e
  //   setDragStart(changedTouches[0].pageX)
  //   setClickedIndex(index)
  // }

  /**
   * Function handling touch move if drag has started. Sets dragOffset in the state.
   * @param {event} e event
   */
  // const onTouchMove = e => {
  //   if (Math.abs(dragOffset) > 10) {
  //     e.preventDefault()
  //     e.stopPropagation()
  //   }
  //   const { changedTouches } = e
  //   if (dragStart !== null) {
  //     setDragOffset(changedTouches[0].pageX - dragStart)
  //   }
  // }

  /**
   * Function handling end of touch or mouse drag. If drag was long it changes current slide to the nearest one,
   * if drag was short (or it was just a click) it changes slide to the clicked (or touched) one.
   * It resets clicked index, dragOffset and dragStart values in state.
   * @param {event} e event
   */
  // const onMouseUpTouchEnd = e => {
  //   if (dragStart !== null) {
  //     e.preventDefault()
  //     if (Math.abs(dragOffset) > clickDragThreshold) {
  //       changeSlide(getNearestSlideIndex())
  //     } else {
  //       changeSlide(clickedIndex)
  //     }
  //     setDragStart(null)
  //     setDragOffset(0)
  //     setClickedIndex(null)
  //   }
  // }

  /**
   * Simulates mouse events when touch events occur
   * @param {event} e A touch event
   */
  // const simulateEvent = e => {
  //   const touch = e.changedTouches[0]
  //   const { screenX, screenY, clientX, clientY } = touch
  //   const touchEventMap = {
  //     touchstart: 'mousedown',
  //     touchmove: 'mousemove',
  //     touchend: 'mouseup',
  //   }
  //   const simulatedEvent = new MouseEvent(touchEventMap[e.type], {
  //     bubbles: true,
  //     cancelable: true,
  //     view: window,
  //     detail: 1,
  //     screenX,
  //     screenY,
  //     clientX,
  //     clientY,
  //   })
  //   touch.target.dispatchEvent(simulatedEvent)
  // }

  const transitionHandler = () => {
    // remove transition when animation finished
    setTransitionEnabled(false)
  }

  /* ========== positioning ========== */
  /**
   * Checks what slide index is the nearest to the current position (to calculate the result of dragging the slider)
   * @return {number} index
   */
  // const getNearestSlideIndex = () => {
  //   let slideIndexOffset = 0
  //   if (props.keepDirectionWhenDragging) {
  //     if (dragOffset > 0) {
  //       slideIndexOffset = -Math.ceil(dragOffset / carouselWidth)
  //     } else {
  //       slideIndexOffset = -Math.floor(dragOffset / carouselWidth)
  //     }
  //   } else {
  //     slideIndexOffset = -Math.round(dragOffset / carouselWidth)
  //   }
  //   return slideIndex + slideIndexOffset
  // }

  /**
   * Calculates width of a single slide in a carousel
   * @return {number} width of a slide in px
   */

  useEffect(() => {
    setTransitionEnabled(true)
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
  // adding event listeners for swipe
  // useEventListener('mousemove', onMouseMove, carouselRef.current, true)
  // useEventListener('mouseup', onMouseUpTouchEnd, carouselRef.current, true)
  // useEventListener('touchstart', simulateEvent, carouselRef.current, true)
  // useEventListener('touchmove', simulateEvent, carouselRef.current, {
  //   passive: false,
  // })
  // useEventListener('touchend', simulateEvent, carouselRef.current, true)
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
        <Fab size="small" color="white" aria-label="add" onClick={prevSlide}>
          <ChevronLeftIcon />
        </Fab>
      </div>
      <div className={`${classes.sliderButton} ${classes.nextButton}`}>
        <Fab size="small" color="white" aria-label="add" onClick={nextSlide}>
          <ChevronRightIcon />
        </Fab>
      </div>
      <div className={classes.sliderWrapper}>
        <ul
          className={classes.list}
          ref={listRef}
          style={{
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
