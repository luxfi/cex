import React from 'react'
import { Box } from "@material-ui/core"

import { TicketingView } from '../components/ticketing/TicketingView'

class Ticketing extends React.Component {
  render() {
    return (
      <Box>
        <TicketingView />
      </Box>
    )
  }
}

export default Ticketing
