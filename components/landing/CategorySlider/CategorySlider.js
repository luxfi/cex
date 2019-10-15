import React from "react"
import { inject, observer } from "mobx-react"
import Router from "next/router"

// nodejs library that concatenates classes
import classNames from "classnames"

const studioImages =
['/static/images/category/Action.png',
'/static/images/category/Comedy.png',
'/static/images/category/Documentary.png',
'/static/images/category/Drama.png',
'/static/images/category/Romance.png',
'/static/images/category/Sci-Fi.png',
'/static/images/category/Thriller.png']


// @material-ui/core components
import {
  Typography,
  Box,
} from "@material-ui/core"

// core components
import Slider from '../ESXSlider'

@inject("store")
@observer
export default class TrailerSlider extends React.Component {
  render() {
    const { store } = this.props
    return (
      <div id="trailer-slider" style={{ padding: "48px 0px" }} >
        <Typography variant="h5">
          <Box fontWeight={100} fontSize={20}>
            PICK BY CATEGORY
          </Box>
        </Typography>
        <br />
        <div className="container" style={{
          display: "flex",
        }}>
          <Slider>
            {studioImages.map((imgSrc, i) => {
              return (
                <Slider.StudioItem imgSrc={imgSrc} key={i}>item1</Slider.StudioItem>
              )
            })}
          </Slider>
        </div>
      </div >
    )
  }
}
