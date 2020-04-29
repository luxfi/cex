import React from 'react'
import {
  Box,
  Button,
  Grid,
  Typography,
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import Link from 'next/link'
import moment from 'moment'

import { slugFromPath } from '../../../util'

import styles from './ticketing.style'

const MovieVenues = ({ classes, movieVenues }) => {
  const urlParams = new URLSearchParams(window.location.search)
  const refHash = urlParams.get('ref')
  const slug = slugFromPath()

  return (
    <>
      {
        movieVenues.length
          ? movieVenues.map((selectedVenue) => (
            <Box key={selectedVenue.venue.id} className={classes.movieVenue}>
              <Box display='flex' className={classes.panelBody} alignContent='flex-start'>
                <Box className={classes.movieVenueIconContainer}>
                  <img
                    className={classes.movieVenueIcon}
                    src={selectedVenue.venue.logoIcon}
                    alt='Logo'
                  />
                </Box>
                <Box className={classes.movieVenueContainer}>
                  <Typography variant='h6' className={classes.movieVenueTitleLink}>
                    {selectedVenue.venue.name}
                  </Typography>
                  <Box className={classes.venueName} component='span'>{
                    `${selectedVenue.venue.address.line}, 
                    ${selectedVenue.venue.address.city}, 
                    ${selectedVenue.venue.address.state}`
                    }</Box>
                </Box>
              </Box>
              <Box className={classes.showtimeSchedules}>
                <Box className={classes.formatContainer}><Typography variant='h5' className={classes.showtimeTitle}>STANDARD FORMAT</Typography></Box>
                <Grid container component='ul' alignContent='space-between' alignItems='center'>
                  {
                    selectedVenue.showtimeDetails.length
                      ? selectedVenue.showtimeDetails.map((showtimeDetail) => {
                        const refString = (refHash && refHash.length) ? `&ref=${refHash}` : ''
                        return (
                          <li key={showtimeDetail.showtimeId}>
                            <Link href='/checkout' as={`/checkout/${slug}?venueId=${selectedVenue.venue.id}&showtimeId=${showtimeDetail.showtimeId}${refString}`}>
                              <Button className={classes.btnShowtime}>{moment(showtimeDetail.localShowtimeStart).format('hh:mm A')}</Button>
                            </Link>
                          </li>
                      )})
                      : null
                  }
                </Grid>
              </Box>
            </Box>
          ))
        : (<Box className={classes.notFoundSection}>
            Hmm... we couldn&apos;t find any showtimes for this date and location.
          </Box>)
      }

    </>
  )
}

export default withStyles(styles)(MovieVenues)
