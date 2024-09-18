import mongoose from 'mongoose'

const orderSchema = mongoose.Schema(
  {
    cropReadyLand: {
      type: Number,
      required: true,
    },
    expectedCropsYields: [
      {
        expectedCrop: {
          type: String,
          required: true,
        },
        expectedYield: {
          type: Number,
          required: true,
        },
      },
    ],
    pricePerAcre: {
      type: Number,
      required: true,
    },
    currentCrops: {
      type: String,
      required: true,
    },
    logistics: {
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

const Order = mongoose.model('Order', orderSchema)

export default Order
