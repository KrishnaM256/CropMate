import React from 'react'
import profile from '../../../../assets/profile.jpg'
import { FaStar } from 'react-icons/fa'
import { IoLocationSharp } from 'react-icons/io5'
import { FaRegHeart, FaRegPaperPlane } from 'react-icons/fa'
import { BiSolidLandscape } from 'react-icons/bi'
import { MdOutlineGroupRemove } from 'react-icons/md'

import { useNavigate } from 'react-router-dom'
import './GroupCard.css'

const GroupCard = () => {
  const navigate = useNavigate()
  return (
    <div className="GroupCard card">
      <img src={profile} alt="" className="profilePic" />
      <div className="info">
        <div className="firstLine line2">
          <div style={{ fontWeight: '550', fontSize: '19px' }}>Name</div>
          <FaStar />
          <div>4.6</div>
          <div>(1000)</div>
        </div>
        <div className="wrapText line2">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Consequuntur, neque.Lorem ipsum dolor sit amet consectetur,
          adipisicing elit. Consequuntur, neque.Lorem ipsum dolor sit amet
          consectetur, adipisicing elit. Consequuntur, neque.
        </div>
        <div className="thirdLine line2">
          <div>
            <BiSolidLandscape />
            Land
          </div>
          <div>
            <IoLocationSharp />
            City
          </div>
          <div>
            <IoLocationSharp />
            State
          </div>
        </div>
      </div>
      <div className="options">
        <button type="button" className="border">
          <MdOutlineGroupRemove />
        </button>
        <button type="button" className="border">
          <FaRegHeart />
        </button>
        <button type="button" className="border">
          <FaRegPaperPlane />
        </button>
        <button
          type="button"
          className="simpleBtn border"
          onClick={() => navigate('/farmerProfile')}
        >
          See profile
        </button>
      </div>
    </div>
  )
}

export default GroupCard
