import React from 'react'
// import profile from '../../../../assets/profile.jpg'
import { FaStar } from 'react-icons/fa'
import { IoLocationSharp } from 'react-icons/io5'
import { FaRegHeart, FaRegPaperPlane, FaHeart } from 'react-icons/fa'
import { BiSolidLandscape } from 'react-icons/bi'
import { MdOutlineGroupAdd } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { BASE_URL, FRONT_URL } from '../../../../redux/constants'
import {
  useCreateSavedOrdersMutation,
  useRemoveSavedOrderMutation,
} from '../../../../redux/api/usersApiSlice'
import { toast } from 'react-toastify'
import { useGetContractByOrderIdQuery } from '../../../../redux/api/contractApiSlice'

import './OrderCard.css'

const OrderCard = ({
  data,
  addToGroup,
  toggle,
  setToggle,
  savedOrders,
  savedOrderRefetch,
}) => {
  const { userInfo } = useSelector((state) => state.auth)
  const [saveOrder] = useCreateSavedOrdersMutation()
  const [removeSavedOrder] = useRemoveSavedOrderMutation()
  const { data: contract } = useGetContractByOrderIdQuery(data._id)
  const navigate = useNavigate()

  const handleAddToGroup = () => {
    const details = {
      name: data?.user?.name,
      id: data?.user?.id,
    }
    addToGroup(details)
    setToggle(true)
  }

  const checkIsOrderSaved = () => {
    return savedOrders?.some((order) => order._id === data._id)
  }

  const handleSaveOrder = async () => {
    try {
      await saveOrder({ orderId: data._id }).unwrap()
    } catch (error) {
      toast.error(`${error.data?.message}`)
    }
    savedOrderRefetch()
  }

  const handleRemoveSavedOrder = async () => {
    try {
      await removeSavedOrder({ orderId: data._id }).unwrap()
    } catch (error) {
      toast.error(`${error.data?.message}`)
    }
    savedOrderRefetch()
  }

  return (
    <div className="order-card">
      <div className="profile-info">
        <div className="profile-header">
          <img
            src={
              data.user.avatar
                ? `${BASE_URL}/avatar/${data.user.avatar}`
                : `${FRONT_URL}/profile.svg`
            }
            alt="profile"
            className="profile-pic"
          />
          <div className="profile-details">
            <div className="profile-name">
              <div className="name">{data?.user?.name}</div>
              <div className="rating">
                <FaStar />
                {data?.user?.rating} ({data?.user?.numReviews})
              </div>
            </div>
            <div className="tagline">{data?.user?.tagLine}</div>
            <div className="location">
              <IoLocationSharp />
              {data?.user?.address?.city}, {data?.user?.address?.state}
            </div>
          </div>
        </div>

        <div className="action-buttons">
          {userInfo?._id !== data?.user?.id && (
            <button
              className="action-btn"
              onClick={() =>
                !userInfo ? navigate('/signin') : handleAddToGroup()
              }
            >
              <MdOutlineGroupAdd />
            </button>
          )}
          {checkIsOrderSaved() ? (
            <button
              className="action-btn"
              onClick={() =>
                !userInfo ? navigate('/signin') : handleRemoveSavedOrder()
              }
            >
              <FaHeart />
            </button>
          ) : (
            <button
              className="action-btn"
              onClick={() =>
                !userInfo ? navigate('/signin') : handleSaveOrder()
              }
            >
              <FaRegHeart />
            </button>
          )}
          {userInfo?._id !== data?.user?.id && (
            <button
              className="action-btn"
              onClick={() =>
                !userInfo
                  ? navigate('/signin')
                  : navigate(`/inbox/${data?.user?.id}`)
              }
            >
              <FaRegPaperPlane />
            </button>
          )}
          <button
            className="proceed-btn"
            onClick={() =>
              !userInfo
                ? navigate('/signin')
                : navigate(`/contract/${data?._id}`)
            }
          >
            {userInfo?._id === data.user.id ? 'Contract' : 'Proceed'}
          </button>
          <button
            className="view-profile-btn"
            onClick={() =>
              navigate(
                data?.user?.id === userInfo?._id
                  ? '/profile'
                  : `/profile/${data?.user?.id}`
              )
            }
          >
            See profile
          </button>
        </div>
      </div>

      <div className="order-details">
        <div className="land-info">
          <div>
            <h5>Land :</h5> <span> {data?.land} Acre</span>
          </div>
          <div>
            <h5>Logistics :</h5>
            <span>
              {' '}
              {data.transportationRequired ? 'Not included' : 'Included'}
            </span>
          </div>
        </div>

        <div className="order-info">
          <div>
            <h5>Order For :</h5> <span> {data?.orderFor}</span>
          </div>
          <div>
            <h5>Payment Method :</h5> <span> {data?.paymentMethod}</span>
          </div>
        </div>

        {data?.expectedCropsYields?.map((ecy, i) => (
          <div key={i} className="expected-crop">
            <>
              <h5>Expected Crop {i + 1} :</h5>
              <span>
                {' '}
                {ecy?.expectedCrop}, {ecy?.expectedYield} tons/acre
              </span>
            </>
          </div>
        ))}
        <div className="price">
          <span className="price-text">From ₹{data?.pricePerAcre}</span>/acre
        </div>
      </div>
    </div>
  )
}

export default OrderCard
