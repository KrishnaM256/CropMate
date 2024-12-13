import mongoose from 'mongoose'

const contractSchema = mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.ObjectId,
      ref: 'Order',
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    acceptedBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    pricePerTon: {
      type: Number,
      required: true,
    },
    deliveryDate: {
      type: Date,
      required: true,
    },
    transportationRequired: {
      type: Boolean,
      default: true,
      required: true,
    },
    paymentTerms: {
      type: String,
      enum: ['advance', 'partial', 'on-delivery'],
      required: true,
    },
    cropDetails: [
      {
        expectedCrop: { type: String, required: true },
        expectedYield: { type: Number, required: true },
      },
    ],
    deliveryLocation: {
      street: { type: String },
      village: { type: String },
      district: { type: String },
      state: { type: String },
      pincode: { type: Number },
    },
    status: {
      type: String,
      enum: ['draft', 'pending', 'accepted', 'rejected', 'completed'],
      default: 'draft',
      required: true,
    },
    customTerms: {
      farmerCustomTerms: [{ type: String, required: true }],
      buyerCustomTerms: [{ type: String, required: true }],
    },
    timestamps: {
      acceptedAt: { type: Date },
      completedAt: { type: Date },
      rejectedAt: { type: Date },
    },
    signature: {
      type: String,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending',
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Contract = mongoose.model('Contract', contractSchema)

export default Contract
