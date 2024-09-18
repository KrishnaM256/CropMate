import React from 'react'
import profile from '../../../../assets/profile.jpg'
import { FaStar } from 'react-icons/fa'
import { IoLocationSharp } from 'react-icons/io5'
import { FaRegHeart, FaRegPaperPlane } from 'react-icons/fa'
import { BiSolidLandscape } from 'react-icons/bi'
import { MdOutlineGroupAdd } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

import './FarmerCard.css'

const FarmerCard = ({ data }) => {
  console.log(data)

  const navigate = useNavigate()
  return (
    <div className="card">
      <div className="profileInfo">
        <div className="profileInfoFlex">
          <img src={profile} alt="" className="profilePic" />
          <div className="info">
            <div className="firstLine line2">
              <div style={{ fontWeight: '550', fontSize: '19px' }}>
                {data?.user?.name}
              </div>
              <FaStar />
              <div>{data?.user?.rating}</div>
              <div>({data?.user?.numReviews})</div>
            </div>
            <div className="wrapText line2">{data?.user?.tagLine}</div>
            <div className="thirdLine line2">
              <div>
                <BiSolidLandscape />
                {data?.user?.totalLand}
              </div>
              <div>
                <IoLocationSharp />
                {data?.user?.city}, {data?.user?.state}
              </div>
            </div>
          </div>
        </div>

        <div className="options">
          <button type="button" className="border">
            <MdOutlineGroupAdd />
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
            onClick={() => navigate(`/farmerProfile/${data?.user?.id}`)}
          >
            See profile
          </button>
        </div>
      </div>
      <div className="details">
        <div>
          <div className="landInfo">
            <h5>Crop-Ready Land : </h5> <span> {data?.cropReadyLand} Acre</span>
          </div>
          {data?.expectedCropsYields.map((ecy, i) => {
            return (
              <div className="ipDivContainer">
                <div className="landInfo">
                  <h5>Expected Crop {i + 1} : </h5>
                  <span>{ecy?.expectedCrop}</span>
                </div>
                <div className="landInfo">
                  <h5>Expected Average Yield {i + 1} : </h5>
                  <span>{ecy?.expectedYield} tons/acre</span>
                </div>
              </div>
            )
          })}
          <div className="landInfo">
            <h5>Current Crops : </h5> <span> {data?.currentCrops} </span>
          </div>
          <div className="landInfo">
            <h5>Logistics : </h5> <span> {data?.logistics} </span>
          </div>
        </div>
        <div style={{ fontSize: '18px' }}>
          <span style={{ fontWeight: 'bold' }}>From</span> ₹{data?.pricePerAcre}
          /Acre
        </div>
      </div>
    </div>
  )
}

export default FarmerCard
