import { useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { Link } from 'react-router-dom'
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useGetOrderByIdQuery, useUpdateOrderToPaidMutation } from '../features/api/apiSlice'

const OrderScreen = () => {

  const { id } = useParams()

  const { data: orderDetails, error, isLoading } = useGetOrderByIdQuery(`${id}`)

  const [updateOrderToPaid, { data: updatedOrder, isError, error: errorPay, isSuccess }] = useUpdateOrderToPaidMutation()

  const [{ options, isPending }, dispatch] = usePayPalScriptReducer()

  if (error) {
    return (
      <Message variant='danger'>
        {error.data.message}
      </Message>)
  }

  if (isLoading) {
    return (<Loader />)
  }

  const paypalSuccessHandler = (paymentResult) => {
    updateOrderToPaid( { orderId: orderDetails._id, paymentResult } )
  }

  console.log(orderDetails.totalPrice)

  return (
    <>
      <h1>Order {orderDetails._id}</h1>
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
              <ListGroup.Item>
                {!orderDetails.isPaid && (
                  isPending ? <Loader />: (
                    <>
                      <PayPalButtons
                        style={{ layout: 'vertical' }}
                        createOrder={(data, actions) => {
                          return actions.order.create({
                            purchase_units: [
                              {
                                amount: {
                                  value: `${orderDetails.totalPrice}`,
                                },
                              },
                            ],
                          })
                        }}
                        onApprove={(data, actions) => {
                          return actions.order.capture().then((details) => {
                            console.log(details)
                            paypalSuccessHandler(details)
                            const name = details.payer.name.given_name
                            alert(`Transaction completed by ${name}`)
                          })
                        }}
                      />
                    </>
                  )
                )
                }
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderScreen