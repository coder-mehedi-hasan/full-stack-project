import React, { useContext, useEffect } from 'react';
import { empContext } from '../App';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const { state, dispatch } =  useContext(empContext)
    const navigate = useNavigate()
    useEffect(() => {
        fetch('http://localhost:5000/logout',{
            method:'GET',
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
            },
            credentials:'include'
        }).then((res)=>{
            dispatch({type:'employee',payload:false})
            navigate('/')
        }).catch((err)=>{
            console.log(err)
        })
    })
    return (
        <>
        </>
    );
};

export default Logout;