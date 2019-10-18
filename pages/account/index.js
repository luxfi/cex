import React from "react"
import { withStyles } from "@material-ui/core"

import {Container, Link} from "@material-ui/core"
import PlaidLink from 'react-plaid-link'

import { CustomLink } from "../../components/app"
import { classExpression } from "babel-types"


import myStyles from "../../pageStyles/account.style.js"

const onPlaidExit = (foo) => {

}

const onPlaidSuccess = (token, metadata) => {

}


class Account extends React.Component {

  render() {
    
    const {classes} = this.props
    return (
      <main className="account" id="account-index">
        <Container maxWidth="md">
          <h1>{`Hello USER`}</h1>
          <PlaidLink 
            className={classes.plaidLink}
            clientName="ESX"
            env="sandbox"
            product={["auth", "transactions"]}
            publicKey="PLAID_PUBLIC_KEY"
            onExit={onPlaidExit}
            onSuccess={onPlaidSuccess}
          >Open an account and connect your bank</PlaidLink>
          <br />
          <h3>PORTFOLIO BALANCE</h3>
          <h2>$0.00</h2>
        </Container>
      </main>
    )
  }
}

export default withStyles(myStyles)(Account)