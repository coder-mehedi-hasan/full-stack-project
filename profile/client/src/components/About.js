import React, { useEffect, useState } from 'react';
import profilepic from '../images/profile.jpg'
import { useNavigate } from 'react-router-dom';

const About = () => {
    const navigate = useNavigate()
    const [userData, setUserData] = useState({})
    const callAboutPage = async ()=>{
        try{
            const res = await fetch('/about',{
                method:"GET",
                headers:{
                    Accept:"application/json",
                    "Content-Type":"application/json"
                },
                credentials:"include"
            })
            const data = await res.json();
            // console.log(data)
            setUserData(data)

        }catch(error){
            console.log(error)
            navigate('/login')
        }
    };
    useEffect(() => {
        callAboutPage()
    })
    return (
        <>
            <div id="about-page">
                <div className="container">
                    <form method="GET">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="about-page-content w-100 p-5">
                                <div className="row">
                                    <div className="col-md-4 p-3">
                                        <div className="profile-img">
                                            <img src={profilepic} alt="profile img" className='img-fluid' />
                                        </div>
                                    </div>
                                    <div className="col-md-6 p-3">
                                        <div className="profile-info my-3">
                                            <h5 className='profile-info-name'>{userData.name}</h5>
                                            <h6 className='profile-info-profession text-primary'>{userData.work}</h6>
                                            <p className='profile-info-ranking mt-3 fw-semibold'>Rankings: <span className='fw-bold'>1/10</span></p>
                                        </div>
                                        <div className="profile-info-tab mt-5">
                                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                                <li className="nav-item" role="presentation">
                                                    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Home</button>
                                                </li>
                                                <li className="nav-item" role="presentation">
                                                    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Profile</button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-md-2 py-3">
                                        <div className="profile-info-edit">
                                            <input type="submit" value='Edit Profile' id='edit-profile' className='btn btn-outline-secondary' />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="profile-user-link">
                                            <div className='my-1'><a href="https://www.youtube.com/channel/UCtvqVrt5kALu466FKch-rHw" target='_mehedi' className='text-decoration-none text-black fw-semibold'>YouTube</a></div>
                                            <div className='my-1'><a href="https://www.facebook.com/mehedihasan2360" target='_mehedi' className='text-decoration-none text-black fw-semibold'>Facebook</a></div>
                                            <div className='my-1'><a href="https://www.instagram.com/mdmehedihasan2360/" target='_mehedi' className='text-decoration-none text-black fw-semibold'>Instagram</a></div>
                                            <div className='my-1'><a href="https://twitter.com/mehedihasan2360" target='_mehedi' className='text-decoration-none text-black fw-semibold'>Twitter</a></div>
                                            <div className='my-1'><a href="https://www.linkedin.com/in/md-mehedi-hasan-1b93b6261/" target='_mehedi' className='text-decoration-none text-black fw-semibold'>Linkdin</a></div>
                                            <div className='my-1'><a href="https://github.com/coder-mehedi-hasan" target='_mehedi' className='text-decoration-none text-black fw-semibold'>Github</a></div>
                                        </div>
                                    </div>
                                    <div className="col-md-8 ps-3 about-page-info">
                                        <div className="tab-content" id="myTabContent">
                                            <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex="0">
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <label className='fw-medium'>User ID</label>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <p className='fw-semibold text-primary text-primary-emphasis'>{userData._id}</p>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <label className='fw-medium'>Name</label>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <p className='fw-semibold text-primary text-primary-emphasis'>{userData.name}</p>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <label className='fw-medium'>Email</label>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <p className='fw-semibold text-primary text-primary-emphasis'>{userData.email}</p>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <label className='fw-medium'>Phone</label>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <p className='fw-semibold text-primary text-primary-emphasis'>{userData.phone}</p>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <label className='fw-medium'>Proffesion</label>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <p className='fw-semibold text-primary text-primary-emphasis'>{userData.work}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex="0">
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <label className='fw-medium'>Experience</label>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <p className='fw-semibold text-primary text-primary-emphasis'>Expert</p>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <label className='fw-medium'>Hourly Rate</label>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <p className='fw-semibold text-primary text-primary-emphasis'>10$/hr</p>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <label className='fw-medium'>Total Project</label>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <p className='fw-semibold text-primary text-primary-emphasis'>77</p>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <label className='fw-medium'>English Level</label>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <p className='fw-semibold text-primary text-primary-emphasis'>Intermediate</p>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <label className='fw-medium'>Avaibility</label>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <p className='fw-semibold text-primary text-primary-emphasis'>6 months/year</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default About;