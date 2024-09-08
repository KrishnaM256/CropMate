import React from 'react'
import './ReviewCard.css'
import { IoLocationSharp } from 'react-icons/io5'
import buyer from '../../../../assets/profile2.jpg'
const ReviewCard = () => {
  return (
    <div className="review">
      <div className="reviewer">
        <img src={buyer} alt="" />
        <div className="details">
          <h5>Name</h5>
          <div className="thirdLine line2">
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
      </div>
    </div>
  )
}

export default ReviewCard
