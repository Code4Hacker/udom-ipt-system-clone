import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Module, PlaceOfSlection, Registration, StudentProjects, UserDashboard } from './views'
import { PrimeReactProvider } from 'primereact/api'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <PrimeReactProvider>
    <Toaster position='top-right' />
      <BrowserRouter  value={{ unstyled: false }}>
      <Routes>
        <Route path='/' element={<Registration/>} />
        <Route path='/user_board' element={<UserDashboard/>} />
        <Route path='/module' element={<Module/>} />
        <Route path='/student_projects' element={<StudentProjects/>} />
        <Route path='/place_selection' element={<PlaceOfSlection/>} />
      </Routes>
    </BrowserRouter>
    </PrimeReactProvider>
  )
}

export default App