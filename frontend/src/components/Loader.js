import { Spinner } from 'react-bootstrap'

const Loader = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <Spinner animation="border" role="status" variant='primary' style={{ height: '8rem', width: '8rem'}}>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  )
}

export default Loader