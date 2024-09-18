import express from 'express'
import {
  createOrder,
  getAllOrders,
  getAllBuyerOrders,
  createBuyerOrder,
} from '../controllers/orderController.js'
import { authenticate } from '../middlewares/authMiddleware.js'
const router = express.Router()

router.route('/get').get(getAllOrders)
router.route('/create').post(authenticate, createOrder)
router.route('/getBuyerOrder').get(getAllBuyerOrders)
router.route('/createBuyerOrder').post(authenticate, createBuyerOrder)

export default router
