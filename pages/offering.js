import React, { Component, useRef } from 'react'
import { inject, observer } from 'mobx-react'
import { Box } from '@material-ui/core'
import {
  OfferingHeader,
  OfferingNavBar,
  OfferingContent,
} from '../components/offering'
import { googlePageView, slugFromPath } from '../util'
import { withRouter } from 'next/router'

const OfferingBody = ({
  funds,
  movie,
  setErrorMessage,
  setSuccessMessage,
  addOfferingInvestment,
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
    const slug  = router.query.slug || slugFromPath()
    const movie = movieStore.getMovieBySlug(slug)
    const { loggedIn } = userStore
    // const checkIfLoggedIn = () => {
    //   if (!loggedIn) {
    //     router.push('/login')
    //     document.body.scrollTop = 0 // For Safari
    //     document.documentElement.scrollTop = 0
    //     return false
    //   }
    //   return true
    // }

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
      <Box
        m={3}
        mt={8}
        mb={20}
        style={{
          overflowX: 'unset',
        }}
      >
        <OfferingHeader
          funds={accountBalance}
          movie={movie}
          setErrorMessage={setErrorMessage}
          setSuccessMessage={setSuccessMessage}
          addOfferingInvestment={addOfferingInvestment}
        />
        <OfferingBody
          funds={accountBalance}
          movie={movie}
          setErrorMessage={setErrorMessage}
          setSuccessMessage={setSuccessMessage}
          addOfferingInvestment={addOfferingInvestment}
        />
      </Box>
    )
  }
}

export default withRouter(Offering)
