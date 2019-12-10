import React, { Component, useRef } from 'react'
import { inject, observer } from 'mobx-react'
import { Box } from '@material-ui/core'
import {
  OfferingHeader,
  OfferingNavBar,
  OfferingContent,
} from '../components/offering'
import { googlePageView } from '../util/generic'
import { withRouter } from 'next/router'

const OfferingBody = ({
  funds,
  movie,
  setErrorMessage,
  setSuccessMessage,
  addOfferingInvestment,
  checkIfLoggedIn,
}) => {
  const summaryRef = useRef(null)
  const dealTermsRef = useRef(null)
  const documentsRef = useRef(null)
  const teamRef = useRef(null)
  const newsRef = useRef(null)
  const risksDisclosuresRef = useRef(null)
  const updatesDiscussionsRef = useRef(null)
  const refs = {
    summaryRef,
    dealTermsRef,
    documentsRef,
    teamRef,
    newsRef,
    risksDisclosuresRef,
    updatesDiscussionsRef,
  }
  return (
    <>
      <OfferingNavBar {...refs} />
      <OfferingContent
        funds={funds}
        movie={movie}
        setErrorMessage={setErrorMessage}
        setSuccessMessage={setSuccessMessage}
        addOfferingInvestment={addOfferingInvestment}
        checkIfLoggedIn={checkIfLoggedIn}
        {...refs}
      />
    </>
  )
}

@inject('store')
@observer
class Offering extends Component {
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
      <Box m={3} mt={8} mb={20}>
        <OfferingHeader
          funds={accountBalance}
          movie={movie}
          setErrorMessage={setErrorMessage}
          setSuccessMessage={setSuccessMessage}
          addOfferingInvestment={addOfferingInvestment}
          checkIfLoggedIn={checkIfLoggedIn}
        />
        <OfferingBody
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

export default withRouter(Offering)
