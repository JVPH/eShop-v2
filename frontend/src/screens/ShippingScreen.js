import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { useSelector, useDispatch } from 'react-redux'
import { setShippingAddress } from '../features/shippingSlice'

const ShippingScreen = () => {
  const { shippingAddress } = useSelector((state) => state.shipping)

  const navigate = useNavigate()

  const [fullAddress, setFullAddress] = useState({
    address: shippingAddress.address,
    city: shippingAddress.city,
    postalCode: shippingAddress.postalCode,
    country: shippingAddress.country
  })

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(setShippingAddress(fullAddress))
    navigate('/payment')
  }

  const onChange = (e) => {
    const { name, value } = e.target
    setFullAddress((prevValue) => ({
      ...prevValue,
      [name]: value
    }))
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            name='address'
            type='text'
            placeholder='Enter address'
            value={fullAddress.address}
            required
            onChange={onChange}>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control
            name='city'
            type='text'
            placeholder='Enter city'
            value={fullAddress.city}
            required
            onChange={onChange}>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId='postalCode'>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            name='postalCode'
            type='text'
            placeholder='Enter postal code'
            value={fullAddress.postalCode}
            required
            onChange={onChange}>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId='country'>
          <Form.Label>Country</Form.Label>
          <Form.Control
            name='country'
            type='text'
            placeholder='Enter country'
            value={fullAddress.country}
            required
            onChange={onChange}>
          </Form.Control>
        </Form.Group>

        <Button className='my-3' type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default ShippingScreen