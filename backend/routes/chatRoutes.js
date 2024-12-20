import express from 'express'
import {
  getChatUsers,
  getChatMessages,
  sendMessage,
  editMessage,
  deleteMessage,
  getMostRecentMessage,
} from '../controllers/chatController.js'
import { authenticate } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.get('/users', authenticate, getChatUsers)

router.get('/messages/:otherUserId', authenticate, getChatMessages)

router.get('/mostRecentMsg/:otherUserId', authenticate, getMostRecentMessage)

router.post('/send/:id', authenticate, sendMessage)

router.put('/edit/:id', authenticate, editMessage)

router.delete('/delete/:id', authenticate, deleteMessage)

export default router
