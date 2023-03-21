import Product from '../models/product.js'

//@route GET /api/products
//@access Public
const getProducts = async (req, res) => {
  const pageSize = 2
  const page = Number(req.query.pageNumber) || 1
  const keyword = req.query.keyword ? {
    name: {
      $regex: req.query.keyword,
      $options: 'i'
    }
  } : {}

  const count = await Product.countDocuments({...keyword})
  const products = await Product.find({ ...keyword }).limit(pageSize).skip(pageSize * (page - 1))
  res.json({ products, page, pages: Math.ceil(count / pageSize) })
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
  // const { name, image, brand, category, description, numReviews, price, rating, countInStock } = req.body  

  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
}

// @desc Create product review
// @route POST /api/products/:id/reviews
// @access Private
const createProductReview = async (req, res) => {  
  const { rating, comment } = req.body  
  const product = await Product.findById(req.params.id)

  if(product) {
    const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())

    if(alreadyReviewed){
      res.status(400)
      throw new Error('Product already reviewed')
    }
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id
    }

    product.reviews.push(review)
    product.numReviews = product.reviews.length
    product.rating = product.reviews.reduce((acc, currVal) => currVal.rating + acc, 0) / product.reviews.length

    await product.save()
    res.status(201).json({ message: 'Review added'})
  }else {
    throw new Error('Product not found')
  }

    
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
  updateProductById,
  createProductReview
}