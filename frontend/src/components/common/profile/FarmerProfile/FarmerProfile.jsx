import React, { useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa'
import { IoLocationSharp } from 'react-icons/io5'
import { FaRegHeart, FaRegPaperPlane } from 'react-icons/fa'
import { BiSolidLandscape } from 'react-icons/bi'
import { MdOutlineGroupAdd } from 'react-icons/md'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import profile from '../../../../../public/profile.svg'
import { BASE_URL } from '../../../../redux/constants'
import farm1 from '../../../../assets/farm1.jpg'
import farm2 from '../../../../assets/farm2.jpg'
import farm3 from '../../../../assets/farm3.jpg'
import ReviewCard from '../../cards/ReviewCard/ReviewCard'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useParams } from 'react-router-dom'
import {
  useAddToGroupMutation,
  useCreateGroupMutation,
  useGetAllGroupsQuery,
  useGetUserByIdQuery,
} from '../../../../redux/api/usersApiSlice'
import './FarmerProfile.css'
import { useGetAllOrdersQuery } from '../../../../redux/api/ordersApiSlice'
import { useSelector } from 'react-redux'
import { v4 as uuid4 } from 'uuid'
import { toast } from 'react-toastify'
const FarmerProfile = () => {
  const { userInfo: myInfo } = useSelector((state) => state.auth)
  const { userId } = useParams()
  const [createGroup] = useCreateGroupMutation()
  const [addToGroup] = useAddToGroupMutation()
  const {
    data: groupList,
    isLoading: isLoadingGrps,
    refetch,
  } = useGetAllGroupsQuery()
  const [groupName, setGroupName] = useState('')
  const [toggle, setToggle] = useState(false)
  const [selectedDetails, setSelectedDetails] = useState(null)
  const handleSaveGroup = async (e) => {
    e.preventDefault()
    if (groupName && selectedDetails) {
      try {
        const res = await createGroup({
          name: groupName,
          memberId: selectedDetails.id,
        }).unwrap()

        console.log('Group created successfully:', res)
        toast.success(
          `${selectedDetails.name} is successfully added to group ${groupName}.`
        )
      } catch (error) {
        console.log(error)
        toast.error(`${error.data?.message}`)
      }
      refetch()
      setGroupName('')
      setSelectedDetails(null)
      setToggle(false)
    }
  }
  const addToExistingGroup = async (id, name) => {
    try {
      const res = await addToGroup({
        groupId: id,
        memberId: selectedDetails.id,
      }).unwrap()
      console.log('added to group successfully:', res)

      toast.success(
        `${selectedDetails.name} is successfully added to group ${name}`
      )
    } catch (error) {
      console.log(error)
      toast.error(`${error.data?.message}`)
    }
    setSelectedDetails(null)
    setToggle(false)
  }
  console.log('userId:', userId)

  const { data: userInfo, isLoading, error } = useGetUserByIdQuery(userId)

  console.log('userInfo:', userInfo, 'isLoading:', isLoading, 'error:', error)

  const [file, setFile] = useState(null)

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error fetching user profile</div>

  if (!userInfo) {
    return <div>No user data found</div>
  }
  const addDetails = (details) => {
    setSelectedDetails(details)
    setToggle(true)
  }

  const handleAddToGroup = () => {
    const details = {
      name: `${userInfo?.firstName} ${userInfo?.lastName} ${userInfo?.middleName}`,
      id: userInfo?._id,
    }
    addDetails(details)
    setToggle(true)
  }

  return (
    <>
      {toggle && (
        <>
          <div className="overlay" onClick={() => setToggle(false)}></div>
          <div className="popUp">
            <form action="" onSubmit={handleSaveGroup}>
              <h4 className="h4">Create group:</h4>
              <div className="ipContainer">
                <label htmlFor="email">Group name:</label>
                <input
                  type="text"
                  name="groupName"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  required
                />
              </div>
            </form>
            <div className="buttons">
              <button
                className="subBtn"
                type="submit"
                onClick={handleSaveGroup}
              >
                Save
              </button>
              <button onClick={() => setToggle(false)} id="cancel">
                Cancel
              </button>
            </div>
            <div className="existingGroups">
              <h4 className="h4">Add to existing groups:</h4>

              {groupList ? (
                groupList.map((group) => {
                  return (
                    <button
                      key={uuid4()}
                      onClick={() => addToExistingGroup(group?._id, group.name)}
                      id="grps"
                    >
                      {group.name}
                    </button>
                  )
                })
              ) : (
                <p className="subLine">No groups have been created yet</p>
              )}
            </div>
          </div>
        </>
      )}
      <div className="mainProfilePage">
        <div className="profileDiv">
          <div className="profileDiv1">
            <div className="basic1">
              <img
                src={
                  userInfo.avatar
                    ? `${BASE_URL}/avatar/${userInfo.avatar}`
                    : profile
                }
                alt=""
                className="profilePic"
              />
              <div className="info">
                <div
                  className="firstLine line1"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}
                >
                  <div
                    style={{ fontWeight: '550', fontSize: '25px', margin: '0' }}
                  >
                    {userInfo.firstName} {userInfo.middleName}{' '}
                    {userInfo.lastName}
                  </div>
                  <div className="action-buttons">
                    <button
                      className="action-btn"
                      onClick={() =>
                        !userInfo ? navigate('/signin') : handleAddToGroup()
                      }
                    >
                      <MdOutlineGroupAdd /> Group me
                    </button>
                    <button
                      className="action-btn"
                      onClick={() =>
                        !userInfo
                          ? navigate('/signin')
                          : navigate(`/inbox/${userInfo?._id}`)
                      }
                    >
                      <FaRegPaperPlane /> Contact me
                    </button>
                  </div>
                </div>
                <div className="wrapText line1">{userInfo.tagLine}</div>
                <div className="thirdLine">
                  <FaStar />
                  {userInfo.rating} ({userInfo.numReviews})
                </div>
                <div className="thirdLine line1">
                  {userInfo.role == 'farmer' && (
                    <div>
                      <BiSolidLandscape />
                      {userInfo.totalLand} Acre
                    </div>
                  )}

                  <div>
                    <IoLocationSharp />
                    {userInfo.address.city}, {userInfo.address.state}
                  </div>
                </div>
              </div>
            </div>

            <div className="basic2">
              <h4 className="h4">About me</h4>
              <p>{userInfo.aboutMe}</p>
            </div>
          </div>
        </div>
        <div className="gallery">
          <h4 className="h4">See my work</h4>
          <div className="slider-container">
            <Slider {...settings}>
              {userInfo.workImages ? (
                userInfo.workImages?.map((media, index) => (
                  <div
                    className="media"
                    key={index}
                    onClick={() => setFile(media)}
                  >
                    <img
                      src={`${BASE_URL}/workImages/${media}`}
                      alt={`media-${index}`}
                    />
                  </div>
                ))
              ) : (
                <p className="subLine">No work images yet</p>
              )}
            </Slider>
          </div>
          {file && (
            <div className="popupMedia">
              <span onClick={() => setFile(null)}>&times;</span>
              <img src={file.src} alt="popup" />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default FarmerProfile
