import Contract from '../models/contractModel.js'
import asyncHandler from '../middlewares/asyncHandler.js'

export const createContract = asyncHandler(async (req, res) => {
  console.log(req.body)
  console.log(req.files)

  const signature = req.files.signature ? req.files.signature[0].path : ''

  // Extract all relevant fields from the request body
  const {
    order,
    pricePerTon,
    deliveryDate,
    transportationRequired,
    paymentTerms,
    cropDetails, // This should include expectedYield and expectedCrop
    deliveryLocation,
    customTerms,
  } = req.body

  // Parse cropDetails if it's a string (e.g., if you sent it as JSON string from the frontend)
  let parsedCropDetails = cropDetails
  if (typeof cropDetails === 'string') {
    parsedCropDetails = JSON.parse(cropDetails)
  }
  let parsedCustomTerms = customTerms
  if (typeof customTerms === 'string') {
    parsedCustomTerms = JSON.parse(customTerms)
  }
  let parsedDeliveryLocation = customTerms
  if (typeof deliveryLocation === 'string') {
    parsedDeliveryLocation = JSON.parse(deliveryLocation)
  }
  // Check if all required fields are provided
  if (
    !order ||
    !pricePerTon ||
    !deliveryDate ||
    !paymentTerms ||
    !parsedCropDetails ||
    !deliveryLocation ||
    !customTerms ||
    !transportationRequired ||
    !signature // Ensure signature is provided
  ) {
    throw new Error('All fields are mandatory!')
  }

  // Create a new contract object
  const newContract = new Contract({
    ...req.body,
    signature,
    cropDetails: parsedCropDetails,
    customTerms: parsedCustomTerms,
    deliveryLocation: parsedDeliveryLocation,
    createdBy: req.user._id,
  })

  try {
    // Save the contract
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
