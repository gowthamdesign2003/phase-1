import {useState} from 'react'

function Seven() {
    const [count, setCount] = useState(0)
  return (
    <>
      

        <p>Count is {count}</p>

        <button onClick={() => setCount((count) => count - 1)}>
          count min
        </button>
      
        <button onClick={() => setCount((count) => count + 1)}>
          count add
        </button>
       
    </>
  )
}

export default Seven