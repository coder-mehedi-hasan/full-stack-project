import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer'

const MyOrders = () => {
    const [myorder, setmyorder] = useState()
    const loadData = async () => {
        const userEmail = localStorage.getItem('userEmail')
        const response = await fetch('http://localhost:5000/myorder', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: userEmail
            })
        })
        const data = await response.json()
        setmyorder(data.orderData.order_data)
    }
    useEffect(() => {
        loadData()
    }, [])

    console.log(myorder)
    return (
        <>
            <div className='container'>
                <div className='row'>

                    {

                        myorder ?
                            myorder.map((item) => {
                                return (
                                    item.map((arrayData) => {
                                        return (
                                            <div  >
                                                {arrayData.Order_date ? 
                                                <div className='m-auto mt-5'>
                                            
                                                    {arrayData.Order_date}
                                                    <hr />
                                                </div> :

                                                    <div className='col-12 col-md-6 col-lg-3' >
                                                        <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                            <img src={arrayData.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                                                            <div className="card-body">
                                                                <h5 className="card-title">{arrayData.name}</h5>
                                                                <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                                    <span className='m-1'>{arrayData.qty}</span>
                                                                    <span className='m-1'>{arrayData.size}</span>
                                                                    <span className='m-1'>{}</span>
                                                                    <div className=' d-inline ms-2 h-100 w-20 fs-5' >
                                                                        ₹{arrayData.price}/-
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>



                                                }

                                            </div>
                                        )
                                    })

                                )
                            }) : ""


                    }
                </div>


            </div>
            <Footer></Footer>
        </>
    );
};

export default MyOrders;