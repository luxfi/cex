import React, { useRef } from 'react'

import SliderContext from './context'
import s from './Item.module.css'
import { Card, CardContent } from "@material-ui/core"

export default ({ studio, onClick }) => {

  const split = studio.img.split('/')
  const lastElement = split[split.length - 1]
  const name = lastElement.substring(0, lastElement.length - 4).toUpperCase()
  
  return (
    <SliderContext.Consumer>
      {({ onSelectSlide, currentSlide, elementRef }) => {
        // const isActive = currentSlide && currentSlide.id === movie.id;
        return (
          <div
            ref={elementRef}
            className={s.item}
            style={{
              flex: "0 0 15%",
              textAlign: "center",
              marginRight: "16px",
              transition: "transform 300ms ease 100ms",
              position: "relative"
            }}
          >
            <Card onClick={() => onClick(studio)}>
              <CardContent
                style={{
                  display: 'block',
                  position: 'relative',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundImage: `url(${studio.img})`,
                  maxHeight: '1200px',
                  minHeight: '125px',
                  minWidth: '207px',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
            </Card>
          </div>
        );
      }}
    </SliderContext.Consumer>
  )
}
