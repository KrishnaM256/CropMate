import express from 'express'
import {
  createNotification,
  deleteNotification,
  getNotifications,
} from '../controllers/notificationController.js'
import { authenticate, authorized } from '../middlewares/authMiddleware.js'
const router = express.Router()

router
  .route('/')
  .post(authenticate, authorized, createNotification)
  .get(authenticate, getNotifications)
  .delete(authenticate, deleteNotification)

// router.route('/markAsRead').post(authenticate, markAsRead)

export default router
