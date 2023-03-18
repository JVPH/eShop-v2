import { useState, useEffect } from 'react'
import { useUpdateProductByIdMutation, useGetProductByIdQuery, useUploadProductImageMutation } from '../features/api/apiSlice'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { Link, useParams } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'

const ProductEditScreen = () => {

  const [product, setProduct] = useState({
    name: '',
    price: 0,
    image: '',
    brand: '',
    category: '',
    countInStock: 0,
    description: ''
  })

  const { id } = useParams()


  const { data: productDetails, error: getProductError, isLoading: productIsLoading } = useGetProductByIdQuery(`${id}`)

  useEffect(() => {
    if (productDetails) {
      setProduct({
        name: productDetails.name,
        price: productDetails.price,
        image: productDetails.image,
        brand: productDetails.brand,
        category: productDetails.category,
        countInStock: productDetails.countInStock,
        description: productDetails.description
      })
    }
  }, [productDetails])

  const onChange = e => {
    const { name, value } = e.target

    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value
    }))

  }

  const [updateProductById, { isLoading, isError, error }] = useUpdateProductByIdMutation()

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const updatedProductInfo = product
      await updateProductById({ updatedProductInfo, productId: id })
    } catch (err) {
      console.log(err)
    }
  }

  const [uploadProductImage, { isSuccess: uploadProductIsSuccess, error: uploadProductImageError, data: imageData }] = useUploadProductImageMutation()

  useEffect(() => {
    if (uploadProductIsSuccess) {
      setProduct((prevProduct) => ({
        ...prevProduct,
        image: imageData,
      }))
    }
  }, [uploadProductIsSuccess, imageData, setProduct])

  const uploadFileHandler = async (e) => {
    try {
      const file = e.target.files[0]
      const formData = new FormData()
      formData.append('image', file)
      await uploadProductImage(formData)
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {
          isLoading ? <Loader /> : isError ? <Message variant='danger'>{error.data.message}</Message> : (
            <Form onSubmit={submitHandler} id='product-form'>
              <Form.Group controlId='name' className='mb-3'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  name='name'
                  type='text'
                  placeholder='Enter name'
                  value={product.name}
                  onChange={onChange}>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId='price' className='mb-3'>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  name='price'
                  type='number'
                  min='0'
                  step='0.01'
                  placeholder='Enter price'
                  value={product.price}
                  onChange={onChange}>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId='image' className='mb-3'>
                <Form.Label>Image</Form.Label>
                <Form.Control
                  name='image'
                  type='text'
                  placeholder='Enter image'
                  value={product.image}
                  onChange={onChange}>
                </Form.Control>
                <Form.Control
                  type='file'
                  // controlid='image-file'
                  label='Choose file'
                  onChange={uploadFileHandler}>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId='brand' className='mb-3'>
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  name='brand'
                  type='text'
                  placeholder='Enter brand'
                  value={product.brand}
                  onChange={onChange}>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId='category' className='mb-3'>
                <Form.Label>Category</Form.Label>
                <Form.Control
                  name='category'
                  type='text'
                  placeholder='Enter category'
                  value={product.category}
                  onChange={onChange}>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId='countInStock' className='mb-3'>
                <Form.Label>Count in Stock</Form.Label>
                <Form.Control
                  name='countInStock'
                  type='number'
                  min='0'
                  placeholder='Enter count in stock'
                  value={product.countInStock}
                  onChange={onChange}>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId='description' className='mb-3'>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as='textarea'
                  name='description'
                  type='text'
                  placeholder='Enter description'
                  value={product.description}
                  onChange={onChange}>
                </Form.Control>
              </Form.Group>
              <Button type='submit' variant='primary' className='my-3' disabled={isLoading}>
                Update
              </Button>
            </Form>
          )
        }
      </FormContainer>
    </>
  )
}

export default ProductEditScreen