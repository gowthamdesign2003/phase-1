import React from 'react'

function Input() {

    function change(){
        var x = document.getElementById('input').value;
        document.getElementById('res').innerHTML = x;
    }

  return (
    <div>
        <input type="text" id='input' onChange={change}/>
        <h2 id='res'></h2>
    </div>
  )
}

export default Input