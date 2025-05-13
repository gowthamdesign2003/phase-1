
// import React, { useEffect, useState } from 'react';
// import { Link,  } from 'react-router-dom';
// import axios from 'axios';
// function View () {
//      const [user, setUser] = useState([]);
//     //`http://localhost:3001/setUser/${id}`
//     // http://localhost:3001

//      useEffect(() => {
//              axios.get('http://localhost:3001/setUser/${id}')
//                  .then(result => setUser(result.data))
//                  .catch(err => console.log(err));
//          }, []);

//   return (
//     <div>
//         <div className="stud-con-deta" >
//              <h1>{
//             user.map((user) => {
//                 return <div className="stud-con-deta" key={user._id}>
//                     <p className='p-stud'>Name: {user.name}</p>
//                     <p className='p-stud'>Age: {user.age}</p>
//                     <p className='p-stud'>StudentId:{user.stud}</p>
//                     </div>
//             })
//             }</h1>
//         </div>
//         <Link to={'/details'} className='p-stud-btn'>back</Link>
//     </div>
//   )
// }

// export default View


import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './view.css'

function View() {
    const { id } = useParams(); // Get the user ID from the URL
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:3001/setUser/${id}`) // Fetch specific user
            .then(result => {
                setUser(result.data); // `result.data` is a single user object
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (!user) return <p>User not found</p>;

    return (
        <div className='view-div-con'>
            <div className="stud-view-cont">
                <h1>Recipe Details</h1>
                <p className='p-stud-view-detail-page'><strong>Name:</strong> {user.name}</p>
                <p className='p-stud-detail-view--page'><strong>incrediants:</strong> {user.age}</p>
                <p className='p-stud-detail-view-page'><strong>process:</strong> {user.stud}</p>
            </div>
            <Link to={'/details'} className='p-stud-view-btn'>Back</Link>
        </div>
    );
}

export default View;
