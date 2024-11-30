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
      aadharCard: user.verification.aadharCard,
      landOwnershipProof: user.verification.landOwnershipProof,
      bankPassbook: user.verification.bankPassbook,
      businessLicense: user.verification.businessLicense,
      bankStatement: user.verification.bankStatement,
      panNumber: user.panNumber,
      address: user.address.Street_Building,
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
      address: user.address.Street_Building,
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
  console.log(req.body)

  const user = await User.findById(req.user._id)
  // console.log(user)

  if (user) {
    user.firstName = req.body.firstName
    user.middleName = req.body.middleName
    user.lastName = req.body.lastName
    user.email = req.body.email
    user.phone = req.body.phone
    user.address = req.body.address
    user.city = req.body.city
    user.state = req.body.state
    user.aadhaarNumber = req.body.aadhaarNumber
    user.panNumber = req.body.panNumber
    user.totalLand = req.body.totalLand
    user.tagLine = req.body.tagLine
    user.aboutMe = req.body.aboutMe

    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.status(200).json({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      aadhaarNumber: user.aadhaarNumber,
      panNumber: user.panNumber,
      address: user.address,
      city: user.city,
      state: user.state,
      tagLine: user.tagLine,
      aboutMe: user.aboutMe,
      totalLand: user.totalLand,
      reviews: user.reviews,
      rating: user.rating,
      numReviews: user.numReviews,
      workImages: user.workImages,
      avatar: user.avatar,
      role: updateUserProfile.role,
    })
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
    user.lastName = req.body.lastName
    user.email = req.body.email
    user.phone = req.body.phone
    user.address = req.body.address
    user.city = req.body.city
    user.state = req.body.state
    user.role = req.body.role
    const updatedUser = await user.save()
    res.status(200).json({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      aadhaarNumber: user.aadhaarNumber,
      panNumber: user.panNumber,
      address: user.address,
      city: user.city,
      state: user.state,
      role: updateUserProfile.role,
    })
  } else {
    res.status(404)
    throw new Error('User not found!')
  }
})

export const createUser = asyncHandler(async (req, res) => {
  console.log(req.files)
  const avatar = req.files.avatar ? req.files.avatar[0].filename : ''
  const aadharCard = req.files.aadharCard
    ? req.files.aadharCard[0].filename
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
    aadharCard: aadharCard,
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
    Street_Building,
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
    !Street_Building ||
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
    Street_Building: Street_Building,
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
