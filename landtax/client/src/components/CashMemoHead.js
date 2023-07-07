import React from 'react';

const CashMemoHead = (props) => {
    return (
        <div>
            <div className="row justify-content-between">
                <div className="col">
                    <p className='m-0'>বাংলাদেশ ফরম নং ১০৭৭</p>
                    <p className='m-0'>(সংশোধিত)</p>
                </div>
                <div className="col">
                    <p className='m-0 text-end'>পরিশিষ্ট</p>
                    <p className='m-0 text-end'>ক্রমিক নং : {
                        props.id ? props.id : ''
                    }</p>
                </div>
                <div className="col">
                    <p className='m-0 text-center'>ভূমি উন্নয়ন কর পরিশোধ রসিদ</p>
                    <p className='m-0 text-center'>(অনুচ্ছেদ ৩৯২ দ্রষ্টব্য)</p>
                </div>
            </div>
            <div className="row">
                
            </div>
        </div>
    );
};

export default CashMemoHead;