import React from "react";

export default class Orders extends React.Component {
  render() {
    const { orders } = this.props
    // console.log('orders orders', orders)
    return (
      <div className="orders">
        <div className="tables">
          <div className="orders">
            <div className="row header left"><div className="cell">Price</div><div className="cell right">Amt</div><div className="cell right">Row</div></div>
            {/* {
                orders.map((o, i) => <div key={i}>price: {o.price}, size: {o.size}, total: {(o.price * o.size).toFixed(0)}</div>)
              } */}
            {
              orders.map((o, i) => <div key={i} className="row"><div className="cell left">{o.price}</div><div className="cell right">{o.size}</div><div className="cell right">{(o.price * o.size).toFixed(0)}</div></div>)
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
            width: 42px;
          }
          .right {
            text-align: right;
          }
        `}</style>
      </div >
    )
  }
}