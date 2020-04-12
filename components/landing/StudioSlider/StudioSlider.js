import React from "react"
import { inject, observer } from "mobx-react"
import router from "next/router"

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

const studios = 
[
  {
    name: 'Disney',
    img: '/static/images/studio/Disney.png',
  },
  {
    name: 'Fox',
    img: '/static/images/studio/Fox.png',
  },
  {
    name: 'Lionsgate',
    img: '/static/images/studio/Lionsgate.png',
  },
  {
    name: 'Netflix',
    img: '/static/images/studio/Netflix.png',
  },
  {
    name: 'Paramount',
    img: '/static/images/studio/Paramount.png',
  },
  {
    name: 'STX',
    img: '/static/images/studio/STX.png',
  },
  {
    name: 'Universal',
    img: '/static/images/studio/Universal.jpg',
  },
  {
    name: 'Amazon',
    img: '/static/images/studio/Amazon.jpg',
  },
]

// @material-ui/core components
import {
  Typography,
  Box,
} from "@material-ui/core"

// core components
import Slider from '../ESXSlider'

@inject("store")
@observer
export default class extends React.Component {
  render() {
    const { store } = this.props
    return (
      <div id="studio-slider" style={{ padding: "48px 0px" }} >
        <Typography variant="h5" style={{ marginLeft: "56px" }} gutterBottom>
          <Box fontWeight={100} fontSize={20}>
            BROWSE BY STUDIO
          </Box>
        </Typography>
        <br />
        <div className="container" style={{
          display: "flex",
        }}>
          <Slider>
            {studios.map((studio, i) => (
              <Slider.StudioItem 
                studio={studio} 
                key={studio.name}
                onClick={studio => router.push(`/browse?facet=distributors&value=${studio.name}`)}
              />
            ))}
          </Slider>
        </div>
      </div >
    )
  }
}
