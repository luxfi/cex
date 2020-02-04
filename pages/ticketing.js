import React from 'react'
import { Container } from "@material-ui/core"

import { TicketingView } from '../components/ticketing'

class Ticketing extends React.Component {
  render() {
    return (
      <Container component="main" maxWidth="xl">
        <TicketingView />
      </Container>
    )
  }
}

export default Ticketing
