import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { GrLanguage } from 'react-icons/gr'
import Sidebar from '../sidebar/Sidebar'
import { IoMenu } from 'react-icons/io5'
import { categories } from '../../data/categories'
import './Navbar.css'

const Navbar = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div style={{ height: '73px' }}></div>

      {open && <Sidebar open={open} setOpen={setOpen} />}
      <nav className="navbar">
        <div className="sidebarDiv">
          <IoMenu className="menu" onClick={() => setOpen(!open)} />
          <p>
            <Link to={'/'}>CropMate</Link>
          </p>
        </div>
        <ul>
          <Menu className={open ? 'show' : 'hide'}>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              className="navButton"
            >
              Explore
            </MenuButton>
            <MenuList className="navList">
              <MenuItem className="item">
                <div>
                  Community
                  <p>Connect with other farmers.</p>
                </div>
              </MenuItem>
              <MenuItem className="item">
                <div>
                  Guides
                  <p>Access helpful guides and resources.</p>
                </div>
              </MenuItem>
              <MenuItem className="item">
                <div>
                  Predict
                  <p>Make predictions for better farming decisions.</p>
                </div>
              </MenuItem>
              <MenuItem className="item">
                <div>
                  Learn
                  <p>Enhance your knowledge with learning materials.</p>
                </div>
              </MenuItem>
            </MenuList>
          </Menu>
          <li>
            <GrLanguage style={{ marginRight: '10px' }} />
            Language
          </li>
          <li>
            <NavLink
              to={'/liveMarket'}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Live market
            </NavLink>
          </li>
          <li>
            <NavLink
              to={'/contractMarket'}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Contract market
            </NavLink>
          </li>
          <li id="signin">
            <NavLink
              to={'/signIn'}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Sign in
            </NavLink>
          </li>
          <Link to={'/signUp'} id="join">
            Join
          </Link>
        </ul>
      </nav>
      {/* <div className="categories">
        {categories.map((category) => {
          return <p>{category}</p>
        })}
      </div> */}
    </>
  )
}

export default Navbar
