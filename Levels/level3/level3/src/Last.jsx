import {useState} from 'react'

function Last() {
    const [search, setSearch] = useState("");
    const fruits = ["apple","papaya","pineapple", "banana", "cherry", "date", "elderberry", "Orange", "grape", "kiwi", "lemon", "mango", "nectarine", "pear", "quince", "raspberry", "strawberry", "tangerine", "watermelon"];

    const localFruits = fruits.filter((fruit) => fruit.name && fruit.name.toLowerCase().includes(search.toLowerCase()));
    // const filteredUsers = users.filter(user => user.name && user.name.toLowerCase().includes(search.toLowerCase()));
    const item = localFruits.map((fruit) => (
        <div key={fruit.id}>
            <h3>{fruit.name}</h3>
        </div>))
  return (
    <div>
        <h1>Looping through an Array</h1>
        <input 
                type="search" 
                placeholder="Search by name..." 
                value={search} 
                onChange={(e) => setSearch(e.target.value)} 
                className="search-box"
            />
       
     {item}

    </div>
  )
}

export default Last