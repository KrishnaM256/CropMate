import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const navigate = useNavigate()
  const { search } = useLocation()
  const sp = new URLSearchParams(search)

  const redirect = sp.get('redirect') || '/'

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
    } catch (err) {
      toast.error(err?.data?.message || err.message)
    }
  }

  return (
    <>
      <form className="form " onSubmit={handleSubmit}>
        <div className="formDiv signin">
          <div className="formHeading">
            <h3
              className="h3"
              style={{ marginTop: '10px', marginBottom: '10px' }}
            >
              Sign In
            </h3>
          </div>
          <div className="formBody">
            <div className="ipContainer ">
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
              <label htmlFor="password">Password:</label>
              <input
                type="text"
                name="password"
                onChange={handleChange}
                autoComplete="current-password"
                value={formData.password}
                required
              />
            </div>
          </div>
          <div className="link">
            <Link to={redirect ? `/signUp?redirect=${redirect}` : '/signUp'}>
              New User?
            </Link>
            <Link to="/forgotPassword">Forgot Password?</Link>
          </div>
          <button
            className="btn subBtn"
            type="submit"
            style={{ marginTop: '40px' }}
          >
            Sign In
          </button>
        </div>
      </form>
    </>
  )
}

export default SignIn