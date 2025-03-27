import React from 'react'

function List() {
    const fruits = ['apple', 'banana', 'mango', 'orange', 'grapes']
    const fruitList = fruits.map((fruit, index) => {
        return <ul><li key={index}>{fruit}</li></ul>
    })
  return (
    <div>
        {fruitList}

    </div>
  )
}

export default List