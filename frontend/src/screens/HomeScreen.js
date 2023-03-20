import { Row, Col } from 'react-bootstrap'
import { useGetProductsQuery } from '../features/api/apiSlice'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useParams } from 'react-router-dom'

const HomeScreen = () => {

  const { keyword } = useParams()
  const { data: products, error, isLoading } = useGetProductsQuery(keyword)

  return (
    <>
      <h1>Latest Products</h1>
      {error ? (
        <Message variant='danger'>
          {error.data.message}
        </Message>
      ) : isLoading ? (
          <Loader />
      ) : products ? (
        <>
          <Row>
            {products.map(product => {
              return (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              )
            })}
          </Row>
        </>
      ) : null}
    </>
  )
}

export default HomeScreen
