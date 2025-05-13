import {useState} from 'react'

function One() {
    const [count, setCount] = useState(0)
  return (
    <div>
         <h1>{count}</h1>
      
      <button onClick={() => setCount((count) => count + 1)}>
        count add
      </button>
      <button onClick={() => setCount((count) => count - 1)}>
        count minus
      </button>
    </div>
  )
}

export default One