import React, { useState } from 'react'
import cx from 'classnames'

import IconArrowDown from '../Icons/IconArrowDown'

import SliderContext from './context'
import Content from './Content'
import useSliding from './useSliding'
import useSizeElement from './useSizeElement'
import s from './Slider.module.css'

export default ({ children, activeSlide }) => {
  const [currentSlide, setCurrentSlide] = useState(activeSlide);
  const [noHover, setNoHover] = useState(false);
  const { width, elementRef } = useSizeElement();
  const {
    handlePrev,
    handleNext,
    slideProps,
    containerRef,
    hasNext,
    hasPrev
  } = useSliding(width, React.Children.count(children));

  const handleSelect = movie => {
    setCurrentSlide(movie);
  };

  const handleClose = () => {
    setCurrentSlide(null);
  };

  const contextValue = {
    onSelectSlide: handleSelect,
    onCloseSlide: handleClose,
    elementRef,
    currentSlide,
  };


  // better way would be to listen to transitionend event
  const pauseHover = (cb) => {
    setNoHover(true);
    cb()
    setTimeout(() => {
      // waits for mouse event to prevent stale hover position
      window.addEventListener("mousemove", 
      () => { 
        setNoHover(false) 
        window.removeEventListener("mousemove", {})
      }
      )
    }, 1000);
  }


  let classNames = [s.slider]
  if (currentSlide != null) {
    classNames.push(s.sliderOpen)
  }
  if (noHover) {
    classNames.push(noHover)
  }

  return (
    <SliderContext.Provider value={contextValue}>
      <div className={s.sliderWrapper}>
        <div
          className={cx(classNames)}
        >
          <div ref={containerRef} className={s.sliderContainer} {...slideProps}>{children}</div>
        </div>
        {hasPrev && <SlideButton onClick={() => pauseHover(handlePrev)} type="prev" />}
        {hasNext && <SlideButton onClick={() => pauseHover(handleNext)} type="next" />}
      </div>
      {currentSlide && <Content movie={currentSlide} onClose={handleClose} />}
    </SliderContext.Provider>
  )
}

const SlideButton = ({ onClick, type }) => (
  <button className={classNames(s.button, (type === 'prev') ? s.buttonPrev : s.buttonNext)} onClick={onClick}>
    <span><IconArrowDown /></span>
  </button>
)

