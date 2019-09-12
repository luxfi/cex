import React from "react";

export default class ChartIntervalControls extends React.Component {
  handleChange = (event) => {
    const { updatePrintInterval } = this.props
    updatePrintInterval(event.target.value)
  }

  render() {
    const printInterval = this.props.printInterval
    return (
      <div>
        <div className="radio">
          <label>
            <input type="radio" value={1} checked={printInterval === 1} name="chart-interval-controls" onChange={this.handleChange} />
            1m
          </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio" value={5} checked={printInterval === 5} name="chart-interval-controls" onChange={this.handleChange} />
            5m
          </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio" value={15} checked={printInterval === 15} name="chart-interval-controls" onChange={this.handleChange} />
            15m
            </label>
        </div>
        <style jsx>{`
          .buttons {
            margin: 10px auto;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            flex-wrap: nowrap;
            background: #999;
          }
          .button {
            padding: 7px 12px;
            font-size: 11px;
            margin: .3em;
            color: white;
            text-decoration: none;
            flex-grow: 1;
            text-align: center;
          }
        `}
        </style>
      </div >
    )
  }
}