import React from 'react'

function List(props) {
  return (
    <div>
        <ul>
            <li>apple</li>
            <li>banana</li>
            <li>orange</li>
            <li>grapes</li>
            <li>watermelon</li>
        </ul>
        <h1>{props.name}</h1>
    </div>
  )
}

export default List