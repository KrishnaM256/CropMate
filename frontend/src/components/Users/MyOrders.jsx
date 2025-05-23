import React from 'react'
import { useGetAllSavedOrdersQuery } from '../../redux/api/usersApiSlice'
import { useGetMyOrdersQuery } from '../../redux/api/ordersApiSlice'
import OrderCard from '../common/cards/OrderCard/OrderCard'
import { v4 as uuid4 } from 'uuid'
import './MyOrders.css'
import AcceptedOrdersCard from '../common/cards/AcceptedOrdersCard/AcceptedOrdersCard'

const MyOrders = () => {
  const { data: savedOrders, refetch } = useGetAllSavedOrdersQuery()
  const { data: myOrders, isLoading } = useGetMyOrdersQuery()
  if (isLoading) {
    return <p>Loading...</p>
  }
  return (
    <div className="pageContainer">
      <h2 className="h2">My orders</h2>
      <div className="marketDiv3 myOrders">
        {myOrders?.length == 0 ? (
          <p className="notFound">No orders created!</p>
        ) : (
          myOrders?.map((order) => {
            return (
              <AcceptedOrdersCard
                savedOrders={savedOrders}
                savedOrderRefetch={refetch}
                key={uuid4()}
                data={order}
              />
            )
          })
        )}
      </div>
    </div>
  )
}

export default MyOrders
