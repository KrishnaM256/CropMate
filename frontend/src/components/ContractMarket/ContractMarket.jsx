import React from 'react'
import './ContractMarket.css'
import { CiHome } from 'react-icons/ci'
import FarmerCard from '../common/cards/FarmerCard/FarmerCard'
import { TbAdjustmentsHorizontal } from 'react-icons/tb'

const ContractMarket = () => {
  return (
    <section id="market">
      <div className="marketDiv1">
        <CiHome className="homeIcon" /> / <span> Contract Market</span>
      </div>
      <button className="border respContainer">
        <TbAdjustmentsHorizontal className="icon" />
        Filter
      </button>
      <div className="marketContainer">
        <div className="marketDiv2"></div>
        <div className="marketDiv3">
          <FarmerCard />
          <FarmerCard />
          <FarmerCard />
          <FarmerCard />
          <FarmerCard />
          <FarmerCard />
          <FarmerCard />
          <FarmerCard />
          <FarmerCard />
          <FarmerCard />
          <FarmerCard />
          <FarmerCard />
          <FarmerCard />
          <FarmerCard />
          <FarmerCard />
          <FarmerCard />
          <FarmerCard />
          <FarmerCard />
          <FarmerCard />
          <FarmerCard />
          <FarmerCard />
          <FarmerCard />
          <FarmerCard />
          <FarmerCard />
          <FarmerCard />
          <FarmerCard />
          <FarmerCard />
          <FarmerCard />
        </div>
      </div>
    </section>
  )
}

export default ContractMarket
