import React, { useState } from 'react'
import { FaStar } from 'react-icons/fa'
import { IoLocationSharp } from 'react-icons/io5'
import { FaRegHeart, FaRegPaperPlane } from 'react-icons/fa'
import { BiSolidLandscape } from 'react-icons/bi'
import { MdOutlineGroupAdd } from 'react-icons/md'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import profile from '../../../../assets/profile.jpg'
import farm1 from '../../../../assets/farm1.jpg'
import farm2 from '../../../../assets/farm2.jpg'
import farm3 from '../../../../assets/farm3.jpg'
import ReviewCard from '../../cards/ReviewCard/ReviewCard'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './FarmerProfile.css'

const FarmerProfile = () => {
  const medias = [
    { type: 'image', src: farm1 },
    { type: 'image', src: farm2 },
    { type: 'image', src: farm3 },
    { type: 'image', src: farm1 },
  ]

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
          <div className="profileDiv1">
            <div className="basic1">
              <img src={profile} alt="" className="profilePic" />
              <div className="info">
                <div className="firstLine line1">
                  <div style={{ fontWeight: '550', fontSize: '25px' }}>
                    Name
                  </div>
                </div>
                <div className="thirdLine">
                  <FaStar />
                  4.6 (1000)
                </div>
                <div className="wrapText line1">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                </div>
                <div className="thirdLine line1">
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
            </div>
            <div className="basic2">
              <h4 className="h4">About me</h4>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Corporis illum, dolorem non voluptatum.
              </p>
            </div>
          </div>
          <div className="profileDiv2">
            <div className="adv1">
              <button type="button" className="border">
                <MdOutlineGroupAdd />
                Group
              </button>
              <button type="button" className="border">
                <FaRegHeart />
                Save
              </button>
            </div>
            <div className="adv2">
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni
                vitae quidem.
              </p>
              <button type="button" id="contactBtn" className="border">
                <FaRegPaperPlane />
                Contact me
              </button>
            </div>
          </div>
        </div>
        <div className="gallery">
          <h4 className="h4">See my work</h4>
          <div className="slider-container">
            <Slider {...settings}>
              {medias.map((media, index) => (
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
              ))}
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
          <ReviewCard />
          <ReviewCard />
          <ReviewCard />
          <ReviewCard />
          <ReviewCard />
        </div>
      </div>
      <div className="bottomLine">
        <button type="button" className="border">
          <MdOutlineGroupAdd />
          Group
        </button>
        <button type="button" className="border">
          <FaRegHeart />
          Save
        </button>
        <button type="button" id="contactBtn" className="border">
          <FaRegPaperPlane />
          Contact me
        </button>
      </div>
    </>
  )
}

export default FarmerProfile
