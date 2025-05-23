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
import Dashboard from './components/Dashboard/Dashboard.jsx'
import Contract from './components/common/Contract/Contract.jsx'
import ContractForm from './components/common/Contract/ContractForm/ContractForm.jsx'
import Inbox from './components/Chat/Inbox/Inbox.jsx'
import Learning from './components/Learning/Learning.jsx'
import MyOrders from './components/Users/MyOrders.jsx'
import MyAcceptedOrders from './components/Users/MyAcceptedOrders.jsx'
import AcceptedOrdersCard from './components/common/cards/AcceptedOrdersCard/AcceptedOrdersCard.jsx'
import Footer from './components/common/Footer/Footer.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<Home />}></Route>
      <Route path="/signIn" element={<SignIn />}></Route>
      <Route path="/signUp" element={<RegisterAs />}></Route>
      <Route path="/signUp/:id" element={<SignUp />}></Route>
      <Route path="/forgotPassword" element={<ForgotPassword />}></Route>
      <Route path="/cards" element={<AcceptedOrdersCard />}></Route>
      <Route path="/contractMarket" element={<ContractMarket />}></Route>
      <Route path="/liveMarket" element={<LiveMarket />}></Route>
      <Route path="/learning" element={<Learning />}></Route>
      <Route path="/profile/:userId" element={<FarmerProfile />}></Route>
      <Route path="/contract/:id" element={<Contract />}></Route>
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<MyProfile />} />
        <Route path="/savedNetwork" element={<SavedUsers />} />
        <Route path="/groupedNetwork" element={<GroupedUsers />} />
        <Route path="/createOrder" element={<CreateOrder />} />
        <Route path="/myOrders" element={<MyOrders />} />
        <Route path="/myAcceptedOrders" element={<MyAcceptedOrders />} />
        <Route path="/contractForm" element={<ContractForm />}></Route>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/inbox/:id" element={<Inbox />} />
        {/* <Route path="/createBuyerOrder" element={<CreateBuyerOrder />} /> */}
        <Route path="/updateProfile" element={<UpdateProfile />} />
      </Route>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <>
    {/* if strict mode used each log will get printed twice  */}
    {/* <ChakraProvider> */}
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
      <App></App>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={true}
      />
    </Provider>
    {/* </ChakraProvider> */}
  </>
)
