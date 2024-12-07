import Contract from '../models/contractModel.js'
import asyncHandler from '../middlewares/asyncHandler.js'

export const createContract = asyncHandler(async (req, res) => {
  const {
    order,
    createdBy,
    acceptedBy,
    pricePerTon,
    deliveryDate,
    transportationRequired,
    paymentTerms,
    cropDetails,
    deliveryLocation,
    status,
    customTerms,
    paymentStatus,
  } = req.body
  if (
    !order ||
    !createdBy ||
    !acceptedBy ||
    !pricePerTon ||
    !deliveryDate ||
    !paymentTerms ||
    !cropDetails ||
    !deliveryLocation ||
    !status ||
    !customTerms ||
    !paymentStatus ||
    !transportationRequired
  ) {
    throw new Error('All fields are mandatory!')
  }
  const newContract = new Contract({
    ...req.body,
    createdBy: req.user._id,
  })
  try {
    await newContract.save()
    const contract = await newContract.populate(
      'createdBy',
      `firstName middleName lastName rating numReviews tagLine district state role _id`
    )
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
  const {
    order,
    createdBy,
    acceptedBy,
    pricePerTon,
    deliveryDate,
    transportationRequired,
    paymentTerms,
    cropDetails,
    deliveryLocation,
    status,
    customTerms,
    timestamps,
    paymentStatus,
  } = req.body
  if (
    !order ||
    !createdBy ||
    !acceptedBy ||
    !pricePerTon ||
    !deliveryDate ||
    !paymentTerms ||
    !cropDetails ||
    !deliveryLocation ||
    !status ||
    !customTerms ||
    !timestamps ||
    !paymentStatus ||
    !transportationRequired
  ) {
    throw new Error('All fields are mandatory!')
  }
  try {
    const contract = await Contract.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
      },
      {
        new: true,
      }
    )
    await contract.save()
    const contract2 = contract.populate('order createdBy acceptedBy')
    res.json(contract2)
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: error.message })
  }
})

export const acceptContract = asyncHandler(async (req, res) => {
  const contract = await Contract.findById(req.params.id)

  try {
    contract.status = 'accepted'
    contract.acceptedBy = req.user._id
    contract.timestamps.acceptedAt = Date.now()

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
    const contract = await Contract.findByIdAndDelete(req.params.id)
    res.json(contract)
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: error.message })
  }
})
