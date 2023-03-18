import path from 'path'
import dotenv from 'dotenv'
import 'express-async-errors'
import express from 'express'
import { unknownEndpoint, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'

import productRouter from './routes/product.js'
import userRouter from './routes/user.js'
import orderRouter from './routes/order.js'
import uploadRouter from './routes/upload.js'

dotenv.config()

connectDB()

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Api is running...')
})

app.use('/api/products', productRouter)

app.use('/api/users', userRouter)

app.use('/api/orders', orderRouter)

app.use('/api/upload', uploadRouter)

const __dirname = path.resolve()

app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use(unknownEndpoint)

app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))