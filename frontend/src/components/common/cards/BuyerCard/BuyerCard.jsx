import React from 'react'
import profile from '../../../../assets/profile2.jpg'
import { IoLocationSharp } from 'react-icons/io5'
import { BiSolidLandscape } from 'react-icons/bi'
import { FaStar, FaRegHeart, FaRegPaperPlane } from 'react-icons/fa'
import { MdOutlineGroupAdd } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import './../FarmerCard/FarmerCard.css'

const BuyerCard = ({ data }) => {
  const navigate = useNavigate()
  console.log(data)

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
            <h5>Required Land : </h5> <span> {data?.requiredLand} Acre</span>
          </div>
          {data?.preferredCropsYields?.map((ecy, i) => {
            return (
              <div className="ipDivContainer">
                <div className="landInfo">
                  <h5>Preferred Crop {i + 1} : </h5>
                  <span>{ecy?.preferredCrop}</span>
                </div>
                <div className="landInfo">
                  <h5>Preferred Average Yield {i + 1} : </h5>
                  <span>{ecy?.preferredYield} tons/acre</span>
                </div>
              </div>
            )
          })}
          <div className="landInfo">
            <h5>Expected Quality : </h5> <span> {data?.expectedQuality} </span>
          </div>
          <div className="landInfo">
            <h5>Payment Method : </h5> <span> {data?.paymentMethod} </span>
          </div>
          <div className="landInfo">
            <h5>Payment Schedule : </h5> <span> {data?.paymentSchedule} </span>
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

export default BuyerCard
