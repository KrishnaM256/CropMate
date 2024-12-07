import React from 'react'
import { Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { GrLanguage } from 'react-icons/gr'
import { Link } from 'react-router-dom'
import { RxCross2 } from 'react-icons/rx'
import './Sidebar.css'

const Sidebar = ({ open, setOpen }) => {
  const userInfo = localStorage.getItem('userInfo')
  console.log(userInfo)

  return (
    <div className="sideBar">
      <button onClick={() => setOpen(!open)} className="cross">
        <RxCross2 />
      </button>
      <ul>
        <li>
          <Link to={'/liveMarket'}>Live market</Link>
        </li>
        <li>
          <Link to={'/contractMarket'}>Contract market</Link>
        </li>
        {!userInfo && (
          <>
            <li id="signin">
              <Link to={'/signIn'}>Sign in</Link>
            </li>
            <li id="signin">
              <Link to={'/signUp'}>Join</Link>
            </li>
          </>
        )}
        <li>Community</li>
        <li>Guides</li>
        <li>Predict</li>
        <li>Learn</li>
        <li>Language</li>
      </ul>
    </div>
  )
}

export default Sidebar
