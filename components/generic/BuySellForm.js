import React, { useState } from "react"
// import useForm from '../customHooks/useForm'
import Orders from './Orders'

export default class BuySellForm extends React.Component {
  // const signup = () => alert(`
  //       Price: ${inputs.price}
  //       Theta: ${inputs.theta}
  //       USDT: ${inputs.USDT}
  //       `)
  // const { inputs, handleInputChange, handleSubmit } = useForm({}, signup)
  constructor(props) {
    super(props);
    this.state = {
      price: '',
      size: '',
      total: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this)
    this.submitOrder = this.submitOrder.bind(this)
  }

  submitOrder(e) {
    e.preventDefault();
    const price = parseFloat(this.state.price)
    const size = parseFloat(this.state.size)
    let id = Date.now() // unique id
    let currentOrderID = `${this.props.ticker}-${id}`
    // id type price size book
    this.state.price = ""
    this.state.size = ""
    this.state.total = ""
    // this.props.orderBook.placeNewOrder(currentOrderID, this.props.orderType, price, size)
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
    if (event.target.name === "price") {
      if (event.target.value === "") { this.state.total = 0 }
      else {
        if (this.state.size) this.state.total = parseFloat(event.target.value) * parseFloat(this.state.size)
      }
    }
    if (event.target.name === "size") {
      if (event.target.value === "") { this.state.total = 0 }
      else {
        if (this.state.price) this.state.total = parseFloat(event.target.value) * parseFloat(this.state.price)
      }
    }
    if (event.target.name === "total") {
      if (event.target.value === "") { this.state.total = 0 }
      else {
        if (this.state.price) this.state.size = parseFloat(event.target.value) / parseFloat(this.state.price)
      }
    }
  }

  render() {
    return (
      <form onSubmit={this.submitOrder} style={{ width: this.props.width }}>
        {/* <p className="dark">Your balance 0.0000 USDT D W</p>
        <p className="dark">Obtainable 0.0000 THETA</p> */}
        <p>{this.props.buttonText}</p>
        <div className="form-group">
          <input type="text" name="price" className="form-control" id="inputPrice" placeholder="Price USD" onChange={this.handleInputChange} value={this.state.price} required />
        </div>
        <div className="form-group">
          <input type="text" name="size" className="form-control" id="inputTheta" placeholder="Amount" onChange={this.handleInputChange} value={this.state.size} required />
        </div>
        <div className="form-group">
          <input type="text" name="total" className="form-control" id="inputUSDT" placeholder="Total" onChange={this.handleInputChange} value={this.state.total} required />
        </div>
        <p className="dark">Fee 0 USDT (0.2%)</p>
        <button type="submit" className={`btn btn-${this.props.buttonColor || "primary"}`} style={{ width: this.props.width }}>{this.props.buttonText}</button>
        <Orders orders={this.props.orders} />
        <style jsx>{`
                form {
                    width: 100%;
                }
                * {
                    box-sizing: border-box;
                }

                .form-group {
                    margin-bottom: 9px;
                }

                .form-control {
                    display: block;
                    width: 100%;
                    height: calc(1.5em + .75rem + 2px);
                    padding: .375rem .75rem;
                    font-size: 1rem;
                    font-weight: 400;
                    line-height: 1.5;
                    color: #495057;
                    background-color: #fff;
                    background-clip: padding-box;
                    border: 1px solid #ced4da;
                    border-radius: .25rem;
                    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
                }
                
                button, input {
                    overflow: visible;
                    margin: 0;
                }

                .btn {
                    display: inline-block;
                    font-weight: 400;
                    color: #212529;
                    text-align: center;
                    vertical-align: middle;
                    -webkit-user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;
                    user-select: none;
                    background-color: transparent;
                    border: 1px solid transparent;
                    padding: .375rem .75rem;
                    font-size: 1rem;
                    line-height: 1.5;
                    border-radius: .25rem;
                    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
                    margin-top: 4px;
                    width: 100%;
                }

                .btn-primary {
                    color: #fff;
                    background-color: #007bff;
                    border-color: #007bff;
                }
                p {
                    font-size: 13px;
                    letter-spacing: 0.25px;
                }

                .btn-green {
                    color: #fff;
                    background-color: rgb(77, 167, 53);
                    border-color: rbg(77, 167, 53);
                }

                .btn-red {
                    color: #fff;
                    background-color: rgb(228, 81, 38);
                    border-color: rgb(228, 81, 38);
                }

                
            `}</style>
      </form >
    )
  }
}