import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Box } from '@material-ui/core'
import { OfferingHeader } from '../'
import { googlePageView } from '../../../util/generic'
import { withRouter } from 'next/router'

@inject('store')
@observer
class OfferingView extends Component {
  componentDidMount() {
    googlePageView()
    this.props.store.userStore.loadAccountBalance()
  }

  render() {
    const { store, router } = this.props
    const { userStore, movieStore, uiStore } = store
    const { accountBalance } = userStore
    const { slug } = router.query
    const movie = movieStore.getMovieBySlug(slug)
    const { loggedIn } = userStore
    const checkIfLoggedIn = () => {
      if (!loggedIn) {
        return router.push('/login')
      }
    }

    const setErrorMessage = message => {
      uiStore.setErrorMessage(message)
    }
    const setSuccessMessage = message => {
      uiStore.setSuccessMessage(message)
    }
    const addOfferingInvestment = (amount, onSuccess, onError) => {
      userStore.addOfferingInvestment(amount, slug, onSuccess, onError)
    }

    return (
      <Box m={3} mt={8}>
        <OfferingHeader
          funds={accountBalance}
          movie={movie}
          setErrorMessage={setErrorMessage}
          setSuccessMessage={setSuccessMessage}
          addOfferingInvestment={addOfferingInvestment}
          checkIfLoggedIn={checkIfLoggedIn}
        />
      </Box>
    )
  }
}

export default withRouter(OfferingView)
