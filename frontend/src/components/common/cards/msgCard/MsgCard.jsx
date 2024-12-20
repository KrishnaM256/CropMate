import React from 'react'
import {
  formatDistanceToNow,
  formatDistanceToNowStrict,
  parseISO,
} from 'date-fns'
import { BASE_URL, FRONT_URL } from '../../../../redux/constants'
import { useGetMostRecentMessageQuery } from '../../../../redux/api/chatApiSlice'
import './MsgCard.css'
import { MdBlock } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const MsgCard = ({ user, otherUser }) => {
  const { data: recentMsg, isLoading } = useGetMostRecentMessageQuery(user._id)
  console.log(recentMsg)
  const { userInfo } = useSelector((state) => state.auth)
  // Format the time
  const formattedTime = recentMsg
    ? formatDistanceToNowStrict(parseISO(recentMsg.time))
    : ''
  const navigate = useNavigate()
  return (
    <>
      <div
        className={`msgrCard ${otherUser === user._id ? 'currUser' : ''}`}
        onClick={() => navigate(`/inbox/${user._id}`)}
      >
        <img
          src={
            user.avatar
              ? `${BASE_URL}/avatar/${user.avatar}`
              : `${FRONT_URL}/profile.svg`
          }
          alt="profile"
          className="profileIcon"
        />
        <div className="msgInfo">
          <div className="msgContainer">
            <p className="userName">
              {user.firstName} {user.middleName} {user.lastName}
            </p>
            <p className="time">{isLoading ? 'Loading...' : formattedTime}</p>
          </div>

          <p className="recentMsg">
            {isLoading ? (
              'Loading...'
            ) : recentMsg.message ? (
              recentMsg.deleted ? (
                <span className="deleted">
                  <MdBlock className="icon" />
                  {userInfo._id === recentMsg.sender
                    ? 'You deleted this message'
                    : 'This message was deleted'}
                </span>
              ) : (
                recentMsg.message
              )
            ) : (
              ''
            )}
          </p>
        </div>
      </div>
    </>
  )
}

export default MsgCard
