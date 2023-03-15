import express from 'express'
const productRouter = express.Router()
import { getProducts, getProductById, deleteProduct, createProduct, updateProductById } from '../controllers/product.js'
import { protect, adminOnly } from '../middleware/authMiddleware.js'

productRouter.route('/')
  .get(getProducts)
  .post(protect, adminOnly, createProduct)

productRouter.route('/:id')
  .get(getProductById)
  .delete(protect, adminOnly, deleteProduct)
  .put(protect, adminOnly, updateProductById)

export default productRouter