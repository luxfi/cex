import React from "react"
import { inject, observer } from "mobx-react"
import router from "next/router"

// nodejs library that concatenates classes
import classNames from "classnames"

const genres = [
  { title: 'Action', background: "linear-gradient(90deg, #015ce3 0%, #4a90f9 100%)" },
  { title: 'Comedy', background: "linear-gradient(90deg, #02b0d7 0%, #46dbfc 100%)" },
  { title: 'Documentary', background: "linear-gradient(90deg, #26c3ac 0%, #69e6c8 100%)" },
  { title: 'Drama', background: "linear-gradient(90deg, #6bc959 0%, #80f09b 100%)" },
  { title: 'Romance', background: "linear-gradient(90deg, #e77718 0%, #ffaa61 100%)" },
  { title: 'Sci-Fi', background: "linear-gradient(90deg, #e01717 0%, #fe7070 100%)" },
  { title: 'Thriller', background: "linear-gradient(90deg,  #8c3b9e 0%, #cf5bea 100%)" },
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
      <div id="trailer-slider" style={{ padding: "48px 0px"}} >
        <Typography variant="h5" style={{ marginLeft: "56px" }} gutterBottom>
          <Box fontWeight={100} fontSize={20}>
            BROWSE BY CATEGORY
          </Box>
        </Typography>
        <br />
        <div className="container" style={{
          display: "flex",
        }}>
          <Slider>
            {genres.map((genre, i) => (
                <Slider.CategoryItem
                  genre={genre}
                  key={genre.title}
                  onClick={genre => router.push(`/browse?facet=genres&value=${genre.title}`)}
                />
            ))}
          </Slider>
        </div>
      </div >
    )
  }
}
