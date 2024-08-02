import { useState } from 'react'
import './App.css'
import GRSHomepage from './GRSHomepage'
import ListEventComponent from './components/ListEventComponent'
import HeaderComponent from './components/HeaderComponent'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import EventComponent from './components/EventComponent'
import ListGiftComponent from './components/ListGiftComponent'
import GiftComponent from './components/GiftComponent'
import SignUpHostComponent from './components/SignUpHostComponent'
import LoginComponent from './components/LoginComponent'
import HostDetailsComponent from './components/HostDetailsComponent'
import FooterComponent from './components/FooterComponent'
import ProtectedRoute from './components/ProtectedRoute'

function App() {

  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          <Route path='/' element={<GRSHomepage />}></Route>
          <Route path='/sign-up' element={<SignUpHostComponent />}></Route>
          <Route path='/login' element={<LoginComponent />}></Route>
          <Route element={<ProtectedRoute />}>
            <Route path='/profile' element={<HostDetailsComponent />}></Route>
            <Route path='/event' element={<ListEventComponent />}></Route>
            <Route path='/add-event' element={<EventComponent />}></Route>
            <Route path='/edit-event/:eventId' element={<EventComponent />}></Route>
            <Route path='/event/:eventId/gifts' element={<ListGiftComponent />}></Route>
            <Route path='/event/:eventId/add-gift' element={<GiftComponent />}></Route>
            <Route path='/event/:eventId/edit-gift/:giftId' element={<GiftComponent />}></Route>
          </Route>
        </Routes>
        <FooterComponent />
      </BrowserRouter>

    </>
  )
}

export default App
