import dotenv from 'dotenv'
import 'express-async-errors'
import express from 'express'
import { unknownEndpoint, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'

import productRouter from './routes/product.js'
import userRouter from './routes/user.js'

dotenv.config()

connectDB()

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Api is running...')
})

app.use('/api/products', productRouter)

app.use('/api/users', userRouter)

app.use(unknownEndpoint)

app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))