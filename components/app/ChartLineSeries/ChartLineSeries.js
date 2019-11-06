import {
  XAxis,
  YAxis,
  FlexibleWidthXYPlot,
  ChartLabel,
  LineSeries
} from "react-vis"
import { ChartCandlestick } from ".."
import { observer } from "mobx-react"
import React from "react"
import { useSpring, animated } from "react-spring"

const XYAxisOnHover = ({ yDomain, xLabels, data, labels }) => {
  const [props, set] = useSpring(() => ({ opacity: 0 }))
  const seriesData = data.map(element=> ({x: element["x"], y: element["y"]}))
  return (
    <div>
      <animated.div
        className="animated"
        onMouseEnter={() => set({ opacity: 1 })}
        onMouseLeave={() => set({ opacity: 0 })}
      >
        <FlexibleWidthXYPlot
          animation
          yDomain={yDomain}
          height={450}
          stroke="white"
        >
          <YAxis
            style={{
              opacity: props.opacity.value
            }}
          />
          <LineSeries data={seriesData} />
          {labels.map((marker, i) => (
            <ChartLabel
              key={i}
              text={marker}
              className="text"
              includeMargin={false}
              xPercent={xLabels[i]}
              yPercent={1.089}
              style={{
                opacity: props.opacity.value
              }}
            />
          ))}
        </FlexibleWidthXYPlot>
      </animated.div>
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
