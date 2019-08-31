import React from 'react'
import Head from 'next/head'
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

@inject('movieStore')
@observer
export default class Index extends React.Component {
  state = {
    whiteGutter: true
  }
  static async getInitialProps({ mobxStore }) {
    await mobxStore.movieStore.fetch();
    console.log('mobxStore', mobxStore)
    return {
      topMovies: mobxStore.movieStore.topMovies,
      movieStore: mobxStore.movieStore,
      movies: mobxStore.movieStore.movies,
    };
  }
  render() {
    const { topMovies, movieStore, movies } = this.props
    console.log('index.js render', this.props)
    console.log('helllooooooooo')
    // const trendingSliderItems = this.props.movieStore.topMovies.slice(0, 14)
    //   .filter(item => item.verticalImg !== "N/A")
    //   .map((sliderItem, key) => {
    //     const { title, Imdbid, verticalImg } = sliderItem;
    //     return <TrendingNowSliderItem
    //       key={Imdbid}
    //       title={title}
    //       imgSrc={verticalImg}
    //       width="166px" />
    //   })
    const trendingSliderItems = topMovies.slice(0, 14)
      .filter(item => item.verticalImg !== "N/A")
      .map((sliderItem, key) => {
        const { title, Imdbid, verticalImg } = sliderItem;
        return <TrendingNowSliderItem
          key={Imdbid}
          title={title}
          imgSrc={verticalImg}
          width="166px" />
      })

    return (
      <div>
        <Head>
          <link href="https://fonts.googleapis.com/css?family=Hind&display=swap" rel="stylesheet" />
        </Head>
        <TickerStrip movies={movies} />
        <Hero />
        <PageRow whiteGutter={this.state.whiteGutter} rowTitle={"Trending Now"} hideInnerPadding>
          <Slider movieStore={this.props.movieStore.topMovies} sliderItems={trendingSliderItems} />
        </PageRow>
        <PageRow whiteGutter={this.state.whiteGutter} rowTitle={"Top Gainers"}>
          <Chart topMovies={topMovies} />
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
