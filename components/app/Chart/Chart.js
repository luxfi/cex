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
import { Toolbar, Grid, Button } from "@material-ui/core"
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
    stockName
  } = props
  let labels = timelineLabels()
  const [visible, setVisible] = useState(false)
  const stock = toJS(orderBook.stock)
  let { connected } = orderBook
  window.orderBook = orderBook
  return (
    <Element className="container">
      <StockChart stock={stock} stockName={stockName} connected={connected} />
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
          marketOrderType={marketOrderType}
          funds={funds}
          connected={connected}
        />
        <Grid
          container
          direction="column"
          alignItems="center"
          className="divider"
          style={{
            marginTop: "84px"
          }}
        >
          <Grid item>
            <Button
              variant="contained"
              color={marketOrderType ? "primary" : "default"}
              onClick={() => setMarketOrderType(true)}
              style={{
                margin: "8px 32px"
              }}
            >
              Market
                        </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color={marketOrderType ? "default" : "primary"}
              onClick={() => setMarketOrderType(false)}
              style={{
                margin: "8px 32px"
              }}
            >
              Limit
                        </Button>
          </Grid>
        </Grid>
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
          marketOrderType={marketOrderType}
          funds={funds}
        />
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
