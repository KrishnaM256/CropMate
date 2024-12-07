import React, { useState, useEffect } from 'react'
import './CreateOrder.css'
import { TiDeleteOutline } from 'react-icons/ti'
import { useCreateMutation } from '../../redux/api/ordersApiSlice'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../../redux/features/auth/authSlice'
import { setOrders } from '../../redux/features/order/orderSlice'
import { toast } from 'react-toastify'
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom'

const CreateOrder = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [createOrderApi, { isLoading }] = useCreateMutation()
  const [formData, setFormData] = useState({
    cropReadyLand: '',
    expectedCropsYields: [{ expectedCrop: '', expectedYield: '' }],
    pricePerAcre: '',
    currentCrops: '',
    logistics: 'Self',
  })
  const { search } = useLocation()
  const sp = new URLSearchParams(search)
  const redirect = sp.get('redirect') || '/'

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
      const res = await createOrderApi(formData).unwrap()
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
          <label htmlFor="cropReadyLand">Crop Ready Land(Acre):</label>
          <input
            type="Number"
            name="cropReadyLand"
            value={formData.cropReadyLand}
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
                    Expected Average Yield {index + 1} (tons/acre) :
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
        <div className="ipDiv">
          <label htmlFor="currentCrops">Current Crops:</label>
          <input
            type="text"
            name="currentCrops"
            value={formData.currentCrops}
            onChange={handleChange}
            required
          />
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
              <option value="Buyer">Buyer</option>
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

export default CreateOrder
