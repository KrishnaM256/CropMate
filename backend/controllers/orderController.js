import asyncHandler from '../middlewares/asyncHandler.js'
import BuyerOrder from '../models/buyerOrderModel.js'
import Order from '../models/orderModel.js'
import User from '../models/userModel.js' // Assuming the user model is imported

export const createOrder = asyncHandler(async (req, res) => {
  const { cropReadyLand, pricePerAcre, currentCrops, logistics } = req.body
  if (!cropReadyLand || !pricePerAcre || !currentCrops || !logistics) {
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
      `firstName lastName rating numReviews tagLine city state totalLand role _id`
    )
    const userOrder = {
      _id: order._id,
      cropReadyLand: order.cropReadyLand,
      expectedCropsYields: order.expectedCropsYields,
      pricePerAcre: order.pricePerAcre,
      currentCrops: order.currentCrops,
      logistics: order.logistics,
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
    `firstName lastName rating numReviews tagLine city state totalLand role _id`
  )

  console.log(orders)

  const userOrders = orders.map((order) => ({
    _id: order._id,
    cropReadyLand: order.cropReadyLand,
    expectedCropsYields: order.expectedCropsYields,
    pricePerAcre: order.pricePerAcre,
    currentCrops: order.currentCrops,
    logistics: order.logistics,
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
  }))

  res.status(200).json(userOrders)
})

export const createBuyerOrder = asyncHandler(async (req, res) => {
  console.log(req.body)

  if (
    !req.body.requiredLand ||
    !req.body.preferredCropsYields ||
    !req.body.pricePerAcre ||
    !req.body.logistics ||
    !req.body.expectedQuality ||
    !req.body.paymentMethod ||
    !req.body.paymentSchedule
  ) {
    throw new Error('All fields are mandatory!')
  }

  const newOrder = new BuyerOrder({
    ...req.body,
    user: req.user._id,
  })

  try {
    await newOrder.save()
    const order = await newOrder.populate(
      'user',
      `firstName lastName rating numReviews tagLine city state totalLand role _id`
    )
    const userOrder = {
      _id: order._id,
      requiredLand: order.requiredLand,
      preferredCropsYields: order.preferredCropsYields,
      pricePerAcre: order.pricePerAcre,
      expectedQuality: order.expectedQuality,
      logistics: order.logistics,
      paymentMethod: order.paymentMethod,
      paymentSchedule: order.paymentSchedule,
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

export const getAllBuyerOrders = asyncHandler(async (req, res) => {
  const orders = await BuyerOrder.find().populate(
    'user',
    `firstName lastName rating numReviews tagLine city state totalLand role _id`
  )

  const userOrders = orders.map((order) => ({
    _id: order._id,
    requiredLand: order.requiredLand,
    preferredCropsYields: order.preferredCropsYields,
    pricePerAcre: order.pricePerAcre,
    expectedQuality: order.expectedQuality,
    logistics: order.logistics,
    paymentMethod: order.paymentMethod,
    paymentSchedule: order.paymentSchedule,
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
  }))

  res.status(200).json(userOrders)
})
