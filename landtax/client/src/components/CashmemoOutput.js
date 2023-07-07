import React, { useRef, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print'
import { QRCodeSVG } from 'qrcode.react'
import SubmitBtn from './SubmitBtn';
import convertEnToBn from 'eng-num-to-bang-num-convert';


const CashmemoOutput = () => {
    const navigate = useNavigate()
    const data = useLoaderData()
    const [memo, setmemo] = useState(data[0])
    const printWindowRef = useRef()
    const handlePrint = useReactToPrint({
        content: () => printWindowRef.current,
        pageStyle: `@media print {
            @page {
              size: A4 landscape;
              margin: 6mm ;
              
            }
          }`,
        documentTitle: `cash memo ${memo.ownerName}`,
        onAfterPrint: () => navigate('/'),
        onPrintError: () => alert("print failed"),
    })

    return (
        <>
            <div className='mt-3 cashmemo cashmemo-output' >
                <div className="container-fluid">
                    <div className="row">
                        <div >
                            <div className="row">
                                <div className="col-lg-12">
                                    <form ref={printWindowRef}>
                                        <div>
                                            <div className="row justify-content-between">
                                                <div className="col">
                                                    <p className='m-0'>বাংলাদেশ ফরম নং ১০৭৭</p>
                                                    <p className='m-0'>(সংশোধিত)</p>
                                                </div>
                                                <div className="col">
                                                    <p className='m-0 text-center'>ভূমি উন্নয়ন কর পরিশোধ রসিদ</p>
                                                    <p className='m-0 text-center'>(অনুচ্ছেদ ৩৯২ দ্রষ্টব্য)</p>
                                                </div>
                                                <div className="col">
                                                    <p className='m-0 text-end'>পরিশিষ্ট</p>
                                                    <p className='m-0 text-end'>ক্রমিক নং : {
                                                        memo.id ? convertEnToBn(memo.id) : ''
                                                    }</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div id='memoOwnerInfo'>
                                            <div className="mb-1 row">
                                                <label htmlFor='city_council_union' className="col-sm-3 col-form-label">সিটি কর্পোরেশন /পৌর /ইউনিয়ন ভূমি অফিসের নাম</label>
                                                <div className="col-sm-9">
                                                    <input type="text" className="form-control" id="city_council_union"
                                                        name='city_council_union'
                                                        readOnly
                                                        value={memo.city_council_union}
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
                                                                readOnly
                                                                value={memo.mouza_jlNo}
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
                                                                readOnly
                                                                value={memo.upazila_policeStation}
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
                                                                readOnly
                                                                value={memo.district}
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
                                                                readOnly
                                                                value={memo.ownerName}
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
                                                        readOnly
                                                        value={memo.holdingNo}
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-1 row">
                                                <label htmlFor="landType" className="col-sm-2 col-form-label">জমির শ্রেণী</label>
                                                <div className="col-sm-10">
                                                    <input type="text" className="form-control" id="landType"
                                                        name='landType'
                                                        readOnly
                                                        value={memo.landType}
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-1 row">
                                                <label htmlFor="khatianNo" className="col-sm-2 col-form-label">খতিয়ান নং</label>
                                                <div className="col-sm-10">
                                                    <input type="text" className="form-control" id="khatianNo"
                                                        name='khatianNo'
                                                        readOnly
                                                        value={memo.khatianNo}
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-1 row">
                                                <label htmlFor="dagNo" className="col-sm-2 col-form-label">দাগ নং</label>
                                                <div className="col-sm-10">
                                                    <input type="text" className="form-control" id="dagNo"
                                                        name='dagNo'
                                                        readOnly
                                                        value={memo.dagNo}
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-1 row">
                                                <label htmlFor="land_quantity" className="col-sm-2 col-form-label">জমির পরিমাণ(শতক)</label>
                                                <div className="col-sm-10">
                                                    <input type="text" className="form-control" id="land_quantity"
                                                        name='land_quantity'
                                                        readOnly
                                                        value={memo.land_quantity}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div id='memoInfo'>
                                            <div className="row mt-4 border-top">
                                                <table className="table table-striped-columns">
                                                    <thead>
                                                        <tr className='text-center'>
                                                            <th colSpan={8}><p className='m-0' style={{ fontSize: '14px' }}>আদায়ের বিবরণ</p></th>
                                                        </tr>
                                                    </thead>
                                                    <thead>
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
                                                                readOnly
                                                                value={memo.threeYearsUpDue}
                                                            /></td>
                                                            <td><input type="text" className='form-control border-0 text-center' id='গত তিন বৎসরের বকেয়া'
                                                                name='lastThreeYearsDue'
                                                                readOnly
                                                                value={memo.lastThreeYearsDue}
                                                            /></td>
                                                            <td><input type="text" className='form-control border-0 text-center' id='বকেয়ার সুদ ও ক্ষতি পূরন'
                                                                name='dueExtraCharge'
                                                                readOnly
                                                                value={memo.dueExtraCharge}
                                                            /></td>
                                                            <td><input type="text" className='form-control border-0 text-center' id='হাল দাবি'
                                                                name='settledDemmand'
                                                                readOnly
                                                                value={memo.settledDemmand}
                                                            /></td>
                                                            <td><input type="text" className='form-control border-0 text-center' id='মোট দাবি'
                                                                name='totalDemmand'
                                                                readOnly
                                                                value={memo.totalDemmand}
                                                            /></td>
                                                            <td><input type="text" className='form-control border-0 text-center' id='মোট আদায়'
                                                                name='totalCollection'
                                                                readOnly
                                                                value={memo.totalCollection}
                                                            /></td>
                                                            <td><input type="text" className='form-control border-0 text-center' id='মোট বকেয়া'
                                                                name='totalDue'
                                                                readOnly
                                                                value={memo.totalDue}
                                                            /></td>
                                                            <td><input type="text" className='form-control border-0 text-center' id='মন্তব্য'
                                                                name='comments'
                                                                readOnly
                                                                value={memo.comments}
                                                            /></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col">
                                                <p className='fw-medium m-0' style={{ borderBottom: '1px dotted' }}>সর্বমোট(কথায়) : {memo.totalCollectionText} টাকা মাত্র ।</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col">
                                                <p className='m-0 fw-bold'>চালান নং : {convertEnToBn(memo.serialNo)}</p>
                                                <p className='m-0 my-1 fw-bold fs-6'>তারিখ :
                                                    <div className="fraction">
                                                        <span className="fraction--numerator">{memo.todayDateBangla}</span>
                                                        <span className="fraction--bar"></span>
                                                        <span className="fraction--denominator">{memo.todayDateEng}</span>
                                                    </div>
                                                </p>
                                            </div>
                                            <div className="col text-center">
                                                <QRCodeSVG value={`http://localhost:3000/${memo.serialNo}`} size='80'></QRCodeSVG>
                                            </div>
                                            <div className="col">
                                                <p className='px-5 py-2 text-center border border-black'>এই দাখিলা ইলেক্ট্রনিকভাবে তৈরি করা হয়েছে, কোন সাক্ষরের প্রয়োজন নেই</p>
                                            </div>
                                        </div>
                                    </form>
                                    <div className='my-3'>
                                        <SubmitBtn event={handlePrint} value="প্রিন্ট"></SubmitBtn>
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

export default CashmemoOutput;