import { useState, useEffect } from 'react'
import { Grid, Typography, Box } from '@material-ui/core'
import Router from 'next/router'

const OtherFilmsTrading = ({ movies }) => {
  const selectedMovies = movies.slice(0, 5)
  return (
    <Box mt={6} mb={6.5}>
      <Typography component="div" variant="subtitle2" gutterBottom>
        <Box fontWeight="fontWeightBold" mb={4.5}>
          OTHER FILMS TRADING
        </Box>
      </Typography>
      <Grid container justify="flex-start" spacing={1}>
        {selectedMovies.map((movie, i) => {
          return (
            <Grid key={i} item xs>
              <Typography component="div">
                <Box
                  fontWeight="fontWeightBold"
                  onClick={() => {
                    Router.push(`/trade/${movie.movieSlug}`)
                  }}
                >
                  <img src={`/images/film/${movie.posterImg}`} width="100%" />
                </Box>
              </Typography>
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}

export default OtherFilmsTrading
