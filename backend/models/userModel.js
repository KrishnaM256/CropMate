import mongoose from 'mongoose'
import { v4 as uuid4 } from 'uuid'
const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      req: 'User',
    },
  },
  { timestamps: true }
)

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Please enter first name'],
      minLength: [3, 'First name must be more than 3 character long'],
    },
    middleName: {
      type: String,
      required: [true, 'Please enter middle name'],
      minLength: [3, 'Middle name must be more than 3 character long'],
    },
    lastName: {
      type: String,
      required: [true, 'Please enter last name'],
      minLength: [3, 'Last name must be more than 3 character long'],
    },
    email: {
      type: String,
      required: [true, 'Please enter email'],
    },
    phone: {
      type: Number,
      required: [true, 'Please enter phone number'],
    },
    address: {
      Street_Building: { type: String, required: true },
      village: { type: String },
      city: {
        type: String,
        required: [true, 'Please enter your city'],
      },
      state: {
        type: String,
        required: [true, 'Please enter your state'],
      },
      pincode: { type: Number, required: true },
    },
    password: {
      type: String,
      required: [true, 'Please enter password'],
      minLength: [8, 'Password should be greater than 8 '],
    },
    verification: {
      aadharCard: { type: String, required: true }, // Required for both roles
      landOwnershipProof: { type: String }, // Farmer-specific
      bankPassbook: { type: String }, // Farmer-specific
      businessLicense: { type: String }, // Buyer-specific
      bankStatement: { type: String }, // Buyer-specific
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    workImages: [
      {
        public_id: { type: String, required: true },
        url: { type: String, required: true },
      },
    ],
    totalLand: {
      type: Number,
      default: 0,
    },
    avatar: {
      type: String,
      required: false,
    },
    tagLine: {
      type: String,
      default: '',
    },
    aboutMe: {
      type: String,
      default: '',
    },
    role: {
      type: String,
      required: true,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
)

userSchema.methods.getResetPasswordToken = function () {
  const resetToken = uuid4() // Generate a unique token
  this.resetPasswordToken = resetToken // Store the token directly
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000 // Set expiration
  return resetToken
}

const User = mongoose.model('User', userSchema)

export default User
