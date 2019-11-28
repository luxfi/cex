import React from 'react'
import {
  InputBase,
  Paper,
  Button,
  ButtonGroup,
  Typography,
  Box,
} from '@material-ui/core'

import { Carousel } from '../../app'

export default function MediaSlider() {
  return (
    <Carousel slidesPerRow={5}>
      <img src="https://placekitten.com/172/110" />
      <img src="https://placekitten.com/172/110" />
      <img src="https://placekitten.com/172/110" />
      <img src="https://placekitten.com/172/110" />
      <img src="https://placekitten.com/172/110" />
      <img src="https://placekitten.com/172/110" />
      <img src="https://placekitten.com/172/110" />
      <img src="https://placekitten.com/172/110" />
      <img src="https://placekitten.com/172/110" />
      <img src="https://placekitten.com/172/110" />
      <img src="https://placekitten.com/172/110" />
      <img src="https://placekitten.com/172/110" />
    </Carousel>
  )
}
