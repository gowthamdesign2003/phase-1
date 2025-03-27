import React from 'react'
import Seven from './Seven'

import './App.css'
import Class from './Class'
import Greeting from './Greeting'
import Four from './four'
import Five from './Five'
import Toggle from './Toggle'
import Input from './Input'
import Form from './Form'
import List from './List'


function App() {
  

  return (
    <>
    <h1>hello</h1>
    <Seven/>  
    <Class/>
    <Greeting name="gowtham"/>
    <Four />
    <Five name="gowtham" age={20} city="chennai"/>
    <Toggle/>
    <Input/>
    <Form/>
    <List/>

    </>
  )
}

export default App
