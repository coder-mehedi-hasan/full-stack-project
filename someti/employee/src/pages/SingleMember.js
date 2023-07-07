import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';

const SingleMember = () => {
    const [ memberData, setMemberData ] = useState()
    const member = useLoaderData()
    console.log(member)
    return (
        <>
         <h1>Sigle Member Page</h1>       
        </>
    );
};

export default SingleMember;