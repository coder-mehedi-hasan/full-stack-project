import React, { useEffect, useState } from 'react';


const Home = () => {
    const [userData, setUserData] = useState()
    const [user, setUser] = useState(false)
    // const user = true
    // const [user, setUser] = useState({})
    const callHomePage = async ()=>{
        try{
            const res = await fetch('/getData',{
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                },
            })
            const data = await res.json();
            setUserData(data.name)
            setUser(true)

        }catch(error){
            console.log(error)
        }
    };
    useEffect(() => {
        callHomePage();
    });
    return (
        <>
            <div id="home">
                <div className="d-flex align-items-center justify-content-center w-100 h-100">
                    <div>
                        <p className='text-center fw-bold fs-5 text-info'>WELLCOME</p>
                        <h3 className='fw-bold fs-1 text-center text-uppercase'>{userData}</h3>
                        <h4 className='fw-normal fs-4 text-center'>{ user ?"Happy, to see you back":"We Are The MERN Developer"}</h4>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;