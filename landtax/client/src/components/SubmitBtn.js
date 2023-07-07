import React from 'react';

const SubmitBtn = (props) => {
    return (
        <>
            <div className="row justify-content-center px-5 mb-2">
                <div className="col text-center">
                <button className='btn btn-success' onClick={props.event}>{props.value}</button>
                </div>
            </div>
        </>
    );
};

export default SubmitBtn;