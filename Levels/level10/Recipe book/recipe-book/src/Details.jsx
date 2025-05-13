

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Details.css'

function Details() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3001')
            .then(result => setUsers(result.data))
            .catch(err => console.log(err));
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3001/deleteUser/${id}`)
            .then(res => {
                console.log(res);
                setUsers(users.filter(user => user._id !== id)); // Update state instead of reloading
            })
            .catch(err => console.log(err));
    };

    const filteredUsers = users.filter(user => user.name && user.name.toLowerCase().includes(search.toLowerCase()));


    return (
        <div>
            <h1>Recipe</h1>
            <Link to={'/addDetails'} className='add-new-stud-btn'>Add New</Link>
            
            <input 
                type="text" 
                placeholder="Search by name..." 
                value={search} 
                onChange={(e) => setSearch(e.target.value)} 
                className="search-box"
            />

            <div className="cont-details-students">
                {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                        <div className="stud-con-deta" key={user._id}>
                            <p className='p-stud'>Name: {user.name}</p>
                            <p className='p-stud'>incrediants: {user.age}</p>
                            <p className='p-stud'>process: {user.stud}</p>
                            <div className="btn-edit-con">
                                <Link to={`/view/${user._id}`} className='p-stud-btn'>View</Link>
                                <Link to={`/update/${user._id}`} className='p-stud-btn'>Update</Link>
                                <button className='p-stud-btn' onClick={() => handleDelete(user._id)}>Delete</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No recipes found</p>
                )}
            </div>

             

        </div>
    );
}

export default Details;


