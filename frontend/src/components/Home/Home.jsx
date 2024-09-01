import React, { useState } from 'react'
import { IoSearchOutline } from 'react-icons/io5'

import './Home.css'
import CategoryCard from '../common/cards/categoryCard/categoryCard'

const Home = () => {
  const categories = [
    'Cereals and Grains',
    'Pulses and Legumes',
    'Fruits',
    'Vegetables',
    'Oilseeds',
    'Spices and Herbs',
    'Fiber Crops',
    'Sugar Crops',
  ]
  const services = [
    'Contract Management',
    'Quality Testing and Assurance',
    'Secure Payment Processing',
    'Crop Insurance Management',
    'Fraud Detection and Security',
    'Market Insights and Analytics',
  ]
  return (
    <section id="home">
      <div className="header">
        <h1 className="h3">Find the right farming partnership, right away.</h1>
        <div className="search">
          <input
            type="text"
            name="search"
            placeholder="Search for any service..."
          />
          <button type="button">
            <IoSearchOutline className="searchIcon" />
          </button>
        </div>
      </div>
      <div className="categoriesDiv">
        {categories.map((category) => (
          <CategoryCard name={category} />
        ))}
      </div>
      <div className="popularServices">
        <h3 className="h3">Popular Services</h3>
        <div className="cards">
          
        </div>
      </div>
    </section>
  )
}

export default Home
