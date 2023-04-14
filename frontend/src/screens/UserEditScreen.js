import { useState, useEffect } from 'react'
import { useGetUserByIdQuery, useUpdateUserByIdMutation  } from '../features/api/apiSlice'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { Link, useParams } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'

const UserEditScreen = () => {

  const [ userEditForm, setUserEditForm] = useState({
    name: '',
    email: '',
    isAdmin: false
  })

  const { id } = useParams()


  const { data: user, error: getUserError, isLoading: userIsLoading } = useGetUserByIdQuery(`${id}`)

  useEffect(() => {
    if (user) {
      setUserEditForm({
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
      })
    }
  }, [user])

  const [updateUserById, { isLoading, isError, error }] = useUpdateUserByIdMutation()

  const onChange = (e) => {
    const { name, value } = e.target
    setUserEditForm((prevValue) => ({
      ...prevValue,
      [name]: value
    }))
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const updatedUser = { ...userEditForm }
      await updateUserById({ updatedUser, id })
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <>
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {
          isLoading ? <Loader /> : isError ? <Message variant='danger'>{error.data.message}</Message> : (
            <Form onSubmit={submitHandler}>
              <Form.Group controlId='name' className='mb-3'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type='text'
                  name='name'
                  placeholder='Enter name'
                  value={userEditForm.name}
                  onChange={onChange}>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId='email' className='mb-3'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type='email'
                  name='email'
                  placeholder='Enter email'
                  value={userEditForm.email}
                  onChange={onChange}>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId='isAdmin' className='mb-3'>
                {/* <Form.Label>Is administrator?</Form.Label> */}
                <Form.Check
                  type='checkbox'
                  label='Is administrator?'
                  checked={userEditForm.isAdmin}
                  onChange={onChange}
                >
                </Form.Check>
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

export default UserEditScreen