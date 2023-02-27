import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useUpdateUserProfileMutation } from '../features/api/apiSlice'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { setCredentials } from '../features/authSlice'
import { useNavigate } from 'react-router-dom'
import Message from '../components/Message'


const ProfileScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [updateUserProfile, { isLoading, isError, error, isSuccess }] = useUpdateUserProfileMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { userInfo } = useSelector(state => state.auth)

  useEffect(() => {
    if(!userInfo) {
      navigate('/login')
    }else {
      setName(userInfo.name)
      setEmail(userInfo.email)
    }
  }, [navigate, userInfo])

  const submitHandler = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Password do not match')
    }
    try {
      const result = await updateUserProfile({ name, email, password })
      console.log('Result: ', result)
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
      <h2>My Orders</h2>
      </Col>
    </Row>
  )
}

export default ProfileScreen