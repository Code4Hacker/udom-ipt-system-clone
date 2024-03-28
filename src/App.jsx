import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ArrivalNote, Dashboard, IndividualStudent, Module, PlaceOfSlection, Registration, StudentProjects, SuperDashboard, Testing, UserDashboard } from './views'
import { PrimeReactProvider } from 'primereact/api'
import { Toaster } from 'react-hot-toast'
import { LogBook } from './views'

const App = () => {
  return (
    <PrimeReactProvider>
      <Toaster position='top-right' />
      <BrowserRouter value={{ unstyled: false }}>
        <Routes>
          <Route path='/' element={<Registration />} />
          <Route path='/user_board' element={<UserDashboard />} />
          <Route path='/module' element={<Module />} />
          <Route path='/student_projects' element={<StudentProjects />} />
          <Route path='/place_selection' element={<PlaceOfSlection />} />
          <Route path='/logbook' element={<LogBook />} />
          <Route path='/arrival_note' element={<ArrivalNote />} />
          {/* <Route path='/' element={<Testing/>} /> */}
          <Route path='/super_dashboard' element={<SuperDashboard />} />
          <Route path='/super_dashboard/:id' element={<IndividualStudent />} />
          <Route path='/admin_dashboard' element={<Dashboard />} />

        </Routes>
      </BrowserRouter>
    </PrimeReactProvider>
  )
}

export default App