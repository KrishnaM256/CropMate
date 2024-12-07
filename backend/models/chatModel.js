import mongoose from 'mongoose'

const chatSchema = mongoose.Schema(
  {
    sender: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    receiver: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    edited: {
      type: Boolean,
      default: false,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

const Chat = mongoose.model('Chat', chatSchema)

export default Chat
