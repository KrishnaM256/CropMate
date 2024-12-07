import express from 'express'
import {
  deleteMessage,
  editMessage,
  receiveMessage,
  sendMessage,
} from '../controllers/chatController.js'
import { authenticate } from '../middlewares/authMiddleware.js'
const router = express.Router()

router
  .route('/:id')
  .post(authenticate, sendMessage)
  .get(authenticate, receiveMessage)
  .delete(authenticate, deleteMessage)
  .put(authenticate, editMessage)

export default router
