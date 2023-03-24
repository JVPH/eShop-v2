import { ListGroup } from 'react-bootstrap'
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import Loader from './Loader'

const Paypal = ({ orderDetails, paypalSuccessHandler  }) => {

  const [{ options, isPending }, dispatch] = usePayPalScriptReducer()

  return (
    <>
      {isPending ? <Loader /> : (
        <ListGroup.Item>
          <PayPalButtons
            style={{ layout: 'vertical' }}
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: `${orderDetails.totalPrice}`,
                    },
                  },
                ],
              })
            }}
            onApprove={(data, actions) => {
              return actions.order.capture().then((details) => {
                paypalSuccessHandler(details)
              })
            }}
          />
        </ListGroup.Item>
      )}
    </>
  )
}

export default Paypal