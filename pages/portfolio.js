import Link from 'next/link'
import React from 'react'
import TickerStripLayout from "../components/generic/TickerStripLayout"
import UpcomingIPOsSliderItem from "../components/landing/UpcomingIPOsSliderItem"
import PageRow from '../components/generic/PageRow'
import { inject, observer } from 'mobx-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faColumns, faTh, faThList } from '@fortawesome/free-solid-svg-icons'
import BalancesRow from '../components/portfolio/BalancesRow'
import BalancesTable from '../components/portfolio/BalancesTable'

@inject('store')
@observer
export default class Portfolio extends React.Component {
  state = {
    whiteGutter: true,
  }
  static async getInitialProps({ mobxStore }) {
    await mobxStore.movieStore.fetch();
    return {
      movieStore: mobxStore.movieStore
    }
  }

  render() {
    const { movieStore } = this.props.store
    const { currentPage } = this.state;

    const trendingSliderItems = movieStore.topMovies.slice(0, 14)
      .filter(item => item.verticalImg !== "N/A")
      .map((sliderItem, key) => {
        const { title, Imdbid, verticalImg, genre, rated, change } = sliderItem;
        return <UpcomingIPOsSliderItem
          key={Imdbid}
          title={title}
          imgSrc={verticalImg}
          width="166px"
          genre={genre.split(',')[0]}
          rated={rated}
          change={change}
        />
      })

    const upcommingIPOFilters = () => (
      <div className="container">
        <ul>
          <li>
            <a href="#" className="filter selected">most expected</a>
          </li>
          <li>
            <span className="filter">|</span>
          </li>
          <li>
            <a href="#" className="filter"> IPOs calender </a>
          </li>
        </ul>
        <ul>
          <li>
            <a href="#" className="filter selected"><FontAwesomeIcon icon={faColumns} style={{ height: "16px" }} /></a>
          </li>
          <li>
            <a href="#" className="filter"><FontAwesomeIcon icon={faThList} style={{ height: "16px" }} /></a>
          </li>
          <li>
            <a href="#" className="filter"><FontAwesomeIcon icon={faTh} style={{ height: "16px" }} /></a>
          </li>
        </ul>

        <style jsx>{`
                    .container {
                        display: flex;
                        flex-direction: row;
                    }
                    ul {
                        list-style-type: none;
                        display: flex;
                        padding-left: 24px;
                    }
                    .filter {
                        padding-right: 10px;
                        color: #6a5a5a;
                    }
                    .selected {
                        color: #6da7ee;
                        text-decoration: none;
                    }
                `}</style>
      </div>
    )

    const quoteFilters = () => (
      <div className="container">
        <ul>
          <li>
            <span className="filter ">sort by: </span>
          </li>
          <li>
            <a href="#" className="filter">name</a>
          </li>
          <li>
            <span className="filter">|</span>
          </li>
          <li>
            <a href="#" className="filter selected">price</a>
          </li>
          <li>
            <span className="filter">|</span>
          </li>
          <li>
            <a href="#" className="filter">price change</a>
          </li>
          <li>
            <span className="filter">|</span>
          </li>
          <li>
            <a href="#" className="filter">genre</a>
          </li>
        </ul>

        <style jsx>{`
                    .container {
                        display: flex;
                        flex-direction: row;
                    }
                    ul {
                        list-style-type: none;
                        display: flex;
                        padding-left: 24px;
                    }
                    .filter {
                        padding-right: 10px;
                        color: #6a5a5a;
                    }
                    .selected {
                        color: #6da7ee;
                        text-decoration: none;
                    }
                `}</style>
      </div>
    )

    return (
      <TickerStripLayout movies={movieStore.movies} darkNav={true}>
        <div className="container-center">
          <div className="links">
            <a href="#" className="link selected">My Portfolio</a>
            <a href="#" className="link divider">|</a>
            <a href="#" className="link">Balances</a>
            <a href="#" className="link divider">|</a>
            <a href="#" className="link">Position</a>
            <a href="#" className="link divider">|</a>
            <a href="#" className="link">Orders</a>
            <a href="#" className="link divider">|</a>
            <a href="#" className="link">Watchlists</a>
            <a href="#" className="link divider">|</a>
            <a href="#" className="link">Alerts</a>
          </div>
        </div>
        <BalancesRow />
        <PageRow whiteGutter={this.state.whiteGutter} rowTitle={"My Positions"} hideInnerPadding filters={quoteFilters()}>
          <BalancesTable movies={movieStore.movies} />
        </PageRow>
        <style jsx>{`
                    .container-center {
                        display: flex;
                        justify-content: center;
                    }
                    .links {
                        display: flex:
                        justify-content: center:
                    }
                    .link {
                        padding: 0px 12px;
                        color: grey;
                    }
                    .selected {
                        color: #6da7ee;
                        text-decoration: none;
                    }
                    .divider {
                        text-decoration: none;
                    }
                `}</style>
      </TickerStripLayout>
    );
  }
}

