import { YAxis, FlexibleWidthXYPlot, ChartLabel } from "react-vis"
import { ChartCandlestick } from ".."
import { observer } from "mobx-react"
import React from "react"

const XYAxisOnHover = ({ yDomain, xLabels, data, labels }) => {
  return (
    <div>
        <FlexibleWidthXYPlot animation yDomain={yDomain} height={450}>
          <YAxis/>
          <ChartCandlestick
            colorType="literal"
            opacityType="literal"
            data={data}
          />
          {labels.map((marker, i) => (
            <ChartLabel
              key={i}
              text={marker}
              className="text"
              includeMargin={false}
              xPercent={xLabels[i]}
              yPercent={1.089}
            />
          ))}
        </FlexibleWidthXYPlot>
    </div>
  )
}

const createXLabels = intervals => {
  const xPercentFirst = -0.005
  const xPercentLast = 1 - 0.01
  let xPercent = -0.005
  const range = xPercentLast - xPercentFirst
  const increments = range / intervals
  const xLabels = []
  xLabels.push(xPercent)

  while (xPercent < xPercentLast) {
    xPercent += increments
    xLabels.push(xPercent)
  }
  return xLabels
}

@observer
export default class FakeCandleStickChart extends React.Component {
  render() {
    const { data, yDomain, labels } = this.props
    const xLabels = createXLabels(labels.length)
    return (
      <XYAxisOnHover
        yDomain={yDomain}
        xLabels={xLabels}
        data={data}
        labels={labels}
      />
    )
  }
}
