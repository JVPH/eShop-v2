import express from 'express'
const orderRouter = express.Router()
import { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders, getAllOrders, updateOrderToDelivered } from '../controllers/order.js'
import { protect, adminOnly } from '../middleware/authMiddleware.js'

orderRouter.route('/').post(protect, addOrderItems).get(protect, adminOnly, getAllOrders)
orderRouter.route('/my-orders').get(protect, getMyOrders)
orderRouter.route('/:id').get(protect, getOrderById)
orderRouter.route('/:id/pay').put(protect, updateOrderToPaid)
orderRouter.route('/:id/deliver').put(protect, adminOnly, updateOrderToDelivered)

export default orderRouter