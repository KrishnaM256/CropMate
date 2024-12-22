import React, { useEffect, useState } from 'react'
import './ContractMarket.css'
import OrderCard from '../common/cards/OrderCard/OrderCard'
import { CiHome } from 'react-icons/ci'
import { TbAdjustmentsHorizontal } from 'react-icons/tb'
import { useGetAllOrdersQuery } from '../../redux/api/ordersApiSlice'
import { setOrders } from '../../redux/features/order/orderSlice'
import { v4 as uuid4 } from 'uuid'
import { useDispatch, useSelector } from 'react-redux'
import { createGroup, addToGroup } from '../../redux/features/group/groupSlice' // Import your createGroup action
import { toast } from 'react-toastify'
import {
  useAddToGroupMutation,
  useCreateGroupMutation,
  useGetAllGroupsQuery,
  useGetAllSavedOrdersQuery,
} from '../../redux/api/usersApiSlice'
import { useNavigate } from 'react-router-dom'

const ContractMarket = () => {
  const dispatch = useDispatch()
  const [createGroup] = useCreateGroupMutation()
  const [addToGroup] = useAddToGroupMutation()
  const { data: groupList, isLoading, refetch } = useGetAllGroupsQuery()
  const {
    data: ordersList,
    refetch: refetchOrders,
    isLoading: ordersLoading,
    error: ordersError,
  } = useGetAllOrdersQuery()
  const { data: savedOrders, refetch: savedOrderRefetch } =
    useGetAllSavedOrdersQuery()
  console.log({ groupList: groupList })
  useEffect(() => {
    refetch()
  }, [refetch])
  const [groupName, setGroupName] = useState('')
  const [toggle, setToggle] = useState(false)
  const [selectedDetails, setSelectedDetails] = useState(null)

  if (ordersLoading) return <p>Loading...</p>
  if (ordersError) return <p>Error loading orders</p>

  const handleSaveGroup = async (e) => {
    e.preventDefault()
    if (groupName && selectedDetails) {
      try {
        const res = await createGroup({
          name: groupName,
          memberId: selectedDetails.id,
        }).unwrap()

        console.log('Group created successfully:', res)
        toast.success(
          `${selectedDetails.name} is successfully added to group ${groupName}.`
        )
      } catch (error) {
        console.log(error)
        toast.error(`${error.data?.message}`)
      }
      refetch()
      setGroupName('')
      setSelectedDetails(null)
      setToggle(false)
    }
  }
  console.log({ savedOrders: savedOrders })
  const addDetails = (details) => {
    setSelectedDetails(details)
    setToggle(true)
  }

  const addToExistingGroup = async (id, name) => {
    try {
      const res = await addToGroup({
        groupId: id,
        memberId: selectedDetails.id,
      }).unwrap()
      console.log('added to group successfully:', res)

      toast.success(
        `${selectedDetails.name} is successfully added to group ${name}`
      )
    } catch (error) {
      console.log(error)
      toast.error(`${error.data?.message}`)
    }
    setSelectedDetails(null)
    setToggle(false)
  }
  console.log({ ordersList: ordersList })

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
                  onChange={(e) => setGroupName(e.target.value)}
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
              <button onClick={() => setToggle(false)} id="cancel">
                Cancel
              </button>
            </div>
            <div className="existingGroups">
              <h4 className="h4">Add to existing groups:</h4>

              {groupList ? (
                groupList.map((group) => {
                  return (
                    <button
                      key={uuid4()}
                      onClick={() => addToExistingGroup(group?._id, group.name)}
                      id="grps"
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
          <CiHome className="homeIcon" onClick={() => navigate('/')} /> /{' '}
          <span> Contract Market</span>
        </div>
        <button className="border respContainer">
          <TbAdjustmentsHorizontal className="icon" />
          Filter
        </button>
        <div className="marketContainer">
          <div className="marketDiv3">
            {ordersList[0] ? (
              ordersList.map((order) => {
                return (
                  <OrderCard
                    savedOrders={savedOrders}
                    savedOrderRefetch={savedOrderRefetch}
                    key={uuid4()}
                    addToGroup={addDetails}
                    setToggle={setToggle}
                    toggle={toggle}
                    data={order}
                  />
                )
              })
            ) : (
              <p className="notFound">No orders found!</p>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export default ContractMarket
