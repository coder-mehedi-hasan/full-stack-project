import React from 'react';
import {Link} from 'react-router-dom'

const AllmembersTable = (props) => {
    return (
        <>
            <tbody className='table-group-divider border-0 border-top'>
                <tr className='text-center'>
                    <th scope="row">{props.index + 1}</th>
                    <td>{props.member.name}</td>
                    <td>{props.member.serialNo}</td>
                    <td>{props.member.nidOrBirth}</td>
                    <td>
                    <Link to={'/'+props.member._id} className='btn btn-outline-success'>All Details</Link>
                    </td>
                </tr>
            </tbody>
        </>
    );
};

export default AllmembersTable;