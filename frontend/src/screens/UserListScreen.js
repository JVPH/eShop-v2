import { useGetAllUsersQuery } from '../features/api/apiSlice'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'

const UserListScreen = () => {

  const { data: users, isLoading, error } = useGetAllUsersQuery()

  const deleteHandler = () => {
    console.log('deleting...')
  }

  return (
    <>
      <h1>Users</h1>
      {isLoading ? <Loader /> : error ? <Message variant='danger'>{error.data.message}</Message> : (
        <Table striped bordered hover responsive='sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                <td>
                  {user.isAdmin ? (<i className='fa-solid fa-check' style={{ color: 'green' }}></i>) :(
                    <i className='fa-sharp fa-solid fa-xmark' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/user/${user._id}/edit`}>
                    <Button variant='light' size='sm'>
                      <i className='fa-solid fa-pen-to-square'></i>
                    </Button>
                  </LinkContainer>
                  <Button variant='danger' size='sm' onClick={() => deleteHandler(user._id)}>
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

export default UserListScreen