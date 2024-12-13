import React, { useState } from 'react'
import { TbLogout2 } from 'react-icons/tb'
import Profile from '../Users/UpdateProfile'
import './Dashboard.css'
import MyOrders from './MyOrders/MyOrders'
import { useNavigate } from 'react-router-dom'
const Dashboard = () => {
  const [feat, setFeat] = useState(0)
  const opts = [
    'Analytics',
    'My Orders',
    'My Chats',
    'My Notifications',
    'Create Order',
    'Edit Profile',
  ]
  const navigate = useNavigate()
  return (
    <div className="pageContainer">
      <h2 className="h2">Dashboard</h2>
      <div className="dashboardContainer">
        <div className="leftContainer">
          {opts.map((opt, i) => (
            <div className="grp" onClick={() => setFeat(i)}>
              {opts[i]}
            </div>
          ))}

          <div className="grp lastFeat">
            <TbLogout2 />
            Logout
          </div>
        </div>
        <div className="rightContainer">
          {feat == 0 && 'Analitics'}
          {feat == 1 && <MyOrders />}
          {feat == 2 && 'My Chats'}
          {feat == 3 && 'My Notifications'}
          {feat == 4 && navigate('/createOrder')}
          {feat == 5 && navigate('/updateProfile')}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
