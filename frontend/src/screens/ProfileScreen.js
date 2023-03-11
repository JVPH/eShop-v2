import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useUpdateUserProfileMutation, useGetUserOrdersQuery } from '../features/api/apiSlice'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { setCredentials } from '../features/authSlice'
import Loader from '../components/Loader'
import Message from '../components/Message'


const ProfileScreen = () => {
  const { userInfo } = useSelector(state => state.auth)
  const { data: userOrders, error: ordersError, isLoading: ordersIsLoading } = useGetUserOrdersQuery()
  const [name, setName] = useState(userInfo.name)
  const [email, setEmail] = useState(userInfo.email)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [updateUserProfile, { isLoading, isError, error, isSuccess }] = useUpdateUserProfileMutation()
  const dispatch = useDispatch()

  const submitHandler = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Password do not match')
    }
    try {
      const result = await updateUserProfile({ name, email, password })
      if (result.data) {
        dispatch(setCredentials(result.data))
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Row>
      <Col md={3}>
        <h1>User Profile</h1>
        {
          message && (
            <Message variant='danger'>
              {message}
            </Message>
          )
        }
        {
          isError && (
            <Message variant='danger'>
              {error.data.message}
            </Message>
          )
        }
        {
          isSuccess && (
            <Message variant='success'>
              Profile Updated
            </Message>
          )
        }
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}>
            </Form.Control>
          </Form.Group>
          {
            isLoading ? (
              <Button type='submit' variant='primary' className='my-3'>
                Update
              </Button>
            ) : (
              <Button type='submit' variant='primary' className='my-3'>
                Update
              </Button>
            )
          }
        </Form>
      </Col>
      <Col md={9}>
        <h1>My Orders</h1>
        {ordersIsLoading ? <Loader /> : ordersError ? <Message variant='danger'>{ordersError.data.message}</Message> : (
          <Table striped bordered hover responsive='sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
              </tr>
            </thead>
            <tbody>
              {userOrders.map(order => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0,10) }</td>
                  <td>{order.totalPrice }</td>
                  <td>{order.isPaid ? order.paidAt.substring(0,10) :  (
                    <i className="fa-sharp fa-solid fa-xmark" style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : (
                    <i className="fa-sharp fa-solid fa-xmark" style={{ color: 'red' }}></i>
                  )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button variant='primary' size='sm'>Details</Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  )
}

export default ProfileScreen