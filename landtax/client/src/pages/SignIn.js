import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const [user,setuser] = useState({name:'',email:'',phone:'',password:''})
    const navigate = useNavigate()
    const handleChange = (e)=>{
        const name = e.target.name
        const value = e.target.value
        setuser({...user,[name]:value})
    }
    const signInSubmit = async (e)=>{
        e.preventDefault()
        const response = await fetch('http://localhost:5000/register',{
            method:'POST',
            headers:{
                "Content-Type":'application/json'
            },
            body:JSON.stringify({
                user
            })
        })
        if(response.status !== 201){
            alert('register failed')
        }else{
            alert("register success")
            navigate('/login')
        }
    }
    return (
        <>
            <div className='mt-5'>
                <div className='container'>
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <form method='POST' onSubmit={signInSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Full Name</label>
                                    <input type="text" className="form-control" id="name"
                                     name='name'
                                     value={user.name}
                                     onChange={handleChange}
                                     />
                                </div>
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
                                    <label htmlFor="phone" className="form-label">Phone Number</label>
                                    <input type="number" className="form-control" id="phone"
                                    required
                                     name='phone'
                                     value={user.phone}
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
                                <button type="submit" className="btn btn-primary">Sign In</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignIn;