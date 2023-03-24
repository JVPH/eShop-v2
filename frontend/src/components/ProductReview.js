import { ListGroup, Button, Form, Row, Col } from 'react-bootstrap'
import { useCreateProductReviewMutation } from '../features/api/apiSlice'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Message from './Message'
import Loader from './Loader'
import Rating from './Rating'

const ProductReview = ({ product }) => {

  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const { userInfo } = useSelector(state => state.auth)

  const [createProductReview, { isSuccess: isSuccessProductReview, isLoading: isLoadingProductReview, error: errorProductReview }] = useCreateProductReviewMutation()

  const submitReviewHandler = async (e) => {
    e.preventDefault()
    await createProductReview({ rating, comment, productId: product._id })
  }

  return (
    <Row>
      <Col md={6}>
        <h3>Reviews</h3>
        {product && product.reviews.length === 0 ? <Message variant='info'>No reviews yet</Message> : (
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
            <Message variant='danger'>{errorProductReview.data.message}</Message>
          )}
          {userInfo ? (
            <Form onSubmit={submitReviewHandler}>
              <Form.Group controlId='rating'>
                <Form.Label>Rating</Form.Label>
                <Form.Control
                  as='select'
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  required
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
                  minLength='4'
                  required
                ></Form.Control>
              </Form.Group>
              <Button
                disabled={isLoadingProductReview}
                type='submit'
                variant='primary'
                className='mt-2'
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
  )
}

export default ProductReview