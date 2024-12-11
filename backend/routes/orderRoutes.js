import express from 'express'
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  updateOrder,
} from '../controllers/orderController.js'
import { authenticate } from '../middlewares/authMiddleware.js'
const router = express.Router()

router.route('/create').post(authenticate, createOrder)
router.route('/get').get(getAllOrders)
router
  .route('/:id')
  .put(authenticate, updateOrder)
  .delete(authenticate, deleteOrder)

export default router
