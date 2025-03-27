import React from 'react'

function Calculation() {
    function add(){
    var a = document.getElementById('num1')
    var b = document.getElementById('num2')
    var c = document.getElementById('res')
    c.innerHTML = Number(a.value) + Number(b.value)
    }
  return (
    <div className="headcalculation">
        <input type="number" id='num1' />
        <input type="number" id='num2' />
        <h1 id='res'></h1>
        <button onClick={add}>add</button>
    </div>
  )
}

export default Calculation