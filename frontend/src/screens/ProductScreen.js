import { useParams } from 'react-router-dom'
import SEO from '../components/SEO'
import { useGetProductByIdQuery, useCreateProductReviewMutation } from '../features/api/apiSlice'
import { useDispatch, useSelector } from 'react-redux'
import { addedToCart } from '../features/cartSlice'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Loader from '../components/Loader'
import Rating from '../components/Rating'
import Message from '../components/Message'


const ProductScreen = () => {
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const { id } = useParams()

  const { data: product, error, isLoading } = useGetProductByIdQuery(`${id}`)

  const { userInfo } = useSelector(state => state.auth)

  const [createProductReview, { data: review, isSuccess: isSuccessProductReview, isLoading: isLoadingProductReview, error: errorProductReview }] = useCreateProductReviewMutation()

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

  const submitReviewHandler = async () => {
    await createProductReview({ rating, comment, productId: product._id })
  }

  if(error){
    return (
      <Message variant='danger'>
        {error.data.message}
      </Message>)
  }

  if(isLoading){
    return (<Loader />)
  }

  return (
    <>
      <SEO
        title={product.name}
        description='Enjoy low prices and great deals on a large selection of electronics'
        name={product.name}
        type='product'
      />
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
      <Row>
        <Col md={6}>
          <h3>Reviews</h3>
          {product.reviews.length === 0 ? <Message variant='info'>No reviews yet</Message> : (
            <ListGroup >
              {product.reviews.map(review => (
                <ListGroup.Item key={review._id}>
                  <strong>{review.name}</strong>
                  <Rating value={review.rating} />
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
          <ListGroup.Item>
            <h2>Write a Customer Review</h2>
            {isSuccessProductReview && (
              <Message variant='success'>
                Review submitted successfully
              </Message>
            )}
            {isLoadingProductReview && <Loader />}
            {errorProductReview && (
              <Message variant='danger'>{errorProductReview}</Message>
            )}
            {userInfo ? (
              <Form onSubmit={submitReviewHandler}>
                <Form.Group controlId='rating'>
                  <Form.Label>Rating</Form.Label>
                  <Form.Control
                    as='select'
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  >
                    <option value=''>Select...</option>
                    <option value='1'>1 - Poor</option>
                    <option value='2'>2 - Fair</option>
                    <option value='3'>3 - Good</option>
                    <option value='4'>4 - Very Good</option>
                    <option value='5'>5 - Excellent</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId='comment'>
                  <Form.Label>Comment</Form.Label>
                  <Form.Control
                    as='textarea'
                    row='3'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Button
                  disabled={isLoadingProductReview}
                  type='submit'
                  variant='primary'
                >
                  Submit
                </Button>
              </Form>
            ) : (
              <Message>
                Please <Link to='/login'>sign in</Link> to write a review{' '}
              </Message>
            )}
          </ListGroup.Item>
        </Col>

      </Row>
    </>
  )
}

export default ProductScreen
