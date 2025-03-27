import React from 'react'

function Toggle() {
    function show(){
        var b = document.getElementById('a');
        b.style.display = 'block';
        
    }
  return (
    <div>
        <h1 className='content' id='a'>hello everyone</h1>
        <button onClick={show}>show</button>
        
    </div>
  )
}

export default Toggle