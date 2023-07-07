import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TodayPostTable from "../components/TodayPostTable";

const DepositePost = () => {
    const navigate = useNavigate()
    const [todayPost, setTodayPost] = useState([])
    const [postData, setPostData] = useState({ transactionCetagory: '', date: '', depositeSaving: '', withdrawSavings: '', increamentSaving: '', depositeLoan: '', loanReceiving: '', loanReceivingWithIncreament: '', totalSaving: '', dueLoan: '' })
    const [members, setMembers] = useState([])
    const [state, setstate] = useState({
        query: '',
        list: []
    })
    const getMembers = async () => {
        const response = await fetch("http://localhost:5000/allmembers", {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                "Content-Type": 'application/json'
            },
            credentials: 'include'
        })
        setMembers(await response.json())
    }
    const getWaitedPostData = async () => {
        const response = await fetch("http://localhost:5000/getwaiting", {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                "Content-Type": 'application/json'
            },
            credentials: 'include'
        })
        setTodayPost(await response.json())
    }
    const handleChange = (e) => {
        const results = members.filter(member => {
            if (e.target.value === '') return members
            return member.serialNo.toLowerCase().includes(e.target.value.toLowerCase())
        })
        setstate({
            query: e.target.value,
            list: []
        })
        if (results.length === 1) {
            setstate({
                list: results
            })
            results.forEach((result) => {
                console.log(result)
                setPostData({ ...postData, idNo: result._id, serialNo: result.serialNo, name: result.name, totalSaving: (result.totalSaving === undefined ? 0 : result.totalSaving), dueLoan: (result.dueLoan === undefined ? 0 : result.dueLoan) })
            })
        }
    }
    const handlePostData = (e) => {
        const name = e.target.name
        const value = e.target.value
        setPostData({ ...postData, [name]: value })
    }
    useEffect(() => {
        getMembers()
        getWaitedPostData()
    }, [])

    const postingSubmit = async (event) => {
        event.preventDefault()
        const response = await fetch('http://localhost:5000/postingdata', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                postData
            }),
            credentials: 'include'
        })
        if (response.status !== 200) {
            alert('Data Posting Failed')
        }
        else alert('Data Posting Successfull')
    }
    return (
        <>
            <div className='container'>
                <ul class="nav nav-tabs justify-content-between" id="myTab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="post-tab" data-bs-toggle="tab" data-bs-target="#post-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Posting</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="todayPost-tab" data-bs-toggle="tab" data-bs-target="#todayPost-tab-pane" type="button" role="tab" aria-controls="todayPost-tab-pane" aria-selected="false">Today Post</button>
                    </li>
                </ul>
                <div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade show active my-5 " id="post-tab-pane" role="tabpanel" aria-labelledby="post-tab" tabindex="0">
                        <>
                            <div>
                                {/* search box */}
                                <div className='mb-3'>
                                    <label htmlFor="serialNo" className='form-label'>Serial No</label>
                                    <input type="search" name="serialNo" className='form-control' id="serialNo"
                                        value={state.query}
                                        onChange={handleChange}
                                    />
                                </div>
                                {/* post data */}
                                <form onSubmit={postingSubmit} method='POST' >
                                    {
                                        <div className='mb-3'>
                                            {(state.query === '' ? "" : state.list.map(member => {
                                                return (
                                                    <div key={member.name} className='row'>
                                                        <div className='col-md-4' >
                                                            <input name='idNo' value={member._id} className='form-control' readOnly
                                                            />
                                                        </div>
                                                        <div className='col-md-4'>
                                                            <input name='name' value={member.name} className='form-control' readOnly
                                                            />
                                                        </div>
                                                        <div className='col-md-4'>
                                                            <input name='fatherName' value={member.fatherName} className='form-control' readOnly
                                                            />
                                                        </div>
                                                    </div>
                                                )
                                            }))}
                                        </div>
                                    }
                                    <div className="mb-3">
                                        <select name="transactionCetagory" defaultValue='' className='form-select'
                                            onChange={handlePostData}
                                        >
                                            <option value='' >Transaction Cetagory</option>
                                            <option value="both">Saving & Loan</option>
                                            <option value="saving">saving</option>
                                            <option value="loan">loan</option>
                                        </select>
                                    </div>
                                    <div className='mb-3'>
                                        <label htmlFor="date">Date</label>
                                        <input type="date" id='date' name='date' className='form-control'
                                            value={postData.date}
                                            onChange={handlePostData}
                                        />
                                    </div>
                                    {
                                        postData.transactionCetagory === 'both' ?
                                            <>
                                                <div>
                                                    <>
                                                        <h4>Savings :</h4>
                                                        <div className='mb-3'>
                                                            <div className="row">
                                                                <div className="col-lg-4">
                                                                    <label htmlFor="depositeSaving">Deposite Saving</label>
                                                                    <input type="Number" id='depositeSaving' name='depositeSaving' className='form-control'
                                                                        value={postData.depositeSaving}
                                                                        onChange={handlePostData}
                                                                    />
                                                                </div>
                                                                <div className="col-lg-4">
                                                                    <label htmlFor="withdrawSavings">Withdraw Savings</label>
                                                                    <input type="Number" id='withdrawSavings' name='withdrawSavings' className='form-control'
                                                                        value={postData.withdrawSavings}
                                                                        onChange={handlePostData}
                                                                    />
                                                                </div>
                                                                <div className="col-lg-4">
                                                                    <label htmlFor="increamentSaving">Increament Saving</label>
                                                                    <input type="Number" id='increamentSaving' name='increamentSaving' className='form-control'
                                                                        value={postData.increamentSaving}
                                                                        onChange={handlePostData}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                </div>
                                                <div className='mb-3'>
                                                    <h4>Loan :</h4>
                                                    <div className='mb-3'>
                                                        <div className="row">
                                                            <div className="col-lg-4">
                                                                <label htmlFor="depositeLoan">Deposite Loan</label>
                                                                <input type="Number" id='depositeLoan' name='depositeLoan' className='form-control'
                                                                    value={postData.depositeLoan}
                                                                    onChange={handlePostData}
                                                                />
                                                            </div>
                                                            <div className="col-lg-4">
                                                                <label htmlFor="loanReceiving">Loan Reciving</label>
                                                                <input type="Number" id='loanReceiving' name='loanReceiving' className='form-control'
                                                                    value={postData.loanReceiving}
                                                                    onChange={handlePostData}
                                                                />
                                                            </div>
                                                            <div className="col-lg-4">
                                                                <label htmlFor="loanReceivingWithIncreament">Loan With Increament</label>
                                                                <input type="Number" id='loanReceivingWithIncreament' name='loanReceivingWithIncreament' className='form-control'
                                                                    value={postData.loanReceivingWithIncreament}
                                                                    onChange={handlePostData}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </> :
                                            postData.transactionCetagory === 'saving' ? <>
                                                <h4>Savings :</h4>
                                                <div className='mb-3'>
                                                    <div className="row">
                                                        <div className="col-lg-4">
                                                            <label htmlFor="depositeSaving">Deposite Saving</label>
                                                            <input type="Number" id='depositeSaving' name='depositeSaving' className='form-control'
                                                                value={postData.depositeSaving}
                                                                onChange={handlePostData}
                                                            />
                                                        </div>
                                                        <div className="col-lg-4">
                                                            <label htmlFor="withdrawSavings">Withdraw Savings</label>
                                                            <input type="Number" id='withdrawSavings' name='withdrawSavings' className='form-control'
                                                                value={postData.withdrawSavings}
                                                                onChange={handlePostData}
                                                            />
                                                        </div>
                                                        <div className="col-lg-4">
                                                            <label htmlFor="increamentSaving">Increament Saving</label>
                                                            <input type="Number" id='increamentSaving' name='increamentSaving' className='form-control'
                                                                value={postData.increamentSaving}
                                                                onChange={handlePostData}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                            </> :
                                                postData.transactionCetagory === 'loan' ?
                                                    <>
                                                        <h4>Loan :</h4>
                                                        <div className='mb-3'>
                                                            <div className="row">
                                                                <div className="col-lg-4">
                                                                    <label htmlFor="depositeLoan">Deposite Loan</label>
                                                                    <input type="Number" id='depositeLoan' name='depositeLoan' className='form-control'
                                                                        value={postData.depositeLoan}
                                                                        onChange={handlePostData}
                                                                    />
                                                                </div>
                                                                <div className="col-lg-4">
                                                                    <label htmlFor="loanReceiving">Loan Reciving</label>
                                                                    <input type="Number" id='loanReceiving' name='loanReceiving' className='form-control'
                                                                        value={postData.loanReceiving}
                                                                        onChange={handlePostData}
                                                                    />
                                                                </div>
                                                                <div className="col-lg-4">
                                                                    <label htmlFor="loanReceivingWithIncreament">Loan With Increament</label>
                                                                    <input type="Number" id='loanReceivingWithIncreament' name='loanReceivingWithIncreament' className='form-control'
                                                                        value={postData.loanReceivingWithIncreament}
                                                                        onChange={handlePostData}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>

                                                    : ''
                                    }

                                    <div className='mb-3'>
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </div>
                                </form >
                            </div >
                        </>
                    </div>
                    <div class="tab-pane fade my-5" id="todayPost-tab-pane" role="tabpanel" aria-labelledby="todayPost-tab" tabindex="0">
                        <>
                            {
                                todayPost.length < 1 ?
                                    <>
                                        <h3 className='text-center'>Today No Transection</h3>
                                    </> :
                                    <>
                                        <h3 className='text-center'>Today Transection List</h3>
                                        <p className='text-center'>Total Transection: {todayPost.length}</p>
                                        <table className="table">
                                            <thead>
                                                <tr className='text-center'>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Serial No</th>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">depositeSaving</th>
                                                    <th scope="col">withdrawSavings</th>
                                                    <th scope="col">increamentSaving</th>
                                                    <th scope="col">depositeLoan</th>
                                                    <th scope="col">loanReceiving</th>
                                                    <th scope="col">loanReceivingWithIncreament</th>
                                                </tr>
                                            </thead>
                                            <tbody className='table-group-divider border-0 border-top'>
                                                {
                                                    todayPost.map((post, index) => {
                                                        return (
                                                            <TodayPostTable key={post._id} post={post} index={index}></TodayPostTable>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                            <tfoot>
                                                <tr>

                                                </tr>
                                            </tfoot>
                                        </table>
                                    </>
                            }
                        </>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DepositePost;