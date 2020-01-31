import React from 'react';
import cx from 'classnames';
import SliderContext from './context'
import ShowDetailsButton from './ShowDetailsButton'
import Mark from './Mark'
import './Item.css'
import { Card, CardContent, Typography, Box, Grid } from "@material-ui/core"
import IconArrowDown from '../Icons/IconArrowDown'
import { TrailerSliderModal } from ".."
const { useRef } = React

const Item = ({ genre, onClick }) => {
  const childRef = useRef()

  return (
    <SliderContext.Consumer>
      {({ onSelectSlide, currentSlide, elementRef}) => {
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
            <Card onClick={() => onClick(genre)} >
              <CardContent
                style={{
                  display: 'flex',
                  position: 'relative',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: `${genre.background}`,
                  maxHeight: '1200px',
                  minHeight: '125px',
                  minWidth: '207px',
                  flexDirection: "column",
                  paddingTop: "39px"
                }}
              >
                <Typography variant="h5">
                  <Box fontWeight={100} fontSize={20}>
                      {genre.title}
                  </Box>
                </Typography>
                <Grid item style={{width: "10%"}}>
                  <IconArrowDown />
                </Grid>
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
