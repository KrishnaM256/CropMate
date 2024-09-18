import mongoose from 'mongoose'

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
    aadhaarNumber: {
      type: Number,
      required: true,
    },
    panNumber: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: [true, 'Please enter you address'],
    },
    city: {
      type: String,
      required: [true, 'Please enter your city'],
    },
    state: {
      type: String,
      required: [true, 'Please enter your state'],
    },
    password: {
      type: String,
      required: [true, 'Please enter password'],
      minLength: [8, 'Password should be greater than 8 '],
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
      required: true,
      default: 0,
    },
    avatar: {
      public_id: {
        type: String,
        required: false,
      },
      url: { type: String, required: false },
    },
    tagLine: {
      type: String,
      // required: true,
      default: '',
    },
    aboutMe: {
      type: String,
      // required: true,
      default: '',
    },
    role: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const User = mongoose.model('User', userSchema)

export default User
