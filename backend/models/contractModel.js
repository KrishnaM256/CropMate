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
    pricePerAcre: {
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
      enum: ['Draft', 'Pending', 'Accepted', 'Rejected', 'Completed'],
      default: 'Draft',
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
    creatorSignature: {
      type: String,
      required: true,
    },
    acceptorSignature: {
      type: String,
    },
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Completed', 'Failed'],
      default: 'Pending',
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Contract = mongoose.model('Contract', contractSchema)

export default Contract
