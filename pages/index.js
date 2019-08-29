import React from 'react'
import Page from '../components/Page'
// import ESXLogo from '../assets/images/u1.png'
import u12 from '../assets/images/home/u12.png'
import u9 from '../assets/images/home/image_home_u9.jpg'
import Head from 'next/head'

export default class Counter extends React.Component {
  state = {
    showTmpImage: false,
    whiteGutter: false
  }

  render() {
    return (
      <div>
        <Head>
          <link href="https://fonts.googleapis.com/css?family=Hind&display=swap" rel="stylesheet" />
        </Head>
        <Page title="Index Page" whiteGutter={this.state.whiteGutter} />
        {
          this.state.showTmpImage && (
            <div id="base">
              {/* background (Dynamic Panel) */}
              <div id="u8" className="ax_default" data-label="background">
                <div id="u8_state0" className="panel_state" data-label="background_img">
                  <div id="u8_state0_content" className="panel_state_content">
                    {/* image_home (Image) */}
                    <div id="u9" className="ax_default image" data-label="image_home" style={{ position: 'absolute', top: '9px', left: '8px', zIndex: -1}}>
                      <img
                        id="u9_img"
                        className="img "
                        src={u9}
                        style={{ width: `1440px` }}
                      />
                      {/* Unnamed () */}
                      <div
                        id="u10"
                        className="text"
                        style={{ display: "none", visibility: "hidden" }}
                      >
                        <p>
                          <span />
                        </p>
                      </div>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
          )
        }
        <button
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
        </button>
      </div >

    )
  }
}
