import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRegisterMutation } from '../features/api/apiSlice'
import { setCredentials } from '../features/authSlice'
import { Form, Button, Row, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { useNavigate, Link } from 'react-router-dom'
import Message from '../components/Message'

const RegisterScreen = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  console.log(window.location.search)

  const redirect = window.location.search ? window.location.search.split('=')[1] : '/'

  const [register, { isLoading, isError, error }] = useRegisterMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token, navigate])

  const submitHandler = async (e) => {
    e.preventDefault()
    if(password !== confirmPassword){
      setMessage('Password do not match')
    }
    try {
      const result = await register({ name, email, password })
      console.log('Result: ', result)
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
      <h1>Sign Up</h1>
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
          <Form.Label>Password</Form.Label>
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
              Sign Up
            </Button>
          ) : (
            <Button type='submit' variant='primary' className='my-3'>
              Sign Up
            </Button>
          )
        }
      </Form>

      <Row className='py-3'>
        <Col>
          Have an account?
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} >
            Login
          </Link>
        </Col>
      </Row>

    </FormContainer>
  )
}

export default RegisterScreen