import { useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import CheckoutSteps from '../components/CheckoutSteps'
import FormContainer from '../components/FormContainer'
import { useSelector } from 'react-redux'
import { useAddOrderMutation } from '../features/api/apiSlice'
import Message from '../components/Message'

const PlaceOrderScreen = () => {
  const { shippingAddress } = useSelector(state => state.shipping)
  const { paymentMethod } = useSelector(state => state.payment)
  const { cartItems } = useSelector(state => state.cart)

  const [addOrder, { data: order, isError, error, isSuccess }] = useAddOrderMutation()
  const navigate = useNavigate()

  // Calculate prices
  const prices = {}

  prices.items = cartItems.reduce(
    (accumulator, currentValue) => {
      const { price, qty } = currentValue
      accumulator += (price * qty)
      return accumulator
    },
    0
  )

  prices.shipping = prices.items > 100 ? 0 : 10

  prices.tax = Number((0.15 * prices.items).toFixed(2))

  prices.total = prices.items + prices.tax + prices.shipping

  useEffect(() => {
    if(isSuccess) {
      navigate(`/order/${order._id}`)
    }
  }, [navigate, isSuccess])

  const placeOrderHandler = async () => {
    try {
      await addOrder({
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice: prices.items,
        shippingPrice: prices.shipping,
        taxPrice: prices.tax,
        totalPrice: prices.total
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <FormContainer>
        <CheckoutSteps step1 step2 step3 step4  />
      </FormContainer>
      <Row className='my-3'>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong>
                {shippingAddress.address}, {shippingAddress.city}{' '}
                {shippingAddress.postalCode}, {' '}
                {shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {paymentMethod}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {cartItems.length === 0 ? <Message>Your cart is empty</Message> : (
                <ListGroup variant='flush'>
                  {cartItems.map(item => (
                    <ListGroup.Item key={item._id}>
                      <Row>
                        <Col md={1}>
                          <Image src={item.image} alt={item.name} fluid rounded />
                        </Col>
                        <Col>
                          <Link to={`/product/${item._id}`} >
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${prices.items}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${prices.shipping}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${prices.tax}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${prices.total}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {isError && <Message variant='danger'>{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <div className='d-grid gap-2'>
                  <Button type='button' disabled={cartItems.length === 0} onClick={placeOrderHandler}>
                    Place Order
                  </Button>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen