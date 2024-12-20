import React, { useEffect, useState } from 'react'
import { GrPrevious, GrNext } from 'react-icons/gr'
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom'
import { indianStates, indianCities } from '../../data/indiaData.js'
import { useRegisterMutation } from '../../../redux/api/usersApiSlice.js'
import { useDispatch, useSelector } from 'react-redux'
import { setCredentials } from '../../../redux/features/auth/authSlice.js'
import { toast } from 'react-toastify'
import './Register.css'

const SignUp = () => {
  const params = useParams()
  const role = params.id

  const navigate = useNavigate()

  const { search } = useLocation()
  const sp = new URLSearchParams(search)
  const redirect = sp.get('redirect') || '/'

  const [register, { isLoading }] = useRegisterMutation()
  const { userInfo } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [redirect, navigate, userInfo])
  const [confirmPassword, setConfirmPassword] = useState('')
  const [formData, setFormData] = useState({
    firstName: '',
    avatar: '',
    middleName: '',
    lastName: '',
    email: '',
    phone: '',
    street: '',
    village: '',
    city: '',
    state: '',
    pincode: '',
    password: '',
    aadhaarCard: '',
    bankPassbook: '',
    businessLicense: '',
    bankStatement: '',
    totalLand: '',
    role: role ? role : 'farmer',
    tagLine: '',
    aboutMe: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value)
    })

    console.log({ formData: formData })
    try {
      console.log(...form)
      const res = await register(form).unwrap()
      console.log({ res: res })
      dispatch(setCredentials({ ...res }))
      navigate(redirect)
      toast.success('User successfully registered.')
    } catch (error) {
      console.log({ error: error.data.message })
      toast.error(error.data.message)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, files } = e.target

    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0] : value,
    })
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="formDiv">
        <div className="formHeading">
          <h3 className="h3">
            {role == 'buyer'
              ? 'Sign up to secure trusted farmers!'
              : 'Sign up to grow with trusted buyers!'}
          </h3>
        </div>
        <div className="line"></div>
        <div className="formBody">
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
          </div>
          <div className="ipContainer">
            <label htmlFor="street">Street:</label>
            <input
              type="text"
              name="street"
              onChange={handleChange}
              value={formData.street}
              required
            />
          </div>
          <div className="doubleDivContainer">
            <div className="ipContainer">
              <label htmlFor="village">Village:</label>
              <input
                type="text"
                name="village"
                onChange={handleChange}
                value={formData.village}
                required
              />
            </div>
            <div className="ipContainer">
              <label htmlFor="pincode">Pincode:</label>
              <input
                type="number"
                name="pincode"
                onChange={handleChange}
                value={formData.pincode}
                required
              />
            </div>
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
          <div className="doubleDivContainer">
            <div className="ipContainer">
              <label htmlFor="avatar">Avatar:</label>
              <input
                type="file"
                name="avatar"
                onChange={handleChange}
                required
              />
            </div>
            <div className="ipContainer">
              <label htmlFor="aadhaarCard">Aadhaar Card:</label>
              <input
                type="file"
                name="aadhaarCard"
                onChange={handleChange}
                required
              />
            </div>
          </div>
          {formData.role == 'farmer' ? (
            <div className="doubleDivContainer">
              <div className="ipContainer">
                <label htmlFor="landOwnershipProof">
                  Land Ownership Proof:
                </label>
                <input
                  type="file"
                  name="landOwnershipProof"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="ipContainer">
                <label htmlFor="bankPassbook">Bank Passbook:</label>
                <input
                  type="file"
                  name="bankPassbook"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          ) : (
            <div className="doubleDivContainer">
              <div className="ipContainer">
                <label htmlFor="businessLicense">Business License:</label>
                <input
                  type="file"
                  name="businessLicense"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="ipContainer">
                <label htmlFor="bankStatement">Bank Statement:</label>
                <input
                  type="file"
                  name="bankStatement"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          )}
          <div className="doubleDivContainer">
            <div className="ipContainer">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                value={formData.password}
                required
              />
            </div>
            <div className="ipContainer">
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                type="password"
                name="confirmPassword"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                required
              />
            </div>
          </div>
        </div>
        <div className="navigatePage">
          <button
            className="btn"
            type="button"
            onClick={() =>
              navigate(redirect ? `/signUp?redirect=${redirect}` : '/signUp')
            }
          >
            <GrPrevious />
            Back
          </button>
          <button className="btn subBtn" type="submit">
            Sign Up
            <GrNext />
          </button>
        </div>
      </div>
    </form>
  )
}

export default SignUp
