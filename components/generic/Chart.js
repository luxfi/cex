import BuySellForm from './BuySellForm'
import FakeCandlestickChart from './FakeCandlestickChart'
import { timelineLabels } from '../utils/dateRange'
import ChartIntervalControl from '../generic/ChartIntervalControls'

export default props => {
  const { data, yDomain, updatePrintInterval, printInterval, buyOrders, sellOrders, orderBook } = props

  let labels = timelineLabels()

  return (
    <div className="container">
      <div className="title">
        Trade This Stock
      </div>
      <ChartIntervalControl updatePrintInterval={updatePrintInterval} printInterval={printInterval} />
      <div className="posts-container">
        <FakeCandlestickChart data={data} yDomain={yDomain} labels={labels} />
        <div className="container-row space-between">
          <BuySellForm buttonColor="green" buttonText="BUY" orderType="bid" ticker={"MDMXFR"} orders={buyOrders} orderBook={orderBook} />
          <div className="divider" />
          <BuySellForm buttonColor="red" buttonText="SELL" orderType="ask" ticker={"MDMXFR"} orders={sellOrders} orderBook={orderBook} />
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
                }
                .divider {
                    width: 1px;
                    background: black;
                    margin-left: 20px;
                    margin-right: 20px;
                }
            `}</style>
    </div>
  )
}