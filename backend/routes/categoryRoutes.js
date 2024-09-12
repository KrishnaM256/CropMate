import express from 'express'
const router = express.Router()
import {
  createCategory,
  getCategory,
  removeCategory,
  updateCategory,
  getCategoryById,
} from '../controllers/categoryController.js'
import { authenticate, authorized } from '../middlewares/authMiddleware.js'

router.route('/').post(authenticate, authorized, createCategory)
router.route('/categories').get(getCategory)
router.route('/categories/:id').get(getCategoryById)
router
  .route('/:categoryId')
  .put(authenticate, authorized, updateCategory)
  .delete(authenticate, authorized, removeCategory)

export default router
