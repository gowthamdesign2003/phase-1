import {useState} from 'react'

function Form() {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [city, setCity] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("name", name);
        console.log("age", age);
        console.log("city", city);

    }
  return (
    <div>
        <form onChange={handleSubmit}> 
            <input type="text" placeholder="name" onChange={(e) => setName(e.target.value)} /> <br />
            <input type="text" placeholder="age" onChange={(e) => setAge(e.target.value)} /> <br />
            <input type="text" placeholder="city" onChange={(e) => setCity(e.target.value)}/> <br />
            <button>Submit</button>
        </form>
    </div>
  )
}

export default Form