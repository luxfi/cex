import Link from 'next/link'
import React from 'react'
import TickerStripLayout from "../components/generic/TickerStripLayout"
import Slider from '../components/generic/Slider'
import TrendingNowSliderItem from "../components/landing/TrendingNowSliderItem"
import PageRow from '../components/generic/PageRow'
import { inject, observer } from 'mobx-react'

@inject('movieStore')
@observer
export default class Quotes extends React.Component {
  state = {
    whiteGutter: true
  }
  static async getInitialProps({ mobxStore }) {
    await mobxStore.movieStore.fetch();
    return {
      movies: mobxStore.movieStore.movies,
      topMovies: mobxStore.movieStore.topMovies,
    };
  }


  render() {
    const { topMovies, movies } = this.props
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
      <TickerStripLayout movies={movies} darkNav={true}>
        <PageRow whiteGutter={this.state.whiteGutter} rowTitle={"Trending Now"} hideInnerPadding>
          <Slider movieStore={this.props.topMovies} sliderItems={trendingSliderItems} />
        </PageRow>
      </TickerStripLayout>
    );
  }
}

