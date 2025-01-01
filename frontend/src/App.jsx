import React, { useEffect, useMemo, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/common/Navbar/Navbar'
import Home from './components/Home/Home'
import SignIn from './components/auth/SignIn/SignIn.jsx'
import SignUp from './components/auth/SignUp/SignUp.jsx'
import RegisterAs from './components/auth/SignUp/RegisterAs.jsx'
import ForgotPassword from './components/auth/SignIn/ForgotPassword.jsx'
import SavedUsers from './components/SavedUsers/SavedUsers.jsx'
import { io } from 'socket.io-client'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'

const App = () => {
  return <></>
}

export default App
