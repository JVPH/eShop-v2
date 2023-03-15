import Product from '../models/product.js'

//@route GET /api/products
//@access Public
const getProducts = async (req, res) => {
  const products = await Product.find({})
  res.json(products)
}

//@route GET /api/products/:id
//@access Public
const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
}

// @desc Delete product
// @route DELETE /api/products/:id
// @access Private/Admin
const deleteProduct = async (req, res) => {

  const product = await Product.findById(req.params.id)
  if (product) {
    await Product.findByIdAndDelete(req.params.id)
    res.json({ message: 'Product removed' })
  } else {
    throw new Error('Product not found')
  }


  res.json(response)
}

export {
  getProducts,
  getProductById,
  deleteProduct
}