import React from 'react';
import { Link, useNavigate } from 'react-router-dom';


const SingleTax = (props) => {
    const navigate = useNavigate()
    const handleDelete = async (e) => {
        e.preventDefault()
        const response = await fetch(`http://localhost:5000/delete/${props.info.serialNo}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (response.status !== 200) {
            alert('Data Deleted Failed')
        }
        else {
            alert('Data Deleted')
            navigate('/')
        }
    }
    return (
        <>
            <tbody className='table-group-divider border-0 border-top'>
                <tr className='text-center'>
                    <th scope="row">{props.index + 1}</th>
                    <td>{props.info.ownerName}</td>
                    <td>{props.info.khatianNo}</td>
                    <td>{props.info.dagNo}</td>
                    <td>
                        <Link to={'/' + props.info.serialNo} className='btn btn-outline-success'>সকল তথ্য</Link>
                    </td>
                    <td>
                        <button className='btn btn-danger' onClick={handleDelete}><i class="fa-regular fa-trash-can"></i></button>
                    </td>
                </tr>
            </tbody>
        </>
    );
};

export default SingleTax;