import React, { useState } from 'react'
import './RegisterAs.css'
import { GiHighGrass } from 'react-icons/gi'
import { IoStorefrontOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'

const RadioCard = ({ value, checked, onChange, index }) => {
  return (
    <div className="radioCard">
      <label className={`radio-card ${checked ? 'checked' : ''}`}>
        <div className="radio-btn">
          {index == 0 ? (
            <IoStorefrontOutline className="icon" />
          ) : (
            <GiHighGrass className="icon" />
          )}
          <input
            type="radio"
            name="custom-radio"
            value={value}
            checked={checked}
            onChange={onChange}
            className="radio-input"
          />
          <span className={`radio-checkmark ${checked ? 'checked' : ''}`} />
        </div>
        <span className="radio-label">{value}</span>
      </label>
    </div>
  )
}

const RegisterAs = () => {
  const options = [
    `I'm a Buyer, looking for farmer`,
    `I'm a Farmer, looking for buyer`,
  ]
  const [selected, setSelected] = useState(options[0])

  return (
    <div className="radio-group">
      <h3 className="h3">Join as a buyer or farmer</h3>
      <div>
        {options.map((option, index) => (
          <RadioCard
            key={option}
            value={option}
            checked={selected === option}
            onChange={() => setSelected(option)}
            index={index}
          />
        ))}
      </div>
      <Link
        to={`/signUp/${
          selected === `I'm a Buyer, looking for farmer` ? 'buyer' : 'farmer'
        }`}
      >
        <button type="button" className="greenBtn">
          {selected === `I'm a Buyer, looking for farmer`
            ? 'Join as Buyer'
            : 'Apply as farmer'}
        </button>
      </Link>
    </div>
  )
}

export default RegisterAs
