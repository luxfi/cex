import { inject, observer } from 'mobx-react'
import React, { useEffect } from 'react'
import { AuthModal } from '../components/app'

export const withOnDemandAuth = (Component) => inject('store')(observer((props) => {
  const {
    store: {
      userStore,
      uiStore,
      uiStore: { authModalOpen, tabIndexValue },
    },
  } = props

  useEffect(() => {
    if (!userStore.loggedIn) {
      uiStore.openAuthModal()
    }
  }, [userStore.loggedIn])

  return (
    <>
      <AuthModal authModalOpen={authModalOpen} tabIndexValue={tabIndexValue} />
      {userStore.loggedIn && <Component />}
    </>
  )
}))

export const noop = () => {}