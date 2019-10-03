import React, { useState } from "react"
// import useForm from '../customHooks/useForm'

import { padDollarAmount } from '../utils/generic'
import Orders from './Orders'

function precision(a) {
  if (!isFinite(a)) return 0
  let e = 1, p = 0
  while (Math.round(a * e) / e !== a) { e *= 10; p++; }
  return p
}

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
    const size = parseInt(this.state.size)
    if (!price || !size) return //still need to validate
    let id = Date.now() // unique id
    let currentOrderID = `${this.props.ticker}-${id}`
    // id type price size book
    const { ticker, movieCategories } = this.props
    const orderData = {
      ticker: ticker,
      amount: size,
      price: price.toFixed(2),
      categories: movieCategories
    }
    
    this.props.orderBook.placeNewOrder(currentOrderID, this.props.orderType, price, size, orderData, this.props.onExecute)
    this.setState({
      price: "",
      size: "",
      total: ""
    })
  }

  handleInputChange(event) {
    const newState = this.state
    let newVal = event.target.value

    // if (newVal.indexOf('$') > -1) newVal = parseFloat(newVal.split('$').slice(-1).pop())
    
    if (newVal === "" || newVal === 0) {
      newState.total = ""
    } else {
      // Parse the number properly
      if (event.target.name === 'size') newVal = parseInt(newVal)
      else {
        newVal = parseFloat(newVal)
      }

      if (event.target.name === "price") {
        if (precision(newVal) > 2) newVal = newVal.toFixed(2)
        if (newState.size) {
          const total = newVal * newState.size
          newState.total = total.toFixed(2)
        }
      } else if (event.target.name === "size") {
        if (newState.price) {
          const total = newVal * newState.price
          newState.total = total.toFixed(2)
        }
      } else if (event.target.name === "total") {
        if (newState.price) {
          const size = Math.ceil(newVal / newState.price)
          newState.size = size
        }
      }
    }
    
    newState[event.target.name] = newVal
    this.setState(newState)
  }

  render() {
    const { orders, buttonColor, buttonText, width, orderType, maxSell } = this.props
    const amountPlaceholder = orderType === 'bid' ?
      'Number of Shares' : `Number of Shares (max ${maxSell})`
    return (
      <form onSubmit={this.submitOrder} style={{ width: width }}>
        {/* <p className="dark">Your balance 0.0000 USDT D W</p>
        <p className="dark">Obtainable 0.0000 THETA</p> */}
        <p>{buttonText}</p>
        <div className="form-group">
          <input 
          type="number" name="price" 
          className="form-control" id="inputPrice" 
          placeholder="Price ($)" onChange={this.handleInputChange} 
          // value={this.state.price !== '' ? `$${this.state.price}` : ''} />
          value={this.state.price} />
        </div>
        <div className="form-group">
          <input type="number" name="size" className="form-control" id="inputTheta" placeholder={amountPlaceholder} onChange={this.handleInputChange} value={this.state.size} />
        </div>
        <div className="form-group">
          <input disabled type="string" 
            name="total" className="form-control" 
            id="inputUSD" placeholder="Total ($)" 
            onChange={this.handleInputChange} 
            value={this.state.total !== '' ? `$${this.state.total}` : ''} />
        </div>
        {/* <p className="dark">Fee 0 USDT (0.2%)</p> */}
        <button type="submit" className={`btn btn-${buttonColor || "primary"}`} style={{ width: width }}>{buttonText}</button>
        <Orders orders={orders} />
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