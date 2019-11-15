import {
  BuySellForm,
  ChartIntervalControls,
  ChartCandlestickFake,
  ChartLineSeries,
  ToggleVisibleChart,
  StockChart
} from "../"
import { toJS } from "mobx"
import { timelineLabels } from "../../../util/dateRange"
import { Element } from "react-scroll"
import dynamic from "next/dynamic"
import { Grid, Button } from "@material-ui/core"
import { useState } from "react"

const TVChartContainer = dynamic(
  async () => {
    const mod = await import("../TVChartContainer")
    return mod.TVChartContainer
  },
  {
    ssr: false,
    loading: () => <div style={{ color: "red" }}>This is loading</div>
  }
)

function getActiveChart(activeChart, { chartData, yDomain, labels }) {
  switch (activeChart) {
    case "candlestick":
      return (
        <ChartCandlestickFake
          data={chartData}
          yDomain={yDomain}
          labels={labels}
        />
      )
    case "line-chart":
      return (
        <ChartLineSeries
          data={chartData}
          yDomain={yDomain}
          labels={labels}
        />
      )
    case 2:
      return null
    default:
      return null
  }
}

export default props => {
  const {
    chartData,
    yDomain,
    updatePrintInterval,
    activeChart,
    createOrder,
    buyOrders,
    sellOrders,
    orderBook,
    ticker,
    movieCategories,
    onExecute,
    maxSell,
    setActiveChart,
    setMarketOrderType,
    marketOrderType,
    funds,
    stockName,
    accountBalance
  } = props
  let labels = timelineLabels()
  const [visible, setVisible] = useState(false)
  const stock = toJS(orderBook.stock)
  let { connected } = orderBook
  window.orderBook = orderBook
  return (
    <Element>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <StockChart stock={stock} stockName={stockName} connected={connected} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <BuySellForm
            buttonColor="green"
            buttonText="BUY"
            orderType="bid"
            ticker={ticker}
            createOrder={createOrder}
            orders={buyOrders}
            orderBook={orderBook}
            onExecute={onExecute}
            movieCategories={movieCategories}
            marketOrderType={marketOrderType}
            funds={funds}
            connected={connected}
            accountBalance={accountBalance}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <BuySellForm
            buttonColor="red"
            buttonText="SELL"
            orderType="ask"
            ticker={ticker}
            orders={sellOrders}
            orderBook={orderBook}
            createOrder={createOrder}
            onExecute={onExecute}
            movieCategories={movieCategories}
            maxSell={maxSell}
            marketOrderType={marketOrderType}
            funds={funds}
            accountBalance={accountBalance}
          />
        </Grid>
      </Grid>

      <style jsx>{`
                .title {
                    color: #2d92dd;
                    font-size: 32px;
                    margin-top: 30px;
                    font-weight: lighter;
                }
                .posts-container {
                    margin-top: 20px;
                    fill: transparent;
                }
                .divider {
                    margin-left: 20px;
                    margin-right: 20px;
                }
            `}</style>
    </Element>
  )
}
