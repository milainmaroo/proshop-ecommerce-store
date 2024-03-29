import express from 'express'
const router = express.Router()
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
} from '../controllers/productController.js'
import checkObjectId from '../middleware/checkObjectId.js'
import { protect, admin } from '../middleware/authMiddleware.js'

// Products Route
router.route('/').get(getProducts).post(protect, admin, createProduct)

router.get('/top', getTopProducts)

// Single Product Route
router
  .route('/:id')
  .get(checkObjectId, getProductById)
  .put(protect, admin, checkObjectId, updateProduct)
  .delete(protect, admin, checkObjectId, deleteProduct)

// Product Review Route
router.route('/:id/reviews').post(protect, checkObjectId, createProductReview)

export default router
