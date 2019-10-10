// TODO Delete/update
// This needs to become "Settings" rather than "Account"
// Most of this info is visible in the "Portfolio" now

import React from "react"
import Container from "@material-ui/core/Container"
import Link from "../../components/Link"

class Account extends React.Component {
  render() {
    return (
      <main className="account" id="account-index">
        <Container maxWidth="md">
          <h1>{`Hello USER`}</h1>
          <Link href="/account/kyc">
            Check your identify verification status
          </Link>
          <br />
          <h3>PORTFOLIO BALANCE</h3>
          <h2>$0.00</h2>
        </Container>
      </main>
    )
  }
}

export default Account
