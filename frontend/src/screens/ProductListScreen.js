import { LinkContainer } from 'react-router-bootstrap'
import { useParams } from 'react-router-dom'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useGetProductsQuery, useDeleteProductByIdMutation, useCreateProductMutation } from '../features/api/apiSlice'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'

const ProductListScreen = () => {

  const { keyword, pageNumber } = useParams()

  const { data, isLoading, error } = useGetProductsQuery({ keyword, pageNumber })

  const [deleteProductById, { isLoading: deleteProductIsLoading, isError, error: deleteProductError }] = useDeleteProductByIdMutation()

  const [createProduct, { isLoading: createProductIsLoading, error: createProductError }] = useCreateProductMutation()

  const deleteHandler = async (id) => {
    await deleteProductById(id)
  }

  const createProductHandler = async () => {
    await createProduct()
  }

  return (
    <>
      <Row>
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
        <>
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
              {data.products.map(product => (
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
          <Paginate pages={data.pages} page={data.page} isAdmin={true} />
        </>
      )}
    </>
  )
}

export default ProductListScreen