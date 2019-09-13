import React from "react";

export default class Orders extends React.Component {
  render() {
    const { orders } = this.props
    // console.log('orders orders', orders)
    return (
      <div className="orders">
        {
          orders.map((o, i) => <div key={i}>price: {o.price}, size: {o.size}, total: {(o.price * o.size).toFixed(0)}</div>)
        }
        <style jsx>{`
        `}</style>
      </div >
    )
  }
}