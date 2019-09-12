import React from "react";

export default class ChartIntervalControls extends React.Component {
  handleClick = (value) => {
    const { updatePrintInterval } = this.props
    updatePrintInterval(value)
  }

  render() {
    const { printInterval } = this.props
    console.log('printInterval', printInterval)
    return (
      <div className="chart-interval-controls">
        <div className="group space-single"><div className={`button ${printInterval === 1 && 'selected'}`} title="1min" onClick={e => this.handleClick(1)}>1min</div></div>
        <div className="group space-single"><div className={`button ${printInterval === 5 && 'selected'}`} title="5min" onClick={e => this.handleClick(5)}>5min</div></div>
        {/* <div className="group space-single"><div className={`button ${printInterval === 15 && 'selected'}`} title="15min" onClick={e => this.handleClick(15)}>15min</div></div> */}
        <style jsx>{`
          .chart-interval-controls {
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            flex-wrap: nowrap;
          }
          .button {
            font-size: 11px;
            color: white;
            text-decoration: none;
            flex-grow: 1;
            text-align: center;
            padding: 5px !important;
            height: 16px !important;
            color: #4a4a4a;
            cursor: pointer;
            border: 1px solid;
            border-color: #ffffff;
            line-height: 15px;
          }
          .chart-interval-controls .group {
              display: inline-block;
              white-space: nowrap;
              padding: 0;
              margin: 5px 0 0;
              height: 30px;
              vertical-align: top;
          }
          .space-single {
            padding: 0 4px 0 0;
          }
          .button:hover, .button.selected {
            background-color: rgba(53,116,250,0.12) !important;
            color: #8194a4 !important;
            border-radius: 3px;
          }
          .button:hover {
            border-color: rgb(129, 148, 164);;
          }
        `}
        </style>
      </div >
    )
  }
}