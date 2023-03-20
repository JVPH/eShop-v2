import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'

const SearchBox = () => {
  const [keyword, setKeyword] = useState('')

  const navigate = useNavigate()

  const submitHandler = e => {
    e.preventDefault()
    if (keyword.trim()) {
      navigate(`/search/${keyword}`)
    }else{
      navigate('/')
    }
  }

  return (
    <Form onSubmit={submitHandler} >
      <Form.Group style={{ 'display': 'flex' }} className='ms-4' >
        <Form.Control
          type='text'
          name='q'
          onChange={(e) => setKeyword(e.target.value)}
          placeholder='Search Products...'
        >
        </Form.Control>
        <Button type='submit' variant='outline-primary' >
          <i className='fa-solid fa-magnifying-glass' style={{ color: '#ffffff' }}></i>
        </Button>
      </Form.Group>
    </Form>
  )
}

export default SearchBox