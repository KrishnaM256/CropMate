import React, { useState, useEffect } from 'react'
import './CreateOrder.css'
import { TiDeleteOutline } from 'react-icons/ti'
import { useCreateOrderMutation } from '../../redux/api/ordersApiSlice'
import { useDispatch, useSelector } from 'react-redux'
import { setCredentials } from '../../redux/features/auth/authSlice'
import { setOrders } from '../../redux/features/order/orderSlice'
import { toast } from 'react-toastify'
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom'
import { indianCities, indianStates } from '../data/indiaData'

const CreateOrder = () => {
  const { userInfo } = useSelector((state) => state.auth)
  const role = userInfo.role
  console.log(role)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [createOrderApi, { isLoading }] = useCreateOrderMutation()
  const [formData, setFormData] = useState({
    land: '',
    expectedCropsYields: [{ expectedCrop: '', expectedYield: '' }],
    pricePerTon: '',
    orderType: 'buyer',
    paymentMethod: '',
    transportationRequired: 'Included',
    deliveryLocation: {
      street: '',
      village: '',
      district: '',
      state: '',
      pincode: '',
    },
  })
  const { search } = useLocation()
  const sp = new URLSearchParams(search)
  const redirect = sp.get('redirect') || '/'
  const paymentMethods = [
    'Cash',
    'Cheque',
    'UPI',
    'Mobile Wallets',
    'Net Banking',
    'QR Code',
    'NFC-Based Payments',
    'Debit Card',
    'Credit Card',
    'Bank Transfer',
    'Pay-on-Delivery',
    'Post Office Payment',
  ]

  const addCropYields = () => {
    setFormData({
      ...formData,
      expectedCropsYields: [
        ...formData.expectedCropsYields,
        { expectedCrop: '', expectedYield: '' },
      ],
    })
  }

  const deleteCropYield = (index) => {
    const updatedCropsYields = formData.expectedCropsYields.filter(
      (item, i) => i !== index
    )
    setFormData({
      ...formData,
      expectedCropsYields: updatedCropsYields,
    })
  }

  const handleChange = (e, index = null) => {
    const { name, value } = e.target

    if (index !== null) {
      const updatedCropsYields = [...formData.expectedCropsYields]
      updatedCropsYields[index][name] = value
      setFormData({
        ...formData,
        expectedCropsYields: updatedCropsYields,
      })
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
    console.log(formData)

    try {
      const transportationRequired =
        formData.transportationRequired == 'included' ? true : false
      const res = await createOrderApi({
        ...formData,
        transportationRequired: transportationRequired,
      }).unwrap()
      console.log(res)
      dispatch(setOrders({ ...res }))
      toast.success('Order created successfully.')
      navigate(history.back())
    } catch (error) {
      toast.error(error?.data?.message)
    }
  }
  return (
    <div id="createOrder">
      <h2 className="h2">Order Details:</h2>
      <form action="" className="orderForm" onSubmit={handleSubmit}>
        <div className="ipDiv">
          <label htmlFor="land">
            {role == 'farmer' ? 'Crop Ready Land' : 'Required Land'}(Acre):
          </label>
          <input
            type="Number"
            name="land"
            value={formData.land}
            onChange={handleChange}
            required
          />
        </div>
        {formData &&
          formData.expectedCropsYields.length > 0 &&
          formData.expectedCropsYields.map((ecy, index) => {
            return (
              <div key={index} className="ipDivContainer">
                <div className="ipDiv">
                  <label htmlFor={`expectedCrop${index}`}>
                    Expected Crop {index + 1}:
                  </label>
                  <input
                    type="text"
                    name="expectedCrop"
                    value={ecy.expectedCrop}
                    onChange={(e) => handleChange(e, index)}
                    required
                  />
                </div>
                <div className="ipDiv">
                  <label htmlFor={`avgYield${index}`}>
                    Expected Average Yield {index + 1} (tons) :
                  </label>
                  <input
                    type="text"
                    name="expectedYield"
                    value={ecy.expectedYield}
                    onChange={(e) => handleChange(e, index)}
                    required
                  />
                </div>
                <button
                  type="button"
                  onClick={() => deleteCropYield(index)}
                  className="deleteBtn"
                >
                  <TiDeleteOutline />
                </button>
              </div>
            )
          })}
        <button type="button" className="add" onClick={addCropYields}>
          Add Expected Crops and Yields
        </button>
        <div className="ipDivContainer">
          <div className="ipDiv">
            <label htmlFor="orderType">Order For:</label>
            <select name="orderType" id="" onChange={handleChange}>
              <option value="">Select order for</option>
              <option value="buyer">Buyer</option>
              <option value="farmer">Farmer</option>
            </select>
          </div>
          <div className="ipDiv">
            <label htmlFor="paymentMethod">Payment Method:</label>
            <select name="paymentMethod" onChange={handleChange}>
              <option value="">Select a payment method</option>
              {paymentMethods.map((pm) => {
                return <option value={pm}>{pm}</option>
              })}
            </select>
          </div>
        </div>

        <div className="ipDivContainer">
          <div className="ipDiv">
            <label htmlFor="transportationRequired">Logistics:</label>
            <select
              name="transportationRequired"
              onChange={handleChange}
              required
              className="select"
            >
              <option value="">Select a transportation</option>
              <option value="included">Included</option>
              <option value="notIncluded">Not included</option>
            </select>
          </div>
          <div className="ipDiv">
            <label htmlFor="pricePerTon">Price (₹/ton):</label>
            <input
              type="Number"
              name="pricePerTon"
              value={formData.pricePerTon}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        {console.log(formData.orderType)}
        {formData.orderType == 'farmer' && (
          <>
            <h3 style={{ fontWeight: '550', marginBottom: '0px' }}>
              Delivery Location:
            </h3>
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
          </>
        )}

        <button type="submit" className="subBtn create">
          Create Order
        </button>
      </form>
    </div>
  )
}

export default CreateOrder
