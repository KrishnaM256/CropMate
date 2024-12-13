import React from 'react'
import SavedNetworkCard from '../common/cards/savedNetworkCard/savedNetworkCard'
import './SavedUsers.css'
import { useGetAllSavedOrdersQuery } from '../../redux/api/usersApiSlice'
import { v4 as uuid4 } from 'uuid'
import OrderCard from '../common/cards/OrderCard/OrderCard'
const SavedUsers = () => {
  const {
    data: savedOrders,
    isLoading,
    isError,
    refetch,
  } = useGetAllSavedOrdersQuery()
  console.log(savedOrders)
  return (
    <div className="pageContainer">
      <h2 className="h2">Saved orders</h2>
      <div className="marketContainer">
        <div className="marketDiv2"></div>
        <div className="marketDiv3">
          {savedOrders?.length == 0 ? (
            <p className="notFound">No orders saved!</p>
          ) : (
            savedOrders?.map((order) => {
              return (
                <OrderCard
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
    </div>
  )
}

export default SavedUsers
