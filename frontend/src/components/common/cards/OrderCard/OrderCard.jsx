import React from 'react'
// import profile from '../../../../assets/profile.jpg'
import { FaStar } from 'react-icons/fa'
import { IoLocationSharp } from 'react-icons/io5'
import { FaRegHeart, FaRegPaperPlane } from 'react-icons/fa'
import { BiSolidLandscape } from 'react-icons/bi'
import { MdOutlineGroupAdd } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import './OrderCard.css'
import { useSelector } from 'react-redux'
import { BASE_URL, FRONT_URL } from '../../../../redux/constants'

const OrderCard = ({ data, addToGroup, toggle, setToggle }) => {
  console.log(data)
  const { userInfo } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const handleAddToGroup = () => {
    const details = {
      name: data?.user?.name,
      id: data?.user?.id,
    }
    console.log({ details: details })
    addToGroup(details)
    setToggle(true)
  }

  return (
    <div className="card">
      <div className="profileInfo">
        <div className="profileInfoFlex">
          <img
            src={
              data.user.avatar
                ? `${BASE_URL}/avatar/${data.user.avatar}`
                : `${FRONT_URL}/profile.svg`
            }
            alt=""
            className="profilePic"
          />
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
                {data?.user?.address.city}, {data?.user?.address.state}
              </div>
            </div>
          </div>
        </div>

        <div className="options">
          <button type="button" className="border" onClick={handleAddToGroup}>
            <MdOutlineGroupAdd />
          </button>
          <button type="button" className="border">
            <FaRegHeart />
          </button>
          <button type="button" className="border">
            <FaRegPaperPlane />
          </button>
          <button type="button" className="simpleBtn border">
            Proceed
          </button>
          <button
            type="button"
            className="simpleBtn border"
            onClick={() =>
              navigate(
                data?.user?.id == userInfo?._id
                  ? '/profile'
                  : `/profile/${data?.user?.id}`
              )
            }
          >
            See profile
          </button>
        </div>
      </div>
      <div className="details">
        <div>
          <div className="ipDivContainer2">
            <div className="landInfo">
              <h5>Land : </h5> <span> {data?.land} Acre</span>
            </div>
            <div className="landInfo">
              <h5>Logistics : </h5>
              <span>
                {data.transportationRequired ? 'Not included' : 'included'}
              </span>
            </div>
          </div>
          {data?.expectedCropsYields.map((ecy, i) => {
            return (
              <div className="ipDivContainer2">
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
          <div className="ipDivContainer2">
            <div className="landInfo">
              <h5>Order For : </h5> <span> {data?.orderType} </span>
            </div>
            <div className="landInfo">
              <h5>Payment Method : </h5> <span> {data?.paymentMethod} </span>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          fontSize: '18px',
          textAlign: 'right',
          width: '100%',
          color: 'green',
        }}
      >
        <span style={{ fontWeight: '600' }}>From ₹{data?.pricePerTon}</span>
        /ton
      </div>
    </div>
  )
}

export default OrderCard
