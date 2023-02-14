const express = require('express')
require('dotenv').config()
const products = require('./data/products')

const app = express()

app.get('/', (req, res) => {
  res.send('Api is running...')
})

app.get('/api/products', (req, res) => {
  res.json(products)
})

app.get('/api/products/:id', (req, res) => {
  const product = products.find(product => product._id === req.params.id)
  res.json(product)
})

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))