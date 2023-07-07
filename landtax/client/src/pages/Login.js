import React, { useContext, useState } from 'react';
import {useNavigate} from 'react-router-dom'
import { userContext } from '../App';

const Login = () => {
    const {state,dispatch} = useContext(userContext)
    const navigate = useNavigate()
    const [user,setuser] = useState({email:'',password:''})
    const handleChange = (e)=>{
        const name = e.target.name
        const value = e.target.value
        setuser({...user,[name]:value})
    }
    const loginSubmit =async (e)=>{
        e.preventDefault()
        const response = await fetch('http://localhost:5000/login',{
            method:'POST',
            headers:{
                "Content-Type":'application/json'
            },
            body:JSON.stringify({
                user
            }),
            credentials:'include'
        })
        const info = await response.json()
        if(response.status !== 200){
            alert('Login failed')
        }else{
            alert("Login success")
            localStorage.setItem("landtaxbd",info.landtaxbdtoken)
            dispatch({type:'USER',payload:true})
            navigate('/')
        }
    }
    return (
        <>
            <div className='mt-5'>
                <div className='container'>
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <form method='POST' onSubmit={loginSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email address</label>
                                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp"
                                    required
                                     name='email'
                                     value={user.email}
                                     onChange={handleChange}
                                     />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="password"
                                    required
                                    name='password'
                                    value={user.password}
                                    onChange={handleChange}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">Log In</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;