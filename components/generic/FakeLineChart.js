import {
  HorizontalGridLines,
  VerticalGridLines,
  XAxis,
  XYPlot,
  YAxis,
  LineMarkSeries
} from 'react-vis'

import "react-vis/dist/styles/plot.scss"

class FakeChart extends React.Component {
  render() {
    const data = new Array(19).fill(0).reduce((prev, curr) => [...prev, {
      x: prev.slice(-1)[0].x + 1,
      y: prev.slice(-1)[0].y * (0.9 + Math.random() * 0.2)
    }], [{ x: 0, y: 10 }]);

    function Chart({ data }) {
      return <XYPlot width={900} height={450}><XAxis /><YAxis />
        <HorizontalGridLines />
        <VerticalGridLines />
        <LineMarkSeries data={data} />
      </XYPlot>;
    }
    return (
      <Chart data={data} />
    );
  }
}

export default FakeChart;
