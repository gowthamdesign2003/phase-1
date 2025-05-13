import React, { useState } from 'react'
import axios from 'axios'
import './Cont.css'
import {useNavigate} from 'react-router-dom'

function Student(props) {

    const [name, setName] = useState()
    const [age, setAge] = useState()
    const [stud, setStud] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e)=> {
        e.preventDefault()
        axios.post('http://localhost:3001/stud', {name, age, stud})
        .then(result => {
            console.log(result)
            navigate('/details')
        })
        .catch(err => console.log(err))
    }

   
    

  return (
    <div>
        <h1>Add new recipe</h1>

        <form onSubmit={handleSubmit}>

        <div className="cont-fl">
            <label htmlFor="name">Name</label>
            <input type="text" placeholder='Name' name='email' className='form-con-inp' onChange={(e) => setName(e.target.value)} />

        </div>

        <div className="cont-fl">
            <label htmlFor="age">incrediant</label>
            <input type="text" placeholder='incrediant' name='email' className='form-con-inp' onChange={(e) => setAge(e.target.value)} />
        </div>

        <div className="cont-fl">
            <label htmlFor="studid">process</label>
            <textarea type="text" placeholder='process' name='email' className='form-con-inp' onChange={(e) => setStud(e.target.value)} />
        </div>

        <button type='submit' className='btn-stud'>Add Db</button>
        </form>
    </div>


    
  )
}

export default Student