import express from 'express'
import multer from 'multer'
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

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log({ req: req })

    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + '_' + Date.now() + path.extname(file.originalname)
    )
  },
})

const upload = multer({
  storage: storage,
})

router
  .route('/profile')
  .get(authenticate, getUserProfile)
  .put(authenticate, upload.single('avatar'), updateUserProfile)

router.route('/userProfile/:id').get(getUserById)

router.route('/login').post(loginUser)
router.route('/register').post(createUser)
router.route('/logout').post(logoutUser)
router.route('/usersList').get(authenticate, authorized, getAllUsers)

router
  .route('/admin/:id')
  .delete(authenticate, authorized, deleteUser)
  .get(authenticate, authorized, getUserById)
  .post(authenticate, authorized, updateUserById)

export default router
