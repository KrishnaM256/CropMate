import React, { useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa'
import { IoLocationSharp } from 'react-icons/io5'
import { FaRegHeart, FaRegPaperPlane } from 'react-icons/fa'
import { BiSolidLandscape } from 'react-icons/bi'
import { MdOutlineGroupAdd } from 'react-icons/md'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import profile from './../../assets/profile.jpg'
import profile2 from './../../assets/profile2.jpg'

import farm1 from '../../assets/farm1.jpg'
import farm2 from '../../assets/farm2.jpg'
import farm3 from '../../assets/farm3.jpg'
import ReviewCard from '../common/cards/ReviewCard/ReviewCard'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import '../common/profile/FarmerProfile/FarmerProfile.css'
import { useSelector } from 'react-redux'
import { FaUserEdit } from 'react-icons/fa'
import './MyProfile.css'
import { useNavigate } from 'react-router-dom'

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
                  src={userInfo.role == 'farmer' ? profile : profile2}
                  alt=""
                  className="profilePic"
                />
                <div className="info">
                  <div className="firstLine line1">
                    <div style={{ fontWeight: '550', fontSize: '25px' }}>
                      {userInfo.firstName} {userInfo.lastName}
                    </div>
                  </div>
                  <div className="thirdLine">
                    <FaStar />
                    {userInfo.rating} ({userInfo.numReviews})
                  </div>
                  <div className="wrapText line1">{userInfo.tagLine}</div>
                  <div className="thirdLine line1">
                    {userInfo.role == 'farmer' && (
                      <div>
                        <BiSolidLandscape />
                        {userInfo.totalLand} Acre
                      </div>
                    )}
                    <div>
                      <IoLocationSharp />
                      {userInfo.city}, {userInfo.state}
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
                    {media.type === 'image' ? (
                      <img src={media.src} alt={`media-${index}`} />
                    ) : (
                      <video controls>
                        <source src={media.src} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    )}
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
              {file.type === 'video' ? (
                <video src={file.src} muted autoPlay controls></video>
              ) : (
                <img src={file.src} alt="popup" />
              )}
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
