import { Row, Col } from 'react-bootstrap'
import { useGetProductsQuery } from '../features/api/apiSlice'
import Product from '../components/Product'
import Loader from '../components/Loader'

const HomeScreen = () => {
  const { data: products, error, isLoading } = useGetProductsQuery()

  return (
    <>
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
          <Loader />
      ) : products ? (
        <>
          <h1>Latest Products</h1>
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
