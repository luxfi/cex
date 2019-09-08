import React, { useState } from "react";
import useForm from '../customHooks/useForm'

export default props => {
    const signup = () => alert(`
        Price: ${inputs.price}
        Theta: ${inputs.theta}
        USDT: ${inputs.USDT}
        `)
    const { inputs, handleInputChange, handleSubmit } = useForm({}, signup)
    return (
        <form onSubmit={handleSubmit} style={{ width: props.width }}>
            <p className="dark">Your balance 0.0000 USDT D W</p>
            <p className="dark">Obtainable 0.0000 THETA</p>
            <div className="form-group">
                <input type="text" name="price" className="form-control" id="inputPrice" placeholder="Price USDT/THETA" onChange={handleInputChange} value={inputs.price} required />
            </div>
            <div className="form-group">
                <input type="text" name="theta" className="form-control" id="inputTheta" placeholder="Amount THETA" onChange={handleInputChange} value={inputs.theta} required />
            </div>
            <div className="form-group">
                <input type="text" name="USDT" className="form-control" id="inputUSDT" placeholder="Total USDT/THETA" onChange={handleInputChange} value={inputs.USDT} required />
            </div>
            <p className="dark">Fee 0 USDT (0.2%)</p>
            <button type="submit" className="btn btn-green" style={{ width: props.width }}>BUY</button>
            <style jsx>{`
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

                
            `}</style>
        </form>
    )
}