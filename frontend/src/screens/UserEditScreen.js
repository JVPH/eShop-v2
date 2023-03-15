import { useState, useEffect } from 'react'
import { useGetUserByIdQuery, useUpdateUserByIdMutation  } from '../features/api/apiSlice'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { Link, useParams } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'

const UserEditScreen = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const { id } = useParams()


  const { data: user, error: getUserError, isLoading: userIsLoading } = useGetUserByIdQuery(`${id}`)

  useEffect(() => {
    if (user) {
      setName(user.name)
      setEmail(user.email)
      setIsAdmin(user.isAdmin)
    }
  }, [user])

  const [updateUserById, { isLoading, isError, error }] = useUpdateUserByIdMutation()

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      console.log(isAdmin)
      const updatedUser = { name, email, isAdmin}
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
                  type='name'
                  placeholder='Enter name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId='email' className='mb-3'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId='isAdmin' className='mb-3'>
                {/* <Form.Label>Is administrator?</Form.Label> */}
                <Form.Check
                  type='checkbox'
                  label='Is administrator?'
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
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