import express from 'express'
const orderRouter = express.Router()
import { addOrderItems, getOrderById, updateOrderToPaid } from '../controllers/order.js'
import { protect } from '../middleware/authMiddleware.js'

orderRouter.route('/').post(protect, addOrderItems)
orderRouter.route('/:id').get(protect, getOrderById)
orderRouter.route('/:id/pay').put(protect, updateOrderToPaid)

export default orderRouter