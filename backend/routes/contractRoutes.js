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
  getContractByOrderId,
} from '../controllers/contractController.js'
import { upload } from '../utils/multer.js'

const router = express.Router()

router
  .route('/create')
  .post(
    authenticate,
    upload.fields([{ name: 'creatorSignature', maxCount: 1 }]),
    createContract
  )
router
  .route('/update')
  .put(
    authenticate,
    upload.fields([{ name: 'creatorSignature', maxCount: 1 }]),
    updateContract
  )
router
  .route('/accept/:id')
  .post(
    authenticate,
    upload.fields([{ name: 'acceptorSignature', maxCount: 1 }]),
    acceptContract
  )
router.route('/reject/:id').post(authenticate, rejectContract)
router.route('/getAll').get(authenticate, getContracts)
router.route('/getContractByOrderId').get(authenticate, getContractByOrderId)

router
  .route('/:id')
  .get(authenticate, getContractById)

  .delete(authenticate, deleteContract)

export default router
