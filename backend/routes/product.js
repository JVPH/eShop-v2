import express from 'express'
const productRouter = express.Router()
import { getProducts, getProductById, deleteProduct } from '../controllers/product.js'
import { protect, adminOnly } from '../middleware/authMiddleware.js'

productRouter.route('/').get(getProducts)

productRouter.route('/:id').get(getProductById).delete(protect, adminOnly, deleteProduct)

export default productRouter