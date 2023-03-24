import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { useSelector, useDispatch } from 'react-redux'
import { savedPaymentMethod } from '../features/paymentSlice'

const PaymentScreen = () => {
  const { shippingAddress } = useSelector((state) => state.shipping)
  const { paymentMethod } = useSelector((state) => state.payment)

  const navigate = useNavigate()

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(paymentMethod)

  const dispatch = useDispatch()

  if(!shippingAddress) {
    navigate('/shipping')
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savedPaymentMethod(selectedPaymentMethod))
    navigate('/placeorder')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'></Form.Label>
          <Col>
            <Form.Check
              type='radio'
              label='Paypal or Credit Card'
              id='Paypal'
              name='paymentMethod'
              value='Paypal'
              required
              // checked
              onChange={(e) => setSelectedPaymentMethod(e.target.value)}>
            </Form.Check>
            {/* <Form.Check
              type='radio'
              label='Stripe'
              id='Stripe'
              name='paymentMethod'
              value='Stripe'
              onChange={(e) => setSelectedPaymentMethod(e.target.value)}>
            </Form.Check> */}
          </Col>
        </Form.Group>
        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentScreen