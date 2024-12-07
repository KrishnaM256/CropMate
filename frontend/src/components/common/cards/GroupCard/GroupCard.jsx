import React from 'react'
import profile from '../../../../assets/profile.jpg'
import profile2 from '../../../../assets/profile2.jpg'

import { FaStar } from 'react-icons/fa'
import { IoLocationSharp } from 'react-icons/io5'
import { FaRegHeart, FaRegPaperPlane } from 'react-icons/fa'
import { BiSolidLandscape } from 'react-icons/bi'
import { MdOutlineGroupRemove } from 'react-icons/md'

import { useNavigate } from 'react-router-dom'
import './GroupCard.css'
import { useDispatch } from 'react-redux'
import { removeFromGroup } from '../../../../redux/features/group/groupSlice'
import { toast } from 'react-toastify'

const GroupCard = ({ member, handleRemoveFromGroup }) => {
  const { city, id, name, numReviews, profilePic, rating, state, tagLine } =
    member
  const navigate = useNavigate()
  return (
    <div className="GroupCard card">
      <div className="profileInfoFlex">
        <img
          src={member.role == 'farmer' ? profile : profile2}
          alt=""
          className="profilePic"
        />
        <div className="info">
          <div className="firstLine line2">
            <div style={{ fontWeight: '550', fontSize: '19px' }}>{name}</div>
            <FaStar />
            <div>{rating}</div>
            <div>({numReviews})</div>
          </div>
          <div className="wrapText line2">{tagLine}</div>
          <div className="thirdLine line2">
            {member?.role && member.role == 'farmer' && (
              <div>
                <BiSolidLandscape />
                {member.totalLand}
              </div>
            )}
            <div>
              <IoLocationSharp />
              {city}, {state}
            </div>
          </div>
        </div>
      </div>
      <div className="options">
        <button
          type="button"
          className="border"
          onClick={() => handleRemoveFromGroup(id)}
        >
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
          onClick={() => navigate(`/profile/${id}`)}
        >
          See profile
        </button>
      </div>
    </div>
  )
}

export default GroupCard
