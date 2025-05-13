import {useState} from 'react'

function Four() {
    const [content, setContent] = useState('')

    function update() {
        var input = document.getElementById('input')
        var cont = document.getElementById('cont')
        cont.innerHTML = input.value
        
        
        
    }
  return (
    <div>
         <input type="text" id='input'/>
            <button onClick={() => setContent(document.getElementById('input').value)}>submit</button>
        
            <h1 id='cont'>{content}</h1>
            <button onClick={update}>update</button>
    </div>
  )
}

export default Four