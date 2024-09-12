import React from 'react'
import GroupCard from '../common/cards/GroupCard/GroupCard'
import './GroupedUsers.css'
import { HiOutlineUserGroup } from 'react-icons/hi2'

const GroupedUsers = () => {
  return (
    <div className="pageContainer">
      <h2 className="h2">Grouped network</h2>
      <button className="border respContainer ">
        <HiOutlineUserGroup className="icon" />
        Groups
      </button>
      <div className="cardsContainer">
        <div className="groups">
          <h4>Groups</h4>
          <div className="grpContainer">
            <div className="grp">Wheat Farmers</div>
            <div className="grp">Rice Farmers</div>
            <div className="grp">Onion Farmers</div>
            <div className="grp">Aloo Farmers</div>
            <div className="grp">Grain Farmers</div>
            <div className="grp">Fruit Farmers</div>
            <div className="grp">Wheat Farmers</div>
            <div className="grp">Rice Farmers</div>
            <div className="grp">Onion Farmers</div>
            <div className="grp">Aloo Farmers</div>
            <div className="grp">Grain Farmers</div>
            <div className="grp">Fruit Farmers</div>
            <div className="grp">Wheat Farmers</div>
            <div className="grp">Rice Farmers</div>
            <div className="grp">Onion Farmers</div>
            <div className="grp">Aloo Farmers</div>
            <div className="grp">Grain Farmers</div>
            <div className="grp">Fruit Farmers</div>
            <div className="grp">Wheat Farmers</div>
            <div className="grp">Rice Farmers</div>
            <div className="grp">Onion Farmers</div>
            <div className="grp">Aloo Farmers</div>
            <div className="grp">Grain Farmers</div>
            <div className="grp">Fruit Farmers</div>
            <div className="grp">Wheat Farmers</div>
            <div className="grp">Rice Farmers</div>
            <div className="grp">Onion Farmers</div>
            <div className="grp">Aloo Farmers</div>
            <div className="grp">Grain Farmers</div>
            <div className="grp">Fruit Farmers</div>
            <div className="grp">Wheat Farmers</div>
            <div className="grp">Rice Farmers</div>
            <div className="grp">Onion Farmers</div>
            <div className="grp">Aloo Farmers</div>
            <div className="grp">Grain Farmers</div>
            <div className="grp">Fruit Farmers</div>
            <div className="grp">Wheat Farmers</div>
            <div className="grp">Rice Farmers</div>
            <div className="grp">Onion Farmers</div>
            <div className="grp">Aloo Farmers</div>
            <div className="grp">Grain Farmers</div>
          </div>
        </div>
        <div className="grpCards">
          <h5>Wheat Farmers</h5>
          <GroupCard />
          <GroupCard />
          <GroupCard />
          <GroupCard />
          <GroupCard />
          <GroupCard />
          <GroupCard />
          <GroupCard />
          <GroupCard />
          <GroupCard />
          <GroupCard />
          <GroupCard />
          <GroupCard />
          <GroupCard />
          <GroupCard />
          <GroupCard />
        </div>
      </div>
    </div>
  )
}

export default GroupedUsers
