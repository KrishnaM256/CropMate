import Contract from '../models/contractModel.js'
import asyncHandler from '../middlewares/asyncHandler.js'
import mongoose from 'mongoose'
import Order from '../models/orderModel.js'
import User from '../models/userModel.js'

export const createContract = asyncHandler(async (req, res) => {
  console.log(req.body)
  console.log(req.files)

  const creatorSignature = req.files.creatorSignature
    ? req.files.creatorSignature[0].path
    : ''

  const {
    order,
    pricePerAcre,
    deliveryDate,
    transportationRequired,
    paymentTerms,
    cropDetails, // This should include expectedYield and expectedCrop
    deliveryLocation,
    customTerms,
  } = req.body

  let parsedCropDetails = cropDetails
  if (typeof cropDetails === 'string') {
    parsedCropDetails = JSON.parse(cropDetails)
  }
  let parsedCustomTerms = customTerms
  if (typeof customTerms === 'string') {
    parsedCustomTerms = JSON.parse(customTerms)
  }
  let parsedDeliveryLocation = deliveryLocation
  if (typeof deliveryLocation === 'string') {
    parsedDeliveryLocation = JSON.parse(deliveryLocation)
  }
  if (
    !order ||
    !pricePerAcre ||
    !deliveryDate ||
    !paymentTerms ||
    !parsedCropDetails ||
    !deliveryLocation ||
    !customTerms ||
    !transportationRequired ||
    !creatorSignature // Ensure creatorSignature is provided
  ) {
    throw new Error('All fields are mandatory!')
  }

  const newContract = new Contract({
    ...req.body,
    creatorSignature,
    cropDetails: parsedCropDetails,
    customTerms: parsedCustomTerms,
    deliveryLocation: parsedDeliveryLocation,
    createdBy: req.user._id,
  })

  try {
    await newContract.save()

    // Populate the contract with the createdBy user details
    const contract = await newContract.populate(
      'createdBy',
      `avatar firstName middleName lastName rating numReviews tagLine district state role _id`
    )

    // Respond with the created contract
    res.status(201).json(contract)
  } catch (error) {
    console.log(error)
    res.status(400)
    throw new Error('Internal server error')
  }
})

export const getContracts = asyncHandler(async (req, res) => {
  const { user, status, order } = req.query

  const query = {}
  if (user) query.$or = [{ createdBy: user }, { acceptedBy: user }]
  if (status) query.status = status
  if (order) query.order = order

  const contracts = await Contract.find(query).populate(
    'order createdBy acceptedBy'
  )
  res.json(contracts)
})

export const getContractByOrderId = asyncHandler(async (req, res) => {
  const { orderId } = req.query

  try {
    console.log('Order ID:', orderId)
    const contract = await Contract.find({
      order: orderId, // Ensure this matches the `ObjectId` of the order
      $or: [
        { createdBy: req.user._id },
        { acceptedBy: req.user._id },
        { acceptedBy: null },
      ],
    }).populate('order createdBy acceptedBy')

    res.json(...contract)
  } catch (error) {
    console.log('Error fetching contracts:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

export const getContractById = asyncHandler(async (req, res) => {
  const contract = await Contract.findById(req.params.id).populate(
    'order createdBy acceptedBy'
  )
  if (contract) {
    res.json(contract)
  } else {
    res.status(404)
    throw new Error('Contract not found')
  }
})

export const updateContract = asyncHandler(async (req, res) => {
  console.log(req.body)
  console.log(req.files)
  if (req.user._id.toString() !== contract1.createdBy.toString()) {
    res.status(403).json('Not authorized')
    return
  }

  const creatorSignature = req.files.creatorSignature
    ? req.files.creatorSignature[0].path
    : ''

  const {
    order,
    pricePerAcre,
    deliveryDate,
    transportationRequired,
    paymentTerms,
    cropDetails, // This should include expectedYield and expectedCrop
    deliveryLocation,
    customTerms,
  } = req.body

  let parsedCropDetails = cropDetails
  if (typeof cropDetails === 'string') {
    parsedCropDetails = JSON.parse(cropDetails)
  }
  let parsedCustomTerms = customTerms
  if (typeof customTerms === 'string') {
    parsedCustomTerms = JSON.parse(customTerms)
  }
  let parsedDeliveryLocation = deliveryLocation
  if (typeof deliveryLocation === 'string') {
    parsedDeliveryLocation = JSON.parse(deliveryLocation)
  }

  // Only validate fields that are required to be updated
  if (
    !order ||
    !pricePerAcre ||
    !deliveryDate ||
    !paymentTerms ||
    !parsedCropDetails ||
    !deliveryLocation ||
    !customTerms ||
    !transportationRequired // creatorSignature is optional
  ) {
    throw new Error('All fields except are mandatory!')
  }

  try {
    // Update the contract by ID
    const oldContract = await Contract.findById(req.body._id)
    const contract = await Contract.findByIdAndUpdate(
      req.body._id,
      {
        ...req.body,
        creatorSignature: creatorSignature || oldContract.creatorSignature, // If no signature is provided, we don't update it
        cropDetails: parsedCropDetails || oldContract.parsedCropDetails,
        customTerms: parsedCustomTerms || oldContract.parsedCustomTerms,
        deliveryLocation:
          parsedDeliveryLocation || oldContract.parsedDeliveryLocation,
        updatedBy: req.user._id,
      },
      { new: true } // Returns the updated contract
    )

    if (!contract) {
      res.status(404)
      throw new Error('Contract not found')
    }

    res.status(200).json(contract)
  } catch (error) {
    console.log(error)
    res.status(400)
    throw new Error('Internal server error')
  }
})

export const acceptContract = asyncHandler(async (req, res) => {
  console.log(req.body)
  const { id } = req.params
  console.log(req.params)
  const { deliveryLocation } = req.body
  const acceptorSignature = req.files.acceptorSignature
    ? req.files.acceptorSignature[0].path
    : ''
  let parsedDeliveryLocation = deliveryLocation
  if (typeof deliveryLocation === 'string') {
    parsedDeliveryLocation = JSON.parse(deliveryLocation)
  }
  try {
    const contract = await Contract.findById(id)
    console.log({ contract: contract })
    contract.status = 'accepted'
    contract.acceptedBy = req.user._id
    contract.timestamps.acceptedAt = Date.now()
    contract.deliveryLocation = parsedDeliveryLocation
    contract.acceptorSignature = acceptorSignature
    const updatedContract = await contract.save()
    res.json(updatedContract)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

export const rejectContract = asyncHandler(async (req, res) => {
  const contract = await Contract.findById(req.params.id)

  try {
    contract.status = 'rejected'
    contract.timestamps.rejectedAt = Date.now()

    const updatedContract = await contract.save()
    res.json(updatedContract)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

export const deleteContract = asyncHandler(async (req, res) => {
  try {
    const contract1 = await Contract.findById(req.params.id)
    if (!contract1) {
      return res.status(404).json({ message: 'Contract not found' })
    }

    if (req.user._id.toString() !== contract1.createdBy.toString()) {
      return res.status(403).json({ message: 'Not authorized' })
    }

    // Delete the contract
    const contract = await Contract.findByIdAndDelete(req.params.id)
    if (!contract) {
      return res.status(404).json({ message: 'Contract already deleted' })
    }

    // Delete the associated order
    const order = await Order.findByIdAndDelete(contract.order)
    if (order) {
      // Find users who saved this order
      const users = await User.find({ 'savedOrders.orderId': order._id })

      // Update savedOrders for each user
      for (const user of users) {
        user.savedOrders = user.savedOrders.filter(
          (savedOrder) => savedOrder.orderId.toString() !== order._id.toString()
        )
        await user.save({ validateBeforeSave: false })
      }
    }

    res.json({ message: 'Contract and associated order deleted successfully' })
  } catch (error) {
    console.error(error)
    res.status(400).json({ message: error.message })
  }
})
