import React from 'react';
import cx from 'classnames';
import SliderContext from './context'
import './Item.css'
import { Card, CardContent } from "@material-ui/core"
import { withStyles } from '@material-ui/core/styles'
const { forwardRef, useRef, useImperativeHandle } = React

const TransparentCard = withStyles({
  root: {
    background: 'none',
  },
})(Card)

const Item = ({ element, openModal }) => {
  const childRef = useRef()
  return (
    <SliderContext.Consumer>
      {({ onSelectSlide, currentSlide, elementRef }) => {
        // const isActive = currentSlide && currentSlide.id === movie.id;
        return (
          <div
            ref={elementRef}
            className="item"
            style={{
              flex: "0 0 30%",
              textAlign: "center",
              marginRight: "56px",
              transition: "transform 300ms ease 100ms",
              position: "relative"
            }}
          >
            <TransparentCard
              onClick={() => {
                openModal(element.title)
              }}
            >
              <CardContent
                style={{
                  display: 'block',
                  position: 'relative',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundImage: `url(${element.imgSrc})`,
                  maxHeight: '1200px',
                  minHeight: '222px',
                  minWidth: '444px',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                
                {/* <TrailerSliderModal movie={movie} ref={childRef} /> */}
              </CardContent>
              <CardContent
                style={{
                  fontSize: "18px",
                  paddingTop:"18px"
                }}
              >
                {element.body}
              </CardContent>
            </TransparentCard>
          </div>
        );
      }}
    </SliderContext.Consumer>
  )
};

export default Item;
