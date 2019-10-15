import React from 'react';
import cx from 'classnames';
import SliderContext from './context'
import ShowDetailsButton from './ShowDetailsButton'
import Mark from './Mark'
import './Item.css'
import { Card, CardContent } from "@material-ui/core"

const Item = ({ movie }) => (
  <SliderContext.Consumer>
    {({ onSelectSlide, currentSlide, elementRef }) => {
      const isActive = currentSlide && currentSlide.id === movie.id;

      return (
        // <div
        //   ref={elementRef}
        //   className={cx('item', {
        //     'item--open': isActive,
        //   })}
        // >
        //   <img src={movie.image} alt="" />
        //   <ShowDetailsButton onClick={() => onSelectSlide(movie)} />
        //   {isActive && <Mark />}
        // </div>
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
            onClick={() => {
              Router.push(`/film/${movie.movieSlug}`)
            }}
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
            </CardContent>
          </Card>
        </div>
      );
    }}
  </SliderContext.Consumer>
);

export default Item;
