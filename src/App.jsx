import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Module, Registration, StudentProjects, UserDashboard } from './views'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Registration/>} />
        <Route path='/user_board' element={<UserDashboard/>} />
        <Route path='/module' element={<Module/>} />
        <Route path='/student_projects' element={<StudentProjects/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App