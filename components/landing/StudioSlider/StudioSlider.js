import React from "react"
import { inject, observer } from "mobx-react"
import Router from "next/router"

// nodejs library that concatenates classes
import classNames from "classnames"

// import Disney from '../../../assets/images/studio/Disney.png'
// import Fox from '../../../assets/images/studio/Fox.png'
// import Lionsgate from '../../../assets/images/studio/Lionsgate.png'
// import Netflix from '../../../assets/images/studio/Netflix.png'
// import Paramount from '../../../assets/images/studio/Paramount.png'
// import STX from '../../../assets/images/studio/STX.png'


// const studioImages =
//   [Disney,
//     Fox,
//     Lionsgate,
//     Netflix,
//     Paramount,
//     STX]

const studioImages = 
['/static/images/studio/Disney.png',
  '/static/images/studio/Fox.png',
  '/static/images/studio/Lionsgate.png',
  '/static/images/studio/Netflix.png',
  '/static/images/studio/Paramount.png',
  '/static/images/studio/STX.png']


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
            PICK BY STUDIO
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
