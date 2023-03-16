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
}

// @desc Create product
// @route POST /api/products/
// @access Private/Admin
const createProduct = async (req, res) => {
  const { name, image, brand, category, description, numReviews, price, rating, countInStock } = req.body  

  const product = new Product({
    user: req.user._id, name, image, brand, category, description, numReviews, price, rating, countInStock
  })

  const createdProduct = await product.save()  

  res.status(201).json(createdProduct)
}

// @desc Update product
// @route PUT /api/products/:id
// @access Private/Admin
const updateProductById = async (req, res) => {
  const { name, image, brand, category, description, numReviews, price, countInStock } = req.body

  const product = await Product.findById(req.params.id)

  if(product) {
    product.name = name || product.name
    product.image = image || product.image
    product.brand = brand || product.brand
    product.category = category || product.category
    product.description = description || product.description
    product.numReviews = numReviews || product.numReviews
    product.price = price || product.price
    product.countInStock = countInStock || product.countInStock

    const updatedProduct = await product.save()
    res.json(updatedProduct)

  } else {
    res.status(404)
    throw new Error('Product not found')
  }
}
export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProductById
}