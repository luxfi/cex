import React from "react";

export default class Orders extends React.Component {
  render() {
    const { buyOrders } = this.props
    console.log('orders....', buyOrders)
    return (
      <div className="orders">
        {buyOrders}
        <style jsx>{`
        `}</style>
      </div >
    )
  }
}