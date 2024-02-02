import express from 'express'
const router = express.Router()
import {
  getProducts,
  getProductById,
} from '../controllers/productController.js'
import checkObjectId from '../middleware/checkObjectId.js'

// Products Route
router.route('/').get(getProducts)

// Single Product Route
router.route('/:id').get(checkObjectId, getProductById)

export default router
