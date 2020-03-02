import { inject, observer } from 'mobx-react'
import React from 'react'

import LoginView from '../components/login/LoginView'
import { googlePageView } from '../util'

@inject('store')
@observer
class Login extends React.Component {
  componentDidMount() {
    googlePageView()
  }

  render() {
    return (
      <LoginView />
    )
  }
}

export default Login
