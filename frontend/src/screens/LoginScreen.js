import { useLoginMutation } from '../features/api/apiSlice'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCredentials } from '../features/authSlice'
import { useNavigate, useSearchParams } from 'react-router-dom'
// import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { Form, Button, Row, Col } from 'react-bootstrap'

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [login, { isLoading, isError, error }] = useLoginMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)
  const [searchParams] = useSearchParams()

  const redirect = searchParams.get('redirect') || '/'

  useEffect(() => {
    if (token) {
      navigate(redirect)
    }
  }, [token, navigate, redirect])

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const result = await login({ email, password })
      if (result.data) {
        dispatch(setCredentials(result.data))
        navigate('/')
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <FormContainer>
      <h1>Sign In</h1>{
        isError ? (
          <Message variant='danger'>
            {error.data.message}
          </Message>
        ) : null
      }
      <Form onSubmit={submitHandler}>
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
        {
          isLoading ? (
            <Button type='submit' variant='primary' className='my-3'>
              Sign In
            </Button>
          ) : (
            <Button type='submit' variant='primary' className='my-3'>
              Sign In
            </Button>
          )
        }
      </Form>
      <Row className='py-3'>
        <Col>
          New Customer? <Button onClick={() => {
            const uri = redirect ? `/register?redirect=${redirect}` : '/register'
            navigate(uri)
          }}>Register</Button>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginScreen