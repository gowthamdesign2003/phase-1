import React from 'react'

import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Student from './Student'
import Update from './Update'
import Details from './Details'
import View from './View'
import Signup from './Signup'

function App() {


  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Signup/>}></Route>
      <Route path='/details' element={<Details/>}></Route>       
      <Route path='/addDetails' element={<Student name="gowtham"/>}></Route>
      <Route path='/update/:id' element={<Update/>}></Route>
      <Route path='/view/:id' element={<View/>}></Route>
      
    </Routes>
    </BrowserRouter>
    
    
  )
}

export default App
//home page
//add Recipe page
//update recipe page
//view recipe