import React, { useEffect, useState } from 'react';
import SingleTax from '../components/SingleTax';
import { useNavigate } from 'react-router-dom';

const AllCollectedTax = () => {
    const navigate = useNavigate()
    const [search, setsearch] = useState('')
    const [info, setinfo] = useState([])
    const getData = async () => {
        const response = await fetch('http://localhost:5000/collectedtax', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json"
            },
            credentials: 'include'
        })
        setinfo(await response.json())
    }
    useEffect(() => {
        getData()
    }, [])
    return (
        <>
            <div className="container-fluid ">
                <div className="row">
                    <div className="col">
                        <h3 className='text-center my-2'>পরিশোধিত মোট কর : {info.length} ‍টি</h3>
                    </div>
                </div>
                <div className="row my-2 justify-content-center">
                    <div className="col-lg-8">
                        <form>
                            <input type="text" className='form-control' placeholder='অনুসন্ধান করুন'
                                name='search'
                                value={search}
                                onChange={e => { setsearch(e.target.value) }}
                            />
                        </form>
                    </div>
                </div>
                <div className="row">
                    <table className="table">
                        <thead>
                            <tr className='text-center'>
                                <th scope="col">ক্রমিক নং</th>
                                <th scope="col">মালিকের নাম</th>
                                <th scope="col">খতিয়ান নং</th>
                                <th scope="col">দাগ নং</th>
                                <th scope="col">পরিশোধ রসিদ</th>
                                <th scope="col">মুছে ফেলুন</th>
                            </tr>
                        </thead>
                        {
                            info.filter(info => (info.serialNo.toString().toLowerCase().includes(search.toLowerCase())) || (info.ownerName.toLowerCase().includes(search.toLowerCase())) || (info.khatianNo.toString().toLowerCase().includes(search.toLowerCase())) || (info.dagNo.toString().toLowerCase().includes(search.toLowerCase())))
                                .map((info, index) => {
                                    return (
                                        <SingleTax key={info.id} info={info} index={index}></SingleTax>
                                    )
                                })
                        }
                    </table>
                </div>
            </div>
        </>
    );
};

export default AllCollectedTax;