import React, { useContext, useState } from 'react';
import registrationbg from '../images/registrationbg.png';
import { NavLink, useNavigate } from 'react-router-dom'
import { userContext } from '../App';

const Login = () => {
    const { state, dispatch } = useContext(userContext) 
    const navigate  = useNavigate()
    const [email, setEmail ] = useState('')
    const [password, setPassword] = useState('')

    const dataLogin = async (event)=>{
        event.preventDefault();
        const res = await fetch('/signin',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email,
                password
            })
        })
        const data = res.json()
        if(data.status === 401 || !data){
            window.alert('Login Failed')
        }else{
            dispatch({type:"USER", payload:true})
            window.alert("LogIn Successful")
            navigate('/')
        }
    }
    return (
        <>
            <div id="login" className='d-flex justify-content-center align-items-center'>
                <div className='main p-5 bg-white w-50'>
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="login_bg">
                                <img src={registrationbg} alt="login bg" className='img-fluid' />
                            </div>
                            <NavLink to='/register' className='text-decoration-none text-center d-block text-dark fw-semibold'>Create An Account</NavLink>
                        </div>
                        <div className="col-lg-6">
                            <div className="login-content">
                                <div className="form_title mb-3">
                                    <h3 className='fw-bold'>Log In</h3>
                                </div>
                                <form id='login_form' method='POST' className='login_form'>
                                    <div className="form_group my-3">
                                        <label htmlFor="email">
                                            <i className="fa-solid fa-envelope"></i>
                                        </label>
                                        <input type="email" id='email' name='email' autoComplete='off'
                                        value={email}
                                        onChange={(e)=> setEmail(e.target.value)}
                                        placeholder='Your Email' />
                                    </div>
                                    <div className="form_group my-3">
                                        <label htmlFor="password">
                                            <i className="fa-solid fa-lock"></i>
                                        </label>
                                        <input type="password" id='password' name='password' autoComplete='off'
                                        value={password}
                                        onChange={(e)=> setPassword(e.target.value)}
                                        placeholder='Your Password'/>
                                    </div>
                                    <div className="my-3 form-button">
                                        <input type="submit" id='login' name='login' value='login' className='btn fw-semibold' 
                                        onClick={dataLogin}
                                        />
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;