import { Row, Col } from 'react-bootstrap'
import { useGetProductsQuery } from '../features/api/apiSlice'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import { useParams } from 'react-router-dom'

const HomeScreen = () => {

  const { keyword, pageNumber } = useParams()
  const { data, error, isLoading } = useGetProductsQuery({ keyword, pageNumber })

  return (
    <>
      <h1>Latest Products</h1>
      {error ? (
        <Message variant='danger'>
          {error.message}
        </Message>
      ) : isLoading ? (
          <Loader />
      ) :  (
        <>
          <Row>
            {data.products.map(product => {
              return (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              )
            })}
          </Row>
          <Paginate pages={data.pages} page={data.page} keyword={keyword ? keyword : ''} />
        </>
      )
      }
    </>
  )
}

export default HomeScreen
