import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import profile from '../../../../public/profile.svg'
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5'

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { GrLanguage } from 'react-icons/gr'
import Sidebar from '../sidebar/Sidebar'
import { IoMenu } from 'react-icons/io5'
import { categories } from '../../data/categories'
import { CgProfile } from 'react-icons/cg'

import { useDispatch, useSelector } from 'react-redux'
import './Navbar.css'
import { useLogoutMutation } from '../../../redux/api/usersApiSlice'
import { logout } from '../../../redux/features/auth/authSlice'
import { toast } from 'react-toastify'
import { BASE_URL, FRONT_URL } from '../../../redux/constants'

const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [logoutApiCall] = useLogoutMutation()
  const [open, setOpen] = useState(false)
  const { userInfo } = useSelector((state) => state.auth)
  const handleLogout = async () => {
    try {
      await logoutApiCall().unwrap()
      dispatch(logout())
      navigate('/signIn')
      toast.success('Logged out successfully!')
    } catch (error) {
      console.log(error)
    }
  }
  console.log(userInfo)

  return (
    <>
      <div style={{ height: '65px' }}></div>
      {open && <Sidebar open={open} setOpen={setOpen} />}
      <nav className="navbar">
        <div className="sidebarDiv">
          <IoMenu className="menu" onClick={() => setOpen(!open)} />
          <p>
            <Link to={'/'} className="logo">
              CropMate
            </Link>
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
            </MenuList>
          </Menu>
          <li>
            <GrLanguage style={{ marginRight: '10px' }} />
            Language
          </li>
          <li>
            <NavLink
              to={'/learning'}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Learning
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
          {userInfo ? (
            <Menu className={open ? 'show' : 'hide'}>
              <MenuButton as={Button} className="icon2">
                <img
                  src={
                    userInfo.avatar
                      ? `${BASE_URL}/avatar/${userInfo.avatar}`
                      : `${FRONT_URL}/profile.svg`
                  }
                  alt="profile"
                  className="profileIcon"
                />
              </MenuButton>
              <MenuList className="navList">
                <MenuGroup>
                  <Link to={'/profile'} className="link2">
                    <MenuItem className="item item2">Profile</MenuItem>
                  </Link>
                  <Link to={'/inbox'} className="link2">
                    <MenuItem className="item item2">Inbox</MenuItem>
                  </Link>
                  <Link to={'/groupedNetwork'} className="link2">
                    <MenuItem className="item item2">Grouped Network</MenuItem>
                  </Link>
                  <Link to={'/savedNetwork'} className="link2">
                    <MenuItem className="item item2">Saved Orders</MenuItem>
                  </Link>
                  <Link to={'/createOrder'} className="link2">
                    <MenuItem className="item item2">Create Order</MenuItem>
                  </Link>
                  <Link to={'/myOrders'} className="link2">
                    <MenuItem className="item item2">My Orders</MenuItem>
                  </Link>
                  <Link to={'/myAcceptedOrders'} className="link2">
                    <MenuItem className="item item2">
                      My Accepted Orders
                    </MenuItem>
                  </Link>
                </MenuGroup>
                <MenuDivider className="menuDivider" />
                <MenuGroup>
                  <MenuItem className="item item2" onClick={handleLogout}>
                    Logout
                  </MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>
          ) : (
            <>
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
            </>
          )}
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
