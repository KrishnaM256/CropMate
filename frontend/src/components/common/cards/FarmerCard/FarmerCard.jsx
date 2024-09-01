import React from 'react'
import profile from '../../../../assets/profile.jpg'
import { FaStar } from 'react-icons/fa'
import { IoLocationSharp } from 'react-icons/io5'
import { FaRegHeart } from 'react-icons/fa'
import { BiSolidLandscape } from 'react-icons/bi'
import { BiMessageRoundedDots } from 'react-icons/bi'
import { GoPlus } from 'react-icons/go'
import './FarmerCard.css'

const FarmerCard = () => {
  return (
    <div className="card">
      <div className="profileInfo">
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
            <GoPlus />
          </button>
          <button type="button" className="border">
            <FaRegHeart />
          </button>
          <button type="button" className="border">
            <BiMessageRoundedDots />
          </button>
          <button type="button" className="simpleBtn border">
            See profile
          </button>
        </div>
      </div>
      <div className="details">
        <div>
          <div className="landInfo">
            <h5>Crop-Ready Land : </h5> <span> 30Acre</span>
          </div>
          <div className="landInfo">
            <h5>Expected Crop :</h5>
            <span>Onion</span>
          </div>
        </div>
        <div style={{ fontSize: '18px' }}>
          <span style={{ fontWeight: 'bold' }}>From</span> ₹5,999/Acre
        </div>
      </div>
    </div>
  )
}

export default FarmerCard
