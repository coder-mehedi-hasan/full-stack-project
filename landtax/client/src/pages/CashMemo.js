import React, { useEffect, useState } from 'react';
import CashMemoHead from '../components/CashMemoHead';
import { useNavigate } from 'react-router-dom'
import { getDate } from 'bangla-calendar'


const CashMemo = () => {
    const navigate = useNavigate()
    const [memo, setmemo] = useState({ city_council_union: "", mouza_jlNo: "", upazila_policeStation: "", district: "", ownerName: "", holdingNo: "", landType: "", khatianNo: "", dagNo: "", land_quantity: "", threeYearsUpDue: '', lastThreeYearsDue: '', dueExtraCharge: '', settledDemmand: '', totalDemmand: '', totalCollection: '',totalCollectionText:'', totalDue: '', comments: '', todayDateBangla: getDate(new Date()), todayDateEng: new Date().toLocaleDateString('bn-BD'), })
    const handleChange = (e) => {
        setmemo({ ...memo, [e.target.name]: e.target.value })
    }
    const submissionMemo = async (e) => {
        e.preventDefault()
        const response = await fetch('http://localhost:5000/taxsubmit', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                memo
            }),
            credentials: 'include'
        })
        const info = await response.json()
        if (response.status !== 201) {
            alert('কর পরিশোধ সম্পূর্ণ হয়নি')
        } else {
            alert('কর পরিশোধ সম্পূর্ণ হয়েছে')
            setmemo({ ...memo, city_council_union: "", mouza_jlNo: "", upazila_policeStation: "", district: "", ownerName: "", holdingNo: "", landType: "", khatianNo: "", dagNo: "", land_quantity: "", threeYearsUpDue: '', lastThreeYearsDue: '', dueExtraCharge: '', settledDemmand: '', totalDemmand: '', totalCollection: '', totalDue: '', comments: '',totalCollectionText:"" })
            navigate(`/${info.memo[0].serialNo}`)
        }
    }
    const landTokenStorage = localStorage.getItem('landtaxbd')
    const landTokenCookie = document.cookie.split('; ').find((row) => row.startsWith('landtaxbd='))?.split('=')[1];
    useEffect(() => {
        if (landTokenCookie && landTokenStorage && landTokenCookie === landTokenStorage) {
            navigate('/করপরিশোধ')
        } else {
            navigate('/login')
        }
    }, [])
    return (
        <>
            <div className='mt-3 cashmemo'>
                <div className="container-fluid">
                    <CashMemoHead></CashMemoHead>
                    <div className="row">
                        <div className="col-lg-12">
                            <form method='POST' onSubmit={submissionMemo}>
                                <div id='memoOwnerInfo'>
                                    <div className="mb-1 row">
                                        <label htmlFor='city_council_union' className="col-sm-3 col-form-label">সিটি কর্পোরেশন /পৌর /ইউনিয়ন ভূমি অফিসের নাম</label>
                                        <div className="col-sm-9">
                                            <input type="text" className="form-control" id="city_council_union"
                                                name='city_council_union'
                                                value={memo.city_council_union}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="mb-1 row">
                                                <label htmlFor="mouza_jlNo" className="col-sm-3 col-form-label">মৌজা ও জে. এল নং</label>
                                                <div className="col-sm-9">
                                                    <input type="text" className="form-control" id="mouza_jlNo"
                                                        name='mouza_jlNo'
                                                        value={memo.mouza_jlNo}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="mb-1 row">
                                                <label htmlFor="upazila_policeStation" className="col-sm-3 col-form-label">উপজেলা / থানা</label>
                                                <div className="col-sm-9">
                                                    <input type="text" className="form-control" id="upazila_policeStation"
                                                        name='upazila_policeStation'
                                                        value={memo.upazila_policeStation}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="mb-1 row">
                                                <label htmlFor="district" className="col-sm-3 col-form-label">জেলা</label>
                                                <div className="col-sm-9">
                                                    <input type="text" className="form-control" id="district"
                                                        name='district'
                                                        value={memo.district}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="mb-1 row">
                                                <label htmlFor="ownerName" className="col-sm-3 col-form-label">মালিকের নাম</label>
                                                <div className="col-sm-9">
                                                    <input type="text" className="form-control" id="ownerName"
                                                        name='ownerName'
                                                        value={memo.ownerName}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-1 row">
                                        <label htmlFor="holdingNo" className="col-sm-3 col-form-label">২ নং রেজিষ্টার অনুযায়ী হোল্ডিং নাম্বার </label>
                                        <div className="col-sm-9">
                                            <input type="text" className="form-control" id="holdingNo"
                                                name='holdingNo'
                                                value={memo.holdingNo}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-1 row">
                                        <label htmlFor="landType" className="col-sm-2 col-form-label">জমির শ্রেণী</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" id="landType"
                                                name='landType'
                                                value={memo.landType}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-1 row">
                                        <label htmlFor="khatianNo" className="col-sm-2 col-form-label">খতিয়ান নং</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" id="khatianNo"
                                                name='khatianNo'
                                                value={memo.khatianNo}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-1 row">
                                        <label htmlFor="dagNo" className="col-sm-2 col-form-label">দাগ নং</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" id="dagNo"
                                                name='dagNo'
                                                value={memo.dagNo}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-1 row">
                                        <label htmlFor="land_quantity" className="col-sm-2 col-form-label">জমির পরিমাণ(শতক)</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" id="land_quantity"
                                                name='land_quantity'
                                                value={memo.land_quantity}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div id='memoInfo'>
                                    <div className="row mt-4 border-top">
                                        <table className="table table-striped-columns">
                                            <thead>
                                                <tr className='text-center'>
                                                    <th colSpan={8}>আদায়ের বিবরণ</th>
                                                </tr>
                                                <tr className='text-center'>
                                                    <th><label htmlFor="তিন বৎসরের ঊর্ধ্বের বকেয়া"> তিন বৎসরের ঊর্ধ্বের বকেয়া </label></th>
                                                    <th><label htmlFor="গত তিন বৎসরের বকেয়া"> গত তিন বৎসরের বকেয়া </label></th>
                                                    <th><label htmlFor="বকেয়ার সুদ ও ক্ষতি পূরন"> বকেয়ার সুদ ও ক্ষতি পূরন </label></th>
                                                    <th><label htmlFor="হাল দাবি"> হাল দাবি  </label></th>
                                                    <th><label htmlFor="মোট দাবি"> মোট দাবি  </label></th>
                                                    <th><label htmlFor="মোট আদায়"> মোট আদায় </label></th>
                                                    <th><label htmlFor="মোট বকেয়া"> মোট বকেয়া </label></th>
                                                    <th><label htmlFor="মন্তব্য"> মন্তব্য </label></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td><input type="text" className='form-control border-0 text-center' id='তিন বৎসরের ঊর্ধ্বের বকেয়া'
                                                        name='threeYearsUpDue'
                                                        value={memo.threeYearsUpDue}
                                                        onChange={handleChange}
                                                    /></td>
                                                    <td><input type="text" className='form-control border-0 text-center' id='গত তিন বৎসরের বকেয়া'
                                                        name='lastThreeYearsDue'
                                                        value={memo.lastThreeYearsDue}
                                                        onChange={handleChange}
                                                    /></td>
                                                    <td><input type="text" className='form-control border-0 text-center' id='বকেয়ার সুদ ও ক্ষতি পূরন'
                                                        name='dueExtraCharge'
                                                        value={memo.dueExtraCharge}
                                                        onChange={handleChange}
                                                    /></td>
                                                    <td><input type="text" className='form-control border-0 text-center' id='হাল দাবি'
                                                        name='settledDemmand'
                                                        value={memo.settledDemmand}
                                                        onChange={handleChange}
                                                    /></td>
                                                    <td><input type="text" className='form-control border-0 text-center' id='মোট দাবি'
                                                        name='totalDemmand'
                                                        value={memo.totalDemmand}
                                                        onChange={handleChange}
                                                    /></td>
                                                    <td><input type="text" className='form-control border-0 text-center' id='মোট আদায়'
                                                        name='totalCollection'
                                                        value={memo.totalCollection}
                                                        onChange={handleChange}
                                                    /></td>
                                                    <td><input type="text" className='form-control border-0 text-center' id='মোট বকেয়া'
                                                        name='totalDue'
                                                        value={memo.totalDue}
                                                        onChange={handleChange}
                                                    /></td>
                                                    <td><input type="text" className='form-control border-0 text-center' id='মন্তব্য'
                                                        name='comments'
                                                        value={memo.comments}
                                                        onChange={handleChange}
                                                    /></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="row mb-1">
                                    <div className="col-12">
                                        <p className='fw-medium border-bottom'><label htmlFor="সর্বমোট(কথায়)">সর্বমোট(কথায়) : {' '}</label><input id='সর্বমোট(কথায়)' type="text" className='form-control border-0 text-center' style={{width:'auto',display:'inline'}}
                                        name='totalCollectionText'
                                        value={memo.totalCollectionText}
                                        onChange={handleChange}
                                        />  টাকা মাত্র ।</p>
                                    </div>
                                    <div className="col-12">
                                        <div className="row justify-content-start">
                                        
                                            <div className="col">
                                                <table>
                                                    <thead>
                                                        <th>
                                                            <td>তারিখ : </td>
                                                        </th>
                                                    </thead>
                                                    <tbody>
                                                        <tr className='border-bottom'>
                                                            <td>
                                                                
                                                            </td>
                                                            <td>
                                                                {memo.todayDateBangla}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                               
                                                            </td>
                                                            <td>
                                                                {memo.todayDateEng}
                                                            </td>
                                                        </tr>

                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-1 justify-content-center px-5">
                                    <div className="col">
                                        <button type="submit" className="btn btn-success w-100">Submit</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CashMemo;