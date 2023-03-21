import express from 'express'
const productRouter = express.Router()
import { getProducts, getProductById, deleteProduct, createProduct, updateProductById, createProductReview, getTopProducts } from '../controllers/product.js'
import { protect, adminOnly } from '../middleware/authMiddleware.js'

productRouter.route('/')
  .get(getProducts)
  .post(protect, adminOnly, createProduct)

productRouter.get('/top', getTopProducts)

productRouter.route('/:id')
  .get(getProductById)
  .delete(protect, adminOnly, deleteProduct)
  .put(protect, adminOnly, updateProductById)

productRouter.route('/:id/reviews')
  .post(protect, createProductReview)

export default productRouter