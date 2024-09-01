import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/common/Navbar/Navbar'
import Home from './components/Home/Home'
import SignIn from './components/auth/SignIn/SignIn.jsx'
import SignUp from './components/auth/SignUp/SignUp.jsx'

import RegisterAs from './components/auth/SignUp/RegisterAs.jsx'
import ForgotPassword from './components/auth/SignIn/ForgotPassword.jsx'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signIn" element={<SignIn />}></Route>
        <Route path="/signUp" element={<RegisterAs />}></Route>
        <Route path="/signUp/:id" element={<SignUp />}></Route>
        <Route path="/forgotPassword" element={<ForgotPassword />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
