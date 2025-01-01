import React, { useState } from 'react'
import profile from '../../../../assets/profile.jpg'
import profile2 from '../../../../assets/profile2.jpg'

import { FaStar } from 'react-icons/fa'
import { IoLocationSharp } from 'react-icons/io5'
import { FaRegHeart, FaRegPaperPlane } from 'react-icons/fa'
import { BiSolidLandscape } from 'react-icons/bi'
import { MdOutlineGroupRemove } from 'react-icons/md'
import { MdOutlineGroupAdd } from 'react-icons/md'

import { useNavigate } from 'react-router-dom'
import './GroupCard.css'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromGroup } from '../../../../redux/features/group/groupSlice'
import { toast } from 'react-toastify'
import { BASE_URL, FRONT_URL } from '../../../../redux/constants'
import {
  useCreateSavedOrdersMutation,
  useRemoveSavedOrderMutation,
} from '../../../../redux/api/usersApiSlice'
import { useGetContractByOrderIdQuery } from '../../../../redux/api/contractApiSlice'

const GroupCard = ({ groupId, member, handleRemoveFromGroup }) => {
  const {
    _id,
    avatar,
    firstName,
    middleName,
    lastName,
    numReviews,
    rating,
    tagLine,
    address,
    role,
    savedOrders,
  } = member
  console.log({ member: member })
  const { userInfo } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  return (
    <div className="GroupCard card">
      <div className="profile-info">
        <div className="profile-header">
          <img
            src={
              member.avatar
                ? `${BASE_URL}/avatar/${member.avatar}`
                : `${FRONT_URL}/profile.svg`
            }
            alt="profile"
            className="profile-pic"
          />
          <div className="profile-details">
            <div className="profile-name">
              <div className="name">
                {member.firstName} {member.middleName} {member.lastName}
              </div>
              <div className="rating">
                <FaStar />
                {member?.rating} ({member.numReviews})
              </div>
            </div>
            <div className="tagline">{member.tagLine}</div>
            <div className="location">
              <IoLocationSharp />
              {member?.address?.city}, {member?.address?.state}
            </div>
          </div>
        </div>

        <div className="action-buttons">
          <button
            type="button"
            className="action-btn"
            onClick={() => handleRemoveFromGroup(member._id, groupId)}
          >
            <MdOutlineGroupRemove />
          </button>
          {userInfo?._id !== member?.id && (
            <button
              className="action-btn"
              onClick={() =>
                !userInfo
                  ? navigate('/signin')
                  : navigate(`/inbox/${member?._id}`)
              }
            >
              <FaRegPaperPlane />
            </button>
          )}
          <button
            className="view-profile-btn"
            onClick={() =>
              navigate(
                member?.id === userInfo?._id
                  ? '/profile'
                  : `/profile/${member?._id}`
              )
            }
          >
            See profile
          </button>
        </div>
      </div>
    </div>
  )
}

export default GroupCard
