import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { GrPrevious, GrNext } from 'react-icons/gr'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')

  const navigate = useNavigate()
  const { search } = useLocation()
  const sp = new URLSearchParams(search)

  const redirect = sp.get('redirect') || '/'

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
    } catch (err) {
      toast.error(err?.data?.message || err.message)
    }
  }

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <div className="formDiv signin">
          <div className="formHeading">
            <h3
              className="h3"
              style={{ marginTop: '10px', marginBottom: '10px' }}
            >
              Forgot Password
            </h3>
          </div>
          <div className="formBody">
            <div className="ipContainer ">
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="navigatePage">
            <Link to={redirect ? `/signIn?redirect=${redirect}` : '/signIn'}>
              <button className="btn" type="button">
                <GrPrevious />
                Sign In
              </button>
            </Link>
            <button className="btn subBtn" type="submit">
              Send Email
            </button>
          </div>
        </div>
      </form>
    </>
  )
}

export default ForgotPassword
