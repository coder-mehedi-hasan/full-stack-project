import React, { useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../App';

const Logout = () => {
    const navigate = useNavigate()
    const {state,dispatch}= useContext(userContext)
    useMemo(() => fetch('http://localhost:5000/logout',{
        method:'GET',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json'
        },
        credentials:'include'
    }).then((res)=>{
        if(res){
            localStorage.removeItem("landtaxbd")
            dispatch({type:"USER",payload:false})
            navigate('/login')
        }
    }).catch((err)=>{
        console.log(err)
    }),[])
    return (
        <></>
    );
};

export default Logout;