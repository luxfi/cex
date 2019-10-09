// FOR DELETE
import React from 'react'
import { inject, observer } from 'mobx-react'
import PageRow from '../generic/PageRow'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'

export default class BalancesRow extends React.Component {
  state = {
    whiteGutter: true
  }

  render() {
    const balancesFitler = () => (
      <div className="container">
        <ul>
          <li>
            <a href="#" className="filter selected">day</a>
          </li>
          <li>
            <span className="filter">|</span>
          </li>
          <li>
            <a href="#" className="filter">month</a>
          </li>
          <li>
            <span className="filter">|</span>
          </li>
          <li>
            <a href="#" className="filter">year</a>
          </li>
        </ul>

        <style jsx>{`
                    .container {
                        display: flex;
                        flex-direction: row;
                    }
                    ul {
                        list-style-type: none;
                        display: flex;
                        padding-left: 24px;
                    }
                    .filter {
                        padding-right: 10px;
                        color: #6a5a5a;
                    }
                    .selected {
                        color: #6da7ee;
                        text-decoration: none;
                    }
                `}</style>
      </div>
    )

    return (
      <PageRow whiteGutter={this.state.whiteGutter} rowTitle={"Balances"} hideInnerPadding filters={balancesFitler()}>
        <div className="container-center-content">
          <div className="flex-container">
            <div className="flex-item green">
              <div className="title">Portfolio Value</div>
              <div className="value">
                <span style={{ color: "rgba(255, 255, 255, 0.44)" }}>$</span>
                225,555
                                <span style={{ fontSize: "27px" }}>
                  .97
                                </span>
              </div>
            </div>
            <div className="flex-item blue">
              <div className="title">Cash Position</div>
              <div className="value">
                <span style={{ color: "rgba(255, 255, 255, 0.44)" }}>
                  $
                                </span>12,745
                                <span style={{ fontSize: "27px" }}>
                  .00
                                </span>
              </div>
            </div>
            <div className="flex-item purple">
              <div className="title">% Change</div>
              <div className="value">
                <span className="change">
                  <FontAwesomeIcon icon={faArrowUp} style={{
                    paddingRight: "8px", paddingBottom: "12px", height: "32px",
                    width: "32px"
                  }} />
                </span>
                5.04<span style={{ color: "rgba(255, 255, 255, 0.44)" }}>%</span>
              </div>
            </div>
          </div>
          <style jsx>{`
                        .flex-container {
                            display: flex;
                            justify-content: space-around;
                            align-items: stretch;
                            width: 1146px;
                        }
                        .flex-item {
                            background: #6f6a6a;
                            color: white;
                            text-align: left;
                            flex-grow: 1;
                            margin: 8px;
                            padding: 16px;
                        }
                        .container-center-content {
                            display: flex;
                            justify-content: center;
                            height: 135px;
                        }
                        .value {
                            font-size: 54px;
                            margin-top: 16px;
                            font-weight: lighter;
                        }
                        .change {
                            color: #0dc109;
                            margin-top: 2px;
                            font-size: 32px;
                        }
                        .green {
                          background-color: #2ecc71;
                        }
                        .purple {
                          background-color: #8e44ad;
                        }
                        .blue {
                          background-color: #3498db;
                        }
                    `}</style>
        </div>
      </PageRow >
    );
  }
}

