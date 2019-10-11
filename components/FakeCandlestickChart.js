import React from "react"
import { XAxis, YAxis, FlexibleWidthXYPlot, ChartLabel } from "react-vis"
import { Candlestick } from "./app
import { observer } from "mobx-react"

@observer
export default class FakeCandleStickChart extends React.Component {
  render() {
    const { data, yDomain, labels, marginLeft } = this.props
    let domain = yDomain || [13, 13.7]
    let xPercentFirst = -0.005
    let xPercentLast = 1 - 0.01
    let xPercent = -0.005
    let range = xPercentLast - xPercentFirst
    let intervals = 21.0
    let increments = range / intervals
    let array = []

    array.push(xPercent)

    while (xPercent < xPercentLast) {
      xPercent += increments
      array.push(xPercent)
    }

    return (
      <div className="candlestick-example">
        <div className="chart">
          <FlexibleWidthXYPlot
            animation
            yDomain={domain}
            height={450}
            style={{ marginLeft: "-12px" }}
          >
            {/* <XAxis color="white" /> */}
            <YAxis />
            <Candlestick
              colorType="literal"
              opacityType="literal"
              stroke="#79C7E3"
              data={data}
            />
            {labels.map((marker, i) => {
              return (
                <ChartLabel
                  key={i}
                  text={marker}
                  className="text"
                  includeMargin={false}
                  xPercent={array[i]}
                  yPercent={1.089}
                  fill="white"
                />
              )
            })}
          </FlexibleWidthXYPlot>
        </div>
        <style jsx>{`
          .candlestick-example {
            width: 100%;
          }

          .chart {
            width: 100%;
          }

          .dashed-example-line {
            stroke-dasharray: 2, 2;
          }

          .rv-xy-plot__axis.rv-xy-plot__axis--vertical {
            fill: white;
          }

          .rv-xy-plot__series--label {
            fill: white;
          }

          .text {
            fill: white;
            color: white;
          }
        `}</style>
      </div>
    )
  }
}
