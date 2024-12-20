import React, { useEffect, useRef, useState } from 'react'
import { IoLocationSharp, IoSend } from 'react-icons/io5'
import { CiEdit } from 'react-icons/ci'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import { MdBlock } from 'react-icons/md'

import './Inbox.css'
import {
  useDeleteMessageMutation,
  useGetChatUsersQuery,
  useRetrieveMessagesQuery,
  useSendMessageMutation,
} from '../../../redux/api/chatApiSlice'
import { useSelector } from 'react-redux'
import { BASE_URL, FRONT_URL } from '../../../redux/constants'
import MsgCard from '../../common/cards/msgCard/msgCard'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  differenceInMinutes,
  formatDistanceToNowStrict,
  parseISO,
} from 'date-fns'
import { useGetUserByIdQuery } from '../../../redux/api/usersApiSlice'

const Inbox = () => {
  const navigate = useNavigate()
  const { userInfo } = useSelector((state) => state.auth)
  const param = useParams()

  let otherUserId = param.id
  if (!otherUserId && !isLoading) {
    otherUserId = users[1]?._id
  }

  const [sendMessage] = useSendMessageMutation()
  const [deleteMessage] = useDeleteMessageMutation()
  const [sendingMessage, setSendingMessage] = useState('')

  const {
    data: users,
    isLoading,
    refetch: usersRefetch,
  } = useGetChatUsersQuery()
  const { data: newUser, isLoading: isUserLoading } =
    useGetUserByIdQuery(otherUserId)

  const otherUser = users?.find((user) => user._id === otherUserId) || newUser

  console.log({ otherUser: otherUser })
  const {
    data: messages,
    isLoading: isMessageLoading,
    refetch,
  } = useRetrieveMessagesQuery(otherUserId)
  console.log({ messages: messages })
  const bottomRef = useRef(null)

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  const handleDeleteMsg = async (id) => {
    try {
      await deleteMessage(id).unwrap()
      toast.success('Message deleted successfully.')
    } catch (error) {
      toast.error(error?.data?.message)
    }
    refetch()
    usersRefetch()
  }

  const handleSendMsg = async (e) => {
    e.preventDefault()
    try {
      await sendMessage({
        data: { message: sendingMessage },
        id: otherUserId,
      }).unwrap()
      toast.success('Message sent')
    } catch (error) {
      toast.error(error?.data?.message)
    }
    refetch()
    usersRefetch()
    setSendingMessage('')
  }

  if (isMessageLoading) {
    return <div>Loading user data...</div>
  }

  return (
    <div className="pageContainer2">
      <div className="inboxContainer">
        <div className="leftSub">
          <h3 className="msgs h3">Messages</h3>
          <div className="users">
            {users
              ?.filter((user) => user._id !== userInfo._id)
              .map((user) => {
                return <MsgCard user={user} otherUser={otherUserId} />
              })}
          </div>
        </div>
        <div className="rightSub">
          <div
            className="headerPart"
            onClick={() => {
              if (otherUser) {
                navigate(`/profile/${otherUser._id}`)
              }
            }}
          >
            {otherUser ? (
              <>
                <img
                  src={
                    otherUser?.avatar
                      ? `${BASE_URL}/avatar/${otherUser?.avatar}`
                      : `${FRONT_URL}/profile.svg`
                  }
                  alt="profile"
                  className="otherUserPic"
                />
                <div className="msgInfo">
                  <div className="msgContainer">
                    <p
                      style={{
                        marginLeft: '2px',
                        fontSize: '20px',
                        fontWeight: '600',
                      }}
                    >
                      {otherUser.firstName} {otherUser.middleName}{' '}
                      {otherUser.lastName}
                    </p>
                  </div>
                  <p className="location">
                    <IoLocationSharp />
                    <span>
                      {otherUser.address.city}, {otherUser.address.state}
                    </span>
                  </p>
                </div>
              </>
            ) : (
              <p>Loading user details...</p>
            )}
          </div>
          <div className="middlePart">
            {messages?.length ? (
              messages?.map((message, index) => (
                <div
                  key={index}
                  className={`msgBox  ${
                    message.sender === userInfo._id && 'mineBox'
                  }`}
                >
                  {message.sender === userInfo._id &&
                    !message.deleted &&
                    differenceInMinutes(new Date(), message.createdAt) < 5 && (
                      <>
                        <button
                          className="optBtns"
                          type="button"
                          onClick={() => handleDeleteMsg(message._id)}
                        >
                          <AiOutlineDelete />
                        </button>
                      </>
                    )}
                  <div
                    className={`messageContainer ${
                      message.sender === userInfo._id ? 'mine ' : 'others'
                    }`}
                  >
                    <p className="message">
                      {message.deleted ? (
                        <span className="deleted">
                          <MdBlock className="icon" />
                          {message.sender === userInfo._id
                            ? 'You deleted this message'
                            : 'This message was deleted'}
                        </span>
                      ) : (
                        message.message
                      )}
                    </p>
                    <sub id="msgTime">
                      {formatDistanceToNowStrict(parseISO(message.createdAt))}
                    </sub>
                  </div>
                </div>
              ))
            ) : (
              <p className="notFound">No messages yet</p>
            )}
            <div ref={bottomRef} />
          </div>
          <div className="lowerPart">
            <form className="search inputBox" onSubmit={handleSendMsg}>
              <input
                type="text"
                name="search"
                placeholder="Type a message..."
                required
                value={sendingMessage}
                onChange={(e) => setSendingMessage(e.target.value)}
              />
              <button type="submit" className="sendBtn">
                <IoSend className="searchIcon" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Inbox
