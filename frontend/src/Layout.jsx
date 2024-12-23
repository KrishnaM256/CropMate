import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/common/Navbar/Navbar'
import Footer from './components/common/Footer/Footer'

const Layout = () => {
  return (
    <div className="layout-container">
      <div className="main-content">
        <Navbar />
        <div className="content-area" style={{ width: '100%' }}>
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default Layout
