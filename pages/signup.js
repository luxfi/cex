import { inject, observer } from 'mobx-react'
import React from 'react'

import { SignupView } from '../components/app'
import { googlePageView } from '../util'

@inject('store')
@observer
class SignUp extends React.Component {
  componentDidMount() {
    googlePageView()
  }

  render() {
    return (
      <SignupView />
    )
  }
}

export default SignUp
