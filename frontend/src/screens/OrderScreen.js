import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { Link } from 'react-router-dom'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import Paypal from '../components/Paypal'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { useGetOrderByIdQuery, useUpdateOrderToPaidMutation, useUpdateOrderToDeliveredMutation } from '../features/api/apiSlice'

const OrderScreen = () => {

  const { userInfo } = useSelector(state => state.auth)

  const { id } = useParams()

  const { data: orderDetails, error, isLoading } = useGetOrderByIdQuery(`${id}`)

  const [updateOrderToPaid, { data: updatedOrder, error: errorPay, isSuccess }] = useUpdateOrderToPaidMutation()

  const [updateOrderToDelivered, { data: updatedOrderToDelivered, error: errorDeliver, isSuccess: isSuccessDeliver }] = useUpdateOrderToDeliveredMutation()

  const initialOptions = {
    'client-id': process.env.REACT_APP_PAYPAL_CLIENT_ID,
    currency: 'USD',
    intent: 'capture',
  }

  const paypalSuccessHandler = (paymentResult) => {
    updateOrderToPaid({ orderId: orderDetails._id, paymentResult })
  }

  const deliverHandler = async () => {
    await updateOrderToDelivered(id)
  }

  return (
    <>
      {isLoading ? <Loader /> : error ? <Message variant='danger'>{error.data.message}</Message> : (
        <>
          <h1>Order #{orderDetails._id}</h1>
          <Row className='my-3'>
            <Col md={8}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h2>Shipping</h2>
                  <p><strong>Name : </strong> {orderDetails.user.name}</p>
                  <p><strong>Email : </strong><a href={`mailto:${orderDetails.user.email}`}>{orderDetails.user.email}</a></p>
                  <p>
                    <strong>Address: </strong>
                    {orderDetails.shippingAddress.address}, {orderDetails.shippingAddress.city}{' '}
                    {orderDetails.shippingAddress.postalCode}, {' '}
                    {orderDetails.shippingAddress.country}
                  </p>
                  {orderDetails.isDelivered ? <Message variant='success'>Delivered on {orderDetails.deliveredAt}</Message> : <Message variant='warning'>Not Delivered</Message>}
                </ListGroup.Item>
                <ListGroup.Item>
                  <h2>Payment Method</h2>
                  <p>
                    <strong>Method: </strong>
                    {orderDetails.paymentMethod}
                  </p>
                  {orderDetails.isPaid ? <Message variant='success'>Paid on {orderDetails.paidAt}</Message> : <Message variant='warning'>Not Paid</Message>}
                </ListGroup.Item>
                <ListGroup.Item>
                  <h2>Order Items</h2>
                  {orderDetails.orderItems.length === 0 ? <Message>Order is empty</Message> : (
                    <ListGroup variant='flush'>
                      {orderDetails.orderItems.map(item => (
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
                      <Col>${orderDetails.orderItems.reduce((acc, currV) => {
                        acc += currV.price*currV.qty
                        return acc
                      }, 0)}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping</Col>
                      <Col>${orderDetails.shippingPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Tax</Col>
                      <Col>${orderDetails.taxPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Total</Col>
                      <Col>${orderDetails.totalPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  {!orderDetails.isPaid && (
                    <PayPalScriptProvider options={initialOptions}><Paypal paypalSuccessHandler={paypalSuccessHandler} orderDetails={orderDetails} /></PayPalScriptProvider>
                  )
                  }
                  {userInfo && userInfo.isAdmin && orderDetails.isPaid && !orderDetails.isDelivered && (
                    <ListGroup.Item>
                      <div className='d-grid gap-2'>
                        <Button type='button' className='btn-block' onClick={deliverHandler}>
                          Mark As Delivered
                        </Button>
                      </div>
                    </ListGroup.Item>
                  )
                  }
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default OrderScreen