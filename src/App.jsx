import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Module, Registration, StudentProjects, UserDashboard } from './views'
import { PrimeReactProvider } from 'primereact/api'

const App = () => {
  return (
    <PrimeReactProvider>
      <BrowserRouter  value={{ unstyled: false }}>
      <Routes>
        <Route path='/' element={<Registration/>} />
        <Route path='/user_board' element={<UserDashboard/>} />
        <Route path='/module' element={<Module/>} />
        <Route path='/student_projects' element={<StudentProjects/>} />
      </Routes>
    </BrowserRouter>
    </PrimeReactProvider>
  )
}

export default App