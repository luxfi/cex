import React from "react"
import {
  LineChart,
  Line,
  ResponsiveContainer,
  ReferenceLine,
  XAxis,
  YAxis,
  Tooltip
} from "recharts"
import CustomStockTooltip from "../CustomStockTooltip"
import { BeatLoader, ScaleLoader } from "react-spinners"

Number.prototype.formatMoney = function (c, d, t) {
  var n = this,
    c = isNaN((c = Math.abs(c))) ? 2 : c,
    d = d == undefined ? "." : d,
    t = t == undefined ? "," : t,
    s = n < 0 ? "-" : "",
    i = String(parseInt((n = Math.abs(Number(n) || 0).toFixed(c)))),
    j = (j = i.length) > 3 ? j % 3 : 0
  return (
    s +
    (j ? i.substr(0, j) + t : "") +
    i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) +
    (c
      ? d +
      Math.abs(n - i)
        .toFixed(c)
        .slice(2)
      : "")
  )
}

const RANGES = {
  "1W": { length: 5, increment: 1 },
  "1M": { length: 23, increment: 1 },
  "3M": { length: 66, increment: 1 },
  "1Y": { length: 251, increment: 1 },
  "5Y": { length: 1265, increment: 5 }
}

const MONTHS = {
  1: "JAN",
  2: "FEB",
  3: "MAR",
  4: "APR",
  5: "MAY",
  6: "JUN",
  7: "JUL",
  8: "AUG",
  9: "SEP",
  10: "OCT",
  11: "NOV",
  12: "DEC"
}

class StockRechart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currData: this.props,
      initialData: this.props,
      active: "1D",
      fetched5Y: false
    }
    this.render1DChart = this.render1DChart.bind(this)
    this.render5YChart = this.render5YChart.bind(this)
  }

  calculateDailyPriceData(data, startIdx) {
    let dailyData = this.props.dailyData
    let neg = "+"
    const prices = []

    if (startIdx < 0) startIdx = 0
    for (let i = 0; i < data.length; i++) {
      prices.push(parseFloat(data[i].price))
    }

    // calculate key price data points
    const max = Math.max(...prices)
    const min = Math.min(...prices)
    const currPrice = this.state.initialData.currPrice
    const openPrice = prices[0]
    const priceFlux =
      Math.round((parseFloat(currPrice) - parseFloat(openPrice)) * 100) / 100
    const priceFluxPercentage =
      Math.round(
        ((parseFloat(currPrice) - parseFloat(openPrice)) /
          parseFloat(openPrice)) *
        10000
      ) / 100
    if (priceFlux < 0) {
      neg = "-"
    }

    return {
      max,
      min,
      neg,
      currPrice,
      openPrice,
      priceFlux,
      priceFluxPercentage
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.active === "5Y" &&
      prevState.active !== "5Y" &&
      !prevState.fetched5Y
    ) {
      this.renderChart("5Y")
    }
  }

  render1DChart() {
    this.setState({ currData: this.state.initialData, active: "1D" })
  }

  render5YChart() {
    if (!this.state.fetched5Y) {
      this.props.fetchStock5yData(this.props.stock.ticker).then(() => {
        this.setState({ fetched5Y: true, active: "5Y" })
      })
    } else {
      this.renderChart("5Y")
    }
  }

  formatDate(date) {
    let [year, month, day] = date.split("-")
    return `${MONTHS[parseInt(month)]} ${day}, ${year}`
  }

  renderChart(range) {
    let dailyData = this.props.dailyData
    let data = []
    let startIdx = RANGES[range].length
    if (startIdx > dailyData.length) startIdx = dailyData.length
    let lastIdx

    for (
      let i = dailyData.length - startIdx;
      i < dailyData.length;
      i += RANGES[range].increment
    ) {
      if (i < 0) i = 0
      let time = this.formatDate(dailyData[i].date)
      data.push({
        time,
        price: dailyData[i].close
      })
      lastIdx = i
    }

    // Set last date as most recent data point regardless
    if (lastIdx !== dailyData.length - 1) {
      let time = this.formatDate(dailyData[dailyData.length - 1].date)
      data.push({
        time,
        price: dailyData[dailyData.length - 1].close
      })
    }

    let {
      max,
      min,
      neg,
      currPrice,
      openPrice,
      priceFlux,
      priceFluxPercentage
    } = this.calculateDailyPriceData(data, dailyData.length - startIdx - 1)
    this.setState({
      currData: {
        data,
        currPrice,
        openPrice,
        priceFlux,
        priceFluxPercentage,
        min,
        max,
        neg,
        dailyData
      },
      active: range
    })
  }

  render() {
    let {
      currPrice,
      openPrice,
      priceFlux,
      priceFluxPercentage,
      data,
      min,
      max,
      neg
    } = this.state.currData
    let color = neg === "+" ? "#82ca9d" : "#f45531"
    if (neg === "-") {
      document.getElementsByTagName("body")[0].className = "negative"
    } else {
      document.getElementsByTagName("body")[0].className = ""
    }
    currPrice = parseFloat(currPrice).formatMoney(2)
    priceFlux = Math.abs(parseFloat(priceFlux)).formatMoney(2)
    priceFluxPercentage = parseFloat(priceFluxPercentage).formatMoney(2)
    return (
      <div className="chart">
        <h1>{this.props.stockName}</h1>
        <h2 id="stock-price">${currPrice}</h2>
        <h3 id="stock-price-flux">
          {neg}${priceFlux} ({priceFluxPercentage}%)
        </h3>
        <div className="stock-chart">
          {this.props.loading ? (
            <div className="chart-loading">
              <ScaleLoader
                sizeUnit={"px"}
                size={20}
                color={"#21ce99"}
                loading={true}
              />
            </div>
          ) : (
              <ResponsiveContainer width="100%" height={400}>
                <LineChart
                  // width={710}
                  // height={195}
                  data={data}
                  margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
                >
                  <YAxis hide={true} domain={[min, max]} />
                  <Tooltip
                    content={
                      <CustomStockTooltip
                        price={currPrice}
                        priceFlux={priceFlux}
                        priceFluxPercentage={priceFluxPercentage}
                        openPrice={openPrice}
                        neg={neg}
                      />
                    }
                    offset={-40}
                    position={{ y: -20 }}
                    isAnimationActive={false}
                  />
                  <Line
                    type="linear"
                    dataKey="price"
                    stroke={color}
                    dot={false}
                    strokeWidth={2}
                  />
                  {this.state.active === "1D" &&
                    <ReferenceLine
                      y={this.props.previousDayClose}
                      stroke="white"
                      strokeDasharray="3 3"
                      alwaysShow />
                  }
                </LineChart>
              </ResponsiveContainer>
            )}
          <ul className="chart-range stock">
            <li>
              <a
                className={
                  this.state.active === "1D"
                    ? "chart-choice active"
                    : "chart-choice"
                }
                onClick={this.render1DChart}
              >
                1D
              </a>
            </li>
            <li>
              <a
                className={
                  this.state.active === "1W"
                    ? "chart-choice active"
                    : "chart-choice"
                }
                onClick={() => this.renderChart("1W")}
              >
                1W
              </a>
            </li>
            <li>
              <a
                className={
                  this.state.active === "1M"
                    ? "chart-choice active"
                    : "chart-choice"
                }
                onClick={() => this.renderChart("1M")}
              >
                1M
              </a>
            </li>
            <li>
              <a
                className={
                  this.state.active === "3M"
                    ? "chart-choice active"
                    : "chart-choice"
                }
                onClick={() => this.renderChart("3M")}
              >
                3M
              </a>
            </li>
            <li>
              <a
                className={
                  this.state.active === "1Y"
                    ? "chart-choice active"
                    : "chart-choice"
                }
                onClick={() => this.renderChart("1Y")}
              >
                1Y
              </a>
            </li>
            {/* <li>
              <a
                className={
                  this.state.active === "5Y"
                    ? "chart-choice active"
                    : "chart-choice"
                }
                onClick={this.render5YChart}
              >
                5Y
              </a>
            </li> */}
          </ul>
        </div>
        <style jsx>{`
          .chart-choice {
            cursor: pointer;
            padding-bottom: 15px;
          }
          .chart-choice.active {
            color: #21ce99;
            border-bottom: 2px solid #21ce99;
          }
          .chart-choice:hover {
            color: #21ce99;
          }
          .chart {
            padding: 0;
            padding-left: -20px;
            margin: 0 5px;
          }
          .stock-chart {
            margin-top: 32px;
          }
          .chart-range {
            display: flex;
            margin-top: 26px;
            font-size: 14px;
            font-weight: 700;
            padding-bottom: 15px;
            // margin-right: 35px;
            border-bottom: 1px solid #eee;
          }
          .chart-range li {
            margin: 0 22px 0 0;
          }
          // .chart-range.stock {
          //   margin-right: 55px;
          // }
          body.negative .chart-choice:hover {
            color: #f45531;
          }
          body.negative .chart-choice.active {
            color: #f45531;
            border-bottom: 2px solid #f45531;
          }
          .chart-loading {
            width: 710px;
            height: 195px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .chart-loading::after {
            content: "";
          }
        `}</style>
      </div>
    )
  }
}

export default StockRechart
