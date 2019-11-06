import {
  BuySellForm,
  ChartIntervalControls,
  ChartCandlestickFake,
  ChartLineSeries,
  ToggleVisibleChart
} from "../"
import { timelineLabels } from "../../utils/dateRange"
import { Element } from "react-scroll"
import dynamic from "next/dynamic"
import { Toolbar } from "@material-ui/core"

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
        <ChartLineSeries data={chartData} yDomain={yDomain} labels={labels} />
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
    printInterval,
    activeChart,
    buyOrders,
    sellOrders,
    orderBook,
    ticker,
    movieCategories,
    onExecute,
    maxSell,
    setActiveChart
  } = props

  let labels = timelineLabels()
  return (
    <Element className="container">
      <Toolbar>
        {activeChart === "candlestick" ? (
          <ChartIntervalControls
            updatePrintInterval={updatePrintInterval}
            activeChart={activeChart}
          />
        ) : null}
        <div style={{ flexGrow: 1 }} />
        <ToggleVisibleChart setActiveChart={setActiveChart} />
      </Toolbar>
      {/* <TVChartContainer /> */}
      <div className="posts-container">
        {getActiveChart(activeChart, { chartData, yDomain, labels })}
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
          fill: transparent;
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
