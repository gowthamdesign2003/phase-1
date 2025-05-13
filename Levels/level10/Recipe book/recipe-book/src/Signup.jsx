import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import './Signup.css'

function Signup() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    


    const handleSubmit = (e)=> {
            e.preventDefault()
            axios.post('http://localhost:3001/signup', {name, email, password})
            .then(result => {
                console.log(result)
                navigate('/details')
            }) 
            .catch(err => console.log(err))
        }
  return (
    <div className='signup'>
        <h1>Signup</h1>
        <form onSubmit={handleSubmit}>
            <div className="name-signup">
                <label for="name">Name:</label>  <br/> 
                <input type="text" placeholder="Name" name='name' onChange={(e) => setName(e.target.value)} />
            </div>

            <div className="email-signup">
                <label for="email">email</label>
                <input type="email" placeholder="Email" name='email' onChange={(e) => setEmail(e.target.value)}/>
            </div>

            <div className="password-signup">
                <label for="password">Password:</label>
                <input type="password" placeholder="Password" name='password' onChange={(e) => setPassword(e.target.value)}/>
            </div>

            <button type="submit">Sign Up</button>
        </form>
    </div>
  )
}

export default Signup