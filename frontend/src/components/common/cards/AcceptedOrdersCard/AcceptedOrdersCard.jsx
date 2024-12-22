import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaStar, FaRegHeart, FaHeart, FaRegPaperPlane } from 'react-icons/fa'
import { MdOutlineGroupAdd } from 'react-icons/md'
import { IoLocationSharp } from 'react-icons/io5'
import { toast } from 'react-toastify'
import './AcceptedOrdersCard.css'
import { BASE_URL, FRONT_URL } from '../../../../redux/constants'
import {
  useGetMyAcceptedOrdersQuery,
  useUpdateOrderStatusMutation,
} from '../../../../redux/api/ordersApiSlice'
import { HiOutlineWrenchScrewdriver } from 'react-icons/hi2'
import { TiDeleteOutline } from 'react-icons/ti'

import {
  useCreateSavedOrdersMutation,
  useGetAllSavedOrdersQuery,
  useRemoveSavedOrderMutation,
} from '../../../../redux/api/usersApiSlice'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

const ProgressBar = ({ progress }) => {
  return (
    <div className="progressBar">
      <div className="progressBarFill" style={{ width: `${progress}%` }}></div>
    </div>
  )
}

const AcceptedOrdersCard = ({ data, savedOrders, savedOrderRefetch }) => {
  const navigate = useNavigate()
  const { userInfo } = useSelector((state) => state.auth)
  const [saveOrder] = useCreateSavedOrdersMutation()
  const [removeSavedOrder] = useRemoveSavedOrderMutation()
  const [updateOrderStatus] = useUpdateOrderStatusMutation()
  const [isTrackingOpen, setIsTrackingOpen] = useState(false)

  const [toggleStatus, setToggleStatus] = useState(false)

  const calculateMilestoneProgress = () => {
    const completed = data.milestones?.filter(
      (m) => m.status === 'Completed'
    )?.length
    return (completed / data.milestones?.length) * 100
  }

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

  console.log(data)
  const [statusData, setStatusData] = useState({
    orderStatus: data?.orderStatus,
    deliveryStatus: data?.deliveryStatus,
    paymentStatus: data?.paymentStatus,
    milestones: data?.milestones || [{ name: '', status: '' }],
    _id: data?._id || null,
  })
  const handleAddMilestone = () => {
    setStatusData({
      ...statusData,
      milestones: [...statusData.milestones, { name: '', status: '' }],
    })
  }
  const handleUpdateStatus = async (e) => {
    e.preventDefault()
    console.log({ statusData: statusData })
    try {
      const res = await updateOrderStatus(statusData).unwrap()
      console.log({ res: res })
      toast.success('Order status updated successfully.')
    } catch (error) {
      console.log(error)
      toast.error(`${error?.message?.data || 'Error updating status.'}`)
    }
  }
  return (
    <>
      {toggleStatus && (
        <>
          <div className="overlay" onClick={() => setToggle(false)}></div>
          <div className="popup2">
            <form onSubmit={handleUpdateStatus}>
              <h4 className="h4" style={{ fontWeight: 'bold', color: 'black' }}>
                Update Order Status:
              </h4>
              <div className="ipDivContainer">
                <div className="ipDiv">
                  <label htmlFor="orderStatus">Order Status:</label>
                  <select
                    name="orderStatus"
                    value={statusData?.orderStatus}
                    onChange={(e) =>
                      setStatusData((prev) => ({
                        ...prev,
                        orderStatus: e.target.value,
                      }))
                    }
                    required
                  >
                    <option value="">Select Status</option>
                    <option value="Open">Open</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
                <div className="ipDiv">
                  <label htmlFor="deliveryStatus">Delivery Status:</label>
                  <select
                    name="deliveryStatus"
                    value={statusData?.deliveryStatus}
                    onChange={(e) =>
                      setStatusData((prev) => ({
                        ...prev,
                        deliveryStatus: e.target.value,
                      }))
                    }
                    required
                  >
                    <option value="">Select Status</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                <div className="ipDiv">
                  <label htmlFor="paymentStatus">Payment Status:</label>
                  <select
                    name="paymentStatus"
                    value={statusData?.paymentStatus}
                    onChange={(e) =>
                      setStatusData((prev) => ({
                        ...prev,
                        paymentStatus: e.target.value,
                      }))
                    }
                    required
                  >
                    <option value="">Select Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                    <option value="Failed">Failed</option>
                  </select>
                </div>
              </div>
              <h4 style={{ marginBottom: '5px' }}>Milestones:</h4>
              {statusData?.milestones.length > 0 &&
                statusData.milestones.map((milestone, index) => (
                  <div key={index} className="ipDivContainer">
                    <div className="ipDiv">
                      <label htmlFor={`milestone${index}`}>
                        Milestone {index + 1}:
                      </label>
                      <input
                        type="text"
                        name={`milestone${index}`}
                        value={milestone.name}
                        onChange={(e) =>
                          setStatusData((prev) => {
                            const updatedMilestones = [...prev.milestones]
                            updatedMilestones[index].name = e.target.value
                            return { ...prev, milestones: updatedMilestones }
                          })
                        }
                        required
                      />
                    </div>
                    <div className="ipDiv">
                      <label htmlFor={`milestoneStatus${index}`}>
                        Status of Milestone {index + 1}:
                      </label>
                      <select
                        name={`status${index}`}
                        value={milestone.status}
                        onChange={(e) =>
                          setStatusData((prev) => {
                            const updatedMilestones = [...prev.milestones]
                            updatedMilestones[index] = {
                              ...updatedMilestones[index],
                              status: e.target.value,
                            }
                            return { ...prev, milestones: updatedMilestones }
                          })
                        }
                        required
                      >
                        <option value="">Select Status</option>
                        <option value="Not Started">Not Started</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setStatusData((prev) => {
                          const updatedMilestones = [...prev.milestones]
                          updatedMilestones.splice(index, 1)
                          return { ...prev, milestones: updatedMilestones }
                        })
                      }}
                      className="deleteBtn"
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                ))}
              <button
                type="button"
                className="add"
                onClick={handleAddMilestone}
              >
                Add Milestone
              </button>
              <div className="buttons">
                <button className="subBtn" type="submit">
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setToggleStatus(false)}
                  id="cancel"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </>
      )}
      <div className="acceptedCards">
        <div className="profile-info">
          <div className="profile-header">
            <img
              src={
                data?.user?.avatar
                  ? `${BASE_URL}/avatar/${data?.user?.avatar}`
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
            {data?.user?.id === userInfo?._id && data?.orderFor === 'buyer' && (
              <button
                className="action-btn"
                onClick={() => setToggleStatus(!toggleStatus)}
              >
                <HiOutlineWrenchScrewdriver />
              </button>
            )}
            {data?.acceptedBy?._id === userInfo?._id &&
              data?.orderFor === 'farmer' && (
                <button
                  className="action-btn"
                  onClick={() => setToggleStatus(!toggleStatus)}
                >
                  <HiOutlineWrenchScrewdriver />
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
              {userInfo?._id === data?.user?.id ? 'Contract' : 'Proceed'}
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
                {data?.transportationRequired ? 'Not included' : 'Included'}
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
        </div>

        {/* Order Tracking Dropdown */}
        <div className="details">
          <h4
            className="trackingDown"
            onClick={() => setIsTrackingOpen(!isTrackingOpen)}
          >
            Order Tracking
            {isTrackingOpen ? <FaChevronUp /> : <FaChevronDown />}
          </h4>
          {isTrackingOpen && (
            <div className="statusSection">
              <div className="statusContainer">
                <div className="statusItem">
                  <h5>Order Status:</h5>
                  <span className={`statusTag ${data?.orderStatus}`}>
                    {data?.orderStatus}
                  </span>
                </div>
                <div className="statusItem">
                  <h5>Delivery Status:</h5>
                  <span
                    className={`statusTag ${
                      data?.deliveryStatus == 'In Progress'
                        ? 'InProgress'
                        : data?.deliveryStatus
                    }`}
                  >
                    {data?.deliveryStatus}
                  </span>
                </div>
                <div className="statusItem">
                  <h5>Payment Status:</h5>
                  <span className={`statusTag ${data.paymentStatus}`}>
                    {data.paymentStatus}
                  </span>
                </div>
              </div>
              <div className="milestonesContainer">
                <h5>Milestones</h5>
                {data.milestones[0] ? (
                  <>
                    <ul className="milestonesList">
                      {data.milestones?.map((milestone, index) => (
                        <li key={index} className={`milestone`}>
                          <span>{milestone.name}</span>
                          <span
                            className={`status ${
                              milestone.status == 'Not Started'
                                ? 'NotStarted'
                                : milestone.status == 'In Progress'
                                ? 'InProgress'
                                : milestone.status
                            }`}
                          >
                            {milestone.status}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <h5>Milestone Progress</h5>
                    <ProgressBar progress={calculateMilestoneProgress()} />
                  </>
                ) : (
                  <p className="notMileStone">No milestones created.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default AcceptedOrdersCard
