import asyncHandler from '../middlewares/asyncHandler.js'
import Order from '../models/orderModel.js'

export const createOrder = asyncHandler(async (req, res) => {
  console.log({ body: req.body })
  const {
    land,
    pricePerAcre,
    expectedCropsYields,
    orderFor,
    paymentMethod,
    transportationRequired,
  } = req.body
  // if (
  //   !land ||
  //   !pricePerAcre ||
  //   !expectedCropsYields ||
  //   !orderFor ||
  //   !paymentMethod ||
  //   !transportationRequired
  // ) {
  //   throw new Error('All fields are mandatory!')
  // }

  console.log('newOrder')
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
      pricePerAcre: order.pricePerAcre,
      orderFor: order.orderFor,
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
  const orders = await Order.find({ acceptedBy: null }).populate(
    'user',
    `firstName middleName lastName rating numReviews tagLine address totalLand role _id avatar`
  )

  console.log(orders)

  const userOrders = orders.map((order) => ({
    _id: order._id,
    land: order.land,
    expectedCropsYields: order.expectedCropsYields,
    pricePerAcre: order.pricePerAcre,
    orderFor: order.orderFor,
    orderStatus: order.orderStatus,
    paymentMethod: order.paymentMethod,
    paymentStatus: order.paymentStatus,
    deliveryStatus: order.deliveryStatus,
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

export const getMyOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate(
        'user',
        `firstName middleName lastName rating numReviews tagLine address totalLand role _id avatar`
      )
      .populate(
        'acceptedBy',
        `firstName middleName lastName rating numReviews tagLine address totalLand role _id avatar`
      )

    const userOrders = orders.map((order) => ({
      _id: order._id,
      land: order.land,
      expectedCropsYields: order.expectedCropsYields,
      pricePerAcre: order.pricePerAcre,
      orderFor: order.orderFor,
      orderStatus: order.orderStatus,
      paymentMethod: order.paymentMethod,
      paymentStatus: order.paymentStatus,
      transportationRequired: order.transportationRequired,
      deliveryLocation: order.deliveryLocation,
      deliveryStatus: order.deliveryStatus,
      milestones: order.milestones,
      acceptedBy: order.acceptedBy,
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
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: error.message })
  }
})

export const getMyAcceptedOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({ acceptedBy: req.user._id })
      .populate(
        'user',
        `firstName middleName lastName rating numReviews tagLine address totalLand role _id avatar`
      )
      .populate(
        'acceptedBy',
        `firstName middleName lastName rating numReviews tagLine address totalLand role _id avatar`
      )
    const userOrders = orders.map((order) => ({
      _id: order._id,
      land: order.land,
      expectedCropsYields: order.expectedCropsYields,
      pricePerAcre: order.pricePerAcre,
      orderFor: order.orderFor,
      orderStatus: order.orderStatus,
      paymentMethod: order.paymentMethod,
      paymentStatus: order.paymentStatus,
      transportationRequired: order.transportationRequired,
      deliveryLocation: order.deliveryLocation,
      deliveryStatus: order.deliveryStatus,
      milestones: order.milestones,
      acceptedBy: order.acceptedBy,
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
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: error.message })
  }
})

export const updateOrder = asyncHandler(async (req, res) => {
  const {
    land,
    pricePerAcre,
    expectedCropsYields,
    orderFor,
    orderStatus,
    paymentMethod,
    transportationRequired,
  } = req.body
  if (
    !land ||
    !pricePerAcre ||
    !expectedCropsYields ||
    !orderFor ||
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
    const order1 = await Order.findById(req.params.id)
    console.log(order1)
    if (req.user._id !== order1.createdBy) {
      res.status(400).json('Not authorized')
    }
    const order = await Order.findByIdAndDelete(req.params.id)
    res.json(order)
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: error.message })
  }
})

export const updateOrderStatus = asyncHandler(async (req, res) => {
  try {
    console.log({ body: req.body.milestones })
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    )
    await order.save({ validateBeforeSave: false })
    res.json(order)
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: error.message })
  }
})
