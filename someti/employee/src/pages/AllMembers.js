import React, { useEffect, useState } from 'react';
import AllmembersTable from '../components/AllmembersTable';

const AllMembers = () => {
    const [search, setSearch] = useState('')
    const [members, setMembers] = useState([])
    const getMembers = async () => {
        const response = await fetch('http://localhost:5000/allmembers', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                "Content-Type": 'application/json'
            },
            credentials: 'include'
        })
        const data = await response.json()

        if (response.status === 200) {
            setMembers(data)
        }

    }
    useEffect(() => {
        getMembers()
    }, [])
    return (
        <>
            <div className="container">
                <div className="row my-5">
                    <div className="col">
                        <form>
                            <input type="text" className='form-control text-center' autoFocus placeholder='Searching Member...........'
                                name='search'
                                value={search}
                                onChange={event => { setSearch(event.target.value) }}
                            />
                        </form>
                    </div>
                </div>
                <table className="table">
                    <thead>
                        <tr className='text-center'>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Serial No</th>
                            <th scope="col">Nid/Birth No</th>
                            <th scope="col">Go</th>
                        </tr>
                    </thead>
                    {
                        members.filter(members => (members.serialNo.toLowerCase().includes(search.toLowerCase())) || (members.name.toLowerCase().includes(search.toLowerCase())) || (members.nidOrBirth.toLowerCase().includes(search.toLowerCase())))
                            .map((member, index) => {
                                return (
                                    <AllmembersTable key={member._id} member={member} index={index}></AllmembersTable>
                                )
                            })
                    }
                </table>
            </div>
        </>
    );
};

export default AllMembers;