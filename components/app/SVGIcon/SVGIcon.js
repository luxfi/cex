import React from 'react'
import ErrorIcon from '@material-ui/icons/Error'

import MovieTicket from './movie-ticket.svg'

export default ({ icon, ...restProps }) => {
  if (icon === 'movieTicket') {
    return (
      <MovieTicket {...restProps} />
    )
  }
  return <ErrorIcon fontSize='small' {...restProps} />
}
