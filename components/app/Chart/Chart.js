import {
  BuySellForm,
  ChartIntervalControls,
  ChartCandlestickFake,
  ChartLineSeries,
  ToggleVisibleChart,
  StockRechart
} from "../"
import { timelineLabels } from "../../utils/dateRange"
import dynamic from "next/dynamic"
import { Toolbar, Grid } from "@material-ui/core"
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
    setActiveChart
  } = props

  let labels = timelineLabels()
  const [visible, setVisible] = useState(false)
  return (
    <div className="container">
      {/* <TVChartContainer /> */}
      <StockRechart/>
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
