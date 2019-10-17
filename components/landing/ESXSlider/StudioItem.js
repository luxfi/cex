import React from 'react';
import cx from 'classnames';
import SliderContext from './context'
import ShowDetailsButton from './ShowDetailsButton'
import Mark from './Mark'
import './Item.css'
import { Card, CardContent } from "@material-ui/core"
import { TrailerSliderModal } from "../"
const { forwardRef, useRef, useImperativeHandle } = React

const Item = ({ imgSrc, openModal }) => {
  const childRef = useRef()
  const split = imgSrc.split('/')
  const lastElement = split[split.length - 1]
  const name = lastElement.substring(0, lastElement.length - 4).toUpperCase()
  return (
    <SliderContext.Consumer>
      {({ onSelectSlide, currentSlide, elementRef }) => {
        // const isActive = currentSlide && currentSlide.id === movie.id;
        return (
          <div
            ref={elementRef}
            className="item"
            style={{
              flex: "0 0 15%",
              textAlign: "center",
              marginRight: "16px",
              transition: "transform 300ms ease 100ms",
              position: "relative"
            }}
          >
            <Card
              onClick={() => {
                openModal(name)
              }}
              // onClick={() => childRef.current.handleOpen()}
            >
              <CardContent
                style={{
                  display: 'block',
                  position: 'relative',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundImage: `url(${imgSrc})`,
                  maxHeight: '1200px',
                  minHeight: '125px',
                  minWidth: '207px',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
            }}
          >
                {/* <TrailerSliderModal movie={movie} ref={childRef} /> */}
              </CardContent>
            </Card>
          </div>
        );
      }}
    </SliderContext.Consumer>
  )
};

export default Item;
