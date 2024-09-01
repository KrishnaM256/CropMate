import React from 'react'
import { Outlet } from 'react-router-dom'

import Navbar from './components/common/Navbar/Navbar'

const Layout = () => {
  return (
    <div className="layout-container">
      {/* sidebar */}
      <div className="main-content">
        <Navbar />
        <div className="content-area" style={{ width: '100%' }}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout
