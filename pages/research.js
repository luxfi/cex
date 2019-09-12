import React from 'react'
import TickerStripLayout from "../components/generic/TickerStripLayout"
import { inject, observer } from 'mobx-react'
import HeaderInfo from '../components/research/HeaderInfo'
import ShareIcons from '../components/research/ShareIcons'
import StockInfo from '../components/research/StockInfo'
import MoreLikeThis from '../components/research/MoreLikeThis'
import RelatedPosts from '../components/research/RelatedPosts'
import Forecasts from '../components/research/Forecasts'
import Chart from '../components/generic/Chart'
import Orders from '../components/generic/Orders'
import { formatTakeResults } from '../components/utils/formatOrderBookDataForChart'
import { faSortAmountDown } from '@fortawesome/free-solid-svg-icons'



const sumDataByNumber = (array) => {
  let hash = {}
  array.forEach(el => {
    let price = el[0]
    let size = el[1]
    let amount = parseInt(el[2]) || 0
    let sum = !hash[price] ? 0 : amount + hash[price]["amount"]
    hash[price] = {
      "size": size,
      "amount": sum
    }
  });
  return hash;
}

@inject('store')
@observer
export default class Research extends React.Component {
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
    this.props.store.orderBook.initiateDataGenerator()
  }

  componentWillUnmount() {
    this.props.store.orderBook.terminateDataGenerator()
  }

  render() {
    const { movieStore, orderBook } = this.props.store
    let takeResultsArray = orderBook.takeResults.slice(0);
    const { printInterval, orders } = orderBook;
    const data = formatTakeResults(takeResultsArray, printInterval)
    const yDomain = [orderBook.low * .94, orderBook.high * 1.06]
    const updatePrintInterval = (time) => {
      orderBook.updatePrintInterval(time)
    }
    // let currentPrice = takeResultsArray[takeResultsArray - 1].taker.price.toFixed(2)
    // const takers = takeResultsArray.map(take => [take.taker.price.toFixed(2), take.taker.size, (take.taker.price.toFixed(2) * take.taker.size).toFixed(2)])
    // const makers = takeResultsArray
    //   .filter(make => make.makers[0])
    //   .map(make => [make.makers[0].price.toFixed(2), make.makers[0].size, (make.makers[0].price.toFixed(2) * make.makers[0].size).toFixed(2)])
    // let makersBook = sumDataByNumber(makers)
    // let takersBook = sumDataByNumber(takers)
    return (
      <TickerStripLayout movies={movieStore.movies} darkNav={true}>
        <div className="container-center">
          <div className="inner-container">
            <div className="wide-column">
              <HeaderInfo />
              <StockInfo movies={movieStore.movies} />
              <iframe className="video" width="886" height="498" src="https://www.youtube.com/embed/hEJnMQG9ev8" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
            <div className="thin-column">
              <ShareIcons />
              <MoreLikeThis movies={movieStore.movies} />
              <RelatedPosts />
            </div>
          </div>
        </div>
        <div className="container-center" style={{ paddingTop: "20px" }}>
          <div className="inner-container">
            <div className="thin-column">
              <Forecasts />
            </div>
            <div className="wide-column">
              <Chart data={data} yDomain={yDomain} updatePrintInterval={updatePrintInterval} printInterval={printInterval} />
              <Orders orders={orders} />
            </div>
          </div>
        </div>
        <style jsx>{`
                    .container-center {
                        display: flex;
                        justify-content: center;
                    }
                    .inner-container {
                        display: flex;
                        flex-direction: row;
                        width: 1146px;
                    }
                    .wide-column {
                        width: 906px;
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
                `}</style>
      </TickerStripLayout>
    )
  }
}

