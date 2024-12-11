import React from 'react'
import './LiveMarket'
import { CiHome } from 'react-icons/ci'
// import FarmerCard from '../common/cards/FarmerCard/FarmerCard'
import { TbAdjustmentsHorizontal } from 'react-icons/tb'

const LiveMarket = () => {
  return (
    <section id="market">
      <div className="marketDiv1">
        <CiHome className="homeIcon" /> / <span> Live Market</span>
      </div>
      <button className="border respContainer">
        <TbAdjustmentsHorizontal className="icon" />
        Filter
      </button>
      <div className="marketContainer">
        <div className="marketDiv2"></div>
        <div className="marketDiv3"></div>
      </div>
    </section>
  )
}

export default LiveMarket
