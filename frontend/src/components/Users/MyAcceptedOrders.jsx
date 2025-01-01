import React from 'react'
import './MyAcceptedOrders.css'
import { useGetMyAcceptedOrdersQuery } from '../../redux/api/ordersApiSlice'
import { useGetAllSavedOrdersQuery } from '../../redux/api/usersApiSlice'
import OrderCard from '../common/cards/OrderCard/OrderCard'
import { v4 as uuid4 } from 'uuid'
import AcceptedOrdersCard from '../common/cards/AcceptedOrdersCard/AcceptedOrdersCard'
import { ChakraProvider, Spinner } from '@chakra-ui/react'

const MyAcceptedOrders = () => {
  const { data: savedOrders, refetch } = useGetAllSavedOrdersQuery()
  const { data: myOrders, isLoading } = useGetMyAcceptedOrdersQuery()
  console.log({ myOrders: myOrders })
  if (isLoading) {
    return (
      <ChakraProvider>
        <div className="spinner2 spinner">
          <Spinner size={'xl'} className="spinner" />
        </div>
      </ChakraProvider>
    )
  }
  return (
    <div className="pageContainer">
      <h2 className="h2">My accepted orders</h2>
      <div className="marketDiv3 myOrders">
        {myOrders?.length == 0 ? (
          <p className="notFound">No orders accepted!</p>
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

export default MyAcceptedOrders
