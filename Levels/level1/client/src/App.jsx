import React from 'react'
import Header from './Header'
import './App.css'
import Tasktwo from './Tasktwo'
import Calculation from './Calculation'
import Style from './Style'
import List from './List'
import Condi from './Condi'

function App() {
  

  return (
    
    <>
    <Tasktwo/>
    <Header/>
    <Calculation/>
    <Style/>
    <List name='gowtham'/>
    <Condi name='jon' student={true}/>
    </>
  )
}

export default App
