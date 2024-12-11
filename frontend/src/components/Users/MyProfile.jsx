import React, { useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa'
import { IoLocationSharp } from 'react-icons/io5'
import { FaRegHeart, FaRegPaperPlane } from 'react-icons/fa'
import { BiSolidLandscape } from 'react-icons/bi'
import { MdOutlineGroupAdd } from 'react-icons/md'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import profile from './../../../public/profile.svg'

import ReviewCard from '../common/cards/ReviewCard/ReviewCard'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import '../common/profile/FarmerProfile/FarmerProfile.css'
import { useSelector } from 'react-redux'
import { FaUserEdit } from 'react-icons/fa'
import './MyProfile.css'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../redux/constants'

const MyProfile = () => {
  const navigate = useNavigate()
  const { userInfo } = useSelector((state) => state.auth)
  const medias = userInfo.workImages

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
  return (
    <>
      <div className="mainProfilePage">
        <div className="profileDiv">
          <div className="profileDiv1 myProfileDiv1">
            <div className="basic1 myProfileBasic1">
              <div className="profileInfoFlex">
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
                  <div className="firstLine line1">
                    <div style={{ fontWeight: '550', fontSize: '25px' }}>
                      {userInfo.firstName} {userInfo.middleName}{' '}
                      {userInfo.lastName}
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
              <div className="profileEditDiv">
                <button
                  type="button"
                  className="border"
                  onClick={() => navigate('/updateProfile')}
                >
                  <FaUserEdit />
                  Edit Profile
                </button>
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
              {medias && medias.length > 0 ? (
                medias.map((media, index) => (
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
              <img src={`${BASE_URL}/workImages/${file}`} alt="popup" />
            </div>
          )}
        </div>
        <div className="basic3">
          <h4 className="h4">Reviews</h4>
          {userInfo.Reviews && userInfo.Reviews.length > 0 ? (
            userInfo.Reviews.map((review) => <ReviewCard></ReviewCard>)
          ) : (
            <p className="subLine">No reviews yet</p>
          )}
        </div>
      </div>
    </>
  )
}

export default MyProfile
