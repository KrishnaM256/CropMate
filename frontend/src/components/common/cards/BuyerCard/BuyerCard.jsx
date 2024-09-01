import React from 'react'
import profile from '../../../../assets/profile2.jpg'
import { FaStar } from 'react-icons/fa'
import { IoLocationSharp } from 'react-icons/io5'
import { FaRegHeart } from 'react-icons/fa'
import farm1 from '../../../../assets/farm1.jpg'
import farm2 from '../../../../assets/farm2.jpg'

import './../FarmerCard/FarmerCard.css'

const BuyerCard = () => {
  return (
    <div className="card">
      <div className="profileInfo">
        <img src={profile} alt="" className="profilePic" />
        <div className="info">
          <div className="firstLine line2">
            <h4>Name</h4>
            <FaStar />
            <span>4.0</span>
            <span>(1070)</span>
          </div>
          <div className="secondLine line2">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Consequuntur, neque.
          </div>
          <div className="thirdLine line2">
            <IoLocationSharp />
            City
            <IoLocationSharp />
            State
          </div>
        </div>
        <div className="options">
          <FaRegHeart className="like icon" />
          <button type="button" className="simpleBtn">
            See profile
          </button>
        </div>
      </div>
      <div className="description">
        <h4>Description:</h4>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde modi
          ratione ab accusantium officiis velit repellat numquam totam,
          assumenda qui facilis neque deserunt error commodi, nemo mollitia.
          Eligendi natus quisquam, cum dignissimos similique aperiam laboriosam
          aliquid soluta corporis eaque minima repudiandae magnam, voluptatum
          amet quia exercitationem praesentium, earum asperiores! Nesciunt
          facere nam architecto quisquam eius commodi accusantium nostrum a
          accusamus debitis assumenda consequatur esse ipsam temporibus, id
          vitae?
        </p>
      </div>
    </div>
  )
}

export default BuyerCard
