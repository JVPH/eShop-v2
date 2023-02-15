import express from 'express'
const productsRouter = express.Router()
import Product from '../models/product.js' 

//@route GET /api/products
//@access Public
productsRouter.get('/', async (req, res) => {
  const products = await Product.find({})
  res.json(products)
})

//@route GET /api/products/:id
//@access Public
productsRouter.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    res.json(product)
  } else {
    res.status(404).end(`Product not found`)
  }
})

export default productsRouter