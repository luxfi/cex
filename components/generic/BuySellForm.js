import React, { useState } from "react";
import useForm from '../customHooks/useForm'

export default props => {
    const signup = () => alert(`Price: ${inputs.price}`)
    const { inputs, handleInputChange, handleSubmit } = useForm({}, signup)
    return (
        <form onSubmit={handleSubmit} style={{ width: props.width }}>
            <p>Your balance</p>
            <p>Obtainable</p>
            <div className="form-group">
                <input type="text" name="price" className="form-control" id="inputPrice1" placeholder="Price USDT/THETA" onChange={handleInputChange} value={inputs.price} />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            <style jsx>{`
                * {
                    box-sizing: border-box;
                }

                .form-group {
                    margin-bottom: 1rem;
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
                }

                .btn-primary {
                    color: #fff;
                    background-color: #007bff;
                    border-color: #007bff;
                }

                
            `}</style>
        </form>
    )
}