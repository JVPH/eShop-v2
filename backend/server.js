import path from 'path'
import dotenv from 'dotenv'
import morgan from 'morgan'
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

const __dirname = path.resolve()

app.use(express.json())

morgan.token('data', (req, _res) => {
  if (Object.keys(req.body).length === 0) {
    return '-'
  }
  return JSON.stringify(req.body)
})

if (process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, '/backend/build')))
  //route to match any GET request to any URL path
  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'backend', 'build', 'index.html')))
}

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

// app.get('/', (req, res) => {
//   res.send('Api is running...')
// })

app.use('/api/products', productRouter)

app.use('/api/users', userRouter)

app.use('/api/orders', orderRouter)

app.use('/api/upload', uploadRouter)





app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use(unknownEndpoint)

app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))