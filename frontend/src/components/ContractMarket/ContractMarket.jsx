import React, { useEffect } from 'react'
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
import { useDispatch } from 'react-redux'
import BuyerCard from '../common/cards/BuyerCard/BuyerCard'

const ContractMarket = () => {
  const dispatch = useDispatch()

  // Fetching orders and buyer orders
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

  // Refetch orders whenever the component mounts
  useEffect(() => {
    refetchOrders()
    refetchBuyerOrders()
  }, [refetchOrders, refetchBuyerOrders])

  // Dispatch orders to Redux store when ordersList is updated
  useEffect(() => {
    if (ordersList) {
      dispatch(setOrders(ordersList))
    }
  }, [ordersList, dispatch])

  if (ordersLoading || buyerOrdersLoading) return <p>Loading...</p>
  if (ordersError || buyerOrdersError) return <p>Error loading orders</p>

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
          {ordersList &&
            ordersList.map((order) => {
              return <FarmerCard key={uuid4()} data={order} />
            })}
          {buyerOrdersList &&
            buyerOrdersList.map((order) => {
              return <BuyerCard key={uuid4()} data={order} />
            })}
        </div>
      </div>
    </section>
  )
}

export default ContractMarket
