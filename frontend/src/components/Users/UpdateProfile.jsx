import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useUpdateUserMutation } from '../../redux/api/usersApiSlice'
import { setCredentials } from '../../redux/features/auth/authSlice'
import { indianCities, indianStates } from '../data/indiaData'
import { GrPrevious } from 'react-icons/gr'
import profile from '../../../public/profile.svg'
import './UpdateProfile.css'
import { BASE_URL } from '../../redux/constants'

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
    middleName: userInfo.middleName,
    lastName: userInfo.lastName,
    email: userInfo.email,
    phone: userInfo.phone,
    street: userInfo.address.street,
    village: userInfo.address.village,
    city: userInfo.address.city,
    state: userInfo.address.state,
    pincode: userInfo.address.pincode,
    aboutMe: userInfo.aboutMe,
    tagLine: userInfo.tagLine,
    totalLand: userInfo.totalLand,
    role: userInfo.role,
    workImages: [...userInfo?.workImages],
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const formD = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== 'avatar' && key !== 'workImages') {
          formD.append(key, value)
        }
      })
      formD.append('avatar', formData.avatar)
      formData.workImages.forEach((file) => {
        formD.append('workImages', file)
      })

      const res = await updateProfileApi(formD).unwrap()
      dispatch(setCredentials({ ...res }))
      navigate('/profile')
      toast.success('Profile updated successfully')
    } catch (error) {
      console.error(error)
      toast.error(error.data?.message || 'Profile update failed')
    }
  }

  const handleChange = (e) => {
    const { name, value, type, files } = e.target
    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0] : value,
    })
  }

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)
    setFormData((prev) => ({
      ...prev,
      workImages: [...prev.workImages, ...files],
    }))
  }

  const removeWorkImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      workImages: prev.workImages.filter((_, i) => i !== index),
    }))
  }

  return (
    <div id="createOrder">
      <h2 className="h2">Update Details:</h2>
      <form className="form1" onSubmit={handleSubmit}>
        <div className="formDiv">
          <img
            src={
              formData.avatar
                ? `${BASE_URL}/avatar/${userInfo.avatar}`
                : profile
            }
            alt="profile"
            className="updateProfileIcon"
          />
          <div className="formBody">
            <div className="ipContainer">
              <label htmlFor="avatar">Profile Photo:</label>
              <input
                type="file"
                accept="image/*"
                name="avatar"
                onChange={handleChange}
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
                <label htmlFor="middleName">Middle Name:</label>
                <input
                  type="text"
                  name="middleName"
                  value={formData.middleName}
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
              <label htmlFor="tagLine">Tag Line:</label>
              <input
                type="text"
                name="tagLine"
                value={formData.tagLine}
                onChange={handleChange}
                required
              />
            </div>
            <div className="ipContainer">
              <label htmlFor="aboutMe">About Me:</label>
              <textarea
                name="aboutMe"
                rows={5}
                className="textAreaField"
                value={formData.aboutMe}
                onChange={handleChange}
                required
              />
            </div>
            <div className="ipContainer">
              <label htmlFor="workImages">Work Images:</label>
              <input
                type="file"
                accept="image/*"
                name="workImages"
                multiple
                onChange={handleFileChange}
              />
            </div>
            <div className="wrkImgsDiv">
              {formData.workImages.map((img, i) => (
                <div key={`workImg-${i}`} className="wrkImgWrapper">
                  <img
                    src={
                      typeof img === 'string'
                        ? `${BASE_URL}/workImages/${img}`
                        : URL.createObjectURL(img)
                    }
                    alt="work"
                    className="wrkImg"
                  />
                  <button
                    type="button"
                    onClick={() => removeWorkImage(i)}
                    className="deleteBtn"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
            <div className="doubleDivContainer">
              <div className="ipContainer">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="ipContainer">
                <label htmlFor="phone">Phone Number:</label>
                <input
                  type="number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="doubleDivContainer">
              {role === 'farmer' && (
                <div className="ipContainer">
                  <label htmlFor="totalLand">Total Land:</label>
                  <input
                    type="number"
                    name="totalLand"
                    value={formData.totalLand}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}
              <div className="ipContainer">
                <label htmlFor="pincode">Pincode:</label>
                <input
                  type="number"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="doubleDivContainer">
              <div className="ipContainer">
                <label htmlFor="street">Street:</label>
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="ipContainer">
                <label htmlFor="village">Village:</label>
                <input
                  type="text"
                  name="village"
                  value={formData.village}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="doubleDivContainer">
              <div className="ipContainer select">
                <label htmlFor="city">District:</label>
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
          </div>
          <div className="navigatePage">
            <button className="btn" type="button" onClick={() => navigate(-1)}>
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
