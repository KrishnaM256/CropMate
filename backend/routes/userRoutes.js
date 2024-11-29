import express from 'express'
import { upload } from '../utils/multer.js'
import path from 'path'
const router = express.Router()

import {
  getAllUsers,
  getUserProfile,
  updateUserProfile,
  getUserById,
  updateUserById,
  createUser,
  loginUser,
  logoutUser,
  deleteUser,
} from '../controllers/userController.js'

import { authenticate, authorized } from '../middlewares/authMiddleware.js'

router.route('/register').post(
  upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'aadharCard', maxCount: 1 },
    { name: 'landOwnershipProof', maxCount: 1 },
    { name: 'bankPassbook', maxCount: 1 },
    { name: 'businessLicense', maxCount: 1 },
    { name: 'bankStatement', maxCount: 1 },
  ]),
  createUser
)
router.route('/login').post(loginUser)
router.route('/logout').post(logoutUser)
router
  .route('/profile')
  .get(authenticate, getUserProfile)
  .put(authenticate, upload.single('avatar'), updateUserProfile)
router.route('/usersList').get(authenticate, authorized, getAllUsers)
router.route('/userProfile/:id').get(getUserById)
router
  .route('/admin/:id')
  .delete(authenticate, authorized, deleteUser)
  .get(authenticate, authorized, getUserById)
  .post(authenticate, authorized, updateUserById)

export default router
