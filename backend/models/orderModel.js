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
    pricePerAcre: {
      type: Number,
      required: true,
    },
    // Both specific
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'User id is required'],
    },
    acceptedBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
    // Both specific
    orderFor: {
      type: String,
      enum: ['farmer', 'buyer'],
      required: true,
    },

    // Both
    paymentMethod: {
      type: String,
      required: true,
    },
    // Both specific
    transportationRequired: { type: Boolean, default: true, required: true },
    finalPrice: { type: Number },
    // Buyer specific
    deliveryLocation: {
      street: { type: String },
      village: { type: String },
      district: { type: String },
      state: { type: String },
      pincode: { type: Number },
    },
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Completed', 'Failed'],
      default: 'Pending',
    },
    // Both specific
    orderStatus: {
      type: String,
      enum: ['Open', 'Accepted', 'Completed', 'Cancelled'],
      default: 'Open',
    },
    deliveryStatus: {
      type: String,
      enum: ['Pending', 'In Progress', 'Completed'],
      default: 'Pending',
    },
    milestones: [
      {
        name: { type: String, required: true },
        status: {
          type: String,
          enum: ['Not Started', 'In Progress', 'Completed'],
          default: 'Not Started',
        },
      },
    ],
  },
  {
    timestamps: true,
  }
)

const Order = mongoose.model('Order', orderSchema)

export default Order
