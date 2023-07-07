import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'

const Signin = () => {
    const navigate = useNavigate()
    const [employee, setemployee] = useState({})
    const inputHandle = (e) => {

        const name = e.target.name
        const value = e.target.value

        setemployee({ ...employee, [name]: value })
    }

    const submitRegistration = async (event) => {
        event.preventDefault()
        const response = await fetch('http://localhost:5000/createemployee', {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                employee
            })
        })
        if (response.status === 201) {
            alert('Employee Createed')
            navigate('/login')
        } else {
            alert('Employee Not Create')
        }
    }
    const nowDate = new Date()
    console.log(nowDate)
    return (
        <>
            <div className="container">
                <form className="row g-3" method='POST' onSubmit={submitRegistration}>
                    <div className="col-md-6" >
                        <label htmlFor="inputName">Name</label>
                        <input type="text" className="form-control" id="inputName" name='name' required placeholder='Name'
                            value={employee.name}
                            onChange={inputHandle}
                        />
                    </div>
                    <div className="col-md-6">

                        <label htmlFor="phone">Phone</label>
                        <input type="tel" className="form-control" id="phone" name='phone' required placeholder='Phone'
                            value={employee.phone}
                            onChange={inputHandle}
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control" id="email" name='email' required placeholder='Email'
                            value={employee.email}
                            onChange={inputHandle}
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password" name='password' required placeholder='Password'
                            value={employee.password}
                            onChange={inputHandle}
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="nidNo">Nid No</label>
                        <input type="number" className="form-control" id="nidNo" name='nidNo' required placeholder='Nid Number'
                            value={employee.nidNo}
                            onChange={inputHandle}
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="dateOfBirth">Date Of Birth</label>
                        <input type="date" className="form-control" id="dateOfBirth" name='dateOfBirth' required placeholder='Nid Number'
                            value={
                                employee.dateOfBirth
                            }
                            onChange={inputHandle}
                        />
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="designation">Designation Name</label>
                        <select name="designation" id="designation" className='form-select' required
                            onChange={inputHandle}>
                            <option>-------------</option>
                            <option value="Manager">Manager</option>
                            <option value="Account Officer">Account Officer</option>
                            <option value="Field Officer">Field Officer</option>
                        </select>
                    </div>
                    <div className="col-md-12">
                        <button className="btn btn-outline-light text-white w-100" type="submit">Submit form</button>
                    </div>
                </form>

            </div>
        </>
    );
};

export default Signin;