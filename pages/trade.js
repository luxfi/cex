import React from 'react'
import TickerStripLayout from "../components/generic/TickerStripLayout"
import { inject, observer } from 'mobx-react'
import StockInfo from '../components/trade/StockInfo'
import Chart from '../components/generic/Chart'
import madmax from '../assets/images/trade/madmax.jpeg'
import { formatTakeResults } from '../components/utils/formatOrderBookDataForChart'
import { withRouter } from 'next/router'


@inject('store')
@observer
class Trade extends React.Component {
  state = {
    whiteGutter: true,
  }
  static async getInitialProps({ mobxStore }) {
    await mobxStore.movieStore.fetch()
    return {
      movieStore: mobxStore.movieStore,
      orderBook: mobxStore.orderBook,
    }
  }

  componentDidMount() {
    console.log('index props componentDidMount', this.props.store.orderBook)
    const { router } = this.props
    this.props.store.orderBook.initiateDataGenerator()
  }

  componentWillUnmount() {
    this.props.store.orderBook.terminateDataGenerator()
  }

  render() {
    const { movieStore, orderBook } = this.props.store
    let takeResultsArray = orderBook.takeResults.slice(0)
    const { printInterval, buyOrders, sellOrders } = orderBook
    const data = formatTakeResults(takeResultsArray, printInterval)
    const yDomain = [orderBook.low * .94, orderBook.high * 1.06]
    const updatePrintInterval = (time) => {
      orderBook.updatePrintInterval(time)
    }
    const { router } = this.props
    const movieToTrade = movieStore.movies.find(movie => movie.ticker === router.query.ticker) || { ticker: 'hello' }
    return (
      <TickerStripLayout movies={movieStore.movies} darkNav={true}>
        <div className="container-center">
          <div className="inner-container row">
            <div className="column-container">
              <h2 className="title dark" style={{ fontSize: "40px", margin: "20px 0px 4px 0px", fontWeight: "lighter" }}>
                {movieToTrade.title}
              </h2>
              <div className="flex-row space-between">
                <StockInfo movie={movieToTrade} />
                <div className="box-item">
                  <table className="noborder">
                    <tbody>
                      <tr><td className="light-grey" style={{ paddingTop: "0px" }}>Price</td><td className="white" style={{ paddingTop: "0px" }} >{movieToTrade.price}</td></tr>
                      <tr><td className="light-grey">Change</td><td className="white">$0.80 (7.0%){movieToTrade.change}</td></tr>
                      <tr><td className="light-grey">Market Cap</td><td className="white">{movieToTrade.marketCap}</td></tr>
                      <tr><td className="light-grey" style={{ paddingBottom: "0px" }} >Volume</td><td className="white" style={{ paddingBottom: "0px" }}>{movieToTrade.volumeWeekly}</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-center" style={{ paddingTop: "20px" }}>
          <div className="inner-container row">
            <div className="wide-column">
              <Chart
                data={data}
                yDomain={yDomain}
                updatePrintInterval={updatePrintInterval}
                printInterval={printInterval}
                buyOrders={buyOrders}
                sellOrders={sellOrders}
                orderBook={orderBook}
                width="844px" />
            </div>
            <div className="thin-column">
              <img src={madmax} style={{ width: "282px", paddingLeft: "20px", paddingTop: "99px" }} />
            </div>
          </div>
        </div>
        <style jsx>{`
                    .container-center {
                        display: flex;
                        justify-content: center;
                    }
                    .column-container {
                        display: flex;
                        flex-direction: column;
                        width: 100%;
                    }
                    .inner-container.row {
                        display: flex;
                        flex-direction: row;
                        width: 1146px;
                    }
                    .flex-row {
                        display: flex;
                        flex-direction: row;
                    }
                    .space-between {
                        justify-content: space-between;
                    }
                    .box-item {
                        background: #6f6a6a;
                        color: white;
                        text-align: left;
                        // flex-grow: 1;
                        margin: 20px 0px;
                        padding: 16px;
                        width: 250px;
                    }
                    .wide-column {
                        // width: 906px;
                        width: 844px;
                    }
                    .thin-column {
                        width: 240px;
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
                    .video {
                        padding-top: 20px;
                    }
                    td {
                        padding-right: 30px;
                        padding-bottom: 4px;
                    }  
                    .white {
                        color: white;
                        padding-right: 0px;
                    }
                    .light-grey {
                        color: #bdbdbd;
                    }
                `}</style>
      </TickerStripLayout >
    )
  }
}

export default withRouter(Trade)
