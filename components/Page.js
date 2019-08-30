import React from 'react'
import Link from 'next/link'
import { inject, observer } from 'mobx-react'
import TickerStrip from './TickerStrip'
import Hero from './Hero'
import PageRow from './PageRow'
import Slider from './Slider'
import Footer from './Footer'
import Chart from './Chart'
import PartnerGrid from './PartnerGrid'
import SecuredByGrid from './SecuredByGrid'
import WhatPanel from './WhatPanel'
import HowToTradePanel from './HowToTradePanel'
import PopularGenres from './PopularGenres'
import StartCTA from './StartTrading'

// import Clock from './Clock'

@inject('store')
@observer
class Page extends React.Component {

  render() {
    // console.log('Page.js', this.props.store)
    return (
      <div>
        <TickerStrip movieStore={this.props.store} />
        <Hero />
        <PageRow whiteGutter={this.props.whiteGutter} rowTitle={"Trending Now"} hideInnerPadding>
          <Slider movieStore={this.props.store} />
        </PageRow>
        <PageRow whiteGutter={this.props.whiteGutter} rowTitle={"Top Gainers"}>
          <Chart topMovies={this.props.store.topMovies} />
        </PageRow>
        <PageRow whiteGutter={this.props.whiteGutter} rowTitle={"Popular Genres"}>
          <PopularGenres/>
        </PageRow>
        <StartCTA />
        <PageRow whiteGutter={this.props.whiteGutter} rowTitle={"What is ESX?"}>
          <WhatPanel/>
        </PageRow>
        <StartCTA />
        <PageRow whiteGutter={this.props.whiteGutter} rowTitle={"How To Trade"}>
          <HowToTradePanel/>
        </PageRow>
        <StartCTA />
        <PageRow whiteGutter={this.props.whiteGutter} rowTitle={"Our Partners"}>
          <PartnerGrid/>
        </PageRow>
        <PageRow whiteGutter={this.props.whiteGutter} rowTitle={"Secured By"}>
          <SecuredByGrid/>
        </PageRow>

        <Footer />
      </div >
    )
  }
}

export default Page
