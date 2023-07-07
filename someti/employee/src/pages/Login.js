import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { empContext } from '../App';

const Login = () => {
    const navigate = useNavigate()
    const { state, dispatch } = useContext(empContext)
    const [user, setUser] = useState({ email: "", password: "" })
    let name, value
    const inputHandle = (e) => {
        name = e.target.name;
        value = e.target.value

        setUser({ ...user, [name]: value })
    }
    const logInSubmit = async (e) => {
        e.preventDefault()
        const { email, password } = user
        const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, password
            })
            ,
            credentials:'include'
        })

        if (response.status === 200) {
            alert('LogIn Success')
            dispatch({type:"employee",payload:true})
            navigate('/')
        } else {
            alert('Invalid Credantials')
        }

    }
    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <form onSubmit={logInSubmit} method='POST'>
                            <div className="mb-3">
                                <label htmlFor="inputEmail" className="form-label">Email address</label>
                                <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp"
                                    name='email'
                                    value={user.email}
                                    onChange={inputHandle}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="inputPassword" className="form-label">Password</label>
                                <input type="password" className="form-control" id="inputPassword"
                                    name='password'
                                    value={user.password}
                                    onChange={inputHandle}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;