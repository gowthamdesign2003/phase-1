import {useState} from 'react'

function Three(e) {
    const [content, setContent] = useState('')
  return (
    <div>
        <input type="text" id='content' onChange={(e) => setContent(e.target.value)}/>
        <p>{content}</p>
    </div>
  )
}

export default Three