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
import 'react-toastify/dist/ReactToastify.css'

import './index.css'
import SignIn from './components/auth/SignIn/SignIn.jsx'
import SignUp from './components/auth/SignUp/SignUp.jsx'
// import FarmerCard from './components/common/cards/FarmerCard/FarmerCard.jsx'
import RegisterAs from './components/auth/SignUp/RegisterAs.jsx'
import ForgotPassword from './components/auth/SignIn/ForgotPassword.jsx'
import Home from './components/Home/Home.jsx'
import ContractMarket from './components/ContractMarket/ContractMarket.jsx'
import LiveMarket from './components/LiveMarket/LiveMarket.jsx'
import FarmerProfile from './components/common/profile/FarmerProfile/FarmerProfile.jsx'
import SavedUsers from './components/SavedUsers/SavedUsers.jsx'
import GroupedUsers from './components/GroupedUsers/GroupedUsers.jsx'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import store from './redux/store.js'
import PrivateRoute from './components/PrivateRoutes.jsx'
import MyProfile from './components/Users/MyProfile.jsx'
import CreateOrder from './components/Users/CreateOrder.jsx'
import UpdateProfile from './components/Users/UpdateProfile.jsx'
// import CreateBuyerOrder from './components/Buyer/CreateBuyerOrder.jsx'
import { ChakraProvider } from '@chakra-ui/react'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<Home />}></Route>
      <Route path="/signIn" element={<SignIn />}></Route>
      <Route path="/signUp" element={<RegisterAs />}></Route>
      <Route path="/signUp/:id" element={<SignUp />}></Route>
      <Route path="/forgotPassword" element={<ForgotPassword />}></Route>
      {/* <Route path="/cards" element={<FarmerCard />}></Route> */}
      <Route path="/contractMarket" element={<ContractMarket />}></Route>
      <Route path="/liveMarket" element={<LiveMarket />}></Route>
      <Route path="/profile/:userId" element={<FarmerProfile />}></Route>
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<MyProfile />} />
        <Route path="/savedNetwork" element={<SavedUsers />} />
        <Route path="/groupedNetwork" element={<GroupedUsers />} />
        <Route path="/createOrder" element={<CreateOrder />} />
        {/* <Route path="/createBuyerOrder" element={<CreateBuyerOrder />} /> */}
        <Route path="/updateProfile" element={<UpdateProfile />} />
      </Route>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <ChakraProvider> */}
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
      <ToastContainer />
    </Provider>
    {/* </ChakraProvider> */}
  </StrictMode>
)
