import React, { useState } from 'react';
import registrationbg from '../images/registrationbg.png';
import { NavLink, useNavigate  } from 'react-router-dom'


const Register = () => {
    const navigate = useNavigate()
    const [user,setUser]=useState({
        name:"",
        email:"",
        phone:"",
        work:"",
        password:"",
        cpassword:"",
    })
    let name, value;
    const handleInput = (e)=>{
        name = e.target.name;
        value = e.target.value

        setUser({...user, [name]:value})
    }
    
    const postData = async (event)=>{
        event.preventDefault();

        const { name, email,phone, work, password, cpassword } = user;
        
        const res = await fetch("/register",{
            method:'post',
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                name, email,phone, work, password, cpassword 
            })
        })

        const data = res.json();
        if(data.status === 422 || !data){
            window.alert("Invalid Registration")
            
        }else{
            window.alert('Registration Successfull')
            navigate("/login")
        }
    }

    return (
        <>
            <div id="register" className='d-flex justify-content-center align-items-center'>
                <div className='main p-5 bg-white w-50'>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="register-content">
                                <div className="form_title mb-3">
                                    <h3 className='fw-bold'>Sign Up</h3>
                                </div>
                                <form id='register_form' method='POST' className='register_form'>
                                    <div className="form_group my-3">
                                        <label htmlFor="name">
                                            <i className="fa-solid fa-user"></i>
                                        </label>
                                        <input type="text" id='name' name='name' autoComplete='off'
                                        value={user.name} 
                                        onChange={handleInput}
                                        placeholder='Your Name' />
                                    </div>
                                    <div className="form_group my-3">
                                        <label htmlFor="email">
                                            <i className="fa-solid fa-envelope"></i>
                                        </label>
                                        <input type="email" id='email' name='email' autoComplete='off'
                                        value={user.email} 
                                        onChange={handleInput}
                                        placeholder='Your Email' />
                                    </div>
                                    <div className="form_group my-3">
                                        <label htmlFor="phone">
                                            <i className="fa-solid fa-phone"></i>
                                        </label>
                                        <input type="phone" id='phone' name='phone' autoComplete='off'
                                        value={user.phone} 
                                        onChange={handleInput}
                                        placeholder='Your Phone' />
                                    </div>
                                    <div className="form_group my-3">
                                        <label htmlFor="work">
                                            <i className="fa-solid fa-user-tie"></i>
                                        </label>
                                        <input type="text" id='work' name='work' autoComplete='off'
                                        value={user.work} 
                                        onChange={handleInput}
                                        placeholder='Your Profession' />
                                    </div>
                                    <div className="form_group my-3">
                                        <label htmlFor="password">
                                            <i className="fa-solid fa-lock"></i>
                                        </label>
                                        <input type="password" id='password' name='password' autoComplete='off'
                                        value={user.password} 
                                        onChange={handleInput}
                                        placeholder='Your Password' />
                                    </div>
                                    <div className="form_group my-3">
                                        <label htmlFor="cpassword">
                                            <i className="fa-solid fa-lock"></i>
                                        </label>
                                        <input type="password" id='cpassword' name='cpassword' autoComplete='off'
                                        value={user.cpassword} 
                                        onChange={handleInput}
                                        placeholder='Confirm Password' />
                                    </div>
                                    <div className="my-3 form-button">
                                        <input type="submit" id='register' name='register' value='Register' className='btn fw-semibold'
                                        onClick={postData}
                                        />
                                    </div>
                                </form>
                            </div>

                        </div>
                        <div className="col-lg-6">
                            <div className="register_bg">
                            <img src={registrationbg} alt="registation" className='img-fluid' />
                            </div>
                            <NavLink to='/login' className='text-decoration-none text-center d-block text-dark fw-semibold'>I have already account</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;