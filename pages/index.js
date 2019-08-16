import React from 'react'
import Page from '../components/Page'
import ESXLogo from '../assets/images/u1.png'

export default class Counter extends React.Component {
  render() {
    return (
      <div>
        <Page title="Index Page" linkTo="/other" />
        <img src={ESXLogo} alt="ESX LOOG" width='300' />
      </div>
    )
  }
}
