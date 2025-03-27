import React from 'react'

function Condi(props) {
  if(props.student){
    return <h2>is a stuent {props.name}</h2>
  }
  else{
    return <h2>is not student</h2>
  }
}

export default Condi