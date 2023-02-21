import { useParams } from 'react-router-dom'
import { useGetProductByIdQuery } from '../features/api/apiSlice'
import { useDispatch } from 'react-redux'
import { addedToCart } from '../features/cartSlice'
import { useState } from 'react'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Loader from '../components/Loader'
import Rating from '../components/Rating'
import Message from '../components/Message'


const ProductScreen = () => {
  const [qty, setQty] = useState(1)
  const { id } = useParams()

  const { data: product, error, isLoading } = useGetProductByIdQuery(`${id}`)
  const dispatch = useDispatch()

  const handleAddToCart = (product, qty) => {
    dispatch(addedToCart({
      _id: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      countInStock: product.countInStock,
      qty
    }))
  }

  if(error){
    return (
      <Message variant='danger' heading='Oh snap! You got an error!'>
        {error.data.message}
      </Message>)
  }

  if(isLoading){
    return (<Loader />)
  }

  return (
    <>
      <Row className='mt-5'>
        <Col md={6} >
          <Image src={product.image} alt={product.name} fluid/>
        </Col>

        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
            </ListGroup.Item>
            <ListGroup.Item>
              Price: ${product.price}
            </ListGroup.Item>
            <ListGroup.Item>
              Description: {product.description}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product.countInStock > 0 ? 'In stock' : 'Out of stock'}
                  </Col>
                </Row>
              </ListGroup.Item>
              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Qty</Col>
                    <Col>
                      <Form.Control as='select' onChange={(e) =>
                      setQty(Number(e.target.value))}>
                        {[...Array(product.countInStock).keys()].map(x => (
                          <option key={x+1} value={x+1}>{x+1}</option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}
              <ListGroup.Item>
                <div className='d-grid gap-2'>
                  <Button type='button' disabled={product.countInStock === 0} onClick={() => handleAddToCart(product, qty)}>
                    Add to cart
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

export default ProductScreen
