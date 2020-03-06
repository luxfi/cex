import { Box } from '@material-ui/core'
import Tooltip from '@material-ui/core/Tooltip'
import TheatersIcon from '@material-ui/icons/Theaters'

import GoogleMapReact from 'google-map-react'
import React from 'react'

import { GOOGLE_API_KEY } from './config'

const markerStyle = {
  borderRadius: '100%',
  background: '#000',
  width: '40px',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

const Marker = ({ text }) => (
  <Box style={markerStyle}>
    <Tooltip title={text} style={{ fontSize: 10 }}>
      <TheatersIcon style={{ color: '#fac54c' }} />
    </Tooltip>
  </Box>
)

const Map = ({
  center,
  zoom,
  lat,
  long,
  text,
  height,
  width,
}) => {
  const defaultCenter = {
    center: {
      lat,
      lng: long,
    },
    zoom: 11,
  }

  return (
    <div style={{ height: height || '100vh', width: width || '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: GOOGLE_API_KEY }}
        defaultCenter={center || defaultCenter.center}
        defaultZoom={zoom || defaultCenter.zoom}
      >
        <Marker
          lat={lat}
          lng={long}
          text={text || 'Here'}
          layerTypes={['TrafficLayer', 'TransitLayer']}
          yesIWantToUseGoogleMapApiInternals
        />
      </GoogleMapReact>
    </div>
  )
}

export default Map
