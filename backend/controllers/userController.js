import User from '../models/userModel.js'
import asyncHandler from '../middlewares/asyncHandler.js'
import bcrypt from 'bcryptjs'
import createToken from '../utils/createToken.js'
import { sendMail } from '../utils/sendMail.js'

export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.status(200).send(users)
})

export const getUserProfileAdmin = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    res.status(200).json({
      id: user._id,
      firstName: user.firstName,
      middleName: user.middleName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      aadhaarCard: user.verification.aadhaarCard,
      landOwnershipProof: user.verification.landOwnershipProof,
      bankPassbook: user.verification.bankPassbook,
      businessLicense: user.verification.businessLicense,
      bankStatement: user.verification.bankStatement,
      panNumber: user.panNumber,
      address: user.address.street,
      city: user.address.city,
      state: user.address.state,
      pincode: user.address.pincode,
      role: user.role,
      reviews: user.reviews,
      rating: user.rating,
      numReviews: user.numReviews,
      workImages: user.workImages,
      totalLand: user.totalLand,
      avatar: user.avatar,
      tagLine: user.tagLine,
      aboutMe: user.aboutMe,
    })
  } else {
    res.status(404)
    throw new Error('User not found!')
  }
})

export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    res.status(200).json({
      id: user._id,
      firstName: user.firstName,
      middleName: user.middleName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      address: user.address.street,
      city: user.address.city,
      state: user.address.state,
      pincode: user.address.pincode,
      role: user.role,
      reviews: user.reviews,
      rating: user.rating,
      numReviews: user.numReviews,
      workImages: user.workImages,
      totalLand: user.totalLand,
      avatar: user.avatar,
      tagLine: user.tagLine,
      aboutMe: user.aboutMe,
    })
  } else {
    res.status(404)
    throw new Error('User not found!')
  }
})

export const updateUserProfile = asyncHandler(async (req, res) => {
  console.log({ body: req.body })
  const user = await User.findById(req.user._id)
  const avatar = req.files.avatar ? req.files.avatar[0].filename : user.avatar

  const workImages = req.files?.workImages
    ? req.files.workImages.map((file) => file.filename)
    : user.workImages

  if (user) {
    user.avatar = avatar
    user.firstName = req.body.firstName
    user.middleName = req.body.middleName
    user.lastName = req.body.lastName
    user.email = req.body.email
    user.phone = req.body.phone
    user.address.street = req.body.street
    user.address.village = req.body.village
    user.address.city = req.body.city
    user.address.state = req.body.state
    user.address.pincode = req.body.pincode
    user.totalLand = req.body.totalLand
    user.tagLine = req.body.tagLine
    user.aboutMe = req.body.aboutMe
    user.workImages = workImages

    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.status(200).json(updatedUser._doc)
  }
})

export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    if (user.role == 'admin') {
      res.status(400)
      throw new Error('Can not delete admin!')
    }
    await User.deleteOne({ _id: user._id })
    res.json({ message: 'User removed' })
  } else {
    res.status(404)
    throw new Error('User not found!')
  }
})

export const getUserById = asyncHandler(async (req, res) => {
  console.log(req)

  const user = await User.findById(req.params.id).select('-password')
  console.log(user)

  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('No user found!')
  }
})

export const updateUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    user.firstName = req.body.firstName
    user.middleName = req.body.middleName
    user.lastName = req.body.lastName
    user.email = req.body.email
    user.phone = req.body.phone
    user.address = req.body.address
    user.city = req.body.city
    user.state = req.body.state
    user.role = req.body.role
    const updatedUser = await user.save()
    res.status(200).json({
      updatedUser,
    })
  } else {
    res.status(404)
    throw new Error('User not found!')
  }
})

export const createUser = asyncHandler(async (req, res) => {
  console.log(req.files)
  const avatar = req.files.avatar ? req.files.avatar[0].filename : ''
  const aadhaarCard = req.files.aadhaarCard
    ? req.files.aadhaarCard[0].filename
    : ''
  const landOwnershipProof = req.files.landOwnershipProof
    ? req.files.landOwnershipProof[0].filename
    : ''
  const bankPassbook = req.files.bankPassbook
    ? req.files.bankPassbook[0].filename
    : ''
  const businessLicense = req.files.businessLicense
    ? req.files.businessLicense[0].filename
    : ''
  const bankStatement = req.files.bankStatement
    ? req.files.bankStatement[0].filename
    : ''
  const verification = {
    aadhaarCard: aadhaarCard,
    landOwnershipProof: landOwnershipProof,
    bankPassbook: bankPassbook,
    businessLicense: businessLicense,
    bankStatement: bankStatement,
  }
  const {
    firstName,
    middleName,
    lastName,
    email,
    phone,
    street,
    village,
    city,
    state,
    pincode,
    password,
    role,
  } = req.body
  if (
    !firstName ||
    !middleName ||
    !lastName ||
    !email ||
    !phone ||
    !street ||
    !village ||
    !city ||
    !state ||
    !pincode ||
    !password ||
    !role
  ) {
    throw new Error('All fields are mandatory!')
  }
  const address = {
    street: street,
    village: village,
    city: city,
    state: state,
    pincode: pincode,
  }
  const oldUser = await User.findOne({ email })
  if (oldUser) {
    return res
      .status(400)
      .send({ message: 'User with given email already exists!' })
  }
  const oldUser2 = await User.findOne({ phone })
  if (oldUser2) {
    return res
      .status(400)
      .send({ message: 'User with given phone number already exists!' })
  }
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  const newUser = new User({
    firstName,
    middleName,
    lastName,
    email,
    phone,
    address,
    password: hashedPassword,
    verification,
    city,
    state,
    role,
    avatar,
  })
  try {
    await newUser.save()
    createToken(res, newUser._id)
    console.log(newUser._doc)

    res.status(200).json(newUser)
  } catch (err) {
    console.log(err)
    res.status(400)
    throw new Error('Invalid user data')
  }
})

export const loginUser = asyncHandler(async (req, res) => {
  console.log(req.body)
  const { email, password } = req.body

  if (!email || !password) {
    throw new Error('All fields are mandatory!')
  }

  const user = await User.findOne({ email })

  if (user && (await bcrypt.compare(password, user.password))) {
    createToken(res, user._id)
    const { password, ...userWithoutPassword } = user._doc
    console.log(userWithoutPassword)

    res.status(200).json(userWithoutPassword)
  } else {
    res.status(400).send({ message: 'Email or Password is invalid' })
  }
})

export const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
    sameSite: 'None',
    secure: true,
  })

  res.status(200).json({ message: 'Logout successfully!' })
})

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body
  if (!email) {
    throw new Error('Email is required')
  }
  const user = await User.findOne({ email })
  if (!user) {
    throw new Error('User does not exist')
  }
  const resetToken = user.getResetPasswordToken()
  await user.save({ validateBeforeSave: false })
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/password/reset/${resetToken}`
  console.log(user)
  const subject = 'Password Reset Request'
  const message = `Dear ${user.firstName} ${user.lastName},\n\nWe received a request to reset your password. You can reset your password by clicking the link below:\n\n${resetURL}\n\nIf you did not request a password reset, please disregard this email.\n\nThank you,\nName`
  try {
    sendMail({ email, subject, message })
    return res.status(200).send({ message: 'Email sent successfully' })
  } catch (e) {
    user.resetPasswordExpire = undefined
    user.resetPasswordToken = undefined
    user.save({ validateBeforeSave: false })
    console.log(e)
    return res.status(400).send({ message: 'Failed to send mail' })
  }
})
export const resetPassword = asyncHandler(async (req, res) => {
  const user = await User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpire: { $gt: Date.now() },
  })

  if (!user) {
    return res
      .status(404)
      .send({ message: 'Reset password token has expired or is not valid' })
  }

  const { password } = req.body
  if (!password) {
    return res.status(400).send({ message: 'Please enter reset password' })
  }
  const { confirmPassword } = req.body
  if (!confirmPassword) {
    return res.status(400).send({ message: 'Please confirm password' })
  }
  if (password !== confirmPassword) {
    return res
      .status(400)
      .send({ message: 'Password does not match Confirm Password' })
  }

  const hashPassword = await bcrypt.hash(password, 10)
  user.password = hashPassword
  user.resetPasswordToken = undefined
  user.resetPasswordExpire = undefined // Fix typo here
  await user.save()
  res.status(200).send({ message: 'Successfully changed the password' })
})

export const createGroup = asyncHandler(async (req, res) => {
  const { name, memberId } = req.body
  if (!name) {
    return res.status(400).json({ message: 'Please enter a group name.' })
  }
  if (!memberId) {
    return res.status(400).json({ message: 'Please select a member.' })
  }
  try {
    // console.log({ user: req.user })
    const user = await User.findById(req.user._id)
    if (!user) {
      return res.status(404).json({ message: 'User not found.' })
    }
    const groupExists = user.groups.some((grp) => grp.name === name)
    if (groupExists) {
      return res.status(400).json({ message: 'Group already exists.' })
    }
    const group = {
      name,
      members: [{ userId: memberId, addedAt: Date.now() }],
      createdAt: Date.now(),
    }

    await User.findByIdAndUpdate(req.user._id, { $push: { groups: group } })

    res.status(201).json({ message: 'Group created successfully!' })
  } catch (error) {
    console.error('Error creating group:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

export const addToGroup = asyncHandler(async (req, res) => {
  const { groupId, memberId } = req.body
  if (!groupId) {
    return res.status(400).json({ message: 'Please select a group.' })
  }
  if (!memberId) {
    return res.status(400).json({ message: 'Please select a member.' })
  }
  try {
    const user = await User.findById(req.user._id)
    const group = user.groups.id(groupId)
    if (!group) {
      return res.status(404).json({ message: 'Group not found.' })
    }
    const isMemberExists = group.members.some(
      (member) => member.userId.toString() === memberId
    )
    if (isMemberExists) {
      return res
        .status(400)
        .json({ message: 'The member is already in the group.' })
    }
    group.members.push({ userId: memberId, addedAt: Date.now() })
    await user.save({ validateBeforeSave: false })
    res.status(200).json({ message: 'Member added to the group successfully!' })
  } catch (error) {
    console.error('Error creating group:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

export const getAllGroups = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: 'groups', // Populate the groups array
      populate: {
        path: 'members.userId', // Populate the members array inside each group
        select:
          'avatar firstName middleName lastName rating numReviews tagLine city state totalLand role _id address.city address.state', // Select the fields you want
      },
    })

    // Since the groups are now populated, we can return them directly
    const groups = user.groups
    res.json(groups) // Send the populated groups in the response
  } catch (error) {
    console.error('Error getting groups:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

export const removeMemberGroup = asyncHandler(async (req, res) => {
  const { memberId, groupId } = req.body
  console.log(req.body)
  if (!memberId) {
    return res.status(400).json({ message: 'Please select a member.' })
  }
  if (!groupId) {
    return res.status(400).json({ message: 'Please select a group.' })
  }
  try {
    const user = await User.findById(req.user._id)
    const group = user.groups.id(groupId)
    if (!group) {
      return res.status(404).json({ message: 'Group not found.' })
    }
    const memberIndex = group.members.findIndex(
      (member) => member.userId.toString() === memberId
    )
    if (memberIndex === -1) {
      return res.status(404).json({ message: 'Member not found in the group.' })
    }
    group.members.splice(memberIndex, 1)
    if (group.members.length === 0) {
      user.groups = user.groups.filter((g) => g._id.toString() !== groupId)
    }
    await user.save({ validateBeforeSave: false })
    res
      .status(200)
      .json({ message: 'Member removed from the group successfully!' })
  } catch (error) {
    console.error('Error remove member from group:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

export const deleteGroup = asyncHandler(async (req, res) => {
  const { groupId } = req.body
  console.log(req.body)
  if (!groupId) {
    return res.status(400).json({ message: 'Please select a group.' })
  }
  try {
    const user = await User.findById(req.user._id)
    const groupIndex = user.groups.findIndex(
      (group) => group._id.toString() === groupId
    )
    if (groupIndex === -1) {
      return res.status(404).json({ message: 'Group not found.' })
    }
    user.groups.splice(groupIndex, 1)
    await user.save({ validateBeforeSave: false })
    res.status(200).json({ message: 'Group deleted successfully!' })
  } catch (error) {
    console.error('Error deleting group:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

export const updateGroupName = asyncHandler(async (req, res) => {
  const { name, groupId } = req.body
  if (!name) {
    return res.status(400).json({ message: 'Please enter a group name.' })
  }
  if (!groupId) {
    return res.status(400).json({ message: 'Please select a group.' })
  }
  try {
    const user = await User.findById(req.user._id)
    if (!user) {
      return res.status(404).json({ message: 'User not found.' })
    }
    const group = user.groups.id(groupId)
    if (!group) {
      return res.status(404).json({ message: 'Group not found.' })
    }
    const groupExists = user.groups.some((grp) => grp.name === name)
    if (groupExists) {
      return res.status(400).json({ message: 'Group already exists.' })
    }
    group.name = name

    await user.save({ validateBeforeSave: false })

    res.status(200).json({ message: 'Group name updated successfully!' })
  } catch (error) {
    console.error('Error updating group name:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

export const createSavedOrders = asyncHandler(async (req, res) => {
  const { orderId } = req.body
  if (!orderId) {
    return res.status(400).json({ message: 'Please select a order.' })
  }
  try {
    const user = await User.findById(req.user._id)
    if (!user) {
      return res.status(404).json({ message: 'User not found.' })
    }
    const isOrderSaved = user.savedOrders.some(
      (savedOrder) => savedOrder.orderId.toString() === orderId
    )

    if (isOrderSaved) {
      return res.status(400).json({ message: 'Order is already saved.' })
    }
    const savedOrder = {
      orderId: orderId,
      savedAt: Date.now(),
    }
    await User.findByIdAndUpdate(req.user._id, {
      $push: { savedOrders: savedOrder },
    })
    res.status(201).json({ message: 'Order saved successfully!' })
  } catch (error) {
    console.error('Error creating group:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})
export const removeSavedOrder = asyncHandler(async (req, res) => {
  const { orderId } = req.body
  if (!orderId) {
    return res.status(400).json({ message: 'Please select an order.' })
  }
  try {
    const user = await User.findById(req.user._id)
    if (!user) {
      return res.status(404).json({ message: 'User not found.' })
    }

    // Fix the findIndex logic
    const orderIndex = user.savedOrders.findIndex(
      (order) => order.orderId.toString() === orderId
    )

    if (orderIndex === -1) {
      return res
        .status(404)
        .json({ message: 'Order not found in saved orders.' })
    }

    // Remove the order at the found index
    user.savedOrders.splice(orderIndex, 1)

    // Save the user document without validation
    await user.save({ validateBeforeSave: false })

    res
      .status(200)
      .json({ message: 'Order removed from saved orders successfully!' })
  } catch (error) {
    console.error('Error removing saved order:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

export const getAllSavedOrders = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: 'savedOrders',
      populate: {
        path: 'orderId',
        select:
          '_id land expectedCropsYields pricePerAcre orderFor orderStatus paymentMethod paymentStatus transportationRequired deliveryLocation createdAt updatedAt user',
        populate: {
          path: 'user',
          select:
            'firstName middleName lastName rating numReviews tagLine address totalLand role _id avatar',
        },
      },
    })
    if (!user) {
      return res.status(404).json({ message: 'User not found.' })
    }
    const savedOrders = user.savedOrders.map((savedOrder) => {
      const order = savedOrder?.orderId
      const userDetails = order?.user || {}
      return {
        _id: order?._id,
        land: order?.land,
        expectedCropsYields: order?.expectedCropsYields,
        pricePerAcre: order?.pricePerAcre,
        orderFor: order?.orderFor,
        orderStatus: order?.orderStatus,
        paymentMethod: order?.paymentMethod,
        paymentStatus: order?.paymentStatus,
        transportationRequired: order?.transportationRequired,
        deliveryLocation: order?.deliveryLocation,
        createdAt: order?.createdAt,
        updatedAt: order?.updatedAt,
        user: {
          name: `${userDetails.firstName || ''} ${
            userDetails.middleName || ''
          } ${userDetails.lastName || ''}`.trim(),
          address: userDetails.address || null,
          totalLand: userDetails.totalLand || null,
          rating: userDetails.rating,
          numReviews: userDetails.numReviews,
          tagLine: userDetails.tagLine || '',
          role: userDetails.role || '',
          id: userDetails._id || null,
          avatar: userDetails.avatar || null,
        },
      }
    })

    // Respond with saved orders
    res.status(200).json(savedOrders)
  } catch (error) {
    console.error('Error getting saved orders:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

export const isOrderSaved = asyncHandler(async (req, res) => {
  const { orderId } = req.body
  if (!orderId) {
    return res.status(400).json({ message: 'Please provide an order ID.' })
  }
  try {
    const user = await User.findById(req.user._id)
    if (!user) {
      return res.status(404).json({ message: 'User not found.' })
    }
    const isOrderSaved = user.savedOrders.some(
      (savedOrder) => savedOrder.orderId.toString() === orderId
    )
    if (isOrderSaved) {
      return res.status(200).json({ message: 'Order is saved.', saved: true })
    } else {
      return res
        .status(200)
        .json({ message: 'Order is not saved.', saved: false })
    }
  } catch (error) {
    console.error('Error checking saved order:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})
