import React, { Component, useRef } from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'next/router'

import {
  OfferingHeader,
  OfferingNavBar,
  OfferingContent,
} from '../../components/offering'

import { slugFromPath } from '../../util'

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
@withRouter
@inject('store')
@observer
export default class extends Component {

  componentDidMount() {
    this.props.store.userStore.loadAccountBalance()
  }

  render() {
    const { store, router } = this.props
    const { userStore, movieStore, uiStore } = store
    const { accountBalance } = userStore
    const slug  = router.query.slug || slugFromPath()
    const movie = movieStore.getStockBySlug(slug)

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
      <>
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
      </>
    )
  }
}
