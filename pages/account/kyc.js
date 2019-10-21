// TODO Delete/update
// This needs to become "Settings" rather than "Account"
// Most of this info is visible in the "Portfolio" now

import React from "react"
import Container from "@material-ui/core/Container"
import Link from "@material-ui/core/Link"

import { KYCForm } from "../../components/account"

class KYC extends React.Component {
  render() {
    return (
      <main className="account" id="account-index">
        <Container maxWidth="md">
          <KYCForm />
        </Container>
      </main>
    )
  }
}

export default KYC
