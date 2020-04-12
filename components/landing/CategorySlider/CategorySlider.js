import React from "react"
import router from "next/router"

import { Box, Typography } from "@material-ui/core"

import Slider from '../ESXSlider'

const GENRES = [
  { title: 'Action', background: "linear-gradient(90deg, #015ce3 0%, #4a90f9 100%)" },
  { title: 'Comedy', background: "linear-gradient(90deg, #02b0d7 0%, #46dbfc 100%)" },
  { title: 'Documentary', background: "linear-gradient(90deg, #26c3ac 0%, #69e6c8 100%)" },
  { title: 'Drama', background: "linear-gradient(90deg, #6bc959 0%, #80f09b 100%)" },
  { title: 'Romance', background: "linear-gradient(90deg, #e77718 0%, #ffaa61 100%)" },
  { title: 'Sci-Fi', background: "linear-gradient(90deg, #e01717 0%, #fe7070 100%)" },
  { title: 'Thriller', background: "linear-gradient(90deg,  #8c3b9e 0%, #cf5bea 100%)" },
]

export default (props) => (
  <div id="category-slider" style={{marginTop: '24px'}} >
    <Typography variant="h5" gutterBottom>
      <Box fontWeight={100} fontSize={20}>
        BROWSE BY CATEGORY
      </Box>
    </Typography>
    <div className="container" style={{display: "flex",}}>
      <Slider>
      {GENRES.map((genre, i) => (
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
