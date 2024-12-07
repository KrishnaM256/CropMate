import Chat from '../models/chatModel.js'
import asyncHandler from '../middlewares/asyncHandler.js'

export const sendMessage = asyncHandler(async (req, res) => {
  const { message } = req.body
  if (!message) {
    throw new Error('Please enter message.')
  }
  const chat = new Chat({
    ...req.body,
    sender: req.user._id,
    receiver: req.params.id,
  })
  try {
    await chat.save()
    res.status(201).json({ message: 'Message sent successfully!' })
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
})
export const receiveMessage = asyncHandler(async (req, res) => {
  const { id } = req.params
  const userId = req.user._id
  try {
    const messages = await Chat.find({
      $or: [
        { sender: userId, receiver: id },
        { sender: id, receiver: userId },
      ],
    }).sort({ createdAt: 1 })
    if (messages.length === 0) {
      return res.status(200).json({ message: 'No messages found.' })
    }

    res.status(200).json(messages)
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
})

export const editMessage = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { message } = req.body
  if (!message) {
    throw new Error('Please provide a new message.')
  }
  try {
    const chatMessage = await Chat.findById(id)
    if (!chatMessage) {
      return res.status(404).json({ message: 'Message not found' })
    }
    if (chatMessage.sender.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: 'You are not authorized to edit this message' })
    }
    chatMessage.message = message
    chatMessage.edited = true
    await chatMessage.save()

    res.status(200).json({ message: 'Message updated successfully!' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

export const deleteMessage = asyncHandler(async (req, res) => {
  const { id } = req.params
  try {
    const chatMessage = await Chat.findById(id)
    if (!chatMessage) {
      return res.status(404).json({ message: 'Message not found' })
    }
    if (chatMessage.sender.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: 'You are not authorized to edit this message' })
    }
    chatMessage.deleted = true
    await chatMessage.save()
    res.status(200).json({ message: 'Message deleted successfully!' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})
