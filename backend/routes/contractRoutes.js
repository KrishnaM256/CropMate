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

const router = express.Router()

router.route('/getAll').get(authenticate, getContracts)
router.route('/create').post(authenticate, createContract)
router
  .route('/:id')
  .get(authenticate, getContractById)
  .put(authenticate, updateContract)
  .post(authenticate, rejectContract)
  .post(authenticate, acceptContract)
  .delete(authenticate, deleteContract)

export default router
