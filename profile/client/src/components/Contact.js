import React, { useEffect, useState } from 'react';

const Contact = () => {
    const [userData, setUserData] = useState({name:"" , email:"" , phone:"" , message:"" })
    // const [user, setUser] = useState({})
    const callContactPage = async ()=>{
        try{
            const res = await fetch('/getData',{
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                },
            })
            const data = await res.json();
            // setUserData({ ...userData, name:data.name})
            // console.log(data)
            // setUser(data)
            setUserData({ ...userData, name:data.name , email: data.email , phone: data.phone })

        }catch(error){
            console.log(error)
        }
    };
    useEffect(() => {
        callContactPage();
    }, []);
    const inputHandle = (event)=>{
        const name = event.target.name
        const value = event.target.value;
        
        setUserData({...userData, [name]:value})
    };

    const postMessage = async (e)=>{
        e.preventDefault();

        const { name, email, phone , message } = userData
        const res = await fetch("/contact",{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                name, email, phone , message
            })
        })
        const data = res.json()

        if(!data){
           alert('Contact Failed')
        }else{
            alert('Contact Successfull')
            setUserData({...userData,message:"" })
        }

    }
    return (
        <>
            <div id="contact">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            {/* contact information top   */}
                            <div className="row">
                                <div className="col-lg-4 px-3 ">
                                    <div className="contact-item p-2 bg-white d-flex align-items-center">
                                        <div className='p-2'>
                                            <i className="fa-solid fa-mobile-screen"></i>
                                        </div>
                                        <div className="contact-item-info p-2">
                                            <h3 className='m-0'>Phone</h3>
                                            <p className='my-1'>
                                                +8801913382360
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 px-3">
                                    <div className="contact-item p-2 bg-white d-flex align-items-center">
                                        <div className='p-2'>
                                            <i className="fa-solid fa-envelope"></i>
                                        </div>
                                        <div className="contact-item-info p-2">
                                            <h3 className='m-0'>Email</h3>
                                            <p className='my-1'>
                                                mdmehedihasan2360@gmail.com
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 px-3">
                                    <div className="contact-item p-2 bg-white d-flex align-items-center">
                                        <div className='p-2'>
                                            <i className="fa-solid fa-location-dot"></i>
                                        </div>
                                        <div className="contact-item-info p-2">
                                            <h3 className='m-0'>Address</h3>
                                            <p className='my-1'>
                                                Sirajganj, Bangaldesh
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* contact information user   */}
                            <div className="contact_form">
                                <div className="row justify-content-center">
                                    <div className="col-lg-8">
                                        <div className="contact-form-info w-100">
                                            <div className="title">
                                                <h4>
                                                    Get in Touch
                                                </h4>
                                            </div>
                                            <form id='contact-form' method='POST' >
                                                <div className="contact-form-info-user-field">
                                                    <div className="row py-2">
                                                        <div className="col-lg-4 px-3">
                                                            <input type="text" id='contact-form-info-user-name' className='contact-form-info-user-name' required
                                                            name="name"
                                                            value={userData.name}
                                                            onChange={inputHandle}
                                                            placeholder='Your Name' />
                                                        </div>
                                                        <div className="col-lg-4 px-3">
                                                            <input type="email" id='contact-form-info-user-email' className='contact-form-info-user-email' required 
                                                            name="email"
                                                            value={userData.email}
                                                            onChange={inputHandle}
                                                            placeholder='Your Email' />
                                                        </div>
                                                        <div className="col-lg-4 px-3">
                                                            <input type="number" id='contact-form-info-user-number' className='contact-form-info-user-number' required 
                                                            name="phone"
                                                            value={userData.phone}
                                                            onChange={inputHandle}
                                                            placeholder='Your Number' />
                                                        </div>
                                                    </div>
                                                    <div className="row px-3">
                                                        <textarea id="contact-form-info-user-message" cols="30" rows="10" className='contact-form-info-user-message'
                                                            name="message"
                                                            value={userData.message}
                                                            onChange={inputHandle} 
                                                            placeholder='Your Message'
                                                        ></textarea>
                                                    </div>
                                                    <div className="contact-message-send">
                                                        <button type='submit' className='btn btn-primary mt-2' onClick={postMessage}>Send Message</button>
                                                        {/* <input type="submit" value="Send Message"className='btn btn-primary mt-2' onClick={postMessage} /> */}
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Contact;