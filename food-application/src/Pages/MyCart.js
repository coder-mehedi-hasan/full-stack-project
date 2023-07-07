import React from 'react';
import { useCart, useDispatchCart } from '../reducer/ContextReducer'

const MyCart = () => {
    let data = useCart()
    let dispatch = useDispatchCart()
    if (data.length === 0) {
        return (
            <div>
                <div className='m-5 w-100 text-center fs-5'>The Cart is Empty</div>
            </div>
        )
    }
    let totalPrice = data.reduce((total, food) => total + food.price, 0)
    const handleCheckOut = async () => {
        const userEmail = localStorage.getItem('userEmail')
        const response = await fetch('http://localhost:5000/orderData', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: userEmail,
                order_data: data,
                order_date: new Date().toDateString()
            })

        })
        if(response.status === 200){
            dispatch({ type: "DROP" })
        }
    }
    return (
        <>
            <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md table-responsive-lg table-responsive-xl table-responsive-xxl">
                <table className="table table-hover">
                    <thead className='text-success fs-4'>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Size</th>
                            <th scope="col">Amount</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((food, index) => (
                                <tr>
                                    <th scope='row'>{index + 1}</th>
                                    <td>{food.name}</td>
                                    <td>{food.quantity}</td>
                                    <td>{food.size}</td>
                                    <td>{food.price}</td>
                                    <td>
                                        <button className='btn p-0'><i className="fa-regular fa-trash-can" onClick={() => dispatch(({ type: 'REMOVE', index: index }))}></i></button>
                                    </td>
                                </tr>)

                            )}
                    </tbody>
                </table>
                <div>
                    <h3>Total Price {totalPrice}</h3>
                </div>
                <div>
                    <button className='btn bg-success mt-5' onClick={handleCheckOut}>Check Out</button>
                </div>
            </div>
        </>
    );
};

export default MyCart;