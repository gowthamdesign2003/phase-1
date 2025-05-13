import React from 'react'

function Two(props) {
    function show() {
        var a = document.getElementById('show');
        
        if(isvisible) {
            a.style.display = 'none';
        } else {
            a.style.display = 'block';
        }

  
}
    return (
        <div>
            <h1 id='show'>view the content</h1>
            <button onClick={show}>view</button>
        </div>
    )
}

export default Two