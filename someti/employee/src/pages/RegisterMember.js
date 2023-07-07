import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterMember = () => {
    const navigate = useNavigate()
    const [empInfo, setEmpInfo] = useState({})

    const empName = empInfo.name
    const [memberInfo, setMemberInfo] = useState({ refName: empName })

    //submit member creation
    const registerSubmitMember = async (event) => {
        event.preventDefault()
        const response = await fetch('http://localhost:5000/createmember', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                memberInfo
            }),
            credentials:'include'
        })
        if (response.status === 201) {
            alert('Member Created')
            navigate('/')
        } else {
            alert('Member Not Created')
        }
    }

    const handleMemberInput = (e) => {
        const name = e.target.name
        const value = e.target.value
        setMemberInfo({ ...memberInfo, [name]: value })
    }
    //get employee info 
    const getEmpInfo = async () => {
        const response = await fetch('http://localhost:5000/registermemberpage', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                "Content-Type": 'application/json'
            },
            credentials: 'include'
        })
        const info = await response.json()
        if (response.status === 200) {
            setMemberInfo({ ...memberInfo, refName: info.name, refId: info._id })
            setEmpInfo(info)
        }
    }

    useEffect(() => {
        getEmpInfo()
    }, [])
    return (
        <>
            <div className='container'>
                <form method='POST' onSubmit={registerSubmitMember}>

                    <div className="mb-3">
                        <label htmlFor='name' className="form-label">Name</label>
                        <input type="text" className="form-control" id="name"
                            name='name'
                            value={memberInfo.name}
                            onChange={handleMemberInput}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor='fatherName' className="form-label">Father name</label>
                        <input type="text" className="form-control" id="fatherName"
                            name='fatherName'
                            value={memberInfo.fatherName}
                            onChange={handleMemberInput}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor='motherName' className="form-label">Mother name</label>
                        <input type="text" className="form-control" id="motherName"
                            name='motherName'
                            value={memberInfo.motherName}
                            onChange={handleMemberInput}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor='nidOrBirth' className="form-label">Nid/Birth No</label>
                        <input type="text" className="form-control" id="nidOrBirth"
                            name='nidOrBirth'
                            value={memberInfo.nidOrBirth}
                            onChange={handleMemberInput}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor='phone' className="form-label">Phone</label>
                        <input type="tel" className="form-control" id="phone"
                            name='phone'
                            value={memberInfo.phone}
                            onChange={handleMemberInput}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor='serialNo' className="form-label">Serial No</label>
                        <input type="text" className="form-control" id="serialNo"
                            name='serialNo'
                            value={memberInfo.serialNo}
                            onChange={handleMemberInput}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Create Member</button>
                </form>
            </div>
        </>
    );
};

export default RegisterMember;