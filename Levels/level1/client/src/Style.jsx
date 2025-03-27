import React from 'react'

function Style() {
  return (
    <div>
        <h1>changing bg-colorx</h1>
        <button onClick={()=>{document.body.style.backgroundColor = 'red'}}>red</button>
    </div>
  )
}

export default Style