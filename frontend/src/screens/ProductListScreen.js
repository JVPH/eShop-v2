import { useDeleteProductByIdMutation } from '../features/api/apiSlice'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col, Modal } from 'react-bootstrap'
import { useGetProductsQuery } from '../features/api/apiSlice'
import Message from '../components/Message'
import Loader from '../components/Loader'

const ProductListScreen = () => {

  const { data: products, isLoading, error } = useGetProductsQuery()

  const [deleteProductById, { isLoading: deleteProductIsLoading, isError, error: deleteProductError }] = useDeleteProductByIdMutation()

  const deleteHandler = async (id) => {
    await deleteProductById(id)
  }

  const createProductHandler = () => {
    console.log('creating...')
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createProductHandler}>
          <i className='fa-solid fa-plus'></i> Create Product
          </Button>
        </Col>
      </Row>
      {isLoading ? <Loader /> : error ? <Message variant='danger'>{error.data.message}</Message> : (
        <Table striped bordered hover responsive='sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant='light' size='sm'>
                      <i className='fa-solid fa-pen-to-square'></i>
                    </Button>
                  </LinkContainer>
                  <Button variant='danger' size='sm' disabled={deleteProductIsLoading} onClick={() => deleteHandler(product._id)}>
                    <i className='fa-solid fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default ProductListScreen