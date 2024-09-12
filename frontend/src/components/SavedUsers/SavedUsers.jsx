import React from 'react'
import SavedNetworkCard from '../common/cards/savedNetworkCard/savedNetworkCard'
import './SavedUsers.css'

const SavedUsers = () => {
  return (
    <div className="pageContainer">
      <h2 className="h2">Saved network</h2>
      <div className="cardsContainer">
        <SavedNetworkCard />
        <SavedNetworkCard />
        <SavedNetworkCard />
        <SavedNetworkCard />
      </div>
    </div>
  )
}

export default SavedUsers
