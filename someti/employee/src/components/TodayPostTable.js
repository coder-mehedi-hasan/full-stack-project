import React from 'react';

const TodayPostTable = (props) => {
    console.log(props)
    return (
        <>
                <tr className='text-center'>
                    <th scope="row">{props.index + 1}</th>
                    <td>{props.post.serialNo}</td>
                    <td>{props.post.name}</td>
                    <th>{props.post.transection[0].depositeSaving}</th>
                    <td>{props.post.transection[0].withdrawSavings}</td>
                    <td>{props.post.transection[0].increamentSaving}</td>
                    <td>{props.post.transection[0].depositeLoan}</td>
                    <td>{props.post.transection[0].loanReceiving}</td>
                    <td>{props.post.transection[0].loanReceivingWithIncreament}</td>
                </tr>
        </>
    );
};

export default TodayPostTable;