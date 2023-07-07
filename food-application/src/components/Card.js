import React, { useState,useRef, useEffect } from 'react';
import { useCart,useDispatchCart } from '../reducer/ContextReducer'

const Card = (props) => {
    let dispatch = useDispatchCart()
    const { _id,name,img, description} = props.foodItem
    const data = useCart()
    const options = props.options
    const priceOption = Object.keys((options))
    const [quantity, setquantity] = useState(1)
    const [size, setsize] = useState('')
    const sizeRef = useRef()
    let food = []
    const handleAddCart = async ()=>{
        for(const item of data){
            if(item.id === _id){
                food = item
                break
            }
        }
        if(food !== []){
            if(food.size === size){
                await dispatch({type:'UPDATE',id:_id,name:name,price:finalPrice, quantity:quantity,})
                return
            }
            else if(food.size !== size){
                await dispatch({type:'ADD',id:_id,name:name,price:finalPrice, quantity:quantity, size:size, img:img })
                return
            }
            return
        }
        await dispatch({type:'ADD',id:_id,name:name,price:finalPrice, quantity:quantity, size:size, img:img })
    }

    const finalPrice = quantity * parseInt(options[size])
    useEffect(()=>{
        setsize(sizeRef.current.value)
    },[])
    return (
        <>
            <div className="card my-3 mx-2" style={{maxHeight:'500px'  }}>
                <img src={img} className="card-img-top" style={{height:'180px' ,objectFit:'fill'  }}  alt="food" />
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text">{description}</p>
                    <div className="p-0 w-100">
                        <select className="m-1 p-1 bg-success rounded" id="quantity-pcs"
                        onChange={(e)=>setquantity(e.target.value)}
                        >
                        {
                            Array.from(
                                Array(10), (e,i)=>{
                                    return (
                                        <option key={i+1} value={i+1}>{i+1}</option>
                                    )
                                }
                            )
                        }
                        </select>
                        <select className="m-1 p-1 bg-success text-capitalize rounded" id="quantity-hf" ref={sizeRef}
                        onChange={(e)=>setsize(e.target.value)}
                        >
                            {
                                priceOption !== [] ?
                                priceOption.map(data =>{
                                    return (
                                        <option value={data} key={data} className='text-capitalize'>{data}</option>
                                    )
                                }):''
                            }
                        </select>
                        <h4 className='d-inline'>{finalPrice}</h4>
                        <button className='btn btn-success text-white w-100 py-1 my-2 btn-outline-none' onClick={handleAddCart}>Add to cart</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Card;