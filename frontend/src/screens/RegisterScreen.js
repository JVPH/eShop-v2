import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRegisterMutation } from '../features/api/apiSlice'
import { setCredentials } from '../features/authSlice'
import { Form, Button, Row, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { useNavigate, Link, useSearchParams } from 'react-router-dom'
import Message from '../components/Message'

const RegisterScreen = () => {

  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [message, setMessage] = useState(null)


  const [searchParams] = useSearchParams()

  const redirect = searchParams.get('redirect') || '/'

  const [register, { isLoading, isError, error }] = useRegisterMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token, navigate])

  const onChange = (e) => {
    const { name, value } = e.target
    setRegisterForm((prevValue) => ({
      ...prevValue,
      [name]: value
    }))
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    if(registerForm.password !== registerForm.confirmPassword){
      setMessage('Passwords do not match')
      return
    }
    try {
      const { name, email, password } = registerForm
      const result = await register({ name, email, password })
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
            name='name'
            placeholder='Enter name'
            value={registerForm.name}
            onChange={onChange}>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            name='email'
            placeholder='Enter email'
            value={registerForm.email}
            onChange={onChange}>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            name='password'
            placeholder='Enter password'
            value={registerForm.password}
            onChange={onChange}>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            name='confirmPassword'
            placeholder='Confirm password'
            value={registerForm.confirmPassword}
            onChange={onChange}>
          </Form.Control>
        </Form.Group>
        {
          isLoading ? (
            <Button type='submit' variant='primary' className='my-3' disabled={isLoading}>
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
          Have an account?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} >
            Login
          </Link>
        </Col>
      </Row>

    </FormContainer>
  )
}

export default RegisterScreen