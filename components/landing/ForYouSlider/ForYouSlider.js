// @material-ui/core components
import {
  Box,
  Typography,
} from '@material-ui/core'

import { inject, observer } from 'mobx-react'
import React from 'react'

// core components
import Slider from '../ESXSlider'

const forYouImages = [
  {
    imgSrc: '/static/images/Buffy.png',
    body: 'Exclusive Sale on Buffy the Vampire Slayer goods for ESX fans!',
    title: 'Buffy',
  },
  {
    imgSrc: '/static/images/EmiliaClarke.png',
    title: 'Emilia Clarke',
    body: 'Vote on the name of GOT sequels to win ESX credits and prizes!',
  },
  {
    imgSrc: '/static/images/StarWarsConceptArt.png',
    body: 'Earn points and get free early Star Wars IX posters for submitting now!',
    title: 'Star Wars Concept Art',
  },
]


@inject('store')
@observer
export default class TrailerSlider extends React.Component {
  render() {
    const { store } = this.props
    return (
      <div id='for-you-slider' style={{ padding: '48px 0px' }} >
        <Typography variant='h5' style={{ marginLeft: '56px' }} gutterBottom>
          <Box fontWeight={100} fontSize={20}>
            PICKS FOR YOU
          </Box>
        </Typography>
        <br />
        <div className='container' style={{
          display: 'flex',
        }}>
          <Slider>
            {forYouImages.map((element) => (
              <Slider.ForYouItem
                element={element}
                key={element.title}
                openModal={(title, body) => (
                  store.uiStore.openModal(title, body)
                )}
              >
                item1
              </Slider.ForYouItem>
            ))}
          </Slider>
        </div>
      </div >
    )
  }
}
