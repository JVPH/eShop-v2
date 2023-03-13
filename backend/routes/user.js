import express from 'express'
const userRouter = express.Router()
import { authUser, registerUser, getUserProfile, updateUserProfile, getAllUsers, deleteUser } from '../controllers/user.js'
import { protect, adminOnly } from '../middleware/authMiddleware.js'

userRouter.route('/').post(registerUser).get(protect, adminOnly, getAllUsers)
userRouter.post('/login', authUser)
userRouter.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)
userRouter.route('/:id').delete(protect, adminOnly, deleteUser)

export default userRouter