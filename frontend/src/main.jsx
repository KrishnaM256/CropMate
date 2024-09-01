import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'

import Layout from './Layout.jsx'

import './index.css'
import SignIn from './components/auth/SignIn/SignIn.jsx'
import SignUp from './components/auth/SignUp/SignUp.jsx'
import FarmerCard from './components/common/cards/FarmerCard/FarmerCard.jsx'
import RegisterAs from './components/auth/SignUp/RegisterAs.jsx'
import ForgotPassword from './components/auth/SignIn/ForgotPassword.jsx'
import Home from './components/Home/Home.jsx'
import BuyerCard from './components/common/cards/BuyerCard/BuyerCard.jsx'
import ContractMarket from './components/ContractMarket/ContractMarket.jsx'
import LiveMarket from './components/LiveMarket/LiveMarket.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<Home />}></Route>
      <Route path="/signIn" element={<SignIn />}></Route>
      <Route path="/signUp" element={<RegisterAs />}></Route>
      <Route path="/signUp/:id" element={<SignUp />}></Route>
      <Route path="/forgotPassword" element={<ForgotPassword />}></Route>
      <Route path="/cards" element={<FarmerCard />}></Route>
      <Route path="/buyerCards" element={<BuyerCard />}></Route>
      <Route path="/contractMarket" element={<ContractMarket />}></Route>
      <Route path="/liveMarket" element={<LiveMarket />}></Route>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}></RouterProvider>
)
