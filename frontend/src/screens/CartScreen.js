import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Message from '../components/Message'
import { updatedQuantity, removedFromCart } from '../features/cartSlice'

const CartScreen = () => {
  const cart = useSelector((state) => state.cart)
  const { cartItems }  = cart
  const dispatch = useDispatch()

  const removeFromCartHandler = (id) => {
      dispatch(removedFromCart(id))
  }
  console.log(cartItems)
   return (
     <Row>
       <Col md={8}>
         <h1>Shopping Cart</h1>
         {cartItems.length === 0 ? <Message>Your cart is empty <Link to='/'>Go Back</Link></Message> : (
          <ListGroup variant='flush'>
            {cartItems.map(item => (
              <ListGroup.Item key={item._id}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as='select'
                      value={item.qty}
                      onChange={(e) => dispatch(updatedQuantity({ productId: item._id, qty: Number(e.target.value)}))}
                      >
                      {[...Array(item.countInStock).keys()].map(x => (
                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button type='button' variant='light' onClick={() => removeFromCartHandler(item._id)}>
                      <i className='fa-solid fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
         )}
       </Col>
       <Col md={2}>
       </Col>
       <Col md={2}>
       </Col>
     </Row>
   )

}
export default CartScreen