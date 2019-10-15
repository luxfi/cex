import React from 'react';
import cx from 'classnames';
import SliderContext from './context'
import ShowDetailsButton from './ShowDetailsButton'
import Mark from './Mark'
import './Item.css'
import { Card, CardContent } from "@material-ui/core"
import { TrailerSliderModal } from "../"
const { forwardRef, useRef, useImperativeHandle } = React

const Item = ({ movie }) => {
  const childRef = useRef()

  return (
      <SliderContext.Consumer>
        {({ onSelectSlide, currentSlide, elementRef }) => {
          const isActive = currentSlide && currentSlide.id === movie.id;
          return (
            <div
              ref={elementRef}
              className="item"
              style={{
                flex: "0 0 19.7%",
                textAlign: "center",
                marginRight: "16px",
                transition: "transform 300ms ease 100ms",
                position: "relative"
              }}
            >
              <Card
                onClick={() => childRef.current.handleOpen()}
              >

                <CardContent
                  style={{
                    display: 'block',
                    position: 'relative',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundImage: `url(${movie.posterImg})`,
                    maxHeight: '1200px',
                    minHeight: '487px',
                    minWidth: '287px',
                    backgroundSize: 'cover',
                  }}
                >
                  <TrailerSliderModal movie={movie} ref={childRef} />
                </CardContent>
              </Card>
            </div>
          );
        }}
      </SliderContext.Consumer>
  )
};

export default Item;
