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
  forgotPassword,
  resetPassword,
  createSavedOrders,
  createGroup,
  addToGroup,
  getAllGroups,
  removeMemberGroup,
  deleteGroup,
  updateGroupName,
  removeSavedOrder,
  getAllSavedOrders,
  countData,
} from '../controllers/userController.js'

import { authenticate, authorized } from '../middlewares/authMiddleware.js'

router.route('/register').post(
  upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'aadhaarCard', maxCount: 1 },
    { name: 'landOwnershipProof', maxCount: 1 },
    { name: 'bankPassbook', maxCount: 1 },
    { name: 'businessLicense', maxCount: 1 },
    { name: 'bankStatement', maxCount: 1 },
  ]),
  createUser
)
router.route('/login').post(loginUser)
router.route('/logout').post(logoutUser)
router.route('/forgotPassword').post(forgotPassword)
router.route('/resetPassword/:token').post(resetPassword)
router
  .route('/profile')
  .get(authenticate, getUserProfile)
  .put(
    authenticate,
    upload.fields([
      { name: 'avatar', maxCount: 1 },
      { name: 'workImages', maxCount: 10 },
    ]),
    updateUserProfile
  )
router.route('/usersList').get(authenticate, authorized, getAllUsers)
router.route('/userProfile/:id').get(getUserById)

router.route('/createGroup').post(authenticate, createGroup)
router.route('/addToGroup').post(authenticate, addToGroup)
router.route('/getAllGrps').get(authenticate, getAllGroups)
router.route('/removeMember').delete(authenticate, removeMemberGroup)
router.route('/deleteGroup').delete(authenticate, deleteGroup)
router.route('/updateGroupName').put(authenticate, updateGroupName)
router.route('/createSavedOrders').post(authenticate, createSavedOrders)
router.route('/removeSavedOrder').delete(authenticate, removeSavedOrder)
router.route('/getAllSavedOrders').get(authenticate, getAllSavedOrders)
router.route('/getCounts').get(countData)

router
  .route('/admin/:id')
  .delete(authenticate, authorized, deleteUser)
  .get(authenticate, authorized, getUserById)
  .post(authenticate, authorized, updateUserById)

export default router
