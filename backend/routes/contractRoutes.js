import express from 'express'
import { authenticate } from '../middlewares/authMiddleware.js'
import {
  createContract,
  getContracts,
  getContractById,
  updateContract,
  acceptContract,
  rejectContract,
  deleteContract,
} from '../controllers/contractController.js'
import { upload } from '../utils/multer.js'

const router = express.Router()

router
  .route('/create')
  .post(
    authenticate,
    upload.fields([{ name: 'signature', maxCount: 1 }]),
    createContract
  )
router.route('/getAll').get(authenticate, getContracts)
router
  .route('/:id')
  .get(authenticate, getContractById)
  .put(authenticate, updateContract)
  .post(authenticate, rejectContract)
  .post(authenticate, acceptContract)
  .delete(authenticate, deleteContract)

export default router
