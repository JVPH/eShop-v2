import express from 'express'
const userRouter = express.Router()
import { authUser, registerUser, getUserProfile } from '../controllers/user.js'
import { protect } from '../middleware/authMiddleware.js'

userRouter.route('/').post(registerUser)
userRouter.post('/login', authUser)
userRouter.route('/profile').get(protect, getUserProfile)

export default userRouter