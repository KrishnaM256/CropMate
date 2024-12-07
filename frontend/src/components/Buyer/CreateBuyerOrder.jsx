import React, { useState, useEffect } from 'react'
import { TiDeleteOutline } from 'react-icons/ti'
import { useCreateBuyerOrderMutation } from '../../redux/api/ordersApiSlice'
import { useDispatch } from 'react-redux'
import {
  setBuyerOrders,
  setOrders,
} from '../../redux/features/order/orderSlice'
import { toast } from 'react-toastify'
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom'

import '../Users/CreateOrder.css'

const CreateBuyerOrder = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [createBuyerOrderApi, { isLoading }] = useCreateBuyerOrderMutation()
  const [formData, setFormData] = useState({
    requiredLand: '',
    preferredCropsYields: [{ preferredCrop: '', preferredYield: '' }],
    pricePerAcre: 0,
    expectedQuality: '',
    paymentMethod: '',
    paymentSchedule: '',
    logistics: 'Self',
  })
  const { search } = useLocation()
  const sp = new URLSearchParams(search)
  const redirect = sp.get('redirect') || '/'

  const addCropYields = () => {
    setFormData({
      ...formData,
      preferredCropsYields: [
        ...formData.preferredCropsYields,
        { preferredCrop: '', preferredYield: '' },
      ],
    })
  }

  const deleteCropYield = (index) => {
    const updatedCropsYields = formData.preferredCropsYields.filter(
      (item, i) => i !== index
    )
    setFormData({
      ...formData,
      preferredCropsYields: updatedCropsYields,
    })
  }

  const handleChange = (e, index = null) => {
    const { name, value } = e.target
    if (index !== null) {
      const updatedCropsYields = [...formData.preferredCropsYields]
      updatedCropsYields[index][name] = value
      setFormData({
        ...formData,
        preferredCropsYields: updatedCropsYields,
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
      const res = await createBuyerOrderApi(formData).unwrap()
      console.log({ res: res })
      dispatch(setBuyerOrders({ ...res }))
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
          <label htmlFor="requiredLand">Required Land(Acre):</label>
          <input
            type="Number"
            name="requiredLand"
            value={formData.requiredLand}
            onChange={handleChange}
            required
          />
        </div>
        {formData &&
          formData.preferredCropsYields.length > 0 &&
          formData.preferredCropsYields.map((ecy, index) => {
            return (
              <div key={index} className="ipDivContainer">
                <div className="ipDiv">
                  <label htmlFor={`preferredCrop${index}`}>
                    Preferred Crop {index + 1}:
                  </label>
                  <input
                    type="text"
                    name="preferredCrop"
                    value={ecy.preferredCrop}
                    onChange={(e) => handleChange(e, index)}
                    required
                  />
                </div>
                <div className="ipDiv">
                  <label htmlFor={`avgYield${index}`}>
                    Preferred Average Yield {index + 1} (tons/acre) :
                  </label>
                  <input
                    type="Number"
                    name="preferredYield"
                    value={ecy.preferredYield}
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
          Add Preferred Crops and Yields
        </button>
        <div className="ipDiv">
          <label htmlFor="expectedQuality">Expected Quality:</label>
          <input
            type="text"
            name="expectedQuality"
            value={formData.expectedQuality}
            onChange={handleChange}
            required
          />
        </div>
        <div className="ipDivContainer">
          <div className="ipDiv">
            <label htmlFor="paymentMethod">Payment Method:</label>
            <input
              type="text"
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              required
            />
          </div>
          <div className="ipDiv">
            <label htmlFor="paymentSchedule">Payment Schedule:</label>
            <input
              type="text"
              name="paymentSchedule"
              value={formData.paymentSchedule}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="ipDivContainer">
          <div className="ipDiv">
            <label htmlFor="logistics">Logistics:</label>
            <select
              name="logistics"
              value={formData.logistics}
              onChange={handleChange}
              required
              className="select"
            >
              <option value="Self">Self</option>
              <option value="Buyer">Farmer</option>
            </select>
          </div>
          <div className="ipDiv">
            <label htmlFor="pricePerAcre">Price (₹/acre):</label>
            <input
              type="Number"
              name="pricePerAcre"
              value={formData.pricePerAcre}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button type="submit" className="subBtn create">
          Create Order
        </button>
      </form>
    </div>
  )
}

export default CreateBuyerOrder
