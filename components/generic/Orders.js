import React from "react";

export default class Orders extends React.Component {
  render() {
    const { orders } = this.props
    // console.log('orders orders', orders)
    return (
      <div className="orders">
        <div className="tables">
          <div className="orders">
            <div className="row"><div className="cell">Price</div><div className="cell">Amt</div><div className="cell">Row</div></div>
            {/* {
                orders.map((o, i) => <div key={i}>price: {o.price}, size: {o.size}, total: {(o.price * o.size).toFixed(0)}</div>)
              } */}
            {
              orders.map((o, i) => <div key={i} className="row"><div className="cell">{o.price}</div><div className="cell">{o.size}</div><div className="cell">{(o.price * o.size).toFixed(0)}</div></div>)
            }
          </div>
        </div>

        <style jsx>{`
          .tables {
            padding-top: 8px;
            display: flex;
            justify-content: space-between;
            height: 37px;
          } 
          .orders {
            width: 100%;
            color: #666;
          }
          .row {
            display: flex;
            justify-content: space-between;
          }
          .cell {
            width: 100px
          }
        `}</style>
      </div >
    )
  }
}