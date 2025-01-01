import React, { useState, useEffect } from 'react'
import {
  useAcceptContractMutation,
  useDeleteContractMutation,
  useGetContractByOrderIdQuery,
  useRejectContractMutation,
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
  const [rejectContract] = useRejectContractMutation()
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
    return <p className="notFound">No contract exists.</p>
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
  const handleRejectContract = async () => {
    try {
      const res1 = await rejectContract(data._id).unwrap()
      console.log({ res1: res1 })
      toast.success('Contract rejected successfully.')
    } catch (error) {
      console.error(error)
      toast.error(error?.data?.message || 'Failed to reject contract.')
    }
    navigate('/contractMarket')
    refetch()
  }
  const handleDeleteContract = async () => {
    try {
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
      <div className="contractContainer">
        <h1 className="contractTitle">Legal Contract Agreement</h1>
        <p className="contractIntro">
          This Contract Agreement ("Agreement") is made and entered into by the
          parties detailed below, under the principles of mutual understanding
          and cooperation in the context of contract farming. By signing this
          Agreement, both parties agree to the terms and conditions outlined
          herein.
        </p>

        <section className="contractSection contractDetails">
          <h2 className="sectionTitle">Contract Details</h2>
          <p>
            This Agreement is executed by:
            <strong>
              {' '}
              {data.createdBy.firstName} {data.createdBy.middleName}{' '}
              {data.createdBy.lastName}{' '}
            </strong>
            ("Farmer" or "Creator") and
            <strong>
              {data?.acceptedBy ? (
                `${data.acceptedBy.firstName} ${data.acceptedBy.middleName} ${data.acceptedBy.lastName}`
              ) : data.createdBy?._id !== userInfo?._id ? (
                <>
                  {' '}
                  {userInfo.firstName} {userInfo.middleName} {userInfo.lastName}
                </>
              ) : (
                ' Pending Acceptance'
              )}
            </strong>{' '}
            ("Buyer" or "Acceptor").
          </p>
          <ul>
            <li>
              <span className="heading">Contract Reference ID:</span>
              <span className="content"> {data._id} </span>
            </li>
            <li>
              <span className="heading">Order Reference ID:</span>
              <span className="content"> {data.order._id} </span>
            </li>
            <li>
              <span className="heading">Date of Agreement:</span>
              <span className="content"> {formatDate(data.createdAt)} </span>
            </li>
            <li>
              <span className="heading">Status:</span>
              <span className={`status ${data.status}`}> {data.status} </span>
            </li>
          </ul>
        </section>

        <section className="contractSection cropDetails">
          <h2 className="sectionTitle">Crop Details</h2>
          {data.cropDetails.map((detail, index) => (
            <div key={index}>
              <p>
                <span className="heading">Crop Type:</span>
                <span className="content"> {detail.expectedCrop} </span>
                <span className="heading"> | Expected Yield:</span>
                <span className="content"> {detail.expectedYield} ton </span>
              </p>
            </div>
          ))}
          <p>
            <span className="heading">Total Land Area:</span>
            <span className="content"> {data.order.land} Acres </span>
          </p>
        </section>

        <section className="contractSection pricingDetails">
          <h2 className="sectionTitle">Pricing and Payment Terms</h2>
          <p>The agreed financial terms between the parties are as follows:</p>
          <ul>
            <li>
              <span className="heading">Price per Acre:</span>
              <span className="content"> ₹{data.order.pricePerAcre} </span>
            </li>
            <li>
              <span className="heading">Total Estimated Price:</span>
              <span className="content">
                {' '}
                ₹{data.order.pricePerAcre * data.order.land}{' '}
              </span>
            </li>
            <li>
              <span className="heading">Payment Method:</span>
              <span className="content">
                Payments are made directly by the Buyer to the Farmer using the
                method chosen in the contract. This ensures transparency and
                security for both parties.
              </span>
            </li>
          </ul>
        </section>

        <section className="contractSection deliveryDetails">
          <h2 className="sectionTitle">Delivery Details</h2>
          <p>The delivery terms agreed by both parties include:</p>
          <ul>
            <li>
              <span className="heading">Expected Delivery Date:</span>
              <span className="content"> {formatDate(data.deliveryDate)} </span>
            </li>
            <li>
              <span className="heading">Transportation:</span>
              <span className="content">
                {data.order.transportationRequired
                  ? 'Included'
                  : 'Not Included'}
              </span>
            </li>
            <li>
              <span className="heading">Delivery Location:</span>
            </li>
            {data.deliveryLocation?.street ||
            data.order.deliveryLocation?.street ? (
              <ul className="addressDetails">
                <li>
                  Street:{' '}
                  {data.deliveryLocation.street ||
                    data.order.deliveryLocation?.street}
                </li>
                <li>
                  Village:{' '}
                  {data.deliveryLocation.village ||
                    data.order.deliveryLocation?.village}
                </li>
                <li>
                  District:{' '}
                  {data.deliveryLocation.district ||
                    data.order.deliveryLocation?.district}
                </li>
                <li>
                  State:{' '}
                  {data.deliveryLocation.state ||
                    data.order.deliveryLocation?.state}
                </li>
                <li>
                  Pincode:{' '}
                  {data.deliveryLocation.pincode ||
                    data.order.deliveryLocation?.pincode}
                </li>
              </ul>
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
          </ul>
        </section>

        <section className="contractSection customTerms">
          <h2 className="sectionTitle">Custom Terms</h2>
          <p>The following custom terms have been mutually agreed upon:</p>
          <h3>Farmer's Terms:</h3>
          <ul>
            {data.customTerms.farmerCustomTerms.map((term, index) => (
              <li key={index}>{term}</li>
            ))}
          </ul>
          <h3>Buyer's Terms:</h3>
          <ul>
            {data.customTerms.buyerCustomTerms.map((term, index) => (
              <li key={index}>{term}</li>
            ))}
          </ul>
        </section>

        <section className="contractSection signatureSection">
          <h2 className="sectionTitle">Signature Verification</h2>
          <p>
            Both parties confirm their agreement to the terms outlined above by
            signing below:
          </p>
          {data.creatorSignature && (
            <p>
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
            </p>
          )}
          {data.acceptorSignature ? (
            <p>
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
            </p>
          ) : (
            data.createdBy?._id !== userInfo?._id && (
              <div className="contractDiv">
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
        </section>
      </div>
      <div className="contractActions">
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
        {data.status !== 'Accepted' &&
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
        {data.status !== 'Accepted' &&
          data.createdBy?._id !== userInfo?._id && (
            <button type="submit" className="subBtn btn gnrtCntrct">
              Accept Contract
            </button>
          )}
        {data.status === 'Accepted' && (
          <button
            type="button"
            className="subBtn btn rejectCntrct"
            onClick={() =>
              confirm('Reject contract?') && handleRejectContract()
            }
          >
            Reject Contract
          </button>
        )}
      </div>
    </form>
  )
}

export default Contract
