import React from 'react'
import { MdOutlineGrass } from 'react-icons/md'
import './CategoryCard.css'

const CategoryCard = ({ name }) => {
  return (
    <div className="categoryCard">
      <MdOutlineGrass className="icon" />
      <p>{name}</p>
    </div>
  )
}

export default CategoryCard
