import { Offcanvas, Button, Col, Row, Form, Image, ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Message from './Message'
import { useDispatch, useSelector } from 'react-redux'
import { updatedQuantity, removedFromCart } from '../features/cartSlice'


const CartOffCanvas = ({ show, onHide }) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { cartItems } = useSelector((state) => state.cart)

  const removeFromCartHandler = (id) => {
    dispatch(removedFromCart(id))
  }

  const checkoutHandler = () => {
    navigate('/shipping')
  }

  return (
    <>
      <Offcanvas placement='end' show={show} onHide={onHide}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {/* <h1>Shopping Cart</h1> */}
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
                        onChange={(e) => dispatch(updatedQuantity({ productId: item._id, qty: Number(e.target.value) }))}
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
              <ListGroup.Item>
                <div className='d-grid gap-2'>
                  <Button type='button' className='btn-block' disabled={cartItems.length === 0} onClick={checkoutHandler}>
                    Proceed to checkout
                  </Button>
                </div>
              </ListGroup.Item>
            </ListGroup>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default CartOffCanvas