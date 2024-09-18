import mongoose from 'mongoose'

const buyerOrderSchema = mongoose.Schema(
  {
    requiredLand: {
      type: Number,
      required: true,
    },
    preferredCropsYields: [
      {
        preferredCrop: {
          type: String,
          required: true,
        },
        preferredYield: {
          type: Number,
          required: true,
        },
      },
    ],
    pricePerAcre: {
      type: Number,
      required: true,
    },
    expectedQuality: {
      type: String,
      required: true,
    },
    logistics: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentSchedule: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'User id is required'],
    },
  },
  {
    timestamps: true,
  }
)

const BuyerOrder = mongoose.model('BuyerOrder', buyerOrderSchema)

export default BuyerOrder
