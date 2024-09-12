import React from 'react'
import profile from '../../../../assets/profile.jpg'
import { FaStar } from 'react-icons/fa'
import { IoLocationSharp } from 'react-icons/io5'
import { FaRegHeart, FaRegPaperPlane } from 'react-icons/fa'
import { BiSolidLandscape } from 'react-icons/bi'
import './SavedNetworkCard.css'
const SavedNetworkCard = () => {
  return (
    <div className="savedNetworkCard">
      <div className="savedNetworkCardDiv">
        <img src={profile} alt="" className="profilePic" />
        <div className="info">
          <div className="firstLine line2">
            <div style={{ fontWeight: '550', fontSize: '19px' }}>Name</div>
            <div>
              <FaStar />
              4.6 (1000)
            </div>
          </div>
          <div className="wrapText line2">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Consequuntur, neque.Lorem ipsum dolor sit amet consectetur,
            adipisicing elit. Consequuntur, neque.Lorem ipsum dolor sit amet
            consectetur, adipisicing elit. Consequuntur, neque. Lorem ipsum
            dolor sit amet consectetur, adipisicing elit. Consequuntur,
            neque.Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Consequuntur, neque.Lorem ipsum dolor sit amet consectetur,
            adipisicing elit. Consequuntur, neque.Lorem ipsum dolor sit amet
            consectetur, adipisicing elit. Consequuntur, neque.Lorem ipsum dolor
            sit amet consectetur, adipisicing elit. Consequuntur, neque.Lorem
            ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur,
            neque.
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
        <button type="button" className="border" id="heartRelative">
          <FaRegHeart />
        </button>
      </div>
    </div>
  )
}

export default SavedNetworkCard
