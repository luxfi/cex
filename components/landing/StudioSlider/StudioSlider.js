import React from "react"
import { inject, observer } from "mobx-react"
import Router from "next/router"

// nodejs library that concatenates classes
import classNames from "classnames"

// @material-ui/core components
import {
  Button,
  CardActions,
  Typography,
  Box,
  Card,
  CardActionArea,
  CardContent, 
  Grid
} from "@material-ui/core/CardContent"

// core components
import Slider from '../ESXSlider'

@inject("store")
@observer
export default class TrailerSlider extends React.Component {
  render() {
    const { store } = this.props
    const { movies } = store.movieStore
    return (
      <div id="trailer-slider" style={{ padding: "48px 0px" }} >
        <Typography variant="h5">
          <Box fontWeight={100} fontSize={20}>
            PICK BY STUDIO
          </Box>
        </Typography>
        <br />
        <div className="container" style={{
          display: "flex",
        }}>
          <Slider>
            {movies.map((movie, i) => {
              return (
                <Slider.Item movie={movie} key={i}>item1</Slider.Item>
              )
            })}
          </Slider>
        </div>
      </div >
    )
  }
}
