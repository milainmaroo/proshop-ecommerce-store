import express from 'express'
const router = express.Router()
import {
  getProducts,
  getProductById,
  createProduct,
} from '../controllers/productController.js'
import checkObjectId from '../middleware/checkObjectId.js'
import { protect, admin } from '../middleware/authMiddleware.js'

// Products Route
router.route('/').get(getProducts).post(protect, admin, createProduct)

// Single Product Route
router.route('/:id').get(checkObjectId, getProductById)

export default router
