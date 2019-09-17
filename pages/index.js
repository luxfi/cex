import React from 'react'
import { inject, observer } from 'mobx-react'
import TickerStrip from '../components/generic/TickerStrip'
import PageRow from '../components/generic/PageRow'
import Slider from '../components/generic/Slider'
import Footer from '../components/generic/Footer'
import Hero from '../components/landing/Hero'
import Chart from '../components/landing/Chart'
import PartnerGrid from '../components/landing/PartnerGrid'
import SecuredByGrid from '../components/landing/SecuredByGrid'
import WhatPanel from '../components/landing/WhatPanel'
import HowToTradePanel from '../components/landing/HowToTradePanel'
import TrendingNowSliderItem from "../components/landing/TrendingNowSliderItem"
import PopularGenres from '../components/landing/PopularGenres'
import StartCTA from '../components/landing/StartTrading'

@inject('store')
@observer
export default class Index extends React.Component {
  state = {
    whiteGutter: true
  }
  static async getInitialProps({ mobxStore }) {
    await mobxStore.movieStore.fetch()
    return {
      movieStore: mobxStore.movieStore,
      orderBook: mobxStore.orderBook
    }
  }

  componentDidMount() {
    console.log('index props componentDidMount', this.props.store.orderBook)
    this.props.store.orderBook.initiateDataGenerator()
  }

  componentWillUnmount() {
    this.props.store.orderBook.terminateDataGenerator()
  }

  render() {
    const { movieStore } = this.props.store
    const trendingSliderItems = movieStore.topMovies.slice(0, 14)
      .filter(item => item.verticalImg !== "N/A")
      .map((sliderItem, key) => {
        const { title, Imdbid, verticalImg, ticker, price, change } = sliderItem;
        return <TrendingNowSliderItem
          key={Imdbid}
          title={title}
          imgSrc={verticalImg}
          width="166px"
          ticker={ticker}
          price={price}
          change={change} />
      })

    return (
      <div>
        <TickerStrip movies={movieStore.movies} />
        <Hero />
        <PageRow whiteGutter={this.state.whiteGutter} rowTitle={"Trending Now"}>
          <Slider movieStore={movieStore.topMovies} sliderItems={trendingSliderItems} />
        </PageRow>
        <PageRow whiteGutter={this.state.whiteGutter} rowTitle={"Top Gainers"}>
          <Chart topMovies={movieStore.topMovies} />
        </PageRow>
        <PageRow whiteGutter={this.state.whiteGutter} rowTitle={"Popular Genres"}>
          <PopularGenres />
        </PageRow>
        <StartCTA />
        <PageRow whiteGutter={this.state.whiteGutter} rowTitle={"What is ESX?"}>
          <WhatPanel />
        </PageRow>
        <StartCTA />
        <PageRow whiteGutter={this.state.whiteGutter} rowTitle={"How To Trade"}>
          <HowToTradePanel />
        </PageRow>
        <StartCTA />
        <PageRow whiteGutter={this.state.whiteGutter} rowTitle={"Our Partners"}>
          <PartnerGrid />
        </PageRow>
        <PageRow whiteGutter={this.state.whiteGutter} rowTitle={"Secured By"}>
          <SecuredByGrid />
        </PageRow>

        <Footer />
      </div >

    )
  }
}
