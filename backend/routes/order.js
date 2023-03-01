import express from 'express'
const orderRouter = express.Router()
import { addOrderItems } from '../controllers/order.js'
import { protect } from '../middleware/authMiddleware.js'

orderRouter.route('/').post(protect, addOrderItems)

export default orderRouter