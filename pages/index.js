import React from 'react'
import Page from '../components/Page'
// import ESXLogo from '../assets/images/u1.png'
import u12 from '../assets/images/home/u12.png'
import u9 from '../assets/images/home/image_home_u9.jpg'
import Head from 'next/head'

export default class Counter extends React.Component {
  state = {
    whiteGutter: true
  }

  render() {
    return (
      <div>
        <Head>
          <link href="https://fonts.googleapis.com/css?family=Hind&display=swap" rel="stylesheet" />
        </Head>
        <Page title="Index Page" whiteGutter={true} />
        {/* <button
          style={{position: 'fixed', right: '2em', bottom: '4em'}}
          onClick={() => { this.setState({ whiteGutter: !this.state.whiteGutter }) }}
        >
          Toggle Gutters
        </button>
        <button
          style={{position: 'fixed', right: '2em', bottom: '2em'}}
          onClick={() => { this.setState({ showTmpImage: !this.state.showTmpImage }) }}
        >
          Toggle Image
        </button> */}
      </div >

    )
  }
}
