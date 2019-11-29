import React from "react"
import { inject, observer } from "mobx-react"
import Router from "next/router"

// nodejs library that concatenates classes
import classNames from "classnames"

// @material-ui/core components
import Button from "@material-ui/core/Button"
import CardActions from "@material-ui/core/CardActions"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardContent from "@material-ui/core/CardContent"
import Grid from "@material-ui/core/Grid"

// @material-ui styles

// @material-ui/icons
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'

// core components
import ContentLoader from "react-content-loader"
import Slider from '../ESXSlider'

@inject("store")
@observer
export default class TrailerSlider extends React.Component {
  render() {
    const { store } = this.props
    const { movies } = store.movieStore
    return (
      <div id="trailer-slider">
        <Typography variant="h5" style={{ marginLeft: "56px" }} gutterBottom>
          <Box fontWeight={100} fontSize={20}>
            NEWEST TRAILERS
          </Box>
        </Typography>
        <br />
        <div className="container" style={{
          display: "flex",
          // padding: "0 55px"
        }}>
          <Slider>
          {movies.map((movie, i) => {
            return (
              <Slider.Item movie={movie} key={i}>item1</Slider.Item>
            )
          })}
          </Slider>
        </div>
        <style jsx>{`
          // #newest-picks :global(.MuiCard-root) {
          //   margin-bottom: 32px;
          // }

          .container:hover .item {
            transform: translateX(-25%);
          }

          .item:hover ~ .item {
            transform: translateX(25%);
          }

          .item:hover {
            transform: scale(1.5) !important;
          }

          #newest-picks :global(.MuiCardContent-root) {
            padding: 0;
          }

          .pick-text {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            padding: 16px;
            background: rgba(0,0,0,.75);
            color: #FFF;
          }

          .pick-indicator {
            position: absolute;
            top: 16px;
            right: 16px;
            padding: 6px 12px;
            background-color: #FBC43E;
            color: #000;
          }

          .pick-text :global(.MuiButton-outlined) {
            border-color: #FFF;
            color: #FFF;
          }

          .pick {
            max-width: 500px;
            max-height: 1200px;
            min-height: 500px;
            background-size: cover;
          }
        `}</style>
      </div >
    )
  }
}
