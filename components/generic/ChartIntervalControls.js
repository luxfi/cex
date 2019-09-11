import React from "react";

export default class ChartIntervalControls extends React.Component {
  state = {
    'option': '15m'
  }

  handleChange = (ev) => {
    this.setState({
      'option': ev.target.value,
    });
  }

  render() {
    return (
      <div>
        <div className="radio">
          <label>
            <input type="radio" value="1m" checked={this.state.option === '1m'} name="chart-interval-controls" onChange={this.handleChange} />
            1m
          </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio" value="5m" checked={this.state.option === '5m'} name="chart-interval-controls" onChange={this.handleChange} />
            5m
          </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio" value="15m" checked={this.state.option === '15m'} name="chart-interval-controls" onChange={this.handleChange} />
            15m
            </label>
        </div>
      </div >
    )
  }
}