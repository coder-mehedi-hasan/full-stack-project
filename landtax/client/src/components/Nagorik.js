import React from 'react';
import nagorik from '../media/nagorik.png'

const Nagorik = () => {
    return (
        <>
        <div className='border-top border-black' style={{backgroundColor:'#870082'}}>
            <div className="pb-2 d-flex justify-content-end">
                <div className="me-3">
                    <img src={nagorik} alt="nagorik" />
                </div>
            </div>
        </div>   
        </>
    );
};

export default Nagorik;