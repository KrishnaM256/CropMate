import React, { useEffect, useState } from 'react'
import { GrPrevious, GrNext } from 'react-icons/gr'
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom'
import { indianStates, indianCities } from '../../data/indiaData.js'
import './Register.css'
import { useRegisterMutation } from '../../../redux/api/usersApiSlice.js'
import { useDispatch, useSelector } from 'react-redux'
import { setCredentials } from '../../../redux/features/auth/authSlice.js'
import { toast } from 'react-toastify'

const Register = () => {
  const params = useParams()
  const role = params.id
  console.log(role)

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

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    password: '',
    aadhaarNumber: '',
    panNumber: '',
    role: role,
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      console.log(formData)
      const res = await register(formData).unwrap()
      console.log(res)
      dispatch(setCredentials({ ...res }))
      navigate(redirect)
      toast.success('User successfully registered.')
    } catch (error) {
      console.log({ error: error.data.message })
      toast.error(error.data.message)
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
        </div>
        <div className="navigatePage">
          <Link to={redirect ? `/signUp?redirect=${redirect}` : '/signUp'}>
            <button className="btn" type="button">
              <GrPrevious />
              Back
            </button>
          </Link>
          <button className="btn subBtn" type="submit">
            Sign Up
          </button>
        </div>
      </div>
    </form>
  )
}

export default Register
