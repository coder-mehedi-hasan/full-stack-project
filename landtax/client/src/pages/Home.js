import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'

const Home = () => {   
    const navigate = useNavigate()
    const landTokenStorage = localStorage.getItem('landtaxbd')
    const landTokenCookie = document.cookie.split('; ').find((row) => row.startsWith('landtaxbd='))?.split('=')[1];
    useEffect(() => {
        if (landTokenCookie && landTokenStorage && landTokenCookie === landTokenStorage) {
            navigate('/')
        } else {
            navigate('/login')
        }
    }, [])
    return (
        <>
            <div className="container-fluid">
                <div id="home">
                    <div className="main">
                        <div className="row">
                            <div className="col">
                                <Link className='btn d-block ' to="/করপরিশোধ">কর পরিশোধ</Link>
                            </div>
                            <div className="col">
                                <Link className='btn d-block ' to="/সকল/পরিশোধিতকর">পরিশোধিত সকল কর</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;