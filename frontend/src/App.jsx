import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/common/Navbar/Navbar'
import Home from './components/Home/Home'
import SignIn from './components/auth/SignIn/SignIn.jsx'
import SignUp from './components/auth/SignUp/SignUp.jsx'
import RegisterAs from './components/auth/SignUp/RegisterAs.jsx'
import ForgotPassword from './components/auth/SignIn/ForgotPassword.jsx'
import SavedUsers from './components/SavedUsers/SavedUsers.jsx'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<RegisterAs />} />
        <Route path="/signUp/:id" element={<SignUp />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/saved" element={<SavedUsers />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
