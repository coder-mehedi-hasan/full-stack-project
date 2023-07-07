import React from 'react';
import { NavLink } from 'react-router-dom';

const Errorpage = () => {
    return (
        <>
        <div id="error-page" className='d-flex justify-content-center align-items-center'>
            <div className="error-content">                
                <h1>404</h1>
                <h3 className='mb-3'> We are sorry, page not found! </h3>
                <p className='text-center'><NavLink to='/' className='py-2 px-4 text-decoration-none rounded-pill'>Back To Homepage</NavLink></p>
            </div>
        </div>   
        </>
    );
};

export default Errorpage;