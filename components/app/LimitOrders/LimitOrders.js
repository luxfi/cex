import React from "react";
import { observer } from 'mobx-react'

@observer
export default class Orders extends React.Component {
  render() {
    const { orders } = this.props
    
    return (
      <div className="orders">
        <div className="tables">
          <div className="orders">
            <div className="row header left"><div className="cell">Price</div><div className="cell right">Amount</div><div className="cell right">Total</div></div>
            {
              orders && orders.length > 0 ?
              orders.map((o, i) =>
                <div key={i} className="row">
                  <div className="cell left">${parseFloat(o.price).toFixed(2)}</div>
                  <div className="cell right">{o.size}</div>
                  <div className="cell right" style={{ width: "100px" }}>${(o.price * o.size).toFixed(2)}</div>
                </div>
              ) : <div>No orders found</div>
            }
          </div>
        </div>

        <style jsx>{`
          .tables {
            padding-top: 8px;
            display: flex;
            justify-content: space-between;
            font: 12px;
          } 
          .header {
            height: 37px;
            padding: 9.5px 0;
          }
          .orders {
            width: 100%;
            color: #666;
          }
          .row {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .cell {
            width: 58px;
          }
          .right {
            text-align: right;
          }
        `}</style>
      </div >
    )
  }
}
