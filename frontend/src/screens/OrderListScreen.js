import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col, Modal } from 'react-bootstrap'
import { useGetAllOrdersQuery } from '../features/api/apiSlice'
import Message from '../components/Message'
import Loader from '../components/Loader'

const OrderListScreen = () => {

  const { data: orders, isLoading, error } = useGetAllOrdersQuery()

  return (
    <>
      <Row>
        <Col>
          <h1>Orders</h1>
        </Col>
      </Row>
      {isLoading ? <Loader /> : error ? <Message variant='danger'>{error.data.message}</Message> : (
        <Table striped bordered hover responsive='sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>USER ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user.name}</td>
                <td>{order.user._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice}</td>
                <td>{order.isPaid ? order.paidAt.substring(0, 10) : (
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
    </>
  )
}

export default OrderListScreen