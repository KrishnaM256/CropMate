import React, { useState, useEffect } from 'react'
import {
  useAcceptContractMutation,
  useDeleteContractMutation,
  useGetContractByOrderIdQuery,
} from '../../../redux/api/contractApiSlice'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './Contract.css'
import { indianCities, indianStates } from '../../data/indiaData'
import { toast } from 'react-toastify'
import { BASE_URL } from '../../../redux/constants'

function formatDate(date) {
  const d = new Date(date)
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = d.getFullYear()

  return `${day}/${month}/${year}`
}

const Contract = () => {
  const { userInfo } = useSelector((state) => state.auth)
  const params = useParams()
  const orderId = params.id
  const { data, isLoading, isError, refetch } =
    useGetContractByOrderIdQuery(orderId)
  console.log(data)
  const [acceptContract] = useAcceptContractMutation()
  const [deleteContract] = useDeleteContractMutation()
  const [deleteOrder] = useDeleteContractMutation()
  const [formData, setFormData] = useState({
    acceptorSignature: '',
    deliveryLocation: {
      street: '',
      village: '',
      district: '',
      state: '',
      pincode: '',
    },
  })
  const navigate = useNavigate()
  useEffect(() => {
    if (data) {
      setFormData((prevData) => ({
        ...prevData,
      }))
    }
  }, [data, userInfo._id])

  if (isLoading) {
    return <p>Loading contract details...</p>
  }

  if (isError || !data) {
    return <p>No contract exists or there was an error loading the data.</p>
  }

  const handleChange = (e) => {
    const { name, value, type, files } = e.target
    if (type === 'file') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }))
    } else if (name in formData.deliveryLocation) {
      setFormData({
        ...formData,
        deliveryLocation: {
          ...formData.deliveryLocation,
          [name]: value,
        },
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formD = new FormData()
    formD.append('acceptorSignature', formData.acceptorSignature)
    formD.append('deliveryLocation', JSON.stringify(formData.deliveryLocation))

    console.log([...formD])

    try {
      const id = data._id
      const res = await acceptContract({ id, data: formD }).unwrap()
      console.log({ res })
      toast.success('Contract accepted successfully.')
    } catch (error) {
      console.error(error)
      toast.error(error?.data?.message || 'Failed to accept contract.')
    }
    refetch()
  }
  const handleDeleteContract = async () => {
    try {
      console.log({ data: data })
      const res1 = await deleteContract(data._id).unwrap()
      console.log({ res1: res1 })
      toast.success('Contract deleted successfully.')
    } catch (error) {
      console.error(error)
      toast.error(error?.data?.message || 'Failed to delete contract.')
    }
    navigate('/contractMarket')
    refetch()
  }
  return (
    <form className="pageContainer" onSubmit={handleSubmit}>
      <h2 className="h2">Contract Agreement</h2>
      <div className="contractDiv contractDetails">
        <h3 className="h4">Contract Details:</h3>
        <li>
          <span className="heading">Created By: </span>
          <span className="content">
            {data.createdBy.firstName} {data.createdBy.middleName}{' '}
            {data.createdBy.lastName}
          </span>
        </li>
        <li>
          <span className="heading">Accepted By: </span>
          <span className="content">
            {data?.acceptedBy ? (
              <>
                {data?.acceptedBy.firstName} {data?.acceptedBy.middleName}{' '}
                {data?.acceptedBy.lastName}
              </>
            ) : data.createdBy?._id !== userInfo?._id ? (
              <>
                {userInfo.firstName} {userInfo.middleName} {userInfo.lastName}
              </>
            ) : (
              'Not Accepted'
            )}
          </span>
        </li>
        <li>
          <span className="heading">Contract Reference Id: </span>
          <span className="content">{data?._id}</span>
        </li>
        <li>
          <span className="heading">Order Reference Id: </span>
          <span className="content">{data.order._id}</span>
        </li>
        <li>
          <span className="heading">Created At: </span>
          <span className="content">{formatDate(data.createdAt)}</span>
        </li>
        <li>
          <span className="heading">Status: </span>
          <span className={`status ${data.status}`}>{data.status}</span>
        </li>
      </div>
      <div className="contractDiv">
        <h3 className="h4">Crop Details:</h3>
        {data.cropDetails.map((detail, index) => {
          return (
            <div key={index}>
              <li>
                <span className="heading">Crop Type: </span>
                <span className="content">{detail.expectedCrop} |</span>
                <span className="heading"> Expected Yield: </span>
                <span className="content">{detail.expectedYield} ton</span>
              </li>
            </div>
          )
        })}
        <li>
          <span className="heading">Land: </span>
          <span className="content">{data.order.land} Acre</span>
        </li>
      </div>
      <div className="contractDiv">
        <h3 className="h4">Pricing and Payment Terms:</h3>
        <li>
          <span className="heading">Price per Acre: </span>
          <span className="content">
            ₹{data.order.pricePerAcre || data.order.pricePerAcre}
          </span>
        </li>
        <li>
          <span className="heading">Total Price (Estimated): </span>
          <span className="content">
            ₹
            {data.order.pricePerAcre * data.order.land ||
              data.order.pricePerAcre * data.order.land}
          </span>
        </li>
        <li>
          <span className="heading">Payment Method: </span>
          <span className="content">{data.order.paymentMethod}</span>
        </li>
      </div>
      <div className="contractDiv">
        <h3 className="h4">Delivery Details:</h3>
        <li>
          <span className="heading">Expected Delivery Date: </span>
          <span className="content">{formatDate(data.deliveryDate)}</span>
        </li>
        <li>
          <span className="heading">Transportation Required: </span>
          <span className="content">
            {data.order.transportationRequired ? 'Included' : 'Not Included'}
          </span>
        </li>
        <li>
          <span className="heading">Delivery Location:</span>
          {data.deliveryLocation?.street ||
          data.order.deliveryLocation?.street ? (
            <>
              <li className="subLi">
                <span className="heading">Street: </span>
                <span className="content">
                  {data.deliveryLocation.street ||
                    data.order.deliveryLocation?.street}
                </span>
              </li>
              <li className="subLi">
                <span className="heading">Village: </span>
                <span className="content">
                  {data.deliveryLocation.village ||
                    data.order.deliveryLocation?.village}
                </span>
              </li>
              <li className="subLi">
                <span className="heading">District: </span>
                <span className="content">
                  {data.deliveryLocation.district ||
                    data.order.deliveryLocation?.district}
                </span>
              </li>
              <li className="subLi">
                <span className="heading">State: </span>
                <span className="content">
                  {data.deliveryLocation.state ||
                    data.order.deliveryLocation?.state}
                </span>
              </li>
              <li className="subLi">
                <span className="heading">Pin code: </span>
                <span className="content">
                  {data.deliveryLocation.pincode ||
                    data.order.deliveryLocation?.pincode}
                </span>
              </li>
            </>
          ) : (
            data.createdBy?._id !== userInfo?._id && (
              <div className="deliveryLocation">
                <div className="ipDivContainer">
                  <div className="ipDiv">
                    <label htmlFor="street">Street:</label>
                    <input
                      type="text"
                      name="street"
                      value={formData.deliveryLocation.street}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="ipDiv">
                    <label htmlFor="village">Village:</label>
                    <input
                      type="text"
                      name="village"
                      value={formData.deliveryLocation.village}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="ipDivContainer">
                  <div className="ipDiv">
                    <label htmlFor="district">District:</label>
                    <select
                      name="district"
                      className="selectField"
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a district</option>
                      {indianCities.map((city, i) => (
                        <option key={`city-${i}`} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="ipDiv">
                    <label htmlFor="state">State:</label>
                    <select
                      name="state"
                      className="selectField"
                      value={formData.deliveryLocation.state}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a state</option>
                      {indianStates.map((state, i) => (
                        <option key={`state-${i}`} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="ipDiv">
                    <label htmlFor="pincode">Pincode:</label>
                    <input
                      type="number"
                      name="pincode"
                      value={formData.deliveryLocation.pincode}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
            )
          )}
        </li>
      </div>
      <div className="contractDiv">
        <h3 className="h4">Custom Terms:</h3>
        <p style={{ fontSize: '17px', fontWeight: '200px' }}>
          Farmer's Custom Terms:
        </p>
        {data?.customTerms?.farmerCustomTerms?.map((term, index) => {
          return (
            <li>
              <span key={index}>{term}</span>
            </li>
          )
        })}
        <p style={{ fontSize: '17px', fontWeight: '200px' }}>
          Buyer's Custom Terms:
        </p>
        {data?.customTerms?.buyerCustomTerms?.map((term, index) => {
          return (
            <li>
              <span key={index}>{term}</span>
            </li>
          )
        })}
      </div>
      <div className="contractDiv signDiv">
        {data?.acceptorSignature ? (
          <a
            href={`${BASE_URL}/${data.acceptorSignature.replace(
              'uploads\\',
              ''
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Acceptor's Signature
          </a>
        ) : (
          data.createdBy?._id !== userInfo?._id && (
            <div className="contractDiv">
              <h3 className="h4">Signature Verification: </h3>
              <div className="ipDiv">
                <label htmlFor="acceptorSignature">
                  Upload Your Signature:
                </label>
                <input
                  type="file"
                  accept="image/*"
                  name="acceptorSignature"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          )
        )}
        {data?.creatorSignature && (
          <a
            href={`${BASE_URL}/${data.creatorSignature.replace(
              'uploads\\',
              ''
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Creator's Signature
          </a>
        )}
      </div>
      <div className="gnrtCntrctContainer" style={{ marginTop: '40px' }}>
        <button
          type="button"
          className="btn gnrtCntrct"
          onClick={() =>
            data.createdBy?._id !== userInfo?._id
              ? navigate(`/inbox/${data.createdBy._id}`)
              : navigate(`/createOrder`, { state: data })
          }
        >
          {data.createdBy?._id !== userInfo?._id
            ? 'Request Edit Contract'
            : 'Edit Contract'}
        </button>
        {data.status !== 'accepted' &&
          data.createdBy?._id === userInfo?._id && (
            <button
              type="button"
              className="btn dltBtn"
              onClick={() =>
                confirm('Delete contract?') && handleDeleteContract()
              }
            >
              Delete Contract
            </button>
          )}
        {data.status !== 'accepted' &&
          data.createdBy?._id !== userInfo?._id && (
            <button type="submit" className="subBtn btn gnrtCntrct">
              Accept Contract
            </button>
          )}
      </div>
    </form>
  )
}

export default Contract
