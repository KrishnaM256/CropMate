import asyncHandler from '../middlewares/asyncHandler.js'
import Order from '../models/orderModel.js'

export const createOrder = asyncHandler(async (req, res) => {
  console.log({ body: req.body })
  const {
    land,
    pricePerTon,
    expectedCropsYields,
    orderType,
    paymentMethod,
    transportationRequired,
  } = req.body
  if (
    !land ||
    !pricePerTon ||
    !expectedCropsYields ||
    !orderType ||
    !paymentMethod ||
    !transportationRequired
  ) {
    throw new Error('All fields are mandatory!')
  }

  const newOrder = new Order({
    ...req.body,
    user: req.user._id,
  })

  try {
    await newOrder.save()
    const order = await newOrder.populate(
      'user',
      `avatar firstName middleName lastName rating numReviews tagLine city state totalLand role _id`
    )
    const userOrder = {
      _id: order._id,
      land: order.land,
      expectedCropsYields: order.expectedCropsYields,
      pricePerTon: order.pricePerTon,
      orderType: order.orderType,
      orderStatus: order.orderStatus,
      paymentMethod: order.paymentMethod,
      paymentStatus: order.paymentStatus,
      transportationRequired: order.transportationRequired,
      deliveryLocation: order.deliveryLocation,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      user: {
        name: `${order.user.firstName} ${order.user.lastName}`,
        city: order.user.city,
        state: order.user.state,
        totalLand: order.user.totalLand,
        rating: order.user.rating,
        numReviews: order.user.numReviews,
        tagLine: order.user.tagLine,
        role: order.user.role,
        id: order.user._id,
      },
    }
    res.status(200).json(userOrder)
  } catch (error) {
    console.log(error)
    res.status(400)
    throw new Error('Invalid user data')
  }
})

export const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find().populate(
    'user',
    `firstName middleName lastName rating numReviews tagLine address totalLand role _id avatar`
  )

  console.log(orders)

  const userOrders = orders.map((order) => ({
    _id: order._id,
    land: order.land,
    expectedCropsYields: order.expectedCropsYields,
    pricePerTon: order.pricePerTon,
    orderType: order.orderType,
    orderStatus: order.orderStatus,
    paymentMethod: order.paymentMethod,
    paymentStatus: order.paymentStatus,
    transportationRequired: order.transportationRequired,
    deliveryLocation: order.deliveryLocation,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
    user: {
      name: `${order.user.firstName} ${order.user.middleName} ${order.user.lastName}`,
      address: order.user.address,
      totalLand: order.user.totalLand,
      rating: order.user.rating,
      numReviews: order.user.numReviews,
      tagLine: order.user.tagLine,
      role: order.user.role,
      id: order.user._id,
      avatar: order.user.avatar,
    },
  }))

  res.status(200).json(userOrders)
})

export const updateOrder = asyncHandler(async (req, res) => {
  const {
    land,
    pricePerTon,
    expectedCropsYields,
    orderType,
    orderStatus,
    paymentMethod,
    transportationRequired,
  } = req.body
  if (
    !land ||
    !pricePerTon ||
    !expectedCropsYields ||
    !orderType ||
    !orderStatus ||
    !paymentMethod ||
    !transportationRequired
  ) {
    throw new Error('All fields are mandatory!')
  }
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    )
    await order.save()
    res.json(order)
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: error.message })
  }
})

export const deleteOrder = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id)
    res.json(order)
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: error.message })
  }
})
