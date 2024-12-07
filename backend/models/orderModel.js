import mongoose from 'mongoose'

const orderSchema = mongoose.Schema(
  {
    // Both specific (Required for buyer and available for farmer )
    land: {
      type: Number,
      required: true,
    },
    // Both specific
    expectedCropsYields: [
      {
        expectedCrop: { type: String, required: true },
        expectedYield: { type: Number, required: true },
      },
    ],
    // Both specific
    pricePerTon: {
      type: Number,
      required: true,
    },
    // Both specific
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'User id is required'],
    },
    // Both specific
    orderType: {
      type: String,
      enum: ['farmer', 'buyer'],
      required: true,
    },
    // Both specific
    orderStatus: {
      type: String,
      enum: ['open', 'accepted', 'completed', 'cancelled'],
      default: 'open',
    },
    // Both
    paymentMethod: {
      type: String,
      required: true,
    },
    // Both specific
    transportationRequired: { type: Boolean, default: true, required: true },
    acceptedBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending',
    },
    finalPrice: { type: Number },
    // Buyer specific
    deliveryLocation: {
      street: { type: String },
      village: { type: String },
      district: { type: String },
      state: { type: String },
      pincode: { type: Number },
    },
  },
  {
    timestamps: true,
  }
)

const Order = mongoose.model('Order', orderSchema)

export default Order
