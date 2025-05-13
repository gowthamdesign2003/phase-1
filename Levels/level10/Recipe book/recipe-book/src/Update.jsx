import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Update() {
    const {id} = useParams()
    const [name, setName] = useState()
    const [age, setAge] = useState()
    const [stud, setStud] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:3001/getUser/'+id)
       .then(result => {console.log(result)
          setName(result.data.name)
          setAge(result.data.age)
          setStud(result.data.stud)
       })
       .catch(err => console.log(err))
    }, [])


    const Update = (e) =>{
        e.preventDefault()
        axios.put(`http://localhost:3001/update/${id}`, {name, age, stud})
        .then(result => {
            console.log(result)
            navigate('/details')
        })
        .catch(err => console.log(err))
    }

  return (
    <div>
        <form onSubmit={Update}>
            <h2>update User</h2>
            <div>
                <label htmlFor="">Name</label>
                <input type="text" placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)}/>
            </div>

            <div>
                <label htmlFor="">incrediant</label>
                <input type="text" placeholder='Enter incrediants' value={age} onChange={(e) => setAge(e.target.value)}/>
            </div>

            <div>
                <label htmlFor="">process</label>
                <textarea type="text" placeholder='Enter process' value={stud} onChange={(e) => setStud(e.target.value)}/>
            </div>
            <button>update</button>
        </form>
    </div>
  )
}

export default Update