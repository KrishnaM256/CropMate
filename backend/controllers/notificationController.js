import Notification from '../models/notificationModel.js'
import asyncHandler from '../middlewares/asyncHandler.js'

export const createNotification = asyncHandler(async (req, res) => {
  const { user, title, message } = req.body

  if (!user || !title || !message) {
    return res.status(400).json({ message: 'All fields are required.' })
  }

  const notification = new Notification({
    user,
    title,
    message,
  })

  await notification.save()
  res
    .status(201)
    .json({ message: 'Notification created successfully.', notification })
})

export const getNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({ user: req.user._id }).sort({
    createdAt: -1,
  })

  res.status(200).json(notifications)
})

// export const markAsRead = asyncHandler(async (req, res) => {
//   const { id } = req.params
//   const notification = await Notification.findById(id)
//   if (!notification) {
//     return res.status(404).json({ message: 'Notification not found.' })
//   }
//   notification.isRead = true
//   await notification.save()
//   res
//     .status(200)
//     .json({ message: 'Notification marked as read.', notification })
// })

export const deleteNotification = asyncHandler(async (req, res) => {
  const { id } = req.params

  const notification = await Notification.findById(id)

  if (!notification) {
    return res.status(404).json({ message: 'Notification not found.' })
  }

  await notification.deleteOne()
  res.status(200).json({ message: 'Notification deleted successfully.' })
})
