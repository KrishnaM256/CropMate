import React, { useEffect, useState } from 'react'
import './ContractMarket.css'
import { CiHome } from 'react-icons/ci'
import FarmerCard from '../common/cards/FarmerCard/FarmerCard'
import { TbAdjustmentsHorizontal } from 'react-icons/tb'
import {
  useGetAllBuyerOrdersQuery,
  useGetAllOrdersQuery,
} from '../../redux/api/ordersApiSlice'
import { setOrders } from '../../redux/features/order/orderSlice'
import { v4 as uuid4 } from 'uuid'
import { useDispatch, useSelector } from 'react-redux'
import BuyerCard from '../common/cards/BuyerCard/BuyerCard'
import { createGroup, addToGroup } from '../../redux/features/group/groupSlice' // Import your createGroup action
import { toast } from 'react-toastify'

const ContractMarket = () => {
  const dispatch = useDispatch()
  const groups = useSelector((state) => state.group)
  const groupList = Object.values(groups)

  const {
    data: ordersList,
    refetch: refetchOrders,
    isLoading: ordersLoading,
    error: ordersError,
  } = useGetAllOrdersQuery()
  const {
    data: buyerOrdersList,
    refetch: refetchBuyerOrders,
    isLoading: buyerOrdersLoading,
    error: buyerOrdersError,
  } = useGetAllBuyerOrdersQuery()

  useEffect(() => {
    refetchOrders()
    refetchBuyerOrders()
  }, [refetchOrders, refetchBuyerOrders])

  useEffect(() => {
    if (ordersList) {
      dispatch(setOrders(ordersList))
    }
  }, [ordersList, dispatch])

  const [groupName, setGroupName] = useState('')
  const [toggle, setToggle] = useState(false)
  const [selectedDetails, setSelectedDetails] = useState(null)

  if (ordersLoading || buyerOrdersLoading) return <p>Loading...</p>
  if (ordersError || buyerOrdersError) return <p>Error loading orders</p>

  const handleSaveGroup = (e) => {
    e.preventDefault()
    if (groupName && selectedDetails) {
      dispatch(
        createGroup({
          name: groupName,
          details: selectedDetails,
        })
      )
      toast.success(
        `${selectedDetails.name} is successfully added to group ${groupName}`
      )
      setGroupName('')
      setSelectedDetails(null)
      setToggle(false)
    }
  }

  const addDetails = (details) => {
    setSelectedDetails(details)
    setToggle(true)
  }
  const addToExistingGroup = (id, name) => {
    const group = groups[id]

    const isMemberExist = group?.members.some(
      (member) => member.id === selectedDetails.id
    )

    if (isMemberExist) {
      toast.error(`${selectedDetails.name} already exists in group ${name}`)
    } else if (selectedDetails) {
      dispatch(addToGroup({ groupId: id, item: selectedDetails }))
      toast.success(
        `${selectedDetails.name} is successfully added to group ${name}`
      )
      setSelectedDetails(null)
      setToggle(false)
    }
  }

  return (
    <>
      {toggle && (
        <>
          <div className="overlay" onClick={() => setToggle(false)}></div>
          <div className="popUp">
            <form action="" onSubmit={handleSaveGroup}>
              <h4 className="h4">Create group:</h4>
              <div className="ipContainer">
                <label htmlFor="email">Group name:</label>
                <input
                  type="text"
                  name="groupName"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)} // Fixed onChange handler
                  required
                />
              </div>
            </form>
            <div className="buttons">
              <button
                className="subBtn"
                type="submit"
                onClick={handleSaveGroup}
              >
                Save
              </button>
              <button onClick={() => setToggle(false)}>Cancel</button>
            </div>
            <div className="existingGroups">
              <h4 className="h4">Add to existing groups:</h4>

              {groupList.length > 0 ? (
                groupList.map((group) => {
                  return (
                    <button
                      key={uuid4()}
                      onClick={() => addToExistingGroup(group.id, group.name)}
                    >
                      {group.name}
                    </button>
                  )
                })
              ) : (
                <p className="subLine">No groups have been created yet</p>
              )}
            </div>
          </div>
        </>
      )}
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
            {ordersList &&
              ordersList.map((order) => {
                return (
                  <FarmerCard
                    key={uuid4()}
                    addToGroup={addDetails}
                    setToggle={setToggle}
                    toggle={toggle}
                    data={order}
                  />
                )
              })}
            {buyerOrdersList &&
              buyerOrdersList.map((order) => {
                return (
                  <BuyerCard
                    key={uuid4()}
                    addToGroup={addDetails}
                    setToggle={setToggle}
                    toggle={toggle}
                    data={order}
                  />
                )
              })}
          </div>
        </div>
      </section>
    </>
  )
}

export default ContractMarket
