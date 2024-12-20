import Chat from '../models/chatModel.js'
import asyncHandler from '../middlewares/asyncHandler.js'
import mongoose from 'mongoose'

// 1. Get all chat users involved in conversations
export const getChatUsers = asyncHandler(async (req, res) => {
  const userId = req.user._id

  const chats = await Chat.find({
    $or: [{ sender: userId }, { receiver: userId }],
  })
    .sort({ createdAt: -1 })
    .populate(
      'sender',
      'firstName middleName lastName email phone avatar address'
    )
    .populate(
      'receiver',
      'firstName middleName lastName email phone avatar address'
    )
  console.log(chats)
  const uniqueUsers = new Map()

  chats.forEach((chat) => {
    // Add sender if it's not the current user
    if (chat.sender._id.toString() !== userId) {
      uniqueUsers.set(chat.sender._id.toString(), chat.sender)
    }

    // Add receiver if it's not the current user
    if (chat.receiver._id.toString() !== userId) {
      uniqueUsers.set(chat.receiver._id.toString(), chat.receiver)
    }
  })

  const chatUsers = Array.from(uniqueUsers.values())

  res.status(200).json(chatUsers)
})

// 2. Get all messages between two users
export const getChatMessages = asyncHandler(async (req, res) => {
  const { otherUserId } = req.params
  const userId = req.user._id
  console.log(userId, otherUserId)
  const messages = await Chat.find({
    $or: [
      { sender: userId, receiver: otherUserId },
      { sender: otherUserId, receiver: userId },
    ],
  }).sort({ createdAt: 1 })

  if (messages.length === 0) {
    return res.status(200).json({ message: 'No messages found.' })
  }
  res.status(200).json(messages)
})

// 3. Send a new message
export const sendMessage = asyncHandler(async (req, res) => {
  console.log(req.body)
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

// 4. Edit a message
export const editMessage = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { message } = req.body

  if (!message) {
    throw new Error('Please provide a new message.')
  }

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
})

// 5. Delete a message
export const deleteMessage = asyncHandler(async (req, res) => {
  const { id } = req.params

  const chatMessage = await Chat.findById(id)

  if (!chatMessage) {
    return res.status(404).json({ message: 'Message not found' })
  }

  if (chatMessage.sender.toString() !== req.user._id.toString()) {
    return res
      .status(403)
      .json({ message: 'You are not authorized to delete this message' })
  }

  chatMessage.deleted = true
  await chatMessage.save()

  res.status(200).json({ message: 'Message deleted successfully!' })
})

// 6. Get the most recent message with a specific user
export const getMostRecentMessage = asyncHandler(async (req, res) => {
  const { otherUserId } = req.params // User ID passed as a parameter
  const userId = req.user._id // Authenticated user's ID

  // Query to find the most recent message
  const mostRecentMessage = await Chat.findOne({
    $or: [
      { sender: userId, receiver: otherUserId },
      { sender: otherUserId, receiver: userId },
    ],
  })
    .sort({ createdAt: -1 })
    .populate('sender', 'firstName lastName email avatar')
    .populate('receiver', 'firstName lastName email avatar') // Populate receiver details

  // Check if a message exists
  if (!mostRecentMessage) {
    return res
      .status(404)
      .json({ message: 'No messages found with this user.' })
  }

  // Respond with the most recent message
  res.status(200).json({
    message: mostRecentMessage.message,
    time: mostRecentMessage.createdAt,
    deleted: mostRecentMessage.deleted,
  })
})
