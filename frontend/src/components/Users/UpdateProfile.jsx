import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  useRegisterMutation,
  useUpdateUserMutation,
} from '../../redux/api/usersApiSlice'
import { setCredentials } from '../../redux/features/auth/authSlice'
import { indianCities, indianStates } from '../data/indiaData'
import { GrPrevious, GrNext } from 'react-icons/gr'

import './UpdateProfile.css'

const Profile = () => {
  const params = useParams()
  const role = params.id

  const navigate = useNavigate()

  const { search } = useLocation()
  const sp = new URLSearchParams(search)
  const redirect = sp.get('redirect') || '/'
  const [updateProfileApi, { isLoading }] = useUpdateUserMutation()
  const { userInfo } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    avatar: userInfo.avatar,
    firstName: userInfo.firstName,
    lastName: userInfo.lastName,
    email: userInfo.email,
    phone: userInfo.phone,
    address: userInfo.address,
    city: userInfo.city,
    state: userInfo.state,
    aadhaarNumber: userInfo.aadhaarNumber,
    panNumber: userInfo.panNumber,
    aboutMe: userInfo.aboutMe,
    tagLine: userInfo.tagLine,
    totalLand: userInfo.totalLand,
  })
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const formD = new FormData()
      for (const key in formData) {
        formD.append(key, formData[key])
      }
      formD.append('avatar', formData.avatar)
      console.log(formD)
      const res = await updateProfileApi(formData).unwrap()
      console.log(res)
      dispatch(setCredentials({ ...res }))
      navigate('/profile')
      toast.success('Profile updated successfully')
    } catch (error) {
      console.log({ error: error.data?.message })
      toast.error(error.data?.message)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }
  return (
    <div id="createOrder">
      <h2 className="h2">Update Details:</h2>
      <form
        className="form1"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className="formDiv">
          <div className="formBody">
            <div className="ipContainer">
              <label htmlFor="avatar">Profile Photo:</label>
              <input
                type="file"
                accept="image/*"
                name="avatar"
                onChange={(e) =>
                  setFormData({ ...formData, avatar: e.target.files[0] })
                }
                required
              />
            </div>
            <div className="doubleDivContainer">
              <div className="ipContainer">
                <label htmlFor="firstName">First Name:</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="ipContainer">
                <label htmlFor="lastName">Last Name:</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="ipContainer">
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="ipContainer ">
              <label htmlFor="phone">Phone Number:</label>
              <input
                type="number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="ipContainer ">
              <label htmlFor="aboutMe">About Me:</label>
              <textarea
                type="text"
                name="aboutMe"
                rows={5}
                className="textAreaField"
                value={formData.aboutMe}
                onChange={handleChange}
                required
              />
            </div>
            <div className="ipContainer ">
              <label htmlFor="tagLine">Tag Line:</label>
              <input
                type="text"
                name="tagLine"
                value={formData.tagLine}
                onChange={handleChange}
                required
              />
            </div>
            <div className="ipContainer ">
              <label htmlFor="totalLand">Total Land:</label>
              <input
                type="text"
                name="totalLand"
                value={formData.totalLand}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
        <div className="formDiv">
          <div className="formBody">
            <div className="ipContainer">
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                name="address"
                onChange={handleChange}
                value={formData.address}
                required
              />
            </div>
            <div className="doubleDivContainer">
              <div className="ipContainer select">
                <label htmlFor="city">City:</label>
                <select
                  name="city"
                  className="selectField"
                  value={formData.city}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a city</option>
                  {indianCities.map((city, i) => (
                    <option key={`city-${i}`} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
              <div className="ipContainer select">
                <label htmlFor="state">State:</label>
                <select
                  name="state"
                  className="selectField"
                  value={formData.state}
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
            </div>
            <div className="ipContainer">
              <label htmlFor="aadhaarNumber">Aadhaar Number:</label>
              <input
                type="Number"
                name="aadhaarNumber"
                onChange={handleChange}
                value={formData.aadhaarNumber}
                required
              />
            </div>
            <div className="ipContainer">
              <label htmlFor="panNumber">Pan Number:</label>
              <input
                type="Number"
                name="panNumber"
                onChange={handleChange}
                value={formData.panNumber}
                required
              />
            </div>
            <div className="ipContainer">
              <label htmlFor="panNumber">Work Images:</label>
              <input
                type="image"
                name="panNumber"
                onChange={handleChange}
                // value={formData.panNumber}
                required
              />
            </div>
          </div>
          <div className="navigatePage">
            <button
              className="btn"
              type="button"
              onClick={() => history.back()}
            >
              <GrPrevious />
              Back
            </button>
            <button className="btn subBtn" type="submit">
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Profile
