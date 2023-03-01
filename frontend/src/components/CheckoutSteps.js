import { Nav, ProgressBar } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'


const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    return (
      <ProgressBar style={{ height: '1.2rem', fontSize: '1rem' }}>
        <ProgressBar variant='success' animated now={step1 ? 25 : 0} key={1} label='Sign In'></ProgressBar>
        <ProgressBar variant='success' animated now={step2 ? 25 : 0} key={2} label='Shipping'></ProgressBar>
        <ProgressBar variant='success' animated now={step3 ? 25 : 0} key={3} label='Payment'></ProgressBar>
        <ProgressBar variant='success' animated now={step4 ? 25 : 0} key={4} label='Place Order'></ProgressBar>
      </ProgressBar>
    )
  // return (
  //   <Nav className='justify-content-center mb-4'>
  //     <Nav.Item>
  //       {step1 ? (
  //         <LinkContainer to='/login'>
  //           <Nav.Link>Sign In</Nav.Link>
  //         </LinkContainer>
  //       ): (
  //         <Nav.Link disabled>Sign In</Nav.Link>
  //       )}
  //     </Nav.Item>

  //     <Nav.Item>
  //       {step2 ? (
  //         <LinkContainer to='/shipping'>
  //           <Nav.Link>Shipping</Nav.Link>
  //         </LinkContainer>
  //       ) : (
  //         <Nav.Link disabled>Shipping</Nav.Link>
  //       )}
  //     </Nav.Item>

  //     <Nav.Item>
  //       {step3 ? (
  //         <LinkContainer to='/payment'>
  //           <Nav.Link>Payment</Nav.Link>
  //         </LinkContainer>
  //       ) : (
  //         <Nav.Link disabled>Payment</Nav.Link>
  //       )}
  //     </Nav.Item>

  //     <Nav.Item>
  //       {step4 ? (
  //         <LinkContainer to='/placeorder'>
  //           <Nav.Link>Place Order</Nav.Link>
  //         </LinkContainer>
  //       ) : (
  //         <Nav.Link disabled>Place Order</Nav.Link>
  //       )}
  //     </Nav.Item>
  //   </Nav>
  // )
}

export default CheckoutSteps