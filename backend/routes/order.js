import express from 'express'
const orderRouter = express.Router()
import { addOrderItems, getOrderById } from '../controllers/order.js'
import { protect } from '../middleware/authMiddleware.js'

orderRouter.route('/').post(protect, addOrderItems)
orderRouter.route('/:id').get(protect, getOrderById)

export default orderRouter