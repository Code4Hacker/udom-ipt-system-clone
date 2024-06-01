import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AfterVerify, ArrivalNote, AuthToken, Dashboard, IndividualStudent, Module, PlaceOfSlection, PlaceSelection, PlaceSupervisor, PlaceView, Registration, SSignIn, StudentAdm, StudentProjects, SuperDashboard, USAssesments, UserDashboard } from './views'
import { PrimeReactProvider } from 'primereact/api'
import { Toaster } from 'react-hot-toast'
import { LogBook } from './views'

const App = () => {
  return (
    <PrimeReactProvider>
      <Toaster position='top-right' />
      <BrowserRouter value={{ unstyled: false }} >
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
          <Route path='/selection_place' element={<PlaceSelection />} />
          <Route path='/selection_place/:id' element={<PlaceSupervisor />} />
          <Route path='/admin_students' element={<StudentAdm/>} />
          <Route path='/places' element={<PlaceView />} />
          <Route path='/auth_token' element={<AuthToken />} />
          <Route path='/after_verify' element={<AfterVerify />} />
          <Route path='/ss_sign_in' element={<SSignIn />} />
          <Route path='/upload_assesments' element={<USAssesments />} />
        </Routes>
      </BrowserRouter>
    </PrimeReactProvider>
  )
}

export default App