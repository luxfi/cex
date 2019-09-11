import React from 'react';
import { XAxis, YAxis, LineSeries, FlexibleWidthXYPlot } from 'react-vis';
import Candlestick from './Candlestick';

export default class CandlestickExample extends React.Component {

  render() {
    const { data, yDomain } = this.props;
    let domain = yDomain || [13, 13.7]
    return (
      <div className="candlestick-example">
        <div className="chart">
          <FlexibleWidthXYPlot animation yDomain={domain} height={450}>
            <XAxis />
            <YAxis />
            <Candlestick
              colorType="literal"
              opacityType="literal"
              stroke="#79C7E3"
              data={data}
            />
          </FlexibleWidthXYPlot>
        </div>
        <style>{`
        .candlestick-example {
          width: 100%;

          .chart {
            width: 100%;
          }

          .dashed-example-line {
            stroke-dasharray: 2, 2;
          }
        }
        `}</style>
      </div>
    );
  }
}