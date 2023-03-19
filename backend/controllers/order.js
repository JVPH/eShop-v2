import Order from '../models/order.js'

// @desc Create new order
// @route POST /api/orders
// @access Private

const addOrderItems = async(req, res) => {
  const { orderItems,
    shippingAddress,
    paymentMethod, 
    itemsPrice,
    taxPrice, 
    shippingPrice, 
    totalPrice 
  } = req.body

  const user = req.user

  if(orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')    
  }else {
    const order = new Order({
      orderItems,
      user: user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice      
    })

    const createdOrder = await  order.save()

    res.status(201).json(createdOrder)
  }
}

// @desc Get order by id
// @route GET /api/orders/:id
// @access Private

const getOrderById = async(req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email')

  if (order) {
    if ((order && order.user._id.toString() === req.user._id.toString()) || req.user.isAdmin){
      res.json(order)
    }    
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
}

// @desc Update order to paid
// @route PUT /api/orders/:id/pay
// @access Private

const updateOrderToPaid = async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address
    }

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }


}

// @desc Update order to delivered
// @route GET /api/orders/:id/deliver
// @access Private || Private/Admin

const updateOrderToDelivered = async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isDelivered = true
    order.deliveredAt = Date.now()    

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }


}

// @desc Get user orders
// @route GET /api/orders/my-orders
// @access Private

const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
  res.json(orders)
}

// @desc Get order by id
// @route GET /api/orders/
// @access Private/Admin

const getAllOrders = async (req, res) => {
  const orders = await Order.find({}).populate('user', 'name email')
  res.json(orders)
}

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getAllOrders,
  updateOrderToDelivered
}