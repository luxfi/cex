import {
  green,
  red,
} from '@material-ui/core/colors'
import { format } from 'd3-format'
import { timeFormat } from 'd3-time-format'
import React from 'react'
import { Chart, ChartCanvas } from 'react-financial-charts'
import { XAxis, YAxis } from 'react-financial-charts/lib/axes'
import {
  CrossHairCursor,
  EdgeIndicator,
  MouseCoordinateX,
  MouseCoordinateY,
} from 'react-financial-charts/lib/coordinates'
import { elderRay, ema } from 'react-financial-charts/lib/indicator'
import { discontinuousTimeScaleProviderBuilder } from 'react-financial-charts/lib/scale'
import {
  BarSeries,
  CandlestickSeries,
  ElderRaySeries,
  LineSeries,
} from 'react-financial-charts/lib/series'
import { MovingAverageTooltip, OHLCTooltip, SingleValueTooltip } from 'react-financial-charts/lib/tooltip'
import { withDeviceRatio } from 'react-financial-charts/lib/utils'
import { lastVisibleItemBasedZoomAnchor } from 'react-financial-charts/lib/utils/zoomBehavior'
import withSize from './withSize'

const gridColor = '#444444'
const textColor = '#FFFFFF'

class StockChart extends React.Component {
  margin = {
    left: 0,
    right:
    48,
    top: 0,
    bottom: 24,
  }

  pricesDisplayFormat = format('.2f')

  timeDisplayFormat = timeFormat('%d %b')

  xScaleProvider = discontinuousTimeScaleProviderBuilder()
    .inputDateAccessor((d) => d.date)

  barChartExtents = (data) => data.volume

  candleChartExtents = (data) => [data.high, data.low]

  yBarSeries = (data) => data.volume

  yEdgeIndicator = (data) => data.close

  openCloseColor = (data) => (data.close > data.open ? green[500] : red[500])

  render() {
    const {
      data: initialData,
      height,
      ratio,
      width,
    } = this.props

    const ema12 = ema()
      .id(1)
      .options({ windowSize: 12 })
      .merge((d, c) => { d.ema12 = c })
      .accessor((d) => d.ema12)

    const ema26 = ema()
      .id(2)
      .options({ windowSize: 26 })
      .merge((d, c) => { d.ema26 = c })
      .accessor((d) => d.ema26)

    const elder = elderRay()

    const calculatedData = elder(ema26(ema12(initialData)))

    const { margin, xScaleProvider } = this

    const {
      data,
      xScale,
      xAccessor,
      displayXAccessor,
    } = xScaleProvider(calculatedData)

    const start = xAccessor(data[data.length - 1])
    const end = xAccessor(data[Math.max(0, data.length - 100)])
    const xExtents = [start, end]

    const gridWidth = width - margin.left - margin.right
    const gridHeight = height - margin.top - margin.bottom

    // const elderRayHeight = 100
    const elderRayHeight = 0
    // const elderRayOrigin = (_, h) => [0, h - elderRayHeight]
    const barChartHeight = gridHeight / 4
    const barChartOrigin = (_, h) => [0, h - barChartHeight - elderRayHeight]
    const chartHeight = gridHeight - elderRayHeight

    return (
      <ChartCanvas
        height={height}
        ratio={ratio}
        width={width}
        margin={margin}
        data={data}
        displayXAccessor={displayXAccessor}
        seriesName='Data'
        xScale={xScale}
        xAccessor={xAccessor}
        xExtents={xExtents}
        zoomAnchor={lastVisibleItemBasedZoomAnchor}>
        <Chart
          id={1}
          height={chartHeight}
          yExtents={this.candleChartExtents}>
          <XAxis
            stroke={textColor}
            tickLabelFill={textColor}
            innerTickSize={-1 * gridHeight}
            tickStroke={gridColor}
            ticks={6} />
          <YAxis
            stroke={textColor}
            innerTickSize={-1 * gridWidth}
            tickFormat={this.pricesDisplayFormat}
            tickStroke={gridColor}
            tickLabelFill={textColor}
            ticks={5} />
          <OHLCTooltip origin={[8, 16]} />
        </Chart>
        <Chart
          id={2}
          height={barChartHeight}
          origin={barChartOrigin}
          yExtents={this.barChartExtents}>
          <BarSeries
            fill={this.openCloseColor}
            yAccessor={this.yBarSeries} />
        </Chart>
        <Chart
          id={3}
          height={chartHeight}
          yExtents={this.candleChartExtents}>
          <CandlestickSeries
            wickStroke={this.openCloseColor}
            stroke={this.openCloseColor}
            fill={this.openCloseColor}
          />
          <LineSeries yAccessor={ema26.accessor()} stroke={ema26.stroke()} />
          <LineSeries yAccessor={ema12.accessor()} stroke={ema12.stroke()} />
          <MouseCoordinateY
            displayFormat={this.pricesDisplayFormat} />
          <EdgeIndicator
            itemType='last'
            fill={this.openCloseColor}
            lineStroke={this.openCloseColor}
            displayFormat={this.pricesDisplayFormat}
            yAccessor={this.yEdgeIndicator} />
          <MovingAverageTooltip
            origin={[8, 24]}
            options={[
              {
                yAccessor: ema26.accessor(),
                type: 'EMA',
                stroke: ema26.stroke(),
                windowSize: ema26.options().windowSize,
              },
              {
                yAccessor: ema12.accessor(),
                type: 'EMA',
                stroke: ema12.stroke(),
                windowSize: ema12.options().windowSize,
              },
            ]}
          />
        </Chart>
        <CrossHairCursor />
      </ChartCanvas>
    )
  }
}
// Elder Ray
/*
        <Chart
          id={4}
          height={elderRayHeight}
          yExtents={[0, elder.accessor()]}
          origin={elderRayOrigin}
          padding={{ top: 8, bottom: 8 }}>
          <XAxis
            stroke={textColor}
            tickLabelFill={textColor}
            innerTickSize={-1 * gridHeight}
            tickStroke={gridColor}
            ticks={6} />
          <YAxis
            stroke={textColor}
            tickLabelFill={textColor}
            ticks={4} tickFormat={this.pricesDisplayFormat}
          />

          <MouseCoordinateX displayFormat={this.timeDisplayFormat} />
          <MouseCoordinateY displayFormat={this.pricesDisplayFormat} />

          <ElderRaySeries
            bearPowerFill={red[500]}
            bullPowerFill={green[500]}
            straightLineStroke='#FFFFFF'
            yAccessor={elder.accessor()}
          />

          <SingleValueTooltip
            yAccessor={elder.accessor()}
            yLabel='Elder Ray'
            yDisplayFormat={(d) => `${this.pricesDisplayFormat(d.bullPower)}, ${this.pricesDisplayFormat(d.bearPower)}`}
            origin={[8, 16]} />
        </Chart>
 */

export default withSize(300)(withDeviceRatio()(StockChart))
