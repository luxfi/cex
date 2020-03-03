import React from 'react'
import { Container } from "@material-ui/core"

import { TicketingView } from '../components/ticketing/TicketingView'

class Ticketing extends React.Component {
  render() {
    return (
      <Container component="main" maxWidth="lg">
        <TicketingView />
      </Container>
    )
  }
}

export default Ticketing
