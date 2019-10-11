import { BuySellForm, FakeCandlestickChart, ChartIntervalControl } from '../'
import { timelineLabels } from "../../utils/dateRange"
import { Element } from "react-scroll"

export default props => {
  const {
    chartData,
    yDomain,
    updatePrintInterval,
    printInterval,
    buyOrders,
    sellOrders,
    orderBook,
    ticker,
    movieCategories,
    onExecute,
    maxSell
  } = props

  let labels = timelineLabels()

  return (
    <Element className="container">
      <div className="title" name="section1">
        Trade This Stock
      </div>
      <ChartIntervalControl
        updatePrintInterval={updatePrintInterval}
        printInterval={printInterval}
      />
      <div className="posts-container">
        <FakeCandlestickChart data={chartData} yDomain={yDomain} labels={labels} />
        <div className="container-row space-between">
          <BuySellForm
            buttonColor="green"
            buttonText="BUY"
            orderType="bid"
            ticker={ticker}
            orders={buyOrders}
            orderBook={orderBook}
            onExecute={onExecute}
            movieCategories={movieCategories}
          />
          <div className="divider" />
          <BuySellForm
            buttonColor="red"
            buttonText="SELL"
            orderType="ask"
            ticker={ticker}
            orders={sellOrders}
            orderBook={orderBook}
            onExecute={onExecute}
            movieCategories={movieCategories}
            maxSell={maxSell}
          />
        </div>
      </div>

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
        }
        .container-row {
          display: flex;
          flex-direction: row;
        }
        .space-between {
          justify-content: space-between;
        }
        .title {
          color: #2d92dd;
          font-size: 32px;
          margin-top: 30px;
          font-weight: lighter;
        }
        .posts-container {
          margin-top: 20px;
          fill: white;
        }
        .divider {
          width: 1px;
          background: black;
          margin-left: 20px;
          margin-right: 20px;
        }
      `}</style>
    </Element>
  )
}
