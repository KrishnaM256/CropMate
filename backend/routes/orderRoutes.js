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
router.route('/update/:id').post(authenticate, updateOrder)
router.route('/delete/:id').delete(authenticate, deleteOrder)

export default router
