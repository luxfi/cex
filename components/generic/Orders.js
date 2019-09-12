import React from "react";

export default class Orders extends React.Component {
  render() {
    const { orders } = this.props
    console.log('orders....', orders)
    return (
      <div className="orders">
        {orders}
        <style jsx>{`
        `}</style>
      </div >
    )
  }
}